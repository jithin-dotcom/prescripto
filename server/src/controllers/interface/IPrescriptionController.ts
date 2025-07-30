

import { Request, Response, NextFunction } from "express"

export interface IPrescriptionController {
    createPrescription(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPrescription(req: Request, res: Response, next: NextFunction): Promise<void>;
}