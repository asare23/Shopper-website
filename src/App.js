import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';


function App() {
  return (
    <div>
      <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/mens" element={<ShopCategory category ="mens"/>} />
        <Route path="/womens" element={<ShopCategory category ="womens" />} />
        <Route path="/kids" element={<ShopCategory category ="kids"/>} />
        <Route path="/product" element={<Product/>} />
        <Route path="/product/:id" element={<Product/>} >
          <Route path="/:productId" element={<Product/>} />
        </Route>
        <Route path="/Cart" element={<Cart/>} />
        <Route path="/Login" element={<LoginSignup/>} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
