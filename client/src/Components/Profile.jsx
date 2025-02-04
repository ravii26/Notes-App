import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "../assets/profile.png";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';


function Profile() {
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
  });

  const [imagePreview, setImagePreview] = useState(Image);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile({ ...profile, profileImage: file });
    setImagePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/get-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(data.user);
        if (data.user.profileImage) {
          setImagePreview(`data:image/png;base64,${data.user.profileImage}`);
        }
        dispatch(setUser(data.user));
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/v1/update-profile",
        profile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(data);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setError(err.response.data.message);
      console.error(err);
      alert("Error updating profile.");
    }
  };

  return (
    <div className="profile">
      <div className="container profileheading mb-0">
        <p>Profile</p>
      </div>
      <div className="container mt-4 p-5 shadow rounded bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row">
          <div className="d-flex align-items-center mb-3 mb-md-0">
            <label
              htmlFor="profileImage"
              style={{ cursor: isEditing ? "pointer" : "default" }}
            >
              <img
                src={imagePreview}
                alt="Profile"
                className="rounded-circle me-2"
                width={150}
                height={150}
                style={{
                  objectFit: "cover",
                  border: isEditing ? "2px solid #007bff" : "none", 
                }}
              />
            </label>
            {isEditing && (
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            )}
            <div>
              <h4>
                {profile.firstName} {profile.lastName || "Your Name"}
              </h4>
              <p className="text-muted small">{profile.email}</p>
            </div>
          </div>
          <button
            className="btn btn-primary btn-md"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={profile.firstName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={profile.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <h6 className="mt-3">My Email Address</h6>
          <div className="d-flex align-items-center mb-3">
            <input
              type="email"
              className="form-control"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          {isEditing && (
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-success btn-md">
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Profile;
