import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, CircleHelp, ClipboardList, Truck, User, LogIn, X } from 'lucide-react';

const menuItems = [
  { label: 'Contact Us', path: '/contact', icon: Phone },
  { label: 'Help & Support', path: '/help', icon: CircleHelp },
  { label: 'My Orders', path: '/orders', icon: ClipboardList },
  { label: 'Track Order', path: '/track-order', icon: Truck },
  { label: 'My Profile', path: '/profile', icon: User },
  { label: 'Login', path: '/login', icon: LogIn },
];

function AccountMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Account menu"
        className="text-gray-700 hover:text-brand dark:text-gray-200"
      >
        <User size={22} />
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-64 rounded-2xl bg-white p-3 shadow-xl dark:bg-dark-surface">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-900 dark:text-gray-300"
          >
            <X size={18} />
          </button>

          <ul className="flex flex-col pt-5">
            {menuItems.map(({ label, path, icon: Icon }) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-800 hover:bg-stone-100 dark:text-gray-100 dark:hover:bg-dark-elevated"
                >
                  <Icon size={20} className="text-brand" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AccountMenu;