import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Header() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    const deviceId = localStorage.getItem("deviceId");
    try {
      await axios.post("http://localhost:5000/api/logout", {
        deviceId,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("deviceId");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const [imagePreview, setImagePreview] = useState("images/user.png");
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(`http://localhost:5000/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { profileImage } = data.user;
        if (profileImage) {
          setImagePreview(`data:image/png;base64,${profileImage}`);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <nav
      className="navbar navbar-custom navbar-expand-lg text-white shadow-md px-3"
      style={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <div className="container-fluid">
        <a href="/notes" style={{ textDecoration: "none" }}>
          <h1 className="navbar-brand navbar-brand-custom text-white mb-0">
            <i className="bx bx-notepad"></i>Notes
          </h1>
        </a>
        <div className="d-flex align-items-center">
          <div className="user-icon">
            <a href="/profile" style={{ textDecoration: "none" }}>
              {/* <img src="images/navuser.jfif" alt="User" className="user-img" /> */}
              {imagePreview && (
                <img
                  src={imagePreview || "images/user.png"}
                  alt="Profile"
                  className="user-img"
                />
              )}
            </a>
          </div>

          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
