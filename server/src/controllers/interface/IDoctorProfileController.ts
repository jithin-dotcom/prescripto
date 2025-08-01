
import { Request, Response, NextFunction } from "express";

export interface IDoctorProfileController {
    createProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
    editProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
}