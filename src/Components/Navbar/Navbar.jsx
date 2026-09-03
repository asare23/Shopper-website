import { React, useContext, useState, useEffect } from "react";
import "./Navbar.css";
import cart from "../Assets/shopping-cart.png";
import shopping from "../Assets/shopping.png";
import menus from "../Assets/menu.png";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems, user, firstName, logout } =
    useContext(ShopContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const closeMenu = () => {
    setMobileMenu(false);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      closeMenu();
      await logout();
      // Use navigate with replace to ensure proper navigation
      navigate("/login", { replace: true });
    } catch (err) {
      console.warn("Logout error", err.message);
    }
  };
  return (
    <>
      <div className="announcement">
        Free shipping on all orders over $100 <span>|</span> Easy 30-day returns
      </div>
      <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="nav-logo">
            <img src={shopping} alt="" />
            <h2>SHOPPER</h2>
          </div>
        </Link>
        <ul className={`nav-menu ${mobileMenu ? "active" : ""}`}>
          <li
            onClick={() => {
              setMenu("shop");
              closeMenu();
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/">
              Shop
            </Link>
            {menu === "shop" ? <hr /> : <></>}{" "}
          </li>
          <li
            onClick={() => {
              setMenu("mens");
              closeMenu();
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/mens">
              Men
            </Link>
            {menu === "mens" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("womens");
              closeMenu();
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/womens">
              Women
            </Link>
            {menu === "womens" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("kids");
              closeMenu();
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/kids">
              Kids
            </Link>
            {menu === "kids" ? <hr /> : <></>}
          </li>
          <div className="nav-login-cart-mobile">
            {user ? (
              <span
                className="welcome-mobile"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                Welcome, {firstName}
              </span>
            ) : (
              <Link to="/login" onClick={closeMenu}>
                <button className="btn">Login</button>
              </Link>
            )}
            <Link to="/cart" onClick={closeMenu}>
              <img src={cart} alt="" />
            </Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
            {user && (
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </ul>
        <div className="nav-login-cart">
          {user ? (
            <span
              className="welcome"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              Welcome, {firstName}
            </span>
          ) : (
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          )}
          <Link to="/cart">
            <img src={cart} alt="" />
          </Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
          {user && (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
        <img src={menus} alt="" className="menu-icon" onClick={toggleMenu} />
      </div>
    </>
  );
};

export default Navbar;
