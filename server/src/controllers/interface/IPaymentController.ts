
import { Request, Response, NextFunction } from "express";
export interface IPaymentController {
    createRazorpayOrder(req: Request, res: Response, next: NextFunction): Promise<void>;
    verifyPaymentSignature(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPaymentRecept(req: Request, res: Response, next: NextFunction): Promise<void>;
}