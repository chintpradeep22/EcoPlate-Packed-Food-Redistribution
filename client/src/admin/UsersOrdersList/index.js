import React, { useState, useEffect, useContext } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const navigate = useNavigate();
    const { token, admin, url } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        try {
            const response = await fetch(`${url}/admin/orders/list`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.success) {
                setOrders(data.ordersList.reverse());
            } else {
                toast.error(data.message || "Failed to fetch orders.");
            }
        } catch (err) {
            toast.error("Network error while fetching orders.");
            console.error(err);
        }
    };

    const statusHandler = async (event, orderId) => {
        try {
            const response = await fetch(`${url}/orders/update-status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    orderId,
                    status: event.target.value,
                }),
            });

            const result = await response.json();
            if (result.success) {
                toast.success(result.message);
                fetchAllOrders();
            } else {
                toast.error(result.message || "Status update failed.");
            }
        } catch (err) {
            toast.error("Error updating status.");
            console.error(err);
        }
    };

    useEffect(() => {
        if (!token || !admin) {
            toast.error("Please login as Admin first!");
            navigate("/");
        } else {
            fetchAllOrders();
        }
    }, [token, admin]);

    return (
        <div className="orders-container">
            <h2>Customer Orders</h2>
            <div className="orders-list">
                {orders.map((order, index) => (
                    <div key={index} className="order-card">
                        <img src="https://cdn-icons-png.flaticon.com/512/4710/4710369.png" alt="Parcel Icon" className="parcel-icon" />
                        <div className="order-info">
                            <div className="order-items-list">
                                {order.items.map((item, i) => (
                                    <div className="order-item-detail" key={i}>
                                        <img src={item.imageUrl} className="order-item-img" alt={item.productName} />
                                        <div>
                                            <p className="item-name">{item.productName}</p>
                                            <p className="item-qty">Qty: {item.productQuantity}</p>
                                            <p className="item-qty">Pack: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="order-name">
                                {order.address.firstName} {order.address.lastName}
                            </p>
                            <div className="order-address">
                                <p>{order.address.street},</p>
                                <p>
                                    {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
                                </p>
                            </div>
                            <p className="order-phone">📞 {order.address.phone}</p>
                        </div>
                        <div className="order-status">
                            <p><strong>Items:</strong> {order.items.length}</p>
                            <p><strong>Amount:</strong> ₹{order.amount}</p>
                            <select
                                onChange={(e) => statusHandler(e, order._id)}
                                value={order.status}
                            >
                                <option value="Food Processing">Food Processing</option>
                                <option value="Out for delivery">Out for delivery</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
