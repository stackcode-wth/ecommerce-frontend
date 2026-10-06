import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';
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
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Track Order</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Enter your order ID to see where your order is.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="e.g. ORD1002"
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand dark:border-dark-border dark:bg-dark-elevated dark:text-white"
        />
        <button
          type="submit"
          className="rounded-lg bg-brand px-5 py-2 font-medium text-white hover:bg-brand-dark"
        >
          Track
        </button>
      </form>

      {orderId && !order && (
        <p className="mt-6 text-red-500">No order found with ID "{orderId}".</p>
      )}

      {order && (
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5 dark:border-dark-border dark:bg-dark-surface">
          <p className="font-semibold text-gray-900 dark:text-white">
            {order.id} <span className="font-normal text-gray-500">({order.date})</span>
          </p>

          <ol className="mt-5 space-y-5">
            {ORDER_STEPS.map((step, index) => {
              const done = index <= currentStep;
              return (
                <li key={step} className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      done
                        ? 'bg-brand text-white'
                        : 'bg-gray-200 text-gray-400 dark:bg-dark-elevated'
                    }`}
                  >
                    {done ? <Check size={16} /> : index + 1}
                  </span>
                  <span
                    className={
                      index === currentStep
                        ? 'font-semibold text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-300'
                    }
                  >
                    {step}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}

export default TrackOrder;