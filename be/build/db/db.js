"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDB = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sequelize = new sequelize_1.Sequelize("zomato", "root", "Rudr@2025", {
    dialect: "mysql",
});
const User_1 = require("../model/User");
const Food_1 = require("../model/Food");
const syncDB = async () => {
    try {
        await User_1.User.sync({ alter: true });
        await Food_1.Food.sync({ alter: true });
        console.log("Database synchronized successfully!");
    }
    catch (e) {
        console.error("Database sync error:", e);
    }
};
exports.syncDB = syncDB;
