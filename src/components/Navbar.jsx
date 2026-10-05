import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Heart, ShoppingCart, Menu, X , User} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
  ];

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmedText = searchText.trim();
    if (trimmedText === '') return; 
    navigate(`/products?search=${encodeURIComponent(trimmedText)}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
       
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"
        >
          <ShoppingBag size={26} className="text-brand" />
          M&M Shop
        </Link>

        
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-700 hover:text-brand dark:text-gray-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center flex-1 max-w-xs rounded-full bg-stone-100 px-4 py-2 dark:bg-dark-elevated"
        >
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search products..."
            className="ml-2 w-full bg-transparent text-sm outline-none placeholder-gray-500 dark:text-white"
          />
        </form>


        <div className="flex items-center gap-3">
          <Link
            to="/login"
            aria-label="Login"
            className="text-gray-700 hover:text-brand dark:text-gray-200"
          >
            <User size={22} />
          </Link>
          
          <Link to="/wishlist" aria-label="Wishlist" className="relative text-gray-700 hover:text-brand dark:text-gray-200">
  <Heart size={22} />
  {wishlistCount > 0 && (
    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs text-white">
      {wishlistCount}
    </span>
  )}
</Link>

          <Link
  to="/cart"
  aria-label="Cart"
  className="relative text-gray-700 hover:text-brand dark:text-gray-200"
>
  <ShoppingCart size={22} />
  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs text-white">
      {cartCount}
    </span>
  )}
</Link>

          <ThemeToggle />

          
          <button
            aria-label="Menu"
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-3 border-t border-gray-200 px-4 py-3 dark:border-dark-border">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-brand dark:text-gray-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;