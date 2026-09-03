import React from "react";
import "./Hero.css";
import hero_image from "../Assets/girlhero.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <p className="hero-eyebrow">THE NEW SEASON / 2026</p>
        <h1>
          Style that
          <br />
          <em>moves</em> with you.
        </h1>
        <div>
          <div className="hero-hand-icon">
            <p>Curated looks</p>
          </div>
          <p>for every version of you.</p>
        </div>
        <Link className="hero-latest-btn" to="/womens">
          Shop new arrivals <span>→</span>
        </Link>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
