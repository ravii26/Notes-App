import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";

function SignUp() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/v1/register";
      const response = await axios.post(url, data);
      console.log(response.data);
      navigate("/notes");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message, {
          position: "bottom-left",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <div className="body-auth">
      <div className="container container-auth">
        <div className="left-panel">
          <div className="branding">
            <img src={Logo} alt="Company Logo" className="logo" />
            <h1 className="company-name">SilverXis</h1>
            <p className="slogan">Enhance Your Web Services With Us</p>
          </div>
        </div>
        <div className="forms">
          <div className="form form-auth signup">
            <span className="title">Signup</span>
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Enter firstname"
                  name="firstName"
                  value={data.firstName}
                  onChange={handleChange}
                  required
                />
                <i className="uil uil-user icon" />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Enter lastname"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleChange}
                  required
                />
                <i className="uil uil-user icon" />
              </div>
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
                <i className="uil uil-envelope icon" />
              </div>
              <div className="input-field">
                <input
                  type="password"
                  placeholder="Create a password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                />

                <i className="uil uil-lock icon" />
                {/* <i class="uil uil-eye-slash showHidePw"></i> */}
              </div>

              <div className="input-field button">
                <input type="submit" value="Signup" />
              </div>
            </form>
            <div className="login-signup">
              <span className="text">
                Already have an account?
                <a href="/" className="text login-link">
                  Login Now
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        draggable
        theme="light"
      />
    </div>
  );
}

export default SignUp;
