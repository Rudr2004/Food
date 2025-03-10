import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Import icons

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-red-500 to-pink-500 p-4 shadow-lg flex items-center justify-between rounded-b-lg">
            {/* Logo */}
            <Link to="/" className="text-white text-2xl sm:text-3xl font-extrabold tracking-wide drop-shadow-md">
                Zomato
            </Link>

            {/* Desktop Links */}
            <div className="hidden sm:flex gap-4">
                <Link to="/" className="bg-white text-red-500 px-5 py-2 font-semibold rounded-lg shadow-md hover:scale-105 transform transition duration-300">
                    Add Food
                </Link>
                <Link to="/list" className="bg-white text-red-500 px-5 py-2 font-semibold rounded-lg shadow-md hover:scale-105 transform transition duration-300">
                    List
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="sm:hidden text-white text-3xl" onClick={() => setIsOpen(true)}>
                <HiMenu />
            </button>

            {/* Glassmorphic Modal for Mobile Menu */}
            {isOpen && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-lg flex items-center justify-center z-50">
                    <div className="bg-white/80 w-3/4 max-w-sm rounded-lg shadow-lg p-6 relative">
                        {/* Close Button */}
                        <button className="absolute top-4 right-4 text-2xl text-red-500" onClick={() => setIsOpen(false)}>
                            <HiX />
                        </button>

                        {/* Menu Links */}
                        <div className="flex flex-col items-center space-y-4 mt-6">
                            <Link to="/" className="text-red-500 text-lg font-semibold hover:text-red-700" onClick={() => setIsOpen(false)}>
                                Add Food
                            </Link>
                            <Link to="/list" className="text-red-500 text-lg font-semibold hover:text-red-700" onClick={() => setIsOpen(false)}>
                                List
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
