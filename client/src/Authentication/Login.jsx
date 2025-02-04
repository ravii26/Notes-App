import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/logo.svg";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
// import { useAuth0 } from "@auth0/auth0-react";
import { useGoogleLogin } from "@react-oauth/google";

function Login() {
  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });

  // const { loginWithRedirect } = useAuth0();
  // const { logout } = useAuth0();
  // const { user } = useAuth0();

  const navigate = useNavigate();
  const [data, setData] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/notes");
    }
  }, [navigate, data]);

  const handleLoginChange = (e) => {
    setLoginData({ ...logindata, [e.target.name]: e.target.value });
  };

  const generateDeviceId = () => {
    const getBrowserName = () => {
      const userAgent = navigator.userAgent;

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
          return "Google Chrome";
        }
        return "Apple Safari";
      }
      if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
        return "Internet Explorer";
      }
      if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
        return "Opera";
      }

      return "Unknown Browser";
    };

    let deviceId = localStorage.getItem("deviceId");
    logindata.browserName = getBrowserName();

    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem("deviceId", deviceId);
    }

    return deviceId;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      logindata.deviceId = generateDeviceId();
      const url = "http://localhost:5000/api/v1/login";
      const response = await axios.post(url, logindata);
      localStorage.setItem("token", response.data.data);
      navigate("/notes");
    } catch (error) {
      if (error.response) {
        if (
          error.message ===
          "Device limit reached. Please remove an old device to proceed."
        ) {
          toast.error(
            "Device limit reached. Please remove an old device to proceed.",
            {
              position: "bottom-left",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        } else {
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
    }
  };
  const responseGoogle = async (authResult) => {
    const deviceId = generateDeviceId();
    try {
      if (authResult["code"]) {
        const response =await axios.post("http://localhost:5000/api/v1/googleauth", {
          code: authResult["code"],
          deviceId,
        });
        localStorage.setItem("token", response.data.data);
        navigate("/notes");
      }
    } catch (err) {
      console.error("Error while google authentication :", err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="body-auth">
      <div className="container container-auth">
        {/* {user && <button onClick={() => logout()}>Logout <>{user.name}</> <img src={user.picture} alt={user.name} /></button> } */}
        <div className="left-panel">
          <div className="branding">
            <img src={Logo} alt="Company Logo" className="logo" />
            <h1 className="company-name">Notes App</h1>
            <p className="slogan">Organize your Thoughts with us</p>
          </div>
        </div>
        <div className="forms">
          <div className="form form-auth login">
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
              <button
                className="login-with-google-btn w-100"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default behavior of the button
                  googleLogin(); // Trigger Google Login
                }}
              >
                <img
                  alt="Google"
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4="
                ></img>{" "}
                Login with Google
              </button>
              <div className="checkbox-text">
                <a href="/forgot-password" className="text">
                  Forgot password?
                </a>
              </div>
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

export default Login;
