import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const {
    setCartItems,
    getTotalCartAmount,
    token,
    cartItems,
    url,
  } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    const { totalAmountAfterDiscount } = getTotalCartAmount();
    const deliveryFee = totalAmountAfterDiscount === 0 ? 0 : 2;

    const orderItems = Object.values(cartItems)
    const orderData = {
      address: data,
      items: orderItems,
      amount: totalAmountAfterDiscount + deliveryFee,
    };

    try {
      const response = await fetch(`${url}/orders/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        setCartItems({});
        toast.success("Order Placed Successfully");
        navigate("/profile");
      } else {
        toast.error(result.message || "Error placing order");
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      navigate("/cart");
    } else if (getTotalCartAmount().totalAmountAfterDiscount === 0) {
      toast.error("Please add items to cart");
      navigate("/cart");
    }
  }, [token]);

  const { totalAmount, totalAmountAfterDiscount } = getTotalCartAmount();
  const deliveryFee = totalAmountAfterDiscount === 0 ? 0 : 2;

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" value={data.firstName} onChange={onChangeHandler} type="text" placeholder="First name" />
          <input required name="lastName" value={data.lastName} onChange={onChangeHandler} type="text" placeholder="Last name" />
        </div>
        <input required name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email Address" />
        <input required name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder="City" />
          <input required name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" value={data.zipcode} onChange={onChangeHandler} type="text" placeholder="Zip Code" />
          <input required name="country" value={data.country} onChange={onChangeHandler} type="text" placeholder="Country" />
        </div>
        <input required name="phone" value={data.phone} onChange={onChangeHandler} type="tel" placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p><s>₹{totalAmount}</s> <b>₹{totalAmountAfterDiscount}</b></p>
          </div>

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{deliveryFee}</p>
          </div>
          <hr />

          <div className="cart-total-details">
            <b>Total Payable</b>
            <b>₹{(totalAmountAfterDiscount + deliveryFee).toFixed(2)}</b>
          </div>

          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
