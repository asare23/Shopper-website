import React, { useContext, useState } from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import cartIcon from "../Assets/shopping-cart.png";

const Item = (props) => {
  const { addToCart } = useContext(ShopContext);
  const [liked, setLiked] = useState(false);
  const description =
    props.product?.description ||
    "Silk and linen blend polo shirt with stripes that fits slim";

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(props.id, props.product);
  };

  const handleLike = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setLiked((previous) => !previous);
  };

  return (
    <div className="item">
      <Link
        className="item-link"
        to={`/product/${props.id}`}
        state={{ product: props.product }}
      >
        <img
          className="item-image"
          onClick={() => window.scrollTo(0, 0)}
          src={props.image}
          alt={props.name}
        />
        <div className="item-content">
          <h2>{props.name}</h2>
          <p className="item-description">{description}</p>
          <div className="item-footer">
            <div className="item-prices">
              <div className="item-price-new">
                $ {Number(props.newPrice || 0).toLocaleString()}
              </div>
              {props.oldPrice && (
                <div className="item-price-old">
                  $ {Number(props.oldPrice).toLocaleString()}
                </div>
              )}
            </div>
            <div className="item-actions">
              <button
                type="button"
                className={`item-action item-like ${liked ? "is-liked" : ""}`}
                onClick={handleLike}
                aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
              >
                {liked ? "♥" : "♡"}
              </button>
              <button
                type="button"
                className="item-action item-cart"
                onClick={handleAddToCart}
                aria-label="Add to cart"
              >
                <img src={cartIcon} alt="" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Item;
