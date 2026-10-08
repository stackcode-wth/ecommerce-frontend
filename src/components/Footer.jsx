import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/products' },
  { label: 'Categories', path: '/products' },
  { label: 'About Us', path: '/about' },
];

const serviceLinks = [
  { label: 'Track Order', path: '/track-order' },
  { label: 'Returns & Refunds', path: '/returns-refunds' },
  { label: 'Shipping Policy', path: '/shipping-policy' },
  { label: 'FAQs', path: '/faqs' },
];

function Footer() {
  return (
    <footer className="bg-brand-light dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"
            >
              <ShoppingBag size={24} className="text-brand dark:text-accent" />
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
              Follow us on
            </h3>
            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://www.instagram.com/"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/30 text-brand transition-colors hover:bg-brand hover:text-white dark:border-accent/50 dark:text-accent dark:hover:bg-accent dark:hover:text-dark-bg"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/30 text-brand transition-colors hover:bg-brand hover:text-white dark:border-accent/50 dark:text-accent dark:hover:bg-accent dark:hover:text-dark-bg"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor">
                  <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/30 text-brand transition-colors hover:bg-brand hover:text-white dark:border-accent/50 dark:text-accent dark:hover:bg-accent dark:hover:text-dark-bg"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor">
                  <path d="M22 5.9a8 8 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.3 8.3 0 0 1-2.7 1 4.2 4.2 0 0 0-7.2 3.8A11.9 11.9 0 0 1 2.9 4.8a4.2 4.2 0 0 0 1.3 5.6 4.1 4.1 0 0 1-1.9-.5v.1a4.2 4.2 0 0 0 3.4 4.1 4.3 4.3 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.4 8.4 0 0 1 1.5 19a11.8 11.8 0 0 0 6.4 1.9c7.7 0 11.9-6.4 11.9-11.9v-.5A8.5 8.5 0 0 0 22 5.9Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
      <div className="bg-brand text-white dark:bg-dark-bg">
        <div className="mx-auto max-w-6xl border-t border-white/20 px-4 py-4 text-center text-sm text-white/80">
          &copy; {new Date().getFullYear()} M&M Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;