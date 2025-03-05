import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getAllUsers, createUser, getUserByEmail, updateUserPassword, getUserById } from "../models/userModel";
import { sendEmail } from "../utils/emailService";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "menututkaapp02082025";

export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password, user_level } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Oletusarvoinen käyttäjärooli on "customer", ellei määritetty adminiksi tai ravintolaomistajaksi
        const validUserLevels = ["admin", "restaurant_owner", "customer"];
        const level = validUserLevels.includes(user_level) ? user_level : "customer";

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        await createUser({ name, email, password: hashedPassword, user_level: level });

        res.status(201).json({ message: "User account created successfully" });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
    
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (!user) {
            res.status(400).json({ error: "Invalid email or password" });
            return;
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: "Invalid email or password" });
            return;
        }
        const token = jwt.sign(
            { id: user.id, email: user.email, user_level: user.user_level },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({ 
            message: "Login successful", 
            token, 
            user: { id: user.id, email: user.email, user_level: user.user_level } 
        });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await getUserByEmail(email);
        if (!user) {
            res.status(400).json({ error: "User not found" });
            return;
        }
        const resetToken = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });
        const resetLink = `https://azzni.northeurope.cloudapp.azure.com/reset-password?token=${resetToken}`;
        await sendEmail(
            email,
            "Password Reset Request",
            `Hi ${user.name},\n\nYou requested to reset your password. Click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`
        );
        res.status(200).json({ message: "Password reset link sent to your email" });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, password } = req.body;
        const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
        const hashedPassword = await bcryptjs.hash(password, SALT_ROUNDS);
        await updateUserPassword(decoded.email, hashedPassword);
        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const fetchUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const user = await getUserById(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json({ name: user.name, email: user.email, user_level: user.user_level });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
