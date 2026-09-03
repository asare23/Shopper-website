import "./App.css";
import Navbar from "./Components/Navbar/Navbar";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Login from "./Pages/Login";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/menbanner.png";
import women_banner from "./Components/Assets/womenbanner.png";
import kids_banner from "./Components/Assets/kidbanner.png";

function AppContent() {
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();
  const isLoginPage =
    pathname === "/login" ||
    pathname === "/login-page" ||
    pathname === "/login-signup";

  return (
    <div>
      {!isLoginPage && <Navbar />}
      <div className="app">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/mens"
            element={<ShopCategory banner={men_banner} category="men" />}
          />
          <Route
            path="/womens"
            element={<ShopCategory banner={women_banner} category="women" />}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={kids_banner} category="kids" />}
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/Cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/Login" element={<LoginSignup />} />
          <Route path="/login-page" element={<Login />} />
          <Route path="/login-signup" element={<LoginSignup />} />
        </Routes>
      </div>
      {!isLoginPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
