import { createContext, useContext, useEffect, useRef, useState } from 'react';
import products from '../data/products';
import { useAuth } from './AuthContext';
import {
  addWishlistItem,
  getWishlist,
  removeWishlistItem,
} from '../services/api';

const WishlistContext = createContext();
const productImages = new Map(products.map((product) => [String(product.id), product.image]));

function getWishlistProducts(response) {
  let items = response;
  if (!Array.isArray(items)) {
    items = items?.items ?? items?.products ?? items?.wishlist ?? items?.data;
  }
  if (!Array.isArray(items)) {
    items = items?.items ?? items?.products ?? items?.wishlist ?? items?.data;
  }
  const list = Array.isArray(items) ? items : items?.items ?? items?.products ?? items?.wishlist;

  if (!Array.isArray(list)) {
    throw new Error('The server returned an invalid wishlist response.');
  }

  return list.map((entry) => {
    const product = entry.product ?? entry;
    const rawId = product.id ?? product._id ?? entry.productId ?? entry.product_id;
    if (rawId === undefined || rawId === null) {
      throw new Error('The server returned a wishlist item without a product ID.');
    }

    const id = rawId;
    const localProduct = products.find((item) => String(item.id) === String(id));
    return {
      ...localProduct,
      ...product,
      id,
      image: product.image ?? localProduct?.image ?? productImages.get(String(id)),
    };
  });
}

export function WishlistProvider({ children }) {
  const { isLoggedIn } = useAuth();
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved
      ? JSON.parse(saved).map((item) => ({
          ...item,
          image: productImages.get(String(item.id)) ?? item.image,
        }))
      : [];
  });
  const [wishlistError, setWishlistError] = useState('');
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);
  const [pendingIds, setPendingIds] = useState(() => new Set());
  const pendingIdsRef = useRef(new Set());

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    if (!isLoggedIn) return undefined;

    let ignore = false;
    setIsLoadingWishlist(true);
    setWishlistError('');

    getWishlist()
      .then((response) => {
        const productsFromServer = getWishlistProducts(response);
        if (!ignore) setWishlistItems(productsFromServer);
      })
      .catch((error) => {
        if (!ignore) {
          setWishlistError(error.message || 'Unable to load your wishlist.');
        }
      })
      .finally(() => {
        if (!ignore) setIsLoadingWishlist(false);
      });

    return () => {
      ignore = true;
    };
  }, [isLoggedIn]);

  const isWishlisted = (id) =>
    wishlistItems.some((item) => String(item.id) === String(id));

  const isWishlistUpdating = (id) => pendingIds.has(String(id));

  const toggleWishlist = async (product) => {
    const id = String(product.id);
    if (pendingIdsRef.current.has(id)) return;

    const wasWishlisted = wishlistItems.some((item) => String(item.id) === id);
    setWishlistError('');
    pendingIdsRef.current.add(id);
    setPendingIds(new Set(pendingIdsRef.current));

    setWishlistItems((current) =>
      wasWishlisted
        ? current.filter((item) => String(item.id) !== id)
        : [...current, product]
    );

    try {
      if (isLoggedIn) {
        if (wasWishlisted) {
          await removeWishlistItem(id);
        } else {
          await addWishlistItem(id);
        }
      }
    } catch (error) {
      setWishlistItems((current) => {
        const exists = current.some((item) => String(item.id) === id);
        if (wasWishlisted && !exists) return [...current, product];
        if (!wasWishlisted && exists) {
          return current.filter((item) => String(item.id) !== id);
        }
        return current;
      });
      setWishlistError(error.message || 'Unable to update your wishlist.');
    } finally {
      pendingIdsRef.current.delete(id);
      setPendingIds(new Set(pendingIdsRef.current));
    }
  };

  const value = {
    wishlistItems,
    isWishlisted,
    toggleWishlist,
    wishlistCount: wishlistItems.length,
    wishlistError,
    isLoadingWishlist,
    isWishlistUpdating,
  };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
