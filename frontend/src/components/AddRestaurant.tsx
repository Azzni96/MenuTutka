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
      const response = await axios.post("http://localhost:3000/api/restaurants/add", formDataToSend, {
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
    return  // Provide feedback if the user is not an admin
  }

  return (
    <div>
      <h1>Add Restaurant</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
        <input type="file" name="image" onChange={handleChange} />
        <button type="submit">Add Restaurant</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddRestaurant;
