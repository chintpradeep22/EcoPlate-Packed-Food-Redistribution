import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import TrackOrder from "../TrackOrder";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trackOrderData, setTrackOrderData] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${url}/orders/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setData(result.order.reverse());
      } else {
        console.error("Failed to fetch orders:", result.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const handleTrackOrder = (order) => {
    setTrackOrderData(order);
  };

  const handleBack = () => {
    setTrackOrderData(null);
  };

  return (
    <div className="my-orders">
      {!trackOrderData ? (
        <>
          <h2 className="orders-title">My Orders</h2>
          <div className="orders-container">
            {loading ? (
              <div className="loading-spinner">
                <FontAwesomeIcon icon={faSpinner} spin size="2x" />
              </div>
            ) : data.length === 0 ? (
              <p className="no-orders">You have no orders yet.</p>
            ) : (
              data.map((order, index) => (
                <div key={index} className="order-card">
                  <div className="order-header">
                    <img src="https://res.cloudinary.com/de3tdd3db/image/upload/v1751283338/parcel_icon_ghomvy.png" alt="Parcel Icon" />
                    <span className="order-status">
                      <span className={`status-dot ${order.status.toLowerCase()}`}></span>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-body">
                    <div className="order-items-list">
                      {order.items.map((item, i) => (
                        <div key={i} className="order-item">
                          <img src={item.imageUrl} alt={item.productName} />
                          <div className="item-details">
                            <p className="item-name">{item.productName}</p>
                            <p className="item-qty">Qty: {item.productQuantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="order-amount">Total: ₹{order.amount}.00</p>
                    <p className="order-count">Items: {order.items.length}</p>
                  </div>
                  <button className="track-button" onClick={() => handleTrackOrder(order)}>
                    Track Order
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <TrackOrder orderDetails={trackOrderData} handleBack={handleBack} />
      )}
    </div>
  );
};

export default MyOrders;
