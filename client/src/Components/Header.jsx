import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Image from "../assets/profile.png";

function Header() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const result = window.confirm("Are you sure you want to logout?");
    if(result){
      const token = localStorage.getItem("token");
    const deviceId = localStorage.getItem("deviceId");
    try {
      await axios.post("http://localhost:5000/api/v1/logout-device", {
        deviceId,
       
      }, {
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
    }
  };

  const [imagePreview, setImagePreview] = useState(Image);
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(`http://localhost:5000/api/v1/get-profile`, {
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
    >
      <div className="container-fluid">
        <a href="/notes" style={{ textDecoration: "none" }}>
          <h1 className="navbar-brand navbar-brand-custom text-white mb-0">
            <i className="bx bx-notepad"></i>Notes
          </h1>
        </a>
        <div className="d-flex align-items-center">
          <div className="user-icon">
            <a href="/profile" className="text-decoration-none" style={{ textDecoration: "none" }}>
              {/* <img src="images/navuser.jfif" alt="User" className="user-img" /> */}
              {imagePreview && (
                <img
                  src={imagePreview || Image}
                  alt="Profile"
                  className="rounded-circle user-img"
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
