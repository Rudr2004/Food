import { Food } from './../model/Food';
import { Request, Response } from "express";


export const addFood = async (req: Request, res: Response) => {
  try {
    const { name, description,img } = req.body;

    // Add validation to ensure that the request body contains the required properties
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    // Add Food
           const food = await Food.create({ name, description,img});
           return res.status(201).json({ message: "Food Added Successfully", food: food});
  } catch (error) {
    // Handle errors that may occur during the execution of the code
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};