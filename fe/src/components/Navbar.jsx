import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Convert token existence to boolean
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md p-4 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-red-500 text-3xl font-bold">
                Zomato
            </Link>

            {/* Search Bar */}
            <div className="flex-grow mx-4 relative">
                <input
                    type="text"
                    placeholder="Search for restaurants, cuisines, or dishes"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
            </div>

            {/* Auth Buttons */}
            <div>
                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-blue-600 transition"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
