"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db/db");
exports.Food = db_1.sequelize.define("food", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
