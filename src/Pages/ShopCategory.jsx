import React, { useState, useEffect } from "react";
import "./CSS/ShopCategory.css";
import dropdown_icon from "../Components/Assets/down1.png";
import Item from "../Components/Item/Item";
import { fetchProductsByCategory } from "../Services/products.service";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";

const ShopCategory = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProductsByCategory(props.category);
      setProducts(data);
      setLoading(false);
    };

    loadProducts();
  }, [props.category]);

  if (loading) {
    return (
      <div className="shop-category">
        <div className="cat">
          <div className="cat-left">
            <h1>FLAT 50% OFF</h1>
            <p>
              <span>12 </span>
              hours
              <span> 20 </span>
              Mins
            </p>
            <button>Explore now</button>
          </div>
          <div className="cat-right">
            <img src={props.banner} alt="" />
          </div>
        </div>
        <div className="shopcategory-indexSort">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="shop-category">
      <div className="cat">
        <div className="cat-left">
          <h1>FLAT 50% OFF</h1>
          <p>
            <span>12 </span>
            hours
            <span> 20 </span>
            Mins
          </p>
          <button>Explore now</button>
        </div>
        <div className="cat-right">
          <img src={props.banner} alt="" />
        </div>
      </div>

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{products.length}</span> out of {products.length}{" "}
          products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="drop" />
        </div>
      </div>
      <div className="shopcategory-products">
        {products.map((item, i) => (
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
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
