import React, { useState, useEffect } from "react";
import "./Popular.css";
import { fetchPopularProducts } from "../../Services/popular.service";
import Item from "../Item/Item";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Popular = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data_product, setDataProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchPopularProducts();
      setDataProduct(products);
      setLoading(false);
      setCurrentIndex(0);
    };

    loadProducts();
  }, []);

  const handlePrev = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) =>
      prev === 0 ? data_product.length - 1 : prev - 1,
    );
  };

  const handleNext = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) =>
      prev === data_product.length - 1 ? 0 : prev + 1,
    );
  };

  const currentItem = data_product[currentIndex];

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      {loading ? (
        <LoadingSpinner />
      ) : data_product.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <>
          {/* Desktop / tablet grid */}
          <div className="popular-item popular-grid">
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

          {/* Mobile carousel */}
          <div className="popular-carousel-mobile">
            <div className="arrow-left">
              <button
                type="button"
                className="popular-arrow"
                onClick={handlePrev}
              >
                &#10094;
              </button>
            </div>

            <div className="popular-item-single">
              {currentItem && (
                <Item
                  id={currentItem.id}
                  name={currentItem.name}
                  image={currentItem.image}
                  newPrice={currentItem.new_price}
                  oldPrice={currentItem.old_price}
                  product={currentItem}
                />
              )}
            </div>
            <div className="arrow-right">
              <button
                type="button"
                className="popular-arrow"
                onClick={handleNext}
              >
                &#10095;
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Popular;
