import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingBag,
  FaQuestionCircle,
  FaMoneyCheckAlt,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaUsers,
  FaBoxOpen,
  FaList,
} from "react-icons/fa";
import { HiSquaresPlus } from "react-icons/hi2";
import MyOrders from "../../pages/MyOrders";
import HelpSupport from "../../pages/HelpSupport";
import Refunds from "../../pages/Refunds";
import SavedAddress from "../../pages/SavedAddress";
import Users from "../../admin/AllUsersList";
import Add from "../../admin/AddProduct";
import List from "../../admin/ProductsList";
import Orders from "../../admin/UsersOrdersList";

const Profile = () => {
  const { setToken, admin } = useContext(StoreContext);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;

    if (isDesktop) {
      setActiveSection("Your Orders");
    } else {
      setActiveSection(""); // start empty on mobile
      setIsMobileView(false);
    }
  }, []);


  const logout = () => {
    localStorage.clear()
    setToken("");
    navigate("/");
    window.location.reload();
    toast.success("Logout Successfully");
  };

  const options = admin
    ? [
      { icon: <FaShoppingBag />, label: "Your Orders" },
      { icon: <FaBoxOpen />, label: "All Orders List" },
      { icon: <FaUsers />, label: "Users List" },
      { icon: <FaList />, label: "Products List" },
      { icon: <HiSquaresPlus />, label: "Add Product" },
      { icon: <FaQuestionCircle />, label: "Help & Support" },
      { icon: <FaMoneyCheckAlt />, label: "Refunds" },
      { icon: <FaMapMarkerAlt />, label: "Saved Address" },
      { icon: <FaSignOutAlt />, label: "Logout", action: logout },
    ]
    : [
      { icon: <FaShoppingBag />, label: "Your Orders" },
      { icon: <FaQuestionCircle />, label: "Help & Support" },
      { icon: <FaMoneyCheckAlt />, label: "Refunds" },
      { icon: <FaMapMarkerAlt />, label: "Saved Address" },
      { icon: <FaSignOutAlt />, label: "Logout", action: logout },
    ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case "Your Orders":
        return <MyOrders />;
      case "Help & Support":
        return <HelpSupport />;
      case "Refunds":
        return <Refunds />;
      case "Saved Address":
        return <SavedAddress />;
      case "All Orders List":
        return <Orders />;
      case "Users List":
        return <Users />;
      case "Products List":
        return <List />;
      case "Add Product":
        return <Add />;
      default:
        return null;
    }
  };

  const handleOptionClick = (item) => {
    if (item.label === "Logout") {
      item.action();
    } else {
      setActiveSection(item.label);
      if (window.innerWidth < 768) {
        setIsMobileView(true);
      }
    }
  };

  const handleBack = () => {
    setIsMobileView(false);
    setActiveSection("");
  };

  return (
    <div className="profile-page-container">
      {/* Sidebar for desktop or mobile menu */}
      {!isMobileView && (
        <div className="profile-sidebar">
          <h2 className="profile-title">Account</h2>
          <div className="profile-options">
            {options.map((item, i) => (
              <div
                key={i}
                className={`profile-option ${activeSection === item.label ? "active" : ""}`}
                onClick={() => handleOptionClick(item)}
              >
                <span className="profile-icon">{item.icon}</span>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section content */}
      <div className={`profile-section-details ${isMobileView ? "mobile-fullscreen" : ""}`}>
        {isMobileView && (
          <button className="mobile-back-btn" onClick={handleBack}>
            ← Back
          </button>
        )}
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default Profile;
