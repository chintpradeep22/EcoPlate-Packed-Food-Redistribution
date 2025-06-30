import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";


const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-left">
          <img src="https://res.cloudinary.com/de3tdd3db/image/upload/v1751283340/logo_bpbvxp.png" alt="EcoPlate Logo" className="footer-logo" />
          <p className="footer-description">
            EcoPlate is committed to reducing food waste by collecting near-expiry packed food from stores and offering it at affordable prices. Eat smart, save more, and help the planet.
          </p>
          <div className="footer-social">
            <p><FaFacebook /></p>
            <p><FaTwitter /></p>
            <p><FaLinkedin /></p>
          </div>
        </div>

        <div className="footer-middle">
          <h3>EcoPlate</h3>
          <ul>
            <li onClick={() => handleLinkClick("/")}>Home</li>
            <li onClick={() => handleLinkClick("/how-it-works")}>How It Works</li>
            <li onClick={() => handleLinkClick("/contact")}>About Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-right">
          <h3>Get in Touch</h3>
          <ul>
            <li>📞 +91-98765-43210</li>
            <li>📧 support@ecoplate.com</li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-bottom">
        © 2025 <strong>EcoPlate</strong> — All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
