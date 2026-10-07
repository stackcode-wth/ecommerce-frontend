const BASE_URL = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || `Request failed (${response.status})`);
  }

  return response.status === 204 ? null : response.json();
}

// Backend ka product frontend ke format me badalta hai
function normalizeProduct(product) {
  return { ...product, id: product.id ?? product._id };
}

export async function getProducts() {
  const data = await request('/api/products');
  return data.map(normalizeProduct);
}

export async function getProduct(id) {
  const data = await request(`/api/products/${id}`);
  return normalizeProduct(data);
}