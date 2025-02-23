import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "menututkaapp02082025";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Received token in backend:", token);
    if (!token) {
        res.status(401).json({ error: "Unauthorized. No token provided." });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string, user_level: string };
        
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized. Invalid token." });
        return
    }
};
    export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
        if ((req as any).user.user_level !== "admin") {
            res.status(403).json({ error: "Forbidden. Admin access only." });
            return;
        }   
        next();
    };

