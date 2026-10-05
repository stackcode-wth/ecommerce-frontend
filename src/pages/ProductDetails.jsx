import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart } from 'lucide-react';
import products from '../data/products';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

function ProductDetails() {
  const { id } = useParams();
    const { addToCart } = useCart();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Product not found
        </h1>
        <Link
          to="/products"
          className="mt-4 inline-block text-brand hover:underline"
        >
          Back to products
        </Link>
      </div>
    );
  }

  const discountPercent = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Link
        to="/products"
        className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-brand dark:text-gray-300"
      >
        <ArrowLeft size={16} />
       Back
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
       
        <div className="flex h-72 items-center justify-center rounded-2xl bg-brand-light/50 text-9xl md:h-96 dark:bg-dark-surface">
          {product.image}
        </div>

        <div>
          <p className="text-sm font-medium text-brand">{product.category}</p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {product.rating}
            </span>
            <span>({product.reviews} reviews)</span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(product.price)}
            </span>
            <span className="text-lg text-gray-400 line-through">
              {formatCurrency(product.oldPrice)}
            </span>
            <span className="rounded-full bg-brand-light px-2 py-1 text-xs font-semibold text-brand">
              {discountPercent}% OFF
            </span>
          </div>

          <p className="mt-6 text-gray-600 dark:text-gray-300">
            {product.description}
          </p>

          <div className="mt-8 flex gap-3">
            
            <button 
            onClick={() => addToCart(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand py-3 font-medium text-white hover:bg-brand-dark">
              <ShoppingCart size={18} />
              Add to Cart
            </button>
            <button
              aria-label="Add to wishlist"
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:text-red-500 dark:border-dark-border dark:text-gray-300"
            >
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;