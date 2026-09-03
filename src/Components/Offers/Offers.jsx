import React from "react";
import "./Offers.css";
import exclusive_img from "../Assets/ex_img.png";

const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <div className="offers-text">
          <h1>Exclusive Offers For You</h1>
          {/* <h1></h1> */}
          <p>ONLY ON BEST SELLERS PRODUCT</p>
        </div>
        <div className="btn-cont">
          <button className="btn">Check Now</button>
        </div>
      </div>
      <div className="offers-right">
        <img src={exclusive_img} alt="" />
      </div>
    </div>
  );
};

export default Offers;
