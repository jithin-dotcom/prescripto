
import { Request, Response, NextFunction } from "express";

export interface IAdminController {
    getUsersByRole(req:  Request, res: Response, next: NextFunction): Promise<void>;
    createUserOrDoctor(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateUserOrDoctor(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteUserOrDoctor(req: Request, res: Response, next: NextFunction): Promise<void>;
    toggleBlockUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    toggleVerifyUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}