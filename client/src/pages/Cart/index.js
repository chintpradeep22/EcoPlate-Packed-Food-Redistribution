import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const {
    cartItems,
    deleteFromCart,
    loading,
    getTotalCartAmount,
  } = useContext(StoreContext);

  const { totalAmount, totalAmountAfterDiscount } = getTotalCartAmount()

  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <div className="loading-spinner">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      ) : <>
        {
          Object.values(cartItems).length !== 0 ?
            <div className="cart" >
              <div className="cart-items">
                <div className="cart-items-title">
                  <p>Items</p>
                  <p>Title</p>
                  <p>Price</p>
                  <p>Quantity</p>
                  <p>Total</p>
                  <p>Remove</p>
                </div>
                <br />
                <hr />
                {
                  Object.values(cartItems).map((item) => (
                    <div key={item.productId}>
                      <div className="cart-items-title cart-items-item">
                        <img src={item.imageUrl} alt={item.productName} />
                        <p>{item.productName}</p>
                        <p className="cart-item-price">
                          <s>₹{item.price}</s> <b>₹{item.discountPrice}</b>
                        </p>
                        <p>{item.productQuantity}</p>
                        <p>₹{item.discountPrice * item.productQuantity}</p>
                        <p onClick={() => deleteFromCart(item.productId)} className="cross">
                          <FontAwesomeIcon icon={faXmark} />
                        </p>
                      </div>
                      <hr />
                    </div>
                  ))
                }
              </div>

              <div className="cart-bottom">
                <div className="cart-total">
                  <h2>Cart Totals</h2>
                  <div>
                    <div className="cart-total-details">
                      <p>Subtotals</p>
                      <p><s>₹{totalAmount.toFixed(2)}</s> <b>₹{totalAmountAfterDiscount.toFixed(2)}</b></p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                      <p>Delivery Fee</p>
                      <p>₹{totalAmountAfterDiscount === 0 ? 0 : 2}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                      <b>Total</b>
                      <b>₹{totalAmountAfterDiscount === 0 ? 0 : (totalAmountAfterDiscount + 2).toFixed(2)}</b>
                    </div>
                  </div>
                  <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>

                <div className="cart-promocode">
                  <div>
                    <p>If you have a promocode, Enter it here</p>
                    <div className="cart-promocode-input">
                      <input type="text" placeholder="promo code" />
                      <button>Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div > :
            <div className="cart-empty-view-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                className="cart-empty-image"
                alt="cart empty"
              />
              <h1 className="cart-empty-heading">Your Cart Is Empty</h1>
              <button type="button" className="shop-now-btn" onClick={() => navigate("/categories")}>
                Shop Now
              </button>
            </div>
        }
      </>
      }
    </>
  );
};

export default Cart;
