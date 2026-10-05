import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';

function Wishlist() {
  const { wishlistItems } = useWishlist();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="mt-6 text-gray-600 dark:text-gray-300">
          Nothing saved yet.{' '}
          <Link to="/products" className="text-brand hover:underline">Browse products</Link>
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;