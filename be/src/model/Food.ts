import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";

export const Food = sequelize.define("food",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },

    name:{
        type:DataTypes.STRING,
        allowNull:false
    },

    description:{
        type:DataTypes.STRING,
        allowNull:false
    },

    image:{
        type:DataTypes.STRING,
        allowNull: false
    },

    price:{
        type:DataTypes.INTEGER,
        allowNull: false
    }
})