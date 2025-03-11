import React, { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import uploadFile from "../helper/uploadFile";

const Add = () => {
    const [foodData, setFoodData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
        uploading: false, // Track upload progress
    });

    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFoodData({ ...foodData, [name]: value });
    };

    const handleUploadPhoto = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setFoodData((prev) => ({ ...prev, uploading: true }));

        try {
            const data = await uploadFile(file);
            if (data.secure_url) {
                setFoodData((prev) => ({
                    ...prev,
                    image: data.secure_url,
                    uploading: false,
                }));
                toast.success("Image uploaded successfully!");
            }
        } catch {
            toast.error("Image upload failed");
            setFoodData((prev) => ({ ...prev, uploading: false }));
        }
    };

    const triggerFileUpload = () => fileInputRef.current.click();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:2000/api/food/addFood", foodData);
            if (response) toast.success("Food added successfully!");
        } catch {
            toast.error("Failed to add food");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-2xl rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Food</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-gray-600">Image</label>
                    <button
                        type="button"
                        onClick={triggerFileUpload}
                        className="w-full py-2 mt-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md shadow-md hover:scale-105 transform transition"
                    >
                        Upload Image
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleUploadPhoto}
                        className="hidden"
                    />
                    {foodData.uploading && <p className="text-blue-500 text-sm mt-2">Uploading...</p>}
                    {foodData.image && (
                        <img src={foodData.image} alt="Uploaded" className="mt-4 w-full h-40 object-cover rounded-lg" />
                    )}
                </div>
                <div>
                    <label className="block text-gray-600">Food Name</label>
                    <input
                        type="text"
                        name="name"
                        value={foodData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Description</label>
                    <textarea
                        name="description"
                        value={foodData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-600">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={foodData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={foodData.price}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-md shadow-md hover:scale-105 transform transition"
                >
                    Add Food
                </button>
            </form>
        </div>
    );
};

export default Add;
