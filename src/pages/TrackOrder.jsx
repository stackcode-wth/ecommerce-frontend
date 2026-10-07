import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Check,
  Clock,
  Headphones,
  MapPin,
  Package,
  Search,
  Truck,
} from 'lucide-react';
import { orders, ORDER_STEPS } from '../data/orders';

function TrackOrder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get('id') || '';
  const [input, setInput] = useState(orderId);

  const order = orders.find(
    (item) => item.id.toLowerCase() === orderId.trim().toLowerCase()
  );
  const currentStep = order ? ORDER_STEPS.indexOf(order.status) : -1;

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    setSearchParams(trimmed ? { id: trimmed } : {});
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/" className="transition-colors hover:text-brand dark:hover:text-accent">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-gray-800 dark:text-gray-200">
          Track Order
        </span>
      </nav>

      <section className="relative overflow-hidden rounded-3xl bg-card-light px-6 py-8 dark:bg-dark-surface sm:px-10 sm:py-12">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[36px] border-brand/5 dark:border-accent/5" />
        <div className="relative grid items-center gap-10 md:grid-cols-[1.2fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand dark:bg-dark-elevated dark:text-accent">
              <Truck size={14} aria-hidden="true" />
              Your order, every step of the way
            </span>
            <h1 className="mt-5 max-w-xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Track your <span className="text-brand dark:text-accent">order</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
              Your next favorite thing is on its way. Enter your order ID to see the latest delivery updates.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-brand dark:bg-dark-elevated dark:text-accent">
                <Clock size={18} aria-hidden="true" />
              </span>
              <span>We’ll show the latest available order status.</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm dark:border-dark-border dark:bg-dark-elevated sm:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light/60 text-brand dark:bg-accent/15 dark:text-accent">
              <Package size={24} aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
              Find your delivery
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Enter the order ID from your order confirmation.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <label htmlFor="order-id" className="sr-only">
                Order ID
              </label>
              <input
                id="order-id"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="e.g. ORD1002"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/15 dark:border-dark-border dark:bg-dark-surface dark:text-white dark:focus:border-accent dark:focus:ring-accent/15"
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-dark-bg shadow-sm transition hover:bg-accent/90"
              >
                <Search size={18} aria-hidden="true" />
                Track My Order
              </button>
            </form>
          </div>
        </div>
      </section>

      {orderId && !order && (
        <div role="alert" className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
          No order found with ID “{orderId}”. Please check the ID and try again.
        </div>
      )}

      {order && (
        <section className="mt-10 rounded-3xl border border-gray-200/80 bg-white p-5 dark:border-dark-border dark:bg-dark-surface sm:mt-12 sm:p-8" aria-labelledby="tracking-status">
          <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 dark:border-dark-border sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand dark:text-accent">
                Order status
              </p>
              <h2 id="tracking-status" className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                Your delivery journey
              </h2>
            </div>
            <div className="rounded-xl bg-card-light px-4 py-3 dark:bg-dark-elevated">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Order ID
              </p>
              <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                {order.id}
                <span className="ml-2 font-normal text-gray-500 dark:text-gray-400">
                  {order.date}
                </span>
              </p>
            </div>
          </div>

          <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ORDER_STEPS.map((step, index) => {
              const done = index <= currentStep;
              const active = index === currentStep;
              const StepIcon = [Check, Package, Truck, MapPin][index];

              return (
                <li
                  key={step}
                  aria-current={active ? 'step' : undefined}
                  className={`rounded-2xl border p-4 transition-colors ${
                    active
                      ? 'border-accent bg-accent/10 dark:border-accent/60 dark:bg-dark-elevated'
                      : 'border-gray-200 bg-white dark:border-dark-border dark:bg-dark-elevated'
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      done
                        ? 'bg-accent text-dark-bg'
                        : 'bg-gray-100 text-gray-400 dark:bg-dark-elevated dark:text-gray-500'
                    }`}
                  >
                    <StepIcon size={19} aria-hidden="true" />
                  </span>
                  <p className={`mt-4 text-sm font-semibold ${
                    done
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {done ? (active ? 'Current status' : 'Completed') : 'Coming up'}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>
      )}

    </main>
  );
}

export default TrackOrder;
