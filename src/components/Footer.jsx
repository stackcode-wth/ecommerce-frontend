import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/products' },
  { label: 'Categories', path: '/products' },
];


const serviceLinks = [
  'Track Order',
  'Returns & Refunds',
  'Shipping Policy',
  'FAQs',
];

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault(); 
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-brand text-white dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
       
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-white"
            >
              <ShoppingBag size={24} className="text-white" />
              M&M Shop
            </Link>
            <p className="mt-3 max-w-xs text-sm text-white/80 dark:text-gray-300">
              Your one-stop shop for quality products at the best prices.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80 dark:text-gray-300">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Customer Service
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80 dark:text-gray-300">
              {serviceLinks.map((item) => (
                <li key={item} className="hover:text-white">
                  {item}
                </li>
              ))}
            </ul>
          </div>

         
          <div>
             {/* <h3 className="font-semibold text-white">
              Subscribe to our newsletter
            </h3>
             <p className="mt-3 text-sm text-white/80 dark:text-gray-300">
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
              
            </form> */}

            {subscribed && (
              <p className="mt-2 text-sm text-white">Thanks for subscribing!</p>
            )}
          </div>
        </div>

        <div className="mt-8 border-t border-white/30 pt-4 text-center text-sm text-white/75 dark:border-dark-border dark:text-gray-400">
          &copy; {new Date().getFullYear()} M&M Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;