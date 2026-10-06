import { Link } from 'react-router-dom';
import { orders } from '../data/orders';

const statusStyle = {
  Placed: 'bg-gray-100 text-gray-700',
  Shipped: 'bg-blue-100 text-blue-700',
  'Out for Delivery': 'bg-amber-100 text-amber-700',
  Delivered: 'bg-green-100 text-green-700',
};

function Orders() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Orders</h1>

      {orders.length === 0 ? (
        <p className="mt-6 text-gray-600 dark:text-gray-300">
          You have no orders yet.{' '}
          <Link to="/products" className="text-brand hover:underline">
            Start shopping
          </Link>
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-gray-200 bg-white p-4 dark:border-dark-border dark:bg-dark-surface"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{order.id}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{order.date}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[order.status]}`}
                >
                  {order.status}
                </span>
              </div>

              <ul className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                {order.items.map((item) => (
                  <li key={item.name} className="flex justify-between">
                    <span>
                      {item.name} x {item.qty}
                    </span>
                    <span>${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-dark-border">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Total: ${order.total.toFixed(2)}
                </p>
                <Link
                  to={`/track-order?id=${order.id}`}
                  className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
                >
                  Track Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;