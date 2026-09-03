const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const fetchPopularProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/api/popproducts`);
    if (!res.ok) {
      throw new Error(`fetchPopularProducts status ${res.status}`);
    }
    const body = await res.json();
    if (!body.success) {
      throw new Error(body.message || "Failed to retrieve popular products");
    }
    return body.data;
  } catch (error) {
    console.error("fetchPopularProducts error", error);
    return [];
  }
};
