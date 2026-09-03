import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  return (
    <div className="item">
      <Link
        className="item-link"
        to={`/product/${props.id}`}
        state={{ product: props.product }}
      >
        <img onClick={() => window.scrollTo(0, 0)} src={props.image} alt="" />
        <p>{props.name}</p>
        <div className="item-prices">
          <div className="item-price-new">${props.newPrice}</div>
          <div className="item-price-old">${props.oldPrice}</div>
        </div>
      </Link>
    </div>
  );
};

export default Item;
