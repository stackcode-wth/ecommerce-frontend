import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Electronics', emoji: '🎧', color: 'bg-blue-100' },
  { name: 'Fashion', emoji: '👕', color: 'bg-pink-100' },
  { name: 'Home & Kitchen', emoji: '🛋️', color: 'bg-amber-100' },
  { name: 'Beauty', emoji: '🧴', color: 'bg-purple-100' },
  { name: 'Sports', emoji: '👟', color: 'bg-emerald-100' },
  { name: 'Accessories', emoji: '⌚', color: 'bg-orange-100' },
];

function Categories() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Shop by Categories
        </h2>
        <Link
          to="/products"
          className="flex items-center gap-1 text-sm font-medium text-brand hover:underline"
        >
          View All Categories <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/products?category=${encodeURIComponent(category.name)}`}
            className="flex flex-col items-center gap-3"
          >
            <span
              className={`flex h-20 w-20 items-center justify-center rounded-full text-4xl sm:h-24 sm:w-24 ${category.color}`}
            >
              {category.emoji}
            </span>
            <span className="text-center text-sm font-medium text-gray-800 dark:text-gray-200">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;