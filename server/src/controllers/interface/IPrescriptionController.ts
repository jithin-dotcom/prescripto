

import { Request, Response, NextFunction } from "express"

export interface IPrescriptionController {
    createPrescription(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPrescription(req: Request, res: Response, next: NextFunction): Promise<void>;
    editPrescription(req: Request, res: Response, next: NextFunction): Promise<void>;
    downloadPrescription(req: Request, res: Response, next: NextFunction): Promise<void>;
    getEditPrescription(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPatientHistory(req: Request, res: Response, next: NextFunction): Promise<void>;
}