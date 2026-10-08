import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  Truck,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import CouponBox from '../components/CouponBox';
import { formatCurrency } from '../utils/currency';
import { createOrder, syncCartWithBackend } from '../services/api';

function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const navigate = useNavigate();

  const shipping = subtotal > 4150 ? 0 : 415;
  const total = subtotal - discount + shipping;

  const handleCheckout = async () => {
    if (!localStorage.getItem('token')) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    setCheckoutError('');
    setIsCheckingOut(true);
    try {
      await syncCartWithBackend(cartItems);
      const order = await createOrder();
      clearCart();
      navigate('/orders', { state: { placedOrder: order } });
    } catch (error) {
      setCheckoutError(error.message || 'Unable to place your order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="transition-colors hover:text-brand dark:hover:text-accent">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">Shopping Cart</span>
        </nav>

        <section className="relative overflow-hidden rounded-3xl bg-card-light px-6 py-10 dark:bg-dark-surface sm:px-10 sm:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[36px] border-brand/5 dark:border-accent/5" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-light/50 text-brand dark:bg-accent/15 dark:text-accent">
              <ShoppingCart size={30} aria-hidden="true" />
            </span>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-brand dark:text-accent">
              Your next favorite find
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Your cart is waiting
            </h1>
            <p className="mt-3 max-w-lg text-base leading-7 text-gray-600 dark:text-gray-300">
              Looks like you haven’t added anything yet. Explore the shop and find something you love.
            </p>
            <Link
              to="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-dark-bg shadow-sm transition hover:bg-accent/90"
            >
              Continue Shopping <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/" className="transition-colors hover:text-brand dark:hover:text-accent">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-gray-800 dark:text-gray-200">Shopping Cart</span>
      </nav>

      <section className="relative overflow-hidden rounded-3xl bg-card-light px-6 py-8 dark:bg-dark-surface sm:px-10 sm:py-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[36px] border-brand/5 dark:border-accent/5" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand dark:bg-dark-elevated dark:text-accent">
              <ShoppingBag size={14} aria-hidden="true" />
              Your picks, all in one place
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Shopping <span className="text-brand dark:text-accent">Cart</span>
            </h1>
            <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
              Review your items and get everything ready for checkout.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 dark:border-dark-border dark:bg-dark-elevated">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light/50 text-brand dark:bg-accent/15 dark:text-accent">
              <PackageCheck size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ready for checkout</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_360px]">
        <section aria-labelledby="cart-items-heading">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand dark:text-accent">
                Your selection
              </p>
              <h2 id="cart-items-heading" className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                Cart items
              </h2>
            </div>
            <Link to="/products" className="text-sm font-medium text-brand hover:underline dark:text-accent">
              Keep shopping
            </Link>
          </div>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-gray-200/80 bg-white p-4 dark:border-dark-border dark:bg-dark-surface sm:flex-row sm:items-center sm:p-5"
              >
                <Link
                  to={`/products/${item.id}`}
                  className="h-24 w-full shrink-0 overflow-hidden rounded-xl bg-brand-light/30 dark:bg-dark-elevated sm:h-24 sm:w-24"
                >
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </Link>

                <div className="min-w-0 flex-1">
                  <Link
                    to={`/products/${item.id}`}
                    className="font-semibold text-gray-900 transition-colors hover:text-brand dark:text-white dark:hover:text-accent"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {formatCurrency(item.price)} each
                  </p>

                  <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-gray-200 p-1 dark:border-dark-border">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity === 1}
                      aria-label={`Decrease quantity of ${item.name}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-gray-600 transition hover:bg-brand-light/40 hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-200 dark:hover:bg-dark-elevated dark:hover:text-accent"
                    >
                      <Minus size={14} aria-hidden="true" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold text-gray-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-gray-600 transition hover:bg-brand-light/40 hover:text-brand dark:text-gray-200 dark:hover:bg-dark-elevated dark:hover:text-accent"
                    >
                      <Plus size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-3 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                  <p className="font-bold text-gray-900 dark:text-white">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-red-500 dark:text-gray-400"
                  >
                    <Trash2 size={16} aria-hidden="true" />
                    <span className="sm:sr-only">Remove</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="rounded-2xl border border-gray-200/80 bg-white p-5 dark:border-dark-border dark:bg-dark-surface sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light/50 text-brand dark:bg-accent/15 dark:text-accent">
              <ShoppingBag size={19} aria-hidden="true" />
            </span>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Order Summary</h2>
          </div>

          <div className="mt-5">
            <CouponBox />
          </div>

          <div className="mt-5 space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex justify-between gap-4">
              <span>Subtotal</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{formatCurrency(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between gap-4 text-brand dark:text-accent">
                <span>Discount</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <span>Shipping</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {shipping === 0 ? 'Free' : formatCurrency(shipping)}
              </span>
            </div>
            <div className="flex justify-between gap-4 border-t border-gray-200 pt-4 text-base font-bold text-gray-900 dark:border-dark-border dark:text-white">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-xl bg-brand-light/25 p-3 text-xs leading-5 text-brand dark:bg-dark-elevated dark:text-gray-200">
            <Truck size={16} className="mt-0.5 shrink-0 dark:text-accent" aria-hidden="true" />
            <span>{shipping === 0 ? 'Your order qualifies for free shipping.' : 'Free shipping on orders over ₹4,150.'}</span>
          </div>

          {checkoutError && (
            <p role="alert" className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-300">
              {checkoutError}
            </p>
          )}
          <button
            type="button"
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-dark-bg transition hover:bg-accent/90 disabled:cursor-wait disabled:opacity-60"
          >
            {isCheckingOut ? 'Placing order...' : 'Proceed to Checkout'}
            {!isCheckingOut && <ArrowRight size={17} aria-hidden="true" />}
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <ShieldCheck size={15} className="text-brand dark:text-accent" aria-hidden="true" />
            Secure checkout
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
