import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
  });

  const [imagePreview, setImagePreview] = useState("images/user.png");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile({ ...profile, profileImage: file });
    console.log(URL.createObjectURL(file));
    setImagePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(`http://localhost:5000/api/v1/get-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { firstName, lastName, email, profileImage } = data.user;
          setProfile({ firstName, lastName, email, profileImage });
        if (profileImage) {
          setImagePreview(`data:image/png;base64,${profileImage}`);
        }
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
        `http://localhost:5000/api/v1/update-profile`,
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
    } catch (err) {
      setError(err.response.data.message);
      console.error(err);
      alert("Error updating profile.");
    }
  };
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          {/* Profile Picture */}
          <div className="col-md-4 text-center">
            <div className="profile-pic mb-4">
              {imagePreview && (
                <img
                  src={imagePreview || "images/user.png"}
                  alt="Profile"
                  className="rounded-circle"
                  width={150}
                  height={150}
                />
              )}
              <div className="file-upload-container">
                {/* Optional label for better UX */}
                <label htmlFor="file-upload" className="file-upload-label">
                  <i className="bx bx-upload" /> Choose File
                </label>
                <input
                  type="file"
                  id="file-upload"
                  className="file-upload-input"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
          {/* Details */}
          <div className="col-md-8">
            <div className="details-header">
              <span>Details</span>
            </div>
            <form>
              <div className="form-group form-group-custom mb-3">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control rounded-3"
                  placeholder="First Name"
                  value={profile.firstName}
                  onChange={handleChange}
                  contentEditable={true}
                />
                <i className="bx bx-pencil input-icon" />
              </div>
              <div className="form-group form-group-custom mb-3">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control rounded-3"
                  placeholder="Last Name"
                  value={profile.lastName}
                  onChange={handleChange}
                />
                <i className="bx bx-pencil input-icon" />
              </div>
              <div className="form-group form-group-custom mb-3">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control rounded-3"
                  placeholder="Email"
                  value={profile.email}
                  onChange={handleChange}
                />
                <i className="bx bx-pencil input-icon" />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
