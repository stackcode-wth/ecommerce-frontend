import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  LogIn,
  LogOut,
  X,
  CircleHelp,
  RotateCcw,
  Truck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { label: 'FAQs', path: '/faqs', icon: CircleHelp },
  { label: 'Returns & Refunds', path: '/returns-refunds', icon: RotateCcw },
  { label: 'Shipping Policy', path: '/shipping-policy', icon: Truck },
  { label: 'My Profile', path: '/profile', icon: User },
  { label: 'Login', path: '/login', icon: LogIn },
];

function AccountMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const visibleItems = isLoggedIn
    ? menuItems.filter((item) => item.path !== '/login')
    : menuItems;

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  const itemClass =
    'flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-gray-800 hover:bg-stone-100 dark:text-gray-100 dark:hover:bg-dark-elevated';

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        aria-label={isLoggedIn ? `Account menu for ${user.name}` : 'Account menu'}
        className="flex items-center gap-2 whitespace-nowrap text-white/85 hover:text-white"
      >
        <User size={22} />
        {isLoggedIn && (
          <span className="hidden text-sm sm:inline">Hello, {user.name}</span>
        )}
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
            {isLoggedIn && (
              <li className="px-3 pb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                Hi, {user.name}
              </li>
            )}

            {visibleItems.map(({ label, path, icon: Icon }) => (
              <li key={path}>
                <Link to={path} onClick={() => setOpen(false)} className={itemClass}>
                  <Icon size={20} className="text-brand" />
                  {label}
                </Link>
              </li>
            ))}

            {isLoggedIn && (
              <li>
                <button onClick={handleLogout} className={itemClass}>
                  <LogOut size={20} className="text-brand" />
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AccountMenu;