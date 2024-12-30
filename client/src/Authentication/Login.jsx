import React from "react";
import "assets/authstyle.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/logo.svg";
import { v4 as uuidv4 } from 'uuid';



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

  const generateDeviceId = () => {
    
    const getBrowserName = () => {
      const userAgent = navigator.userAgent;
  
      // Check for different browsers using regular expressions
      if (userAgent.includes("Chrome")) {
          if (userAgent.includes("Edg")) {
              return "Microsoft Edge";
          }
          return "Google Chrome";
      }
      if (userAgent.includes("Firefox")) {
          return "Mozilla Firefox";
      }
      if (userAgent.includes("Safari")) {
          if (userAgent.includes("Chrome")) {
              return "Google Chrome"; // Chrome also contains "Safari" in userAgent
          }
          return "Apple Safari";
      }
      if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
          return "Internet Explorer";
      }
      if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
          return "Opera";
      }
  
      return "Unknown Browser";  // Return if browser is not recognized
  };  

    let deviceId = localStorage.getItem('deviceId');
    logindata.browserName = getBrowserName();

    if (!deviceId) {
        deviceId = uuidv4();
        localStorage.setItem('deviceId', deviceId);
    }

    return deviceId;
}

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      logindata.deviceId = generateDeviceId();
      const url = "http://localhost:5000/api/auth";
      const response = await axios.post(url, logindata);
      localStorage.setItem("token", response.data.data);
      navigate("/notes");
    } catch (error) {
      if (error.response) {
        if (error.message === 'Device limit reached. Please remove an old device to proceed.') {
          setError('You have reached the maximum number of devices. Manage your devices to continue.');
      } else {
        setError(error.response.data.message);
      }
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
