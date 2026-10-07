import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';

function BestSelling() {
  const { products, loading, error } = useProducts();
  const bestSellers = products.slice(0, 5);

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Best Selling Products
        </h2>
        <Link
          to="/products"
          className="flex items-center gap-1 text-sm font-medium text-brand hover:underline"
        >
          View All Products <ArrowRight size={16} />
        </Link>
      </div>

      {loading && (
        <p className="mt-6 text-gray-600 dark:text-gray-300">Loading products...</p>
      )}
      {error && <p className="mt-6 text-red-500">Could not load products.</p>}

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default BestSelling;