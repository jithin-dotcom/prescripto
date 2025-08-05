

import { Request, Response, NextFunction } from "express";

export interface IConcernController {
    createConcern( req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllConcerns(req: Request, res: Response, next: NextFunction): Promise<void>;
    getConcernsByUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}