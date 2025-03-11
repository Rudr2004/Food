import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";


export const User = sequelize.define("user",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING,
    }
})