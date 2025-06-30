import React, { useContext, useEffect, useState } from "react";
import "./MyProfile.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faPen,
  faSave,
  faUser,
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { token, url } = useContext(StoreContext);
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    mobile: "",
    address: "",
  });

  const fetchProfile = async () => {
    try {
      const res = await axios.post(
        `${url}/api/profile/get`,
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setProfileData(res.data.data);
        setEditData({
          username: res.data.data.username || "",
          email: res.data.data.email || "",
          mobile: res.data.data.mobile || "",
          address: res.data.data.address || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.post(
        `${url}/api/profile/update`,
        { ...editData },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        fetchProfile();
      } else {
        toast.error("Update failed!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  return (
    <div className="my-profile-page">
      <h2 className="profile-heading">My Profile</h2>
      {profileData ? (
        <div className="profile-info-card">
          {isEditing ? (
            <>
              <input
                type="text"
                name="username"
                value={editData.username}
                onChange={handleChange}
                placeholder="Enter Name"
              />
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
              <input
                type="text"
                name="mobile"
                value={editData.mobile}
                onChange={handleChange}
                placeholder="Enter Mobile"
              />
              <input
                type="text"
                name="address"
                value={editData.address}
                onChange={handleChange}
                placeholder="Enter Address"
              />
              <button onClick={handleUpdate}>
                <FontAwesomeIcon icon={faSave} /> Save
              </button>
            </>
          ) : (
            <>
              <p>
                <label><FontAwesomeIcon icon={faUser} /> <strong>Name:</strong></label> {profileData.username}
              </p>
              <p>
                <label><FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong></label> {profileData.email}
              </p>
              <p>
                <label><FontAwesomeIcon icon={faPhone} /> <strong>Mobile:</strong></label> {profileData.mobile}
              </p>
              <p>
                <label><FontAwesomeIcon icon={faLocationDot} /> <strong>Address:</strong></label> {profileData.address}
              </p>
              <button onClick={() => setIsEditing(true)}>
                <FontAwesomeIcon icon={faPen} /> Edit
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="loading-spinner">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      )}
    </div>
  );
};

export default MyProfile;
