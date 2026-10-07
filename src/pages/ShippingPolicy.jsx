import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Headphones, MapPin, Package, Truck } from 'lucide-react';

const sections = [
  {
    heading: 'Free shipping',
    body: 'Shipping is free on all orders over $50. For smaller orders, a small delivery charge is added at checkout.',
    icon: Package,
  },
  {
    heading: 'Delivery time',
    body: 'Standard delivery takes 3-7 business days. Delivery time can vary depending on your location.',
    icon: Clock,
  },
  {
    heading: 'Order tracking',
    body: 'Once your order is shipped you can follow its progress from the Track Order page using your order ID.',
    icon: MapPin,
  },
  {
    heading: 'Delays',
    body: 'Sometimes weather, holidays or high demand can delay deliveries. If your order is late, please contact our support team.',
    icon: Headphones,
  },
];

function ShippingPolicy() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/" className="transition-colors hover:text-brand dark:hover:text-accent">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-gray-800 dark:text-gray-200">
          Shipping Policy
        </span>
      </nav>

      <section className="relative overflow-hidden rounded-3xl bg-card-light px-6 py-8 dark:bg-dark-surface sm:px-10 sm:py-12">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[36px] border-brand/5 dark:border-accent/5" />
        <div className="relative grid items-center gap-10 md:grid-cols-[1.4fr_0.8fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand dark:bg-dark-elevated dark:text-accent">
              <Truck size={14} aria-hidden="true" />
              From checkout to your door
            </span>
            <h1 className="mt-5 max-w-xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Shipping <span className="text-brand dark:text-accent">Policy</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
              Everything you need to know about how we deliver your orders, from delivery estimates to tracking your package.
            </p>
            <Link
              to="/track-order"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-dark-bg shadow-sm transition hover:bg-accent/90"
            >
              Track My Order <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-white/80 bg-white/80 p-6 shadow-sm dark:border-dark-border dark:bg-dark-elevated">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light/60 text-brand dark:bg-accent/15 dark:text-accent">
              <Truck size={24} aria-hidden="true" />
            </div>
            <p className="mt-5 text-3xl font-bold text-gray-900 dark:text-white">3–7 days</p>
            <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
              standard delivery estimate
            </p>
            <div className="my-5 h-px bg-gray-200 dark:bg-dark-border" />
            <div className="flex items-start gap-3">
              <Package className="mt-0.5 shrink-0 text-brand dark:text-accent" size={19} aria-hidden="true" />
              <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
                Enjoy free shipping on orders over $50. Delivery timing may vary by location.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 sm:mt-14" aria-labelledby="shipping-details">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand dark:text-accent">
              Delivery details
            </p>
            <h2 id="shipping-details" className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              What to expect
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
            Helpful information for every step of your order’s journey.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {sections.map(({ heading, body, icon: Icon }) => (
            <article
              key={heading}
              className="group rounded-2xl border border-gray-200/80 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-dark-border dark:bg-dark-surface sm:p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light/50 text-brand dark:bg-accent/15 dark:text-accent">
                <Icon size={21} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
                {heading}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <aside className="mt-8 flex flex-col gap-4 rounded-2xl border border-brand/15 bg-brand-light/25 p-5 dark:border-dark-border dark:bg-dark-surface sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white">Need help with a delivery?</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Get in touch with our support team and we’ll be happy to help.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-dark-bg transition hover:bg-accent/90"
        >
          Contact support <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </aside>
    </main>
  );
}

export default ShippingPolicy;
