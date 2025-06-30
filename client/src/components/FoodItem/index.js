import React, { useContext } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = (props) => {
  const { productDetails } = props;
  const {
    productId,
    productName,
    brand,
    price,
    discountPrice,
    imageUrl,
    quantity,
    category,
    mfgDate,
    expDate,
  } = productDetails;

  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={imageUrl} alt={productName} className="food-item-image" />
        {!cartItems[productId] ? (
          <img
            className="add"
            onClick={() => addToCart(productId)}
            src="https://res.cloudinary.com/de3tdd3db/image/upload/v1751283336/add_icon_white_oxfkfu.png"
            alt="Add to cart"
          />
        ) : (
          <div className="food-item-counter">
            <img onClick={() => removeFromCart(productId)} src="https://res.cloudinary.com/de3tdd3db/image/upload/v1751283336/remove_icon_red_kl7e3b.png" alt="Remove" />
            <p>{cartItems[productId].productQuantity}</p>
            <img onClick={() => addToCart(productId)} src="https://res.cloudinary.com/de3tdd3db/image/upload/v1751283336/add_icon_green_jbavik.png" alt="Add" />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p className="product-name">{productName}</p>
          <img src="https://res.cloudinary.com/de3tdd3db/image/upload/v1751283338/rating_starts_akdgzr.png" alt="Rating" />
        </div>
        <p className="product-brand">Brand: {brand}</p>
        <p className="product-quantity">Quantity: {quantity}</p>
        <p className="product-category">Category: {category}</p>
        <p className="product-mfg">MFG: {formatDate(mfgDate)}</p>
        <p className="product-exp">EXP: {formatDate(expDate)}</p>
        <p className="product-price">
          <s>₹{price}</s> <b>₹{discountPrice}</b>
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
