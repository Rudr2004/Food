import { Request, Response } from "express";
import { User } from "../model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({ name, email, password: hashedPassword });

        //create Token
        const token = jwt.sign({id: newUser._id},process.env.JWT_SECERTE,{
            expiresIn: "20d",
        })

        return res.status(201).json({ message: "User registered successfully", user: newUser,token });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const login = async(req: Request, res: Response)=>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return res.status(400).json({message: "User not found"})
        }
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            return res.status(400).json({message: "Invalid password"})
        }
        const token = jwt.sign({id: user._id},"ddjkdjkddjakd",{
            expiresIn: "20d",
        })
        return res.status(200).json({message: "User logged in successfully", user, token})
    }
    catch(error){
        return res.status(500).json({message: "Server error", error: error.message})
    }
}
