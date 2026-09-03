const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const fetchNewProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/api/new-products`);
    if (!res.ok) {
      throw new Error(`fetchNewProducts status ${res.status}`);
    }
    const body = await res.json();
    if (!body.success) {
      throw new Error(body.message || "Failed to retrieve new products");
    }
    return body.data;
  } catch (error) {
    console.error("fetchNewProducts error", error);
    return [];
  }
};
