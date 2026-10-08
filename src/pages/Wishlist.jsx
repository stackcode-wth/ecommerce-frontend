import { Link } from 'react-router-dom';
import { ArrowRight, Heart, ShieldCheck, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

function Wishlist() {
  const { wishlistItems, wishlistError, isLoadingWishlist } = useWishlist();
  const { isLoggedIn } = useAuth();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/" className="transition-colors hover:text-brand dark:hover:text-accent">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-gray-800 dark:text-gray-200">Wishlist</span>
      </nav>

      <section className="relative overflow-hidden rounded-3xl bg-card-light px-6 py-8 dark:bg-dark-surface sm:px-10 sm:py-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[36px] border-brand/5 dark:border-accent/5" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand dark:bg-dark-elevated dark:text-accent">
              <Heart size={14} aria-hidden="true" />
              Your favorites, saved
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              My <span className="text-brand dark:text-accent">Wishlist</span>
            </h1>
            <p className="mt-2 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300">
              Keep the things you love close by, and come back to them whenever you’re ready.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 dark:border-dark-border dark:bg-dark-elevated">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light/50 text-brand dark:bg-accent/15 dark:text-accent">
              <Heart size={19} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'favorite' : 'favorites'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Saved for later</p>
            </div>
          </div>
        </div>
      </section>

      {wishlistError && (
        <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
          {wishlistError}
        </p>
      )}

      {isLoadingWishlist ? (
        <p role="status" className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-600 dark:border-dark-border dark:bg-dark-surface dark:text-gray-300">
          Loading your saved favorites...
        </p>
      ) : wishlistItems.length === 0 ? (
        <section className="mt-8 rounded-2xl border border-gray-200/80 bg-white px-6 py-10 dark:border-dark-border dark:bg-dark-surface sm:py-12">
          <div className="mx-auto flex max-w-lg flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light/50 text-brand dark:bg-accent/15 dark:text-accent">
              <Heart size={26} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">
              Nothing saved just yet
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Browse the collection and tap the heart on anything you’d like to keep an eye on.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-dark-bg shadow-sm transition hover:bg-accent/90"
            >
              <ShoppingBag size={17} aria-hidden="true" />
              Explore Products <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      ) : (
        <section className="mt-8" aria-labelledby="saved-items-heading">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand dark:text-accent">
                Saved for later
              </p>
              <h2 id="saved-items-heading" className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                Your favorites
              </h2>
            </div>
            <Link to="/products" className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline dark:text-accent">
              Keep browsing <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <aside className="mt-8 flex items-center gap-3 rounded-2xl border border-brand/15 bg-brand-light/25 p-4 dark:border-dark-border dark:bg-dark-surface">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-light/50 text-brand dark:bg-dark-elevated dark:text-accent">
          <ShieldCheck size={19} aria-hidden="true" />
        </span>
        <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
          {isLoggedIn
            ? 'Your wishlist is synced with your account, so your saved favorites are ready when you return.'
            : 'Your wishlist is saved on this device. Sign in to sync favorites with your account.'}
        </p>
      </aside>
    </main>
  );
}

export default Wishlist;
