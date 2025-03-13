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
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-black">Add Menu</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="restaurantId" value={restaurantId} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg text-black" />
          <input type="text" name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg text-black" />
          <input type="text" name="price" placeholder="Price" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg text-black" />
          <input type="file" name="image" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg text-black" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-800">Add Menu</button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default AddMenu;
