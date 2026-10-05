import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-card-light dark:border-dark-border dark:bg-dark-surface">
   
      <div className="relative">
        <Link
          to={`/products/${product.id}`}
          className="flex h-40 items-center justify-center bg-brand-light/50 text-6xl dark:bg-dark-elevated"
        >
          {product.image}
        </Link>
        <button
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm hover:text-red-500 dark:bg-dark-surface dark:text-gray-300"
        >
          <Heart size={16} />
        </button>
      </div>

     
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          <Link to={`/products/${product.id}`} className="hover:text-brand">
            {product.name}
          </Link>
        </h3>

        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {product.rating}
          </span>
          <span>({product.reviews})</span>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {formatCurrency(product.price)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            {formatCurrency(product.oldPrice)}
          </span>
        </div>

        <div className="mt-auto pt-4">
          <button 
           onClick={() => addToCart(product)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2 text-sm font-medium text-white hover:bg-brand-dark">

            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;