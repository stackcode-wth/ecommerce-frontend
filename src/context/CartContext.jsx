import { createContext, useContext, useEffect, useState } from 'react';
import coupons from '../data/coupons';
import { formatCurrency } from '../utils/currency';

const CartContext = createContext();
const LEGACY_USD_TO_INR_RATE = 83;

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return [];

    const parsedCart = JSON.parse(savedCart);
    if (localStorage.getItem('cartCurrency') === 'INR') return parsedCart;

    return parsedCart.map((item) => ({
      ...item,
      price: Math.round(item.price * LEGACY_USD_TO_INR_RATE * 100) / 100,
      oldPrice: Math.round(item.oldPrice * LEGACY_USD_TO_INR_RATE * 100) / 100,
    }));
  });
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    localStorage.setItem('cartCurrency', 'INR');
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, change) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  
  const applyCoupon = (code) => {
    const coupon = coupons.find(
      (item) => item.code === code.trim().toUpperCase()
    );

    if (!coupon) {
      return { success: false, message: 'Invalid coupon code' };
    }

    if (subtotal < coupon.minSubtotal) {
      const needed = coupon.minSubtotal - subtotal;
      return { success: false, message: `Add ${formatCurrency(needed)} more to use this coupon` };
    }

    setAppliedCoupon(coupon);
    return { success: true, message: `${coupon.code} applied!` };
  };

  const removeCoupon = () => setAppliedCoupon(null);


  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minSubtotal) {
    if (appliedCoupon.type === 'percent') {
      discount = (subtotal * appliedCoupon.value) / 100;
    } else {
      discount = Math.min(appliedCoupon.value, subtotal);
    }
  }
  discount = Math.round(discount * 100) / 100;

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    cartCount,
    subtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discount,
    availableCoupons: coupons,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}