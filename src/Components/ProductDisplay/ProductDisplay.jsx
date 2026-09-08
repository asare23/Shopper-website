import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductDisplay.css";
import star_icon from "../Assets/star.png";
import star_dull_icon from "../Assets/stardull.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const oldPrice = product.old_price ?? product.oldPrice ?? product.price_old;
  const newPrice = product.new_price ?? product.newPrice ?? product.price;

  const formatPrice = (price) =>
    price === null || price === undefined || price === ""
      ? "Price unavailable"
      : `$ ${Number(price).toLocaleString()}`;

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-price-old">
            {formatPrice(oldPrice)}
          </div>
          <div className="productdisplay-price-new">
            {formatPrice(newPrice)}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Turn heads with this effortlessly chic Elegant Floral Midi Dress,
          perfect for any occasion from brunch dates to evening strolls. Crafted
          from a soft, breathable fabric blend, this dress features a flattering
          A-line silhouette that cinches at the waist for a timeless feminine
          shape.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-size-options">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button
          onClick={() => {
            addToCart(product.id, product);
            navigate("/cart");
          }}
        >
          ADD TO CART
        </button>
        <p className="productdisplay-righticategory">
          <span>Category: </span>Women, T-Shirt, Crop Top
        </p>
        <p className="productdisplay-righticategory">
          <span>Tags: </span>Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
