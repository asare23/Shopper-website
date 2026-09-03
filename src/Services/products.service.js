const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const fetchAllProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/api/products`);
    if (!res.ok) {
      throw new Error(`fetchAllProducts status ${res.status}`);
    }
    const body = await res.json();
    if (!body.success) {
      throw new Error(body.message || "Failed to retrieve products");
    }
    return Array.isArray(body.data) ? body.data : [];
  } catch (error) {
    console.error("fetchAllProducts error", error);
    return [];
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    const res = await fetch(`${API_URL}/api/products/category/${category}`);
    if (!res.ok) {
      throw new Error(`fetchProductsByCategory status ${res.status}`);
    }
    const body = await res.json();
    if (!body.success) {
      throw new Error(
        body.message || `Failed to retrieve ${category} products`,
      );
    }
    return body.data;
  } catch (error) {
    console.error(`fetchProductsByCategory error for ${category}`, error);
    return [];
  }
};
