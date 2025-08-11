


import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/implementation/user.repositories";
import { PatientProfileRepository } from "../repositories/implementation/patientProfile.repositories";
import { DoctorProfileRepository } from "../repositories/implementation/doctorProfile.repositories";
import { UserService } from "../services/implementation/user.service";
import { StatusCode } from "../constants/statusCode.enum";
import redisClient from "../config/redisClient";
import { JwtPayload } from "../types/jwtPayload";

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || "your-secret-key";

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const userRepo = new UserRepository();
    const doctorProfileRepo = new DoctorProfileRepository();
    const patientProfileRepo = new PatientProfileRepository();
    const userService = new UserService(userRepo, patientProfileRepo, doctorProfileRepo);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(StatusCode.UNAUTHORIZED).json({ message: "Access token missing or invalid" });
      return;
    }

    const token = authHeader.split(" ")[1].trim();
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;

   
    const blacklistKey = `blacklist:accessToken:${decoded.id}`;
    if (await redisClient.get(blacklistKey)) {
      res.status(StatusCode.FORBIDDEN).json({ message: "Access denied, user blocked by admin" });
      return;
    }

    const cacheKey = `user:${decoded.id}:blocked`;
    const cachedStatus = await redisClient.get(cacheKey);

    let isBlocked = false;

    if (cachedStatus !== null) {
      
      isBlocked = cachedStatus === "true";
    } else {
      
      const user = await userService.getUserById(decoded.id);
      if (!user) {
        res.status(StatusCode.FORBIDDEN).json({ message: "User not found" });
        return;
      }
      isBlocked = user.isBlocked;
      await redisClient.setEx(cacheKey, 3600, isBlocked.toString()); // Cache for 1 hour
    }

    if (isBlocked) {
     
      await redisClient.setEx(`blacklist:accessToken:${decoded.id}`,3600, "true"); // Match access token expiry
      res.status(StatusCode.FORBIDDEN).json({ message: "Access denied, user blocked by admin" });
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
    res.status(StatusCode.UNAUTHORIZED).json({ message: "Invalid or expired token" });
    return;
  }
};