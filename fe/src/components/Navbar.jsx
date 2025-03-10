import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
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

            {/* Auth Buttons and Cart for Large Devices */}
            <div className="hidden md:flex">
                <Link to="/cart" className="bg-red-500 mx-4 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-red-600 transition">
                    Cart
                </Link>
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

            {/* Modal Toggle Button for Small and Extra Small Devices */}
            <button
                className="md:hidden bg-red-500 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-red-600 transition"
                onClick={handleModalToggle}
            >
                Menu
            </button>

            {/* Glassmorphic Modal for Mobile Menu */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-lg flex items-center justify-center z-50">
                    <div className="bg-white/80 w-3/4 max-w-sm rounded-lg shadow-lg p-6 relative">
                        {/* Close Button */}
                        <button className="absolute top-4 right-4 text-2xl text-red-500" onClick={() => setIsModalOpen(false)}>
                            <HiX />
                        </button>

                        {/* Menu Links */}
                        <div className="flex flex-col items-center space-y-4 mt-6">
                            <Link to="/cart" className="bg-red-500 text-white px-4 py-2 mx-3 cursor-pointer rounded-md hover:bg-red-600 transition">
                                Cart
                            </Link>
                            {isLoggedIn ? (
                                <button className="text-red-500 text-lg font-semibold hover:text-red-700" onClick={handleLogout}>
                                    Logout
                                </button>
                            ) : (
                                <Link to="/login" className="text-red-500 text-lg font-semibold hover:text-red-700">
                                    Login
                                </Link>
                            )
                            }
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;