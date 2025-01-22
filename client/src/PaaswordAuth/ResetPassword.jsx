import React, { useState } from "react";
import axios from "axios";
// --
// import "assets/pwd.css";
import { useNavigate } from "react-router-dom";
const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("resetToken");
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/reset-password`,
        {
          newPassword,
          confirmPassword,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      if (response.status === 200) {
        localStorage.removeItem("resetToken");
      }
      
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="body-pwd">
       <div className="container container-pwd">
      <div className="forms-pwd">
        <div className="form form-pwd reset-password">
          <span className="title"> Reset Password </span>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="password"
                id="new-password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <i className="uil uil-lock icon" />
            </div>
            <div className="input-field">
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <i className="uil uil-lock icon" />
            </div>
            <div className="input-field button">
              <input type="submit" value="Reset Password" />
            </div>
          </form>
        </div>
      </div>
    </div>
   </div>
  );
};

export default ResetPasswordPage;
