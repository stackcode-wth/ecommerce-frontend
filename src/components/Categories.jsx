import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Electronics',
    image:
      'https://i.pinimg.com/736x/ba/2a/16/ba2a162b913fa4707dbcedcf23c8d3d2.jpg',
  },
  {
    name: 'Fashion',
    image:
      'https://i.pinimg.com/736x/cf/7a/b0/cf7ab0f21382f7daaeca23af5eb1ff93.jpg',
  },
  {
    name: 'Home & Kitchen',
    image:
      'https://i.pinimg.com/736x/fd/69/7c/fd697ccbfa7045cb9d8701b1899e39fc.jpg',
  },
  {
    name: 'Beauty',
    image:
      'https://i.pinimg.com/736x/4c/3f/6c/4c3f6cd583b81ca82bc717576da72945.jpg',
  },
  {
    name: 'Sports',
    image:
      'https://i.pinimg.com/736x/c1/47/d7/c147d75d161d89ee196b1e3622fecb8c.jpg',
  },
  {
    name: 'Accessories',
    image:
      'https://i.pinimg.com/736x/0e/dc/85/0edc857f0d237b0ff428cec76aec3a7f.jpg',
  },
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
        {categories.map(({ name, image }) => (
          <Link
            key={name}
            to={`/products?category=${encodeURIComponent(name)}`}
            className="flex flex-col items-center gap-3"
          >
            <span className="h-20 w-20 overflow-hidden rounded-full bg-brand-light sm:h-24 sm:w-24 dark:bg-dark-elevated">
              <img
                src={image}
                alt={`${name} category`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="text-center text-sm font-medium text-gray-800 dark:text-gray-200">
              {name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;