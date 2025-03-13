import React, { useState, useEffect } from "react";
import axios from "axios";

interface FormData {
  name: string;
  address: string;
  phone: string;
  image: File | null;
}

const AddRestaurant = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", address: "", phone: "", image: null });
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("User data:", user); // Debugging information
    if (user?.user_level === 'admin') {
      setIsAdmin(true);
    } else {
      console.log("User is not an admin");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key as keyof FormData] as string | Blob);
    });

    const token = localStorage.getItem("token"); // Get the token from localStorage

    try {
      const response = await axios.post("/api/restaurants/add", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}` // Include the token in the request headers
        }
      });
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data.error || "An error occurred");
    }
  };

  if (!isAdmin) {
    return <div className="text-center text-red-500">You are not authorized to add a restaurant.</div>; // Provide feedback if the user is not an admin
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold mb-6 text-black">Add Restaurant</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-lg text-black"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-lg text-black"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-lg text-black"
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-lg text-black"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-800">Add Restaurant</button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default AddRestaurant;
