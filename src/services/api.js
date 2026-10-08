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

  if (response.status === 204) return null;

  const responseBody = await response.text();
  if (!responseBody) return null;

  return response.headers.get('content-type')?.includes('application/json')
    ? JSON.parse(responseBody)
    : responseBody;
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

export async function loginWithCredentials(email, password) {
  const data = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (typeof data?.token !== 'string' || data.token.trim() === '') {
    throw new Error('The login response did not include an authentication token.');
  }

  return data;
}

export async function registerWithCredentials(name, email, password) {
  return request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export async function syncCartWithBackend(cartItems) {
  await request('/api/cart', { method: 'DELETE' });

  for (const item of cartItems) {
    const params = new URLSearchParams({
      productId: item.id,
      quantity: String(item.quantity),
    });
    await request(`/api/cart?${params}`, { method: 'POST' });
  }
}

export async function createOrder() {
  return request('/api/orders', { method: 'POST' });
}

export async function getMyOrders() {
  return request('/api/orders');
}

export async function getWishlist() {
  return request('/api/wishlist');
}

export async function addWishlistItem(productId) {
  return request(`/api/wishlist/${encodeURIComponent(productId)}`, {
    method: 'POST',
  });
}

export async function removeWishlistItem(productId) {
  return request(`/api/wishlist/${encodeURIComponent(productId)}`, {
    method: 'DELETE',
  });
}

export async function getProductReviews(productId) {
  return request(`/api/reviews/${encodeURIComponent(productId)}`);
}

export async function createProductReview(productId, review) {
  return request(`/api/reviews/${encodeURIComponent(productId)}`, {
    method: 'POST',
    body: JSON.stringify(review),
  });
}

export async function updateProductReview(reviewId, review) {
  return request(`/api/reviews/${encodeURIComponent(reviewId)}`, {
    method: 'PUT',
    body: JSON.stringify(review),
  });
}

export async function deleteProductReview(reviewId) {
  return request(`/api/reviews/${encodeURIComponent(reviewId)}`, {
    method: 'DELETE',
  });
}