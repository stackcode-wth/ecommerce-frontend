import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Heart, ShoppingCart, Menu, X , User} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import AccountMenu from './AccountMenu';


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
    <nav className="sticky top-0 z-50 bg-brand text-white shadow-sm dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
       
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-white"
        >
          <ShoppingBag size={26} className="text-white" />
          M&M Shop
        </Link>

        
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-white/85 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        
        <form
          onSubmit={handleSearch}
          className="hidden md:flex h-8 min-w-0 max-w-[360px] flex-1 items-center overflow-hidden rounded-lg border border-brand/30 bg-white dark:border-dark-border dark:bg-dark-surface"
        >
          <Search size={18} className="ml-4 shrink-0 text-brand dark:text-gray-300" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for Products, Brands and More"
            className="ml-3 min-w-0 flex-1 bg-transparent px-1 text-sm text-gray-800 outline-none placeholder-gray-500 dark:text-white dark:placeholder-gray-400"
          />
          <button
            type="submit"
            className="h-full shrink-0 bg-accent px-4 text-xs font-semibold text-dark-bg transition-colors hover:bg-accent/90"
          >
            Search
          </button>
        </form>


        <div className="flex items-center gap-3">
         <AccountMenu />
          
          <Link to="/wishlist" aria-label="Wishlist" className="relative text-white/85 hover:text-white">
  <Heart size={22} />
  {wishlistCount > 0 && (
    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-brand">
      {wishlistCount}
    </span>
  )}
</Link>

          <Link
  to="/cart"
  aria-label="Cart"
  className="relative text-white/85 hover:text-white"
>
  <ShoppingCart size={22} />
  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-brand">
      {cartCount}
    </span>
  )}
</Link>

          <ThemeToggle />

          
          <button
            aria-label="Menu"
            className="md:hidden text-white/85 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-3 border-t border-white/30 px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="text-white/85 hover:text-white"
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