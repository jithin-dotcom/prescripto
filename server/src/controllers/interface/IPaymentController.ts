
import { Request, Response, NextFunction } from "express";
export interface IPaymentController {
    createRazorpayOrder(req: Request, res: Response, next: NextFunction): Promise<void>;
    verifyPaymentSignature(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPaymentRecept(req: Request, res: Response, next: NextFunction): Promise<void>;
    createPayout(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPayouts(req: Request, res: Response, next: NextFunction): Promise<void>;
    getDoctorPayouts(req: Request, res: Response, next: NextFunction): Promise<void>;
    // initiatePayout(req: Request, res: Response, next: NextFunction): Promise<void>;
}