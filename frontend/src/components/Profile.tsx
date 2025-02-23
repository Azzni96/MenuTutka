import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Add this line

const Profile = () => {
  const [profileData, setProfileData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          setMessage(error.response?.data.error || "An error occurred");
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div>
        <h1>Profile</h1>
        {message && <p>{message}</p>}
        <p>Name: {profileData.name}</p>
        <p>Email: {profileData.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Profile;
