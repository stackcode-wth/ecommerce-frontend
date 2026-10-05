import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function Hero() {
  const customers = ['A', 'R', 'S', 'M'];

  return (
    <section className="overflow-hidden rounded-2xl bg-cream dark:bg-dark-surface">
      <div className="grid items-center gap-8 px-6 py-10 md:grid-cols-2 md:px-12 md:py-16">
      
        <div>
          <span className="inline-block rounded-full bg-brand-light px-3 py-1 text-xs font-semibold tracking-wide text-brand">
            NEW ARRIVALS
          </span>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl dark:text-white">
            Discover The Best Products for You
          </h1>

          <p className="mt-4 max-w-md text-gray-600 dark:text-gray-300">
            Explore our wide range of high-quality products at affordable
            prices. Shop now and enjoy the best deals!
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-medium text-white hover:bg-brand-dark"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
            <a
  href="#offers"
  className="rounded-lg bg-white px-6 py-3 font-medium text-gray-900 shadow-sm hover:bg-gray-50 dark:bg-dark-elevated dark:text-white dark:hover:bg-dark-hover"
>
  Explore Deals
</a>
            
            
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {customers.map((letter) => (
                <span
                  key={letter}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-cream bg-brand text-xs font-semibold text-white dark:border-dark-surface"
                >
                  {letter}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Trusted by 10,000+ Happy Customers
            </p>
          </div>
        </div>

        <div className="flex h-64 items-center justify-center rounded-2xl bg-white/60 text-8xl md:h-80 dark:bg-dark-elevated/60">
          🎒🎧
        </div>
      </div>
    </section>
  );
}

export default Hero;