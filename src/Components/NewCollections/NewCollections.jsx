import React, { useState, useEffect } from "react";
import "./NewCollections.css";
import { fetchNewProducts } from "../../Services/newProducts.service";
import Item from "../Item/Item";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const NewCollections = () => {
  const [new_collections, setNewCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchNewProducts();
      setNewCollections(products);
      setLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <div className="newcollections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      {loading ? (
        <LoadingSpinner label="Loading new collections..." />
      ) : new_collections.length === 0 ? (
        <p>No new collections available.</p>
      ) : (
        <div className="collections">
          {new_collections.map((item, i) => {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                newPrice={item.new_price}
                oldPrice={item.old_price}
                product={item}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NewCollections;
