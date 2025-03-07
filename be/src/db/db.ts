import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize("zomato", "root", "Rudr@2025", {
    dialect: "mysql",
});


import { User } from "../model/User";  
import { Food } from "../model/Food";  

export const syncDB = async () => {
    try {
        await User.sync({ alter: true });  
        await Food.sync({ alter: true });  
        console.log("Database synchronized successfully!");
    } catch (e) {
        console.error("Database sync error:", e);
    }
};
