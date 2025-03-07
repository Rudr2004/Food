import express from "express"
import { addFood } from "../controller/foodController"

const foodRoute = express.Router()

foodRoute.post("/addFood",addFood)


export default foodRoute