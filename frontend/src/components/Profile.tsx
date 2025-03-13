import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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
        const response = await axios.get("/api/users/profile", {
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
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Profile</h1>
      {message && <p className="text-red-500 text-center mb-4">{message}</p>}
      <div className="grid grid-cols-1 gap-4 text-center">
        <p className="text-gray-700">Name: {profileData.name}</p>
        <p className="text-gray-700">Email: {profileData.email}</p>
      </div>
      <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg transition duration-300 ease-in-out hover:bg-blue-800 mx-auto block">
        Logout
      </button>
    </div>
  );
};

export default Profile;
