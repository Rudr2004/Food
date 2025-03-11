import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { FaFilter } from "react-icons/fa";

const Home = () => {
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get("http://localhost:2000/api/food/getFoods");
                if (response.status === 200) {
                    const allFoods = response.data;
                    setFoods(allFoods);
                    setFilteredFoods(allFoods);

                    // Extract unique categories with a representative image
                    const categoryMap = {};
                    allFoods.forEach(food => {
                        if (!categoryMap[food.category]) {
                            categoryMap[food.category] = food.image;
                        }
                    });

                    setCategories(Object.entries(categoryMap));
                    setLoading(false);
                } else {
                    setError(`Failed to load food items: ${response.statusText}`);
                    setLoading(false);
                }
            } catch (err) {
                setError(`Failed to load food items: ${err.message}`);
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);

    const filterByCategory = (category) => {
        if (category === selectedCategory) {
            setFilteredFoods(foods);
            setSelectedCategory(null);
        } else {
            setFilteredFoods(foods.filter(food => food.category === category));
            setSelectedCategory(category);
        }
        setShowCategoryPopup(false);
    };

    if (loading) return <p className="text-center mt-10 text-lg text-gray-600">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-lg text-red-500">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto p-4 relative">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Delicious Food List</h2>

            {/* Display filtered foods */}
            {filteredFoods.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No food items available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {filteredFoods.map((food) => (
                        <div key={food._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300">
                            <img src={food.image} alt={food.name} className="w-full h-40 object-cover" />
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-gray-800">{food.name}</h3>
                                <p className="text-gray-600 mt-2">{food.description}</p>
                                <p className="mt-3 text-green-500 font-bold text-lg">₹{food.price}</p>
                                <button
                                    onClick={() => {
                                        addToCart(food);
                                        toast.success("Added to Cart!");
                                    }}
                                    className="mt-4 w-full cursor-pointer bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Floating Filter Button */}
            <button
                className="fixed bottom-6 right-6 cursor-pointer bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
                onClick={() => setShowCategoryPopup(!showCategoryPopup)}
            >
                <FaFilter size={24} />
            </button>

            {/* Category Popup (Displays when button is clicked) */}
            {showCategoryPopup && (
                <div className="fixed bottom-20 right-6 bg-white shadow-lg rounded-lg p-4 w-60">
                    <h3 className="text-lg font-bold text-gray-700 mb-2 text-center">Select Category</h3>
                    <div className="flex flex-col gap-3">
                        {categories.map(([category, image]) => (
                            <div
                                key={category}
                                className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition"
                                onClick={() => filterByCategory(category)}
                            >
                                <img
                                    src={image}
                                    alt={category}
                                    className={`w-10 h-10 object-cover rounded-full transition-all duration-300 ${selectedCategory === category ? 'ring-4 ring-blue-400 scale-105' : 'hover:ring-2 hover:ring-blue-300'
                                        }`}
                                />
                                <p className="ml-3 text-gray-700 font-semibold">{category}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
