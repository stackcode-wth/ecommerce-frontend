import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function OfferBanner() {
  return (
    <section
      id="offers"
      className="overflow-hidden rounded-2xl bg-[#fff9e8] dark:bg-dark-surface"
    >
      <div className="grid items-center gap-6 px-6 py-10 md:grid-cols-2 md:px-12">
     
        <div>
          <p className="text-sm font-medium text-brand">Special Offer</p>

          <h2 className="mt-2 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
            Up to 50% Off
          </h2>

          <p className="mt-3 max-w-sm text-gray-600 dark:text-gray-300">
            Limited time offer on selected items. Hurry up and grab the best
            deals!
          </p>

          <p className="mt-4 text-sm text-gray-700 dark:text-gray-200">
            Use code{' '}
            <span className="rounded border border-dashed border-brand bg-white px-2 py-1 font-mono font-semibold text-brand dark:bg-dark-elevated">
              SAVE10
            </span>{' '}
            at checkout
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-medium text-white hover:bg-brand-dark"
          >
            Shop the Sale <ArrowRight size={18} />
          </Link>
        </div>

        <div className="h-48 overflow-hidden rounded-2xl bg-white/60 md:h-56 dark:bg-dark-elevated/60">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85"
            alt="Customers browsing a fashion sale"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default OfferBanner;