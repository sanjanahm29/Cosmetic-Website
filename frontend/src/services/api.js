const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE}/categories/`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    // Graceful fallback if Django backend isn't reached yet
    return [
      { id: 1, name: 'All Products', slug: 'all' },
      { id: 2, name: 'Skincare', slug: 'skincare' },
      { id: 3, name: 'Serums & Oils', slug: 'serums' },
      { id: 4, name: 'Lip Care', slug: 'lip-care' },
      { id: 5, name: 'Cleansers', slug: 'cleansers' },
    ];
  }
}

export async function fetchProducts({ category = 'all', search = '', sort = '' } = {}) {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);
    if (sort) params.append('sort', sort);

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/products/${query}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export async function fetchProductDetail(id) {
  try {
    const res = await fetch(`${API_BASE}/products/${id}/`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    return null;
  }
}

export async function submitOrder(orderData) {
  try {
    const res = await fetch(`${API_BASE}/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw { status: res.status, data };
    }
    return data;
  } catch (error) {
    console.error('Order submission failed:', error);
    throw error;
  }
}
