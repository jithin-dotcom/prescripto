


import { Request, Response, NextFunction } from "express";
import { IPaymentService } from "../../services/interface/IPaymentService";
import { IPaymentController } from "../interface/IPaymentController";
import { StatusCode } from "../../constants/statusCode.enum";
import { StatusMessage } from "../../constants/statusMessage";
import logger from "../../utils/logger";



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


  async createPayout(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         logger.info("Entered into controller");
         
         const { amount, reason } = req.body;
         const doctorId = req.user?.id;
         const amountInt = parseInt(amount);
         if(!doctorId || ! amountInt || !reason){
            res.status(StatusCode.BAD_REQUEST).json(StatusMessage.BAD_REQUEST);
            return;
         }
        

         await this._paymentService.createPayout(doctorId, amount, reason);
         res.status(StatusCode.OK).json({message: "Successfully created Payout Request"});

      }catch (error) {
        next(error);
      }
  }



  async getPayouts(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const response = await this._paymentService.getPayout();
         if(response){
            res.status(StatusCode.OK).json(response);
         } 
      }catch (error) {
         next(error); 
      }
  }



   async getDoctorPayouts(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {

         const doctorId = req.user?.id;
         if(doctorId){
            const response = await this._paymentService.getDoctorPayout(doctorId);
            if(response){
               res.status(StatusCode.OK).json(response);
            } 
         }
        
      }catch (error) {
         next(error); 
      }
  }



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
