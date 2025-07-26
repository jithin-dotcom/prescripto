


import { Request, Response, NextFunction } from "express";
import { IPaymentService } from "../../services/interface/IPaymentService";
import { IPaymentController } from "../interface/IPaymentController";

export class PaymentController implements IPaymentController {
  constructor(private paymentService: IPaymentService) {}

  
  async createRazorpayOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { appointmentId, userId, doctorId, amount } = req.body;

      if (!appointmentId || !userId || !doctorId || !amount) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const order = await this.paymentService.createRazorpayOrder({
        appointmentId,
        userId,
        doctorId,
        amount: Number(amount),
      });

      res.status(201).json({ success: true, order });
    } catch (error) {
      next(error);
    }
  }

  
  async verifyPaymentSignature(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

      if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
        res.status(400).json({ message: "Missing required fields for verification" });
        return;
      }

      const result = await this.paymentService.verifyPaymentSignature(
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature
      );

      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }
}
