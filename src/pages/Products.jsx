import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

const categoryNames = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Beauty',
  'Sports',
  'Accessories',
];

const chipBase =
  'whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium';
const chipActive = 'border-brand bg-brand text-white';
const chipInactive =
  'border-gray-300 bg-white text-gray-700 hover:border-brand hover:text-brand dark:border-dark-border dark:bg-dark-surface dark:text-gray-200';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, error } = useProducts();

  const selectedCategory = searchParams.get('category');
  const searchText = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'featured';

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center text-gray-600 dark:text-gray-300">
        <p>Loading products...</p>
        <p className="mt-1 text-sm text-gray-400">
          The server may take up to a minute to wake up.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <p className="text-red-500">Could not load products: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-brand px-5 py-2 text-white hover:bg-brand-dark"
        >
          Try again
        </button>
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts];
  if (sortBy === 'price-low') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

  let title = 'All Products';
  if (searchText) {
    title = `Results for "${searchText}"`;
  } else if (selectedCategory) {
    title = selectedCategory;
  }

  const isFiltered = Boolean(selectedCategory || searchText);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {sortedProducts.length} products
          </p>
        </div>

        {isFiltered && (
          <Link
            to="/products"
            className="text-sm font-medium text-brand hover:underline"
          >
            Clear filters
          </Link>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => updateParam('category', '')}
            className={`${chipBase} ${!selectedCategory ? chipActive : chipInactive}`}
          >
            All
          </button>

          {categoryNames.map((name) => (
            <button
              key={name}
              onClick={() => updateParam('category', name)}
              className={`${chipBase} ${selectedCategory === name ? chipActive : chipInactive}`}
            >
              {name}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) =>
            updateParam('sort', e.target.value === 'featured' ? '' : e.target.value)
          }
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-brand dark:border-dark-border dark:bg-dark-surface dark:text-gray-200"
        >
          <option value="featured">Sort: Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {sortedProducts.length === 0 && (
        <p className="mt-6 text-gray-600 dark:text-gray-300">
          No products found. Try a different search.
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;