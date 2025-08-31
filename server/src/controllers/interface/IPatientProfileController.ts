
import { Request, Response, NextFunction } from "express";

export interface IPatientProfileController {
    createProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
    editProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
    uploadPhoto (req: Request, res: Response, next: NextFunction): Promise<void>;
}