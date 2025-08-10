
import { Request, Response, NextFunction } from "express"

export interface IUserController {
    // getTopDoctors(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllDoctors(req: Request, res: Response, next: NextFunction): Promise<void>;
    getProfile(req: Request, res: Response, next: NextFunction): Promise<void>; 
    updateUserOrDoctor(req: Request, res: Response, next: NextFunction): Promise<void>;
    changePassword(req: Request, res: Response, next: NextFunction): Promise<void>;
}