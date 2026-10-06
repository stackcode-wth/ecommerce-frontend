import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/products' },
  { label: 'Categories', path: '/products' },
];

const serviceLinks = [
  { label: 'Track Order', path: '/track-order' },
  { label: 'Returns & Refunds', path: '/returns-refunds' },
  { label: 'Shipping Policy', path: '/shipping-policy' },
  { label: 'FAQs', path: '/faqs' },
];

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();
    // TODO: backend ready hone par yahan POST /api/newsletter call hoga
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-brand-light dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"
            >
              <ShoppingBag size={24} className="text-brand" />
              M&M Shop
            </Link>
            <p className="mt-3 max-w-xs text-sm text-gray-600 dark:text-gray-300">
              Your one-stop shop for quality products at the best prices.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Customer Service</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Subscribe to our newsletter
            </h3>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              Get the latest updates on new products and upcoming sales.
            </p>

            <form onSubmit={handleSubscribe} className="mt-3 flex">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full min-w-0 rounded-l-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand dark:border-dark-border dark:bg-dark-elevated dark:text-white"
              />
              <button
                type="submit"
                className="rounded-r-lg bg-brand px-4 text-sm font-medium text-white hover:bg-brand-dark"
              >
                Subscribe
              </button>
            </form>

            {subscribed && (
              <p className="mt-2 text-sm text-brand">Thanks for subscribing!</p>
            )}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-300 pt-4 text-center text-sm text-gray-500 dark:border-dark-border dark:text-gray-400">
          &copy; {new Date().getFullYear()} M&M Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;