import React, { useContext, useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const {
    token,
    searchQ,
    cartItems,
    setSearchQ,
    setProductsList,
    setPage,
    setHasMore,
  } = useContext(StoreContext);

  const cartCount = Object.values(cartItems).length;

  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQ(query);
    setProductsList([]);
    setPage(1);
    setHasMore(true);
  };

  const handleSearchClick = () => {
    if (!showSearch) {
      setShowSearch(true);
      navigate("/search");
    } else {
      navigate("/");
      setSearchQ("");
      setShowSearch(false);
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src="https://res.cloudinary.com/de3tdd3db/image/upload/v1751283340/logo_bpbvxp.png" alt="EcoPlate Logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          home
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => (isActive ? "active" : "")}>
          categories
        </NavLink>
        <NavLink to="/how-it-works" className={({ isActive }) => (isActive ? "active" : "")}>
          how it works
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
          contact us
        </NavLink>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search">
          <img
            src="https://cdn-icons-png.flaticon.com/512/954/954591.png"
            alt="Search"
            className="search-icon"
            onClick={handleSearchClick}
            style={{ cursor: "pointer" }}
          />
          {showSearch && (
            <input
              type="text"
              ref={searchInputRef}
              placeholder="Search food..."
              value={searchQ}
              onChange={handleSearchChange}
            />
          )}
        </div>

        <div className="navbar-search-icon cart-icon-wrapper">
          <NavLink to="/cart">
            <img src="https://cdn-icons-png.flaticon.com/512/4290/4290854.png" alt="Cart" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </NavLink>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile" onClick={() => navigate("/profile")}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
      </div>

      <div
        className="navbar-hamburger"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png"
          alt="menu"
        />
      </div>

      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)} // close menu on overlay click
        >
          <ul
            className="navbar-mobile-menu"
            onClick={(e) => e.stopPropagation()} // prevent clicks inside menu from closing
          >
            <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
              home
            </NavLink>
            <NavLink to="/categories" onClick={() => setIsMobileMenuOpen(false)}>
              categories
            </NavLink>
            <NavLink to="/how-it-works" onClick={() => setIsMobileMenuOpen(false)}>
              how it works
            </NavLink>
            <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              contact us
            </NavLink>
            {!token ? (
              <button
                onClick={() => {
                  setShowLogin(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                sign in
              </button>
            ) : (
              <div
                className="mobile-profile"
                onClick={() => {
                  navigate("/profile");
                  setIsMobileMenuOpen(false);
                }}
              >
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile" />
              </div>
            )}
          </ul>
        </div>
      )}

    </div >
  );
};

export default Navbar;
