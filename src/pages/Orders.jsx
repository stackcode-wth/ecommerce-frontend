import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Package,
  PackageCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { getMyOrders } from '../services/api';
import { formatCurrency } from '../utils/currency';

const statusStyles = {
  Placed: 'bg-gray-100 text-gray-700 dark:bg-dark-elevated dark:text-gray-200',
  Shipped: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300',
  'Out for Delivery': 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
  Delivered: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300',
  Cancelled: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300',
};

const statusIcons = {
  Placed: Clock3,
  Shipped: Package,
  'Out for Delivery': Truck,
  Delivered: CheckCircle2,
  Cancelled: Package,
};

function getOrderStatus(value) {
  const normalized = value?.toLowerCase();
  if (normalized === 'cancelled') return 'Cancelled';
  if (normalized === 'delivered') return 'Delivered';
  if (normalized === 'out for delivery') return 'Out for Delivery';
  if (normalized === 'shipped') return 'Shipped';
  return 'Placed';
}

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    let ignore = false;

    getMyOrders()
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('The server returned an invalid orders response.');
        }
        if (!ignore) setOrders(data);
      })
      .catch((requestError) => {
        if (!ignore) setError(requestError.message || 'Unable to load your orders.');
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const placedOrderId = location.state?.placedOrder?.id;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/" className="transition-colors hover:text-brand dark:hover:text-accent">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-gray-800 dark:text-gray-200">
          My Orders
        </span>
      </nav>

      <section className="relative overflow-hidden rounded-3xl bg-card-light px-6 py-8 dark:bg-dark-surface sm:px-10 sm:py-12">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[36px] border-brand/5 dark:border-accent/5" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand dark:bg-accent/15 dark:text-accent">
              <ShoppingBag size={14} aria-hidden="true" />
              Your shopping, all in one place
            </span>
            <h1 className="mt-5 max-w-xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              My <span className="text-brand dark:text-accent">Orders</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
              Check your recent purchases, see what’s on the way, and track an order whenever you need.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-white/80 bg-white/80 p-6 shadow-sm dark:border-dark-border dark:bg-dark-elevated">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light/50 text-brand dark:bg-accent/15 dark:text-accent">
              <PackageCheck size={24} aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
              Order updates
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Open a tracking page from any order to follow its delivery progress.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-brand dark:text-brand-light">
              <Truck size={17} aria-hidden="true" />
              Stay in the loop from dispatch to delivery
            </div>
          </div>
        </div>
      </section>

      {placedOrderId && (
        <p
          role="status"
          className="mt-6 rounded-2xl border border-brand/15 bg-brand-light/25 px-5 py-4 text-sm font-medium text-brand dark:border-dark-border dark:bg-dark-surface dark:text-brand-light"
        >
          Order {placedOrderId} was placed successfully.
        </p>
      )}

      <section className="mt-10 sm:mt-12" aria-labelledby="orders-heading">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand dark:text-brand-light">
            Your account
          </p>
          <h2 id="orders-heading" className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            Order history
          </h2>
        </div>

        {loading ? (
          <div role="status" className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-6 text-gray-600 dark:border-dark-border dark:bg-dark-surface dark:text-gray-300">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light/50 text-brand dark:bg-brand/30 dark:text-brand-light">
              <Package size={20} aria-hidden="true" />
            </span>
            Loading your orders...
          </div>
        ) : error ? (
          <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
            Could not load your orders: {error}
          </p>
        ) : orders.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-dark-border dark:bg-dark-surface sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light/50 text-brand dark:bg-brand/30 dark:text-brand-light">
              <ShoppingBag size={23} aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No orders yet</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Once you place an order, you’ll be able to find its details here.
            </p>
            <Link
              to="/products"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-dark-bg transition hover:bg-accent/90"
            >
              Start shopping <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = getOrderStatus(order.status);
              const StatusIcon = statusIcons[status];

              return (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white transition hover:shadow-sm dark:border-dark-border dark:bg-dark-surface"
                >
                  <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div className="flex min-w-0 items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-light/50 text-brand dark:bg-brand/30 dark:text-brand-light">
                        <Package size={22} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900 dark:text-white">
                          Order {order.id}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Order date unavailable'}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[status]}`}>
                      <StatusIcon size={14} aria-hidden="true" />
                      {status}
                    </span>
                  </div>

                  <ul className="space-y-3 border-t border-gray-100 px-5 py-4 dark:border-dark-border sm:px-6">
                    {order.items.map((item) => (
                      <li key={item.productId} className="flex items-start justify-between gap-4 text-sm">
                        <span className="text-gray-700 dark:text-gray-200">
                          {item.productName} <span className="text-gray-500 dark:text-gray-400">× {item.quantity}</span>
                        </span>
                        <span className="shrink-0 font-medium text-gray-800 dark:text-gray-200">
                          {formatCurrency(item.price)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-4 border-t border-gray-100 bg-gray-50/70 px-5 py-4 dark:border-dark-border dark:bg-dark-elevated/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Total <span className="ml-2">{formatCurrency(order.totalAmount)}</span>
                    </p>
                    <Link
                      to={`/track-order?id=${order.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-dark-bg transition hover:bg-accent/90"
                    >
                      Track order <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default Orders;
