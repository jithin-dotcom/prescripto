


import { Request, Response, NextFunction } from "express";
import { IPaymentService } from "../../services/interface/IPaymentService";
import { IPaymentController } from "../interface/IPaymentController";
import { StatusCode } from "../../constants/statusCode.enum";
import { StatusMessage } from "../../constants/statusMessage";

export class PaymentController implements IPaymentController {
  constructor(private _paymentService: IPaymentService) {}

  
  async createRazorpayOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { appointmentId, userId, doctorId, amount } = req.body;

      if (!appointmentId || !userId || !doctorId || !amount) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

     

      const order = await this._paymentService.createRazorpayOrder({
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

      const result = await this._paymentService.verifyPaymentSignature(
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature
      );

      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }


  // async getPaymentRecept(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     console.log("entered into controller");
  //      const { appointmentId } = req.params;
  //      if(!appointmentId){
  //        res.status(StatusCode.BAD_REQUEST).json(StatusMessage.BAD_REQUEST);
  //      } 
  //      const response = await this._paymentService.downloadRecept(appointmentId);
  //      if(!response){
  //         res.status(StatusCode.INTERNAL_SERVER_ERROR).json(StatusMessage.INTERNAL_SERVER_ERROR);
  //      }
  //      res.status(StatusCode.OK).json(StatusMessage.OK);
  //   }catch (error) {
  //      next(error);      
  //   }
  // }



  async getPaymentRecept(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { appointmentId } = req.params;

    if (!appointmentId) {
      res.status(400).json({ message: "Appointment ID is required" });
      return;
    }

    const pdfBuffer = await this._paymentService.downloadRecept(appointmentId);

    res.setHeader("Content-Disposition", `attachment; filename=receipt-${appointmentId}.pdf`);
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate receipt" });
  }
}


  
}
