



import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.models";
import { decode } from "punycode";
import { JwtPayload } from "../types/jwtPayload";

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || "your-secret-key";

// interface JwtPayload {
//   id: string;
//   email: string;
//   role: string;
//   iat: number;
//   exp: number;
// }

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log("request header: ", req.headers);
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
       res.status(401).json({ message: "Access token missing or invalid" });
       return;
    }

    const token = authHeader.split(" ")[1].trim();
    // console.log("Token extracted:", JSON.stringify(token));

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
    const user = await UserModel.findById(decoded.id);
    if(!user || user.isBlocked){
       res.status(403).json({message: "Access denied, Blocked by Admin !"});
       return;
    }

    (req as any).user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};
