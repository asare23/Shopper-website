import React from "react";
import "./Breadcrum.css";
import { getStorageImageUrl } from "../../Services/productImages";

const arrow_icon = getStorageImageUrl("chevron.png");

const Breadcrum = (props) => {
  const { product } = props;
  return (
    <div className="breadcrum">
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" />{" "}
      {product.category} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  );
};

export default Breadcrum;
