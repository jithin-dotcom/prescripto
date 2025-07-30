

import { Request, Response, NextFunction } from "express";
import { IPrescriptionService } from "../../services/interface/IPrescriptionService";
import { IPrescriptionController } from "../interface/IPrescriptionController";
import { StatusCode } from "../../constants/statusCode.enum";
import { StatusMessage } from "../../constants/statusMessage";


export class PrescriptionController implements IPrescriptionController{
    constructor(
        private _prescriptionService: IPrescriptionService,
    ){}

    async createPrescription(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
      const data = req.body ;

      const newPrescription = await this._prescriptionService.createPrescription(data);

      res.status(StatusCode.CREATED).json({
        status: "success",
        message: "Prescription created successfully",
        data: newPrescription,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPrescription(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { appointmentId } = req.params
        if(!appointmentId){
            res.status(StatusCode.BAD_REQUEST).json(StatusMessage.BAD_REQUEST);
            return;
        }
        console.log("appointmentId : ",appointmentId);
        const response = await this._prescriptionService.getPrescription(appointmentId);
        
        res.status(StatusCode.OK).json(response); 
    } catch (error) {
        next(error);
    }
  }
}
