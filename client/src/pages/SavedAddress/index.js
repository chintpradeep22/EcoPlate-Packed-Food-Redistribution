import React, { useState } from "react";
import "./SavedAddress.css";
import { FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";

const SavedAddress = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", address: " A-135, Akurli Indl Est, Akurli Rd, Kandivali (east),  Mumbai, India", isPrimary: true },
    { id: 2, label: "Work", address: "42,6 A Main, Jc Nagar, 60 Feet Road, Bommanahalli,  Bangalore, India", isPrimary: false },
  ]);

  const handleDelete = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handlePrimary = (id) => {
    setAddresses(addresses.map(addr =>
      ({ ...addr, isPrimary: addr.id === id })
    ));
  };

  return (
    <div className="saved-address-container">
      <div className="saved-address-header">
        <h3>Saved Addresses</h3>
        <button className="add-btn"><FaPlusCircle /> Add New Address</button>
      </div>
      {addresses.length === 0 ? (
        <p className="empty-text">No saved addresses yet.</p>
      ) : (
        <div className="address-list">
          {addresses.map((addr) => (
            <div key={addr.id} className="address-card">
              <div className="address-header">
                <span className="address-label">
                  {addr.label} {addr.isPrimary && <span className="primary-badge">Primary</span>}
                </span>
                <div className="address-actions">
                  {!addr.isPrimary && (
                    <button onClick={() => handlePrimary(addr.id)} className="make-primary">Make Primary</button>
                  )}
                  <FaEdit className="icon" />
                  <FaTrash className="icon" onClick={() => handleDelete(addr.id)} />
                </div>
              </div>
              <p>{addr.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedAddress;
