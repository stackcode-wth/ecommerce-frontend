import { Link } from 'react-router-dom';
import { ArrowRight, CircleHelp, Headphones, MessageCircle } from 'lucide-react';
import FaqList from '../components/FaqList';
import { faqs } from '../data/faqs';

function FAQs() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/" className="transition-colors hover:text-brand dark:hover:text-accent">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-gray-800 dark:text-gray-200">
          FAQs
        </span>
      </nav>

      <section className="relative overflow-hidden rounded-3xl bg-card-light px-6 py-8 dark:bg-dark-surface sm:px-10 sm:py-12">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[36px] border-brand/5 dark:border-accent/5" />
        <div className="relative grid items-center gap-10 md:grid-cols-[1.3fr_0.8fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand dark:bg-dark-elevated dark:text-accent">
              <CircleHelp size={14} aria-hidden="true" />
              Here to make things clear
            </span>
            <h1 className="mt-5 max-w-xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Frequently asked <span className="text-brand dark:text-accent">questions</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
              Find quick answers about orders, delivery, returns, and shopping with us.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-white/80 bg-white/80 p-6 shadow-sm dark:border-dark-border dark:bg-dark-elevated">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light/60 text-brand dark:bg-accent/15 dark:text-accent">
              <Headphones size={24} aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
              Still need help?
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Our support team can help if you can’t find the answer you’re looking for.
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

      <section className="mx-auto mt-10 max-w-4xl sm:mt-14" aria-labelledby="faq-list-heading">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand dark:text-accent">
            Quick answers
          </p>
          <h2 id="faq-list-heading" className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            How can we help?
          </h2>
        </div>
        <FaqList faqs={faqs} />
      </section>

      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <MessageCircle size={16} aria-hidden="true" />
        <span>Can’t find what you need? </span>
        <Link to="/contact" className="font-semibold text-brand hover:underline dark:text-accent">
          Talk to our team
        </Link>
      </div>
    </main>
  );
}

export default FAQs;
