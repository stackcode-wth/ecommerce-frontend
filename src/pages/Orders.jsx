import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getMyOrders } from '../services/api';
import { formatCurrency } from '../utils/currency';

const statusStyle = {
  Placed: 'bg-gray-100 text-gray-700',
  Shipped: 'bg-blue-100 text-blue-700',
  'Out for Delivery': 'bg-amber-100 text-amber-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Orders</h1>

      {placedOrderId && (
        <p role="status" className="mt-4 rounded-lg bg-brand-light px-4 py-3 text-sm text-brand dark:bg-dark-elevated dark:text-gray-100">
          Order {placedOrderId} was placed successfully.
        </p>
      )}

      {loading ? (
        <p className="mt-6 text-gray-600 dark:text-gray-300">Loading your orders...</p>
      ) : error ? (
        <p role="alert" className="mt-6 text-red-600">
          Could not load your orders: {error}
        </p>
      ) : orders.length === 0 ? (
        <p className="mt-6 text-gray-600 dark:text-gray-300">
          You have no orders yet.{' '}
          <Link to="/products" className="text-brand hover:underline">
            Start shopping
          </Link>
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => {
            const status =
              order.status?.toLowerCase() === 'cancelled'
                ? 'Cancelled'
                : order.status?.toLowerCase() === 'delivered'
                  ? 'Delivered'
                  : order.status?.toLowerCase() === 'shipped'
                    ? 'Shipped'
                    : 'Placed';

            return (
            <div
              key={order.id}
              className="rounded-xl border border-gray-200 bg-white p-4 dark:border-dark-border dark:bg-dark-surface"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{order.id}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[status]}`}
                >
                  {status}
                </span>
              </div>

              <ul className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                {order.items.map((item) => (
                  <li key={item.productId} className="flex justify-between">
                    <span>
                      {item.productName} x {item.quantity}
                    </span>
                    <span>{formatCurrency(item.price)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-dark-border">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Total: {formatCurrency(order.totalAmount)}
                </p>
                <Link
                  to={`/track-order?id=${order.id}`}
                  className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
                >
                  Track Order
                </Link>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Orders;