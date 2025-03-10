import React from 'react'
import { Routes, Route } from "react-router-dom"
import Add from '../pages/Add'
import Navbar from '../components/Navbar'
import List from '../pages/List'

const router = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Add />} />
                <Route path="/list" element={<List />} />
            </Routes>
        </>
    )
}

export default router