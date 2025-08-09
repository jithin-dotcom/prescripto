

import { Request, Response, NextFunction } from "express";
import { IPrescriptionService } from "../../services/interface/IPrescriptionService";
import { IPrescriptionController } from "../interface/IPrescriptionController";
import { StatusCode } from "../../constants/statusCode.enum";
import { StatusMessage } from "../../constants/statusMessage";
import mongoose from "mongoose";
import { prescriptionSchema } from "../../validations/prescription.schema";
import z from "zod"




export class PrescriptionController implements IPrescriptionController{
    constructor(
        private _prescriptionService: IPrescriptionService,
    ){}


async createPrescription(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {

    const parsedData = prescriptionSchema.parse(req.body);
 
    const convertedData = {
      ...parsedData,
      appointmentId: new mongoose.Types.ObjectId(parsedData.appointmentId),
      doctorId: new mongoose.Types.ObjectId(parsedData.doctorId),
      patientId: new mongoose.Types.ObjectId(parsedData.patientId),
      followUpDate: parsedData.followUpDate ? new Date(parsedData.followUpDate) : undefined,
    };

    const newPrescription = await this._prescriptionService.createPrescription(convertedData);

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
    const convertedData = {
      ...parsedData,
      appointmentId: new mongoose.Types.ObjectId(parsedData.appointmentId),
      doctorId: new mongoose.Types.ObjectId(parsedData.doctorId),
      patientId: new mongoose.Types.ObjectId(parsedData.patientId),
      followUpDate: parsedData.followUpDate ? new Date(parsedData.followUpDate) : undefined,
    };

    const updatedPrescription = await this._prescriptionService.editPrescription(
      appointmentId,
      convertedData 
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


}
