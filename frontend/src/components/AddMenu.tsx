import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  description: string;
  price: string;
  image: File | null;
  restaurantId: string;
}

const AddMenu = () => {
  const { restaurantId } = useParams();
  const [formData, setFormData] = useState<FormData>({ name: "", description: "", price: "", image: null, restaurantId: restaurantId || "" });
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

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

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(`/api/menus/${restaurantId}/menu`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      });
      setMessage(response.data.message);
      navigate(`/restaurants/${restaurantId}/menus`); // Ensure this line redirects to the correct page
    } catch (error: any) {
      setMessage(error.response?.data.error || "An error occurred");
    }
  };

  if (!isAdmin) {
    return  // Provide feedback if the user is not an admin
  }

  return (
    <div>
      <h1>Add Menu</h1>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="restaurantId" value={restaurantId} />
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} />
        <input type="text" name="price" placeholder="Price" onChange={handleChange} />
        <input type="file" name="image" onChange={handleChange} />
        <button type="submit">Add Menu</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddMenu;
