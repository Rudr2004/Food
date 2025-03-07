"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFood = void 0;
const Food_1 = require("./../model/Food");
const addFood = async (req, res) => {
    try {
        const { name, description, img } = req.body;
        // Add validation to ensure that the request body contains the required properties
        if (!name || !description) {
            return res.status(400).json({ error: 'Name and description are required' });
        }
        // Create new user
        const food = await Food_1.Food.create({ name, description, img });
        return res.status(201).json({ message: "User registered successfully", food: food });
    }
    catch (error) {
        // Handle errors that may occur during the execution of the code
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.addFood = addFood;
