"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFood = exports.addFood = void 0;
const Food_1 = require("../model/Food");
const addFood = async (req, res) => {
    const { name, description, price, image, category } = req.body;
    if (!name || !description || !price || !image || !category) {
        return res.status(400).json({ error: "All fields are required." });
    }
    try {
        const newFood = await Food_1.Food.create({ name, description, price, image, category });
        res.json({ message: "Food added successfully", food: newFood });
    }
    catch (error) {
        console.error("Error inserting food:", error);
        res.status(500).json({ error: "Database error" });
    }
};
exports.addFood = addFood;
const getFood = async (req, res) => {
    try {
        const food = await Food_1.Food.findAll();
        res.status(200).json(food);
    }
    catch (e) {
        console.error("Error fetching food:", e);
        res.status(500).json({ error: "Database error" });
    }
};
exports.getFood = getFood;
