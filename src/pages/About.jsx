import { Link } from 'react-router-dom';
import { ArrowRight, Heart, ShieldCheck, ShoppingBag } from 'lucide-react';

const values = [
  {
    title: 'Thoughtful selection',
    description:
      'Explore a curated mix of everyday essentials across electronics, fashion, home, beauty, sports, and accessories.',
    icon: ShoppingBag,
  },
  {
    title: 'A simpler way to shop',
    description:
      'Find products, compare options, and keep your favorites and cart together in one convenient place.',
    icon: Heart,
  },
  {
    title: 'Support when you need it',
    description:
      'Our help, contact, shipping, and returns information is easy to find whenever you have a question.',
    icon: ShieldCheck,
  },
];

function About() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8">
      <section className="overflow-hidden rounded-2xl bg-[#e6f0e2] px-6 py-12 text-gray-900 dark:bg-dark-surface dark:text-white sm:px-10 md:px-14 md:py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          About M&amp;M Shop
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl md:text-5xl">
          Everyday shopping, made a little easier.
        </h1>
        <p className="mt-5 max-w-2xl leading-relaxed text-gray-600 dark:text-gray-300">
          M&amp;M Shop brings a range of useful finds together in one place. Browse
          across the categories you love, discover something new, and shop at
          your own pace.
        </p>
        <Link
          to="/products"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-dark-bg transition-colors hover:bg-accent/90"
        >
          Explore products <ArrowRight size={18} />
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          What matters to us
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {values.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-xl border border-[#d5e2d0] bg-[#dfe9da] p-5 dark:border-dark-border dark:bg-dark-surface"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-light text-brand dark:bg-dark-elevated dark:text-white">
                <Icon size={21} />
              </span>
              <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-[#fff9e8] px-6 py-8 dark:bg-dark-surface sm:px-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Here to help
        </h2>
        <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-300">
          Questions about an order or need a hand? Visit our help center or get
          in touch with us.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/help"
            className="rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-dark"
          >
            Help &amp; Support
          </Link>
          <Link
            to="/contact"
            className="rounded-lg border border-brand px-4 py-2.5 text-sm font-medium text-brand hover:bg-brand/5 dark:text-white"
          >
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
