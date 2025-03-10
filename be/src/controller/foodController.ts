import { Request, Response } from "express";
import { Food } from "../model/Food";

export const addFood = async (req: Request, res: Response) => {
    const { name, description, price, image } = req.body;  
    if (!name || !description || !price || !image) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const newFood = await Food.create({ name, description, price, image });
        res.json({ message: "Food added successfully", food: newFood });
    } catch (error) {
        console.error("Error inserting food:", error);
        res.status(500).json({ error: "Database error" });
    }
};

export const getFood = async(req:Request, res: Response) =>{
    try{
        const food = await Food.findAll()
        res.status(200).json(food)
    }catch(e){
        console.error("Error fetching food:", e);
        res.status(500).json({ error: "Database error" });
    }
}
