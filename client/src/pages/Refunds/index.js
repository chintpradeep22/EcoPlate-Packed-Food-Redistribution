import React from "react";
import "./Refunds.css";
import { FaMoneyBillWave, FaClock, FaCheckCircle } from "react-icons/fa";

const Refunds = () => {
  // Dummy refund data
  const refundRequests = [
    {
      id: "R123456",
      product: "Organic Almond Butter",
      amount: "₹299",
      status: "Processing",
      requestedAt: "2025-04-20",
    },
    {
      id: "R123457",
      product: "Whole Wheat Bread",
      amount: "₹99",
      status: "Completed",
      requestedAt: "2025-04-10",
    },
  ];

  return (
    <div className="refunds-container">
      <h2 className="refunds-title">Your Refund Requests</h2>
      {refundRequests.length === 0 ? (
        <p className="no-refunds">You have no refund requests at the moment.</p>
      ) : (
        refundRequests.map((refund) => (
          <div key={refund.id} className="refund-card">
            <div className="refund-header">
              <FaMoneyBillWave className="refund-icon" />
              <div>
                <h4>{refund.product}</h4>
                <p>ID: {refund.id}</p>
              </div>
            </div>
            <div className="refund-details">
              <span><strong>Amount:</strong> {refund.amount}</span>
              <span><strong>Requested:</strong> {refund.requestedAt}</span>
              <span className={`status ${refund.status.toLowerCase()}`}>
                {refund.status === "Processing" ? <FaClock /> : <FaCheckCircle />}
                {refund.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Refunds;
