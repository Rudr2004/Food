import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Router = () => {
    const location = useLocation();
    const hideNavbarRoutes = ["/register", "/login"];
    const hideFooterRoutes = ["/register", "/login"]

    return (
        <>
            {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
            </Routes>
            {!hideFooterRoutes.includes(location.pathname) && <Footer />}
        </>
    );
};

export default Router;
