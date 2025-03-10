import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from '../pages/Cart';
import Buy from '../pages/Buy';
import Payment from '../pages/Payment';

const Router = () => {
    const location = useLocation();
    const hideNavbarRoutes = ["/register", "/login"];
    const hideFooterRoutes = ["/register", "/login", "/cart", "/buy", "/payment"]

    return (
        <>
            {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
            {!hideFooterRoutes.includes(location.pathname) && <Footer />}
        </>
    );
};

export default Router;
