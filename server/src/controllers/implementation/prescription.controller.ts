

import { Request, Response, NextFunction } from "express";
import { IPrescriptionService } from "../../services/interface/IPrescriptionService";
import { IPrescriptionController } from "../interface/IPrescriptionController";
import { StatusCode } from "../../constants/statusCode.enum";
import { StatusMessage } from "../../constants/statusMessage";
import { prescriptionSchema } from "../../validations/prescription.schema";
import z from "zod"




export class PrescriptionController implements IPrescriptionController{
    constructor(
        private _prescriptionService: IPrescriptionService,
    ){}


async createPrescription(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {

    const parsedData = prescriptionSchema.parse(req.body);
 
    const newPrescription = await this._prescriptionService.createPrescription(parsedData);

    res.status(StatusCode.CREATED).json({
      status: "success",
      message: "Prescription created successfully",
      data: newPrescription,
    });
  } catch (error) {
   
    if (error instanceof z.ZodError) {
      res.status(StatusCode.BAD_REQUEST).json({
        status: "fail",
        message: "Validation error",
        errors: error.errors,
      });
    } else {
      next(error);
    }
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


  
  async getEditPrescription(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { appointmentId } = req.params
        if(!appointmentId){
            res.status(StatusCode.BAD_REQUEST).json(StatusMessage.BAD_REQUEST);
            return;
        }
        console.log("appointmentId : ",appointmentId);
        const response = await this._prescriptionService.getPrescription(appointmentId);
        if(!response){
           res.status(StatusCode.NOT_FOUND).json({message: "Prescription not Found"});
           return;
        }
        res.status(StatusCode.OK).json(response); 
    } catch (error) {
        next(error);
    }
  }




async editPrescription(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { appointmentId } = req.params;

    if (!appointmentId) {
      res.status(StatusCode.BAD_REQUEST).json(StatusMessage.BAD_REQUEST);
      return;
    }

    const parsedData = prescriptionSchema.parse(req.body);

    const updatedPrescription = await this._prescriptionService.editPrescription(
      appointmentId,
      parsedData 
    );

    res.status(StatusCode.OK).json({
      status: "success",
      message: "Prescription Updated Successfully",
      data: updatedPrescription,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(StatusCode.BAD_REQUEST).json({
        status: "fail",
        message: "Validation error",
        errors: error.errors,
      });
    } else {
      next(error);
    }
  }
}




  async downloadPrescription(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      
      const { appointmentId } = req.params;
      const prescription = await this._prescriptionService.getPrescription(appointmentId);
       
      if (!prescription) {
        res.status(404).json({ message: "Prescription not found" });
        return;
      }
     
      const pdfBuffer = await this._prescriptionService.generatePrescriptionPDF(prescription);
      res.setHeader("Content-Disposition", `attachment; filename=prescription-${appointmentId}.pdf`);
      res.setHeader("Content-Type", "application/pdf");
      res.send(pdfBuffer);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }





async getPatientHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { patientId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!patientId) {
      res.status(StatusCode.BAD_REQUEST).json(StatusMessage.BAD_REQUEST);
      return;
    }

    const result = await this._prescriptionService.getPatientHistory(patientId, page, limit);
    
    res.status(StatusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
}


}
