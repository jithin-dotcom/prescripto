

import { UserRepository } from "../repositories/implementation/user.repositories"; // adjust path
 import { Request, Response, NextFunction } from "express";

export const checkRole = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user?.id;
    if (!userId) {
       res.status(401).json({ message: "Unauthorized: Missing user" });
       return;
    }

    const userRepo = new UserRepository(); // or inject it elsewhere
    const user = await userRepo.findById(userId);
    if (!user || user.role !== requiredRole) {
       res.status(403).json({ message: "Forbidden: Insufficient permissions" });
       return;
    }

    next();
  };
};