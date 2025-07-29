

import { Request, Response, NextFunction } from "express";

export interface IDoctorRatingController {
    rateDoctor(req: Request, res: Response, next: NextFunction): Promise<void>;
    getRatingByDoctor(req: Request, res: Response, next: NextFunction): Promise<void>;
}