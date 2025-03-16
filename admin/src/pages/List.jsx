import React, { useEffect, useState } from "react";
import axios from "axios";

const List = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/food/getFoods`);
                setFoods(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load food items.", err);
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);

    if (loading) return <p className="text-center mt-10 text-lg text-gray-600">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-lg text-red-500">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Food List</h2>

            {foods.length === 0 ? (
                <p className="text-center text-gray-500">No food items available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {foods.map((food) => (
                        <div key={food._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src={food.image} alt={food.name} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-700">{food.name}</h3>
                                <p className="text-gray-600 mt-2">{food.description}</p>
                                <p className="mt-3 text-green-500 font-bold">₹{food.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default List;
