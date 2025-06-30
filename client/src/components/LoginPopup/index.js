import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { RxCross1 } from "react-icons/rx";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    const isRegister = currentState !== "Login";
    console.log(isRegister)
    const apiUrl = isRegister ? `${url}/register/` : `${url}/login/`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        const token = result.jwtToken;
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("role", result.role)
        window.location.reload();
        toast.success(`${isRegister ? "Registered" : "Login"} Successfully`);
        setShowLogin(false);
      } else {
        toast.error(result.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <button type="button" onClick={() => setShowLogin(false)}><RxCross1 /></button>
        </div>

        <div className="login-popup-inputs">
          {currentState !== "Login" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your password"
            required
          />
        </div>

        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
