import { useState } from 'react';
import { Tag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

function CouponBox() {
  const { appliedCoupon, applyCoupon, removeCoupon, subtotal, availableCoupons } =
    useCart();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState(null);

  
  const tryCoupon = (codeToApply) => {
    const result = applyCoupon(codeToApply);
    setMessage(result);
    if (result.success) setCode('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (code.trim() === '') return;
    tryCoupon(code);
  };

  const handleRemove = () => {
    removeCoupon();
    setMessage(null);
  };

  
  if (appliedCoupon) {
    const belowMinimum = subtotal < appliedCoupon.minSubtotal;

    return (
      <div className="mt-4">
        <div className="flex items-center justify-between rounded-lg bg-brand-light px-3 py-2 text-sm text-brand dark:bg-dark-elevated">
          <span className="flex items-center gap-2 font-medium">
            <Tag size={16} />
            {appliedCoupon.code}: {appliedCoupon.description}
          </span>
          <button onClick={handleRemove} aria-label="Remove coupon">
            <X size={16} />
          </button>
        </div>

        {belowMinimum && (
          <p className="mt-2 text-xs text-red-500">
            Add {formatCurrency(appliedCoupon.minSubtotal - subtotal)} more to
            get this discount.
          </p>
        )}
      </div>
    );
  }

  
  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Coupon code"
            className="w-full min-w-0 rounded-l-lg border border-gray-300 bg-white px-3 py-2 text-sm uppercase outline-none placeholder:normal-case focus:border-brand dark:border-dark-border dark:bg-dark-elevated dark:text-white"
          />
          <button
            type="submit"
            className="rounded-r-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
          >
            Apply
          </button>
        </div>

        {message && (
          <p
            className={`mt-2 text-xs ${
              message.success ? 'text-brand' : 'text-red-500'
            }`}
          >
            {message.message}
          </p>
        )}
      </form>

      
      <p className="mt-5 text-sm font-semibold text-gray-900 dark:text-white">
        Available coupons
      </p>
      <ul className="mt-2 space-y-2">
        {availableCoupons.map((coupon) => {
          const isUsable = subtotal >= coupon.minSubtotal;

          return (
            <li
              key={coupon.code}
              className="flex items-center justify-between gap-2 rounded-lg border border-dashed border-brand/50 px-3 py-2"
            >
              <div>
                <p className="font-mono text-sm font-semibold text-brand">
                  {coupon.code}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {coupon.description}
                </p>
                {!isUsable && (
                  <p className="text-xs text-red-500">
                    Add {formatCurrency(coupon.minSubtotal - subtotal)} more
                  </p>
                )}
              </div>

              <button
                onClick={() => tryCoupon(coupon.code)}
                disabled={!isUsable}
                className="text-sm font-medium text-brand hover:underline disabled:cursor-not-allowed disabled:text-gray-400 disabled:no-underline"
              >
                Apply
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CouponBox;