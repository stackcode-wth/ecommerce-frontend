import { createContext, useContext, useEffect, useState } from 'react';
import products from '../data/products';

const WishlistContext = createContext();
const productImages = new Map(products.map((product) => [product.id, product.image]));

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved
      ? JSON.parse(saved).map((item) => ({
          ...item,
          image: productImages.get(item.id) ?? item.image,
        }))
      : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const isWishlisted = (id) => wishlistItems.some((item) => item.id === id);

  const toggleWishlist = (product) => {
    setWishlistItems((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product]
    );
  };

  const value = {
    wishlistItems,
    isWishlisted,
    toggleWishlist,
    wishlistCount: wishlistItems.length,
  };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}