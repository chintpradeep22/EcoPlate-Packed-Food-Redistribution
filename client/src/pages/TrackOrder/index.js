import React, { useContext } from "react";
import "./TrackOrder.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const TrackOrder = ({ orderDetails, handleBack }) => {
  const { status } = orderDetails
  const { url, token } = useContext(StoreContext)

  const onClickCancelOrder = async () => {
    try {
      const { _id } = orderDetails

      const response = await fetch(`${url}/orders/cancel/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message)
        console.error("Failed to fetch orders:", result.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  if (!orderDetails) return <p>Loading order...</p>;

  return (
    <div className="track-order-view">
      <div className="track-header">
        <button className="back-button" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <h2>Tracking Order</h2>
      </div>

      <div className="tracking-progress">
        <h3>Delivery Progress</h3>
        <div className="progress-bar">
          <div className={`progress-step ${status === "Food Processing" ? "active" : ""}`}>1</div>
          <div className={`progress-step ${status === "Out for Delivery" ? "active" : ""}`}>2</div>
          <div className={`progress-step ${status === "Delivered" ? "active" : ""}`}>3</div>
        </div>
        <div className="progress-labels">
          <span>Preparing</span>
          <span>Out for Delivery</span>
          <span>Delivered</span>
        </div>
      </div>

      <div className="track-order-details">
        <h3>Order Details</h3>
        <p><strong>Total:</strong> ₹{orderDetails.amount}.00</p>
        <p><strong>Status:</strong> {orderDetails.status}</p>

        <h4>Items:</h4>
        {orderDetails.items.map((item, i) => (
          <div key={i} className="track-item">
            <img src={item.imageUrl} alt={item.productName} />
            <div>
              <p>{item.productName}</p>
              <p>Qty: {item.productQuantity}</p>
              <p>Pack: {item.quantity}</p>
            </div>
          </div>
        ))}

        <h4>Delivery Address:</h4>
        <p>{orderDetails.address.firstName} {orderDetails.address.lastName}</p>
        <p>{orderDetails.address.street}, {orderDetails.address.city}</p>
        <p>{orderDetails.address.state} - {orderDetails.address.zipcode}</p>
        <p>{orderDetails.address.country}</p>
        <p><strong>Phone:</strong> {orderDetails.address.phone}</p>
        <p><strong>Email:</strong> {orderDetails.address.email}</p>
      </div>
      {status !== "Cancelled" ? <button className="cancel-button" onClick={onClickCancelOrder}>
        Cancel Order
      </button> : null}
    </div>
  );
};

export default TrackOrder;
