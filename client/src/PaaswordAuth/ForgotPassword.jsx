import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/pwd.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/forgetPassword`, { email });
      localStorage.setItem("email", email)
      alert(response.data.message);
      navigate("/verify-otp");
    } catch (error) {
      console.log(error);
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  return (



      <div className="container">
  <div className="forms">
    <div className="form forgot-password">
      <span className="title">Forgot Password</span>
      <form action="#">
        <div className="input-field">
                <input type="email"
                  id="email"
      placeholder="Enter your email"
      value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />
          <i className="uil uil-envelope icon" />
            </div>
            {error && <div className="error-message">{error}</div>}
        <div className="input-field button">
          <input type="button" onClick={handleSubmit} defaultValue="Send OTP" />
        </div>
      </form>
    </div>
  </div>
</div>
  );
};

export default ForgotPasswordPage;
