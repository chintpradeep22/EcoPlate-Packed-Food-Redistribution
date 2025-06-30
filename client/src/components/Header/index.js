import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/categories");
  };

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Save Food, Save Money, Save the Planet</h2>
        <p>
          Discover quality packed food nearing expiry at unbeatable prices.
          At EcoPlate, we collect surplus items from trusted stores and bring them
          to you fresh, safe, and affordable—reducing food waste and promoting sustainability.
        </p>
        <button onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
};

export default Header;
