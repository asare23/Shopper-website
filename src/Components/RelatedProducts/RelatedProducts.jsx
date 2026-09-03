import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import { fetchPopularProducts } from "../../Services/popular.service";
import Item from "../Item/Item";

const RelatedProducts = () => {
  const [data_product, setDataProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchPopularProducts();
      setDataProduct(products);
      setLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      {loading ? (
        <p>Loading products...</p>
      ) : data_product.length === 0 ? (
        <p>No related products found.</p>
      ) : (
        <div className="relatedproducts-item">
          {data_product.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              newPrice={item.new_price}
              oldPrice={item.old_price}
              product={item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
