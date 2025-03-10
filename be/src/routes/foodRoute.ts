import express from "express"
import { addFood, getFood } from "../controller/foodController"

const foodRoute = express.Router()

foodRoute.post("/addFood",addFood);
foodRoute.get("/getFoods",getFood)


export default foodRoute