import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CouponBox from '../components/CouponBox';
import { formatCurrency } from '../utils/currency';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, subtotal, discount } = useCart();

 
  const shipping = subtotal > 4150 ? 0 : 415;
    const total = subtotal - discount + shipping;


  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <ShoppingCart size={48} className="mx-auto text-gray-400" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
          Your cart is empty
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Looks like you have not added anything yet.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-block rounded-lg bg-brand px-6 py-3 font-medium text-white hover:bg-brand-dark"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Shopping Cart
      </h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        
        <div className="space-y-4 lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-card-light p-4 dark:border-dark-border dark:bg-dark-surface"
            >
              <Link
                to={`/products/${item.id}`}
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-brand-light/50 text-4xl dark:bg-dark-elevated"
              >
                {item.image}
              </Link>

              <div className="flex-1">
                <Link
                  to={`/products/${item.id}`}
                  className="font-semibold text-gray-900 hover:text-brand dark:text-white"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatCurrency(item.price)} each
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity === 1}
                    aria-label="Decrease quantity"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark-border dark:text-gray-200"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="w-6 text-center font-medium text-gray-900 dark:text-white">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label="Increase quantity"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:border-brand hover:text-brand dark:border-dark-border dark:text-gray-200"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-white">
                  {formatCurrency(item.price * item.quantity)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                  className="mt-2 text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        
        <div className="h-fit rounded-xl border border-gray-200 bg-card-light p-5 dark:border-dark-border dark:bg-dark-surface">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Order Summary
          </h2>
           <CouponBox />

          <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
                        {discount > 0 && (
              <div className="flex justify-between text-brand">
                <span>Discount</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-bold text-gray-900 dark:border-dark-border dark:text-white">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          
          <button className="mt-5 w-full rounded-lg bg-brand py-3 font-medium text-white hover:bg-brand-dark">
            Proceed to Checkout
          </button>

          <Link
            to="/products"
            className="mt-3 block text-center text-sm text-brand hover:underline"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;