import React from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import { Link } from "react-router-dom";

const Shop = () => {
  return (
    <div className="shop-page">
      <Hero />
      <section className="brand-strip">
        <span className="section-kicker">TOP BRANDS</span>
        <strong>SOLEX</strong>
        <strong>NIKE</strong>
        <strong>ADIDAS</strong>
        <strong>PUMA</strong>
        <strong>NEW BALANCE</strong>
        <strong>VANS</strong>
        <Link to="/mens">View all</Link>
      </section>
      <section className="category-strip">
        <div className="section-heading">
          <span>SHOP BY CATEGORY</span>
          <Link to="/mens">Explore all</Link>
        </div>
        <div className="category-grid">
          <Link to="/mens">
            <img
              src={require("../Components/Assets/men1.jpg")}
              alt="Men's collection"
            />
            <span>Men</span>
          </Link>
          <Link to="/womens">
            <img
              src={require("../Components/Assets/wo1.jpg")}
              alt="Women's collection"
            />
            <span>Women</span>
          </Link>
          <Link to="/kids">
            <img
              src={require("../Components/Assets/kid1.jpg")}
              alt="Kids collection"
            />
            <span>Kids</span>
          </Link>
          <Link to="/womens">
            <img
              src={require("../Components/Assets/col1.webp")}
              alt="New arrivals"
            />
            <span>New arrivals</span>
          </Link>
        </div>
      </section>
      <Popular />
      <Offers />
      <NewCollections />
      <section className="service-strip">
        <div>
          <b>Free Shipping</b>
          <span>On orders over $100</span>
        </div>
        <div>
          <b>30-Day Returns</b>
          <span>Hassle-free returns</span>
        </div>
        <div>
          <b>100% Authentic</b>
          <span>Genuine branded products</span>
        </div>
        <div>
          <b>Secure Payments</b>
          <span>Safe and encrypted checkout</span>
        </div>
      </section>
      <NewsLetter />
    </div>
  );
};

export default Shop;
