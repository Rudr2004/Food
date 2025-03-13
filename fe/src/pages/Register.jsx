import React, { useState } from 'react';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast"
const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/user/signup`, formData)
            if (response) {
                //alert("Success")
                toast.success("Registered")
                navigate('/login')
            } else {
                //alert("Error")
                toast.error("Error to Register")
            }
        } catch (error) {
            alert("Can't Register", error)
            //toast.error("Cannot Register", error)
        }
    }
    return (
        <div
            className="h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center"
            style={{
                backgroundImage: 'url(https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png)',
            }}
        >
            <form
                className="flex flex-col p-8 rounded-lg shadow-md backdrop-filter-blur-md bg-white/10 hover:bg-white/20 transition duration-300 ease-in-out" onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-4 text-white">Register</h2>
                <div className="flex flex-col mb-4">
                    <label htmlFor="name" className="text-lg font-medium mb-2 text-white">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="border border-white text-white p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        onChange={handleChange}
                        value={formData.name}
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="email" className="text-lg font-medium mb-2 text-white">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="border border-white text-white p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        onChange={handleChange}
                        value={formData.email}
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="password" className="text-lg font-medium mb-2 text-white">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="border border-white text-white p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        onChange={handleChange}
                        value={formData.password}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                >
                    Register
                </button>
                <p className='text-white'>Already Registered?<Link to="/login" className='text-blue-500'>Login</Link></p>
            </form>
        </div>
    );
};

export default Register;