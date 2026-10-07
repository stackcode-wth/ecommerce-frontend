import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CircleHelp,
  Headphones,
  PackageCheck,
  RotateCcw,
} from 'lucide-react';
import FaqList from '../components/FaqList';
import { faqs } from '../data/faqs';

function Help() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/" className="transition-colors hover:text-brand dark:hover:text-accent">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-gray-800 dark:text-gray-200">
          Help &amp; Support
        </span>
      </nav>

      <section className="relative overflow-hidden rounded-3xl bg-card-light px-6 py-8 dark:bg-dark-surface sm:px-10 sm:py-12">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[36px] border-brand/5 dark:border-accent/5" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand dark:bg-dark-elevated dark:text-accent">
              <Headphones size={14} aria-hidden="true" />
              Here whenever you need us
            </span>
            <h1 className="mt-5 max-w-xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Help &amp; <span className="text-brand dark:text-accent">Support</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
              Need a hand with an order, delivery, or return? Find quick answers below or get in touch with our team.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-white/80 bg-white/80 p-6 shadow-sm dark:border-dark-border dark:bg-dark-elevated">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-amber-700 dark:bg-accent/15 dark:text-accent">
              <Headphones size={24} aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
              Talk to our team
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              We’re available Monday to Saturday, 9 AM - 6 PM.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-dark-bg transition hover:bg-accent/90"
            >
              Contact support <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 sm:mt-14" aria-labelledby="help-topics">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand dark:text-accent">
            Help topics
          </p>
          <h2 id="help-topics" className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            What can we help you with?
          </h2>
        </div>
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <Link
            to="/track-order"
            className="group flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-dark-border dark:bg-dark-surface"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-amber-700 dark:bg-accent/15 dark:text-accent">
              <PackageCheck size={21} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-gray-900 dark:text-white">Orders &amp; delivery</span>
              <span className="mt-1 block text-sm text-gray-600 dark:text-gray-300">Track a delivery with your order ID.</span>
            </span>
            <ArrowRight size={18} className="shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-brand dark:group-hover:text-accent" aria-hidden="true" />
          </Link>
          <Link
            to="/returns-refunds"
            className="group flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-dark-border dark:bg-dark-surface"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-amber-700 dark:bg-accent/15 dark:text-accent">
              <RotateCcw size={21} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-gray-900 dark:text-white">Returns &amp; refunds</span>
              <span className="mt-1 block text-sm text-gray-600 dark:text-gray-300">Learn about returns and refund timing.</span>
            </span>
            <ArrowRight size={18} className="shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-brand dark:group-hover:text-accent" aria-hidden="true" />
          </Link>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Common questions
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Answers to the things customers ask us most.
            </p>
          </div>
          <FaqList faqs={faqs.slice(0, 4)} />
        </div>
      </section>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <CircleHelp size={17} className="text-amber-700 dark:text-accent" aria-hidden="true" />
        <span>Looking for more answers?</span>
        <Link to="/faqs" className="font-semibold text-brand hover:underline dark:text-accent">
          View all FAQs
        </Link>
      </div>
    </main>
  );
}

export default Help;
