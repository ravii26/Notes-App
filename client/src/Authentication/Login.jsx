import React from "react";
import "assets/authstyle.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/logo.svg";

function Login() {
  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({ ...logindata, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/auth";
      const response = await axios.post(url, logindata);
      localStorage.setItem("token", response.data.data);
      navigate("/notes");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="branding">
          <img src={Logo} alt="Company Logo" className="logo" />
          <h1 className="company-name">SilverXis</h1>
          <p className="slogan">Enhance Your Web Services With Us</p>
        </div>
      </div>
      <div className="forms">
        <div className="form login">
          <span className="title">Login</span>
          <form onSubmit={handleLogin}>
            <div className="input-field">
              <input
                type="email"
                placeholder="Enter your mail"
                name="email"
                value={logindata.email}
                onChange={handleLoginChange}
                required
              />
              <i className="uil uil-envelope icon" />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={logindata.password}
                onChange={handleLoginChange}
                className="password"
                required
              />
              <i className="uil uil-lock icon" />
              {/* <i class="uil uil-eye-slash showHidePw"></i> */}
            </div>
            <div className="checkbox-text">
              <a href="/forgot-password" className="text">
                Forgot password?
              </a>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="input-field button">
              <input type="submit" value="Login" />
            </div>
          </form>
          <div className="login-signup">
            <span className="text">
              Don't have an account?
              <a href="/signup" className="text signup-link">
                Signup Now
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
