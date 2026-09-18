import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./CartItems.css";
import remove_icon from "../Assets/remove.png";

const CartItems = () => {
  const {
    all_product,
    cartProducts,
    cartItems,
    cartSizes,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(ShopContext);
  const products = [...all_product, ...Object.values(cartProducts)];
  return (
    <div className="cartitems">
      <div className="cart-main">
        <div className="cartitems-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
          <p>Size</p>
        </div>
        {/* <hr/> */}
        {products
          .filter(
            (product, index, items) =>
              items.findIndex((item) => item.id === product.id) === index,
          )
          .map((e) => {
            if (cartItems[e.id] > 0) {
              return (
                <div>
                  <div className="cartitems-format cartitems-format-main">
                    <img
                      className="carticon-product-icon"
                      src={e.image}
                      alt=""
                    />
                    <p>{e.name}</p>
                    <p>${e.new_price}</p>
                    <div className="cartitems-quantity-control">
                      <button
                        type="button"
                        className="cartitems-quantity-button"
                        onClick={() => removeFromCart(e.id)}
                        aria-label={`Decrease quantity of ${e.name}`}
                      >
                        -
                      </button>
                      <span className="cartitems-quantity-value">
                        {cartItems[e.id]}
                      </span>
                      <button
                        type="button"
                        className="cartitems-quantity-button"
                        onClick={() =>
                          addToCart(e.id, e, cartSizes[e.id] || "")
                        }
                        aria-label={`Increase quantity of ${e.name}`}
                      >
                        +
                      </button>
                    </div>
                    <p>${e.new_price * cartItems[e.id]} </p>
                    <img
                      className="cartitems-remove-icon"
                      src={remove_icon}
                      onClick={() => {
                        removeFromCart(e.id);
                      }}
                      alt=""
                    />
                    <p className="cartitems-size">{cartSizes[e.id] || "-"}</p>
                  </div>
                  {/* <hr/> */}
                </div>
              );
            }
            return null;
          })}
      </div>
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Enter Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
