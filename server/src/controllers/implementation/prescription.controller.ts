

import { Request, Response, NextFunction } from "express";
import { IPrescriptionService } from "../../services/interface/IPrescriptionService";
import { IPrescriptionController } from "../interface/IPrescriptionController";
import { StatusCode } from "../../constants/statusCode.enum";
import { StatusMessage } from "../../constants/statusMessage";
import mongoose from "mongoose";
import { prescriptionSchema } from "../../validations/prescription.schema";
import PDFDocument from "pdfkit";
import z from "zod"

import fs from "fs";
import path from "path";


export class PrescriptionController implements IPrescriptionController{
    constructor(
        private _prescriptionService: IPrescriptionService,
    ){}

  //   async createPrescription(req: Request, res: Response, next: NextFunction): Promise<void> {
  //       try {
  //     const data = req.body ;

  //     const newPrescription = await this._prescriptionService.createPrescription(data);

  //     res.status(StatusCode.CREATED).json({
  //       status: "success",
  //       message: "Prescription created successfully",
  //       data: newPrescription,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }



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


  // async editPrescription(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //      const data = req.body;
  //      const { appointmentId }= req.params;
  //      if(!appointmentId){
  //         res.status(StatusCode.BAD_REQUEST).json(StatusMessage.BAD_REQUEST);
  //         return;
  //      }
  //      const updatedPrescription = await this._prescriptionService.editPrescription(appointmentId,data);

  //      res.send(StatusCode.OK).json({
  //        status: "success",
  //        message: "Prescription Updated Successfully",
  //        data: updatedPrescription,
  //      })
  //   }catch (error) {
  //     next(error);
  //   }
  // }


//   async editPrescription(req: Request, res: Response, next: NextFunction): Promise<void> {
//   try {
//     const { appointmentId } = req.params;

//     if (!appointmentId) {
//       res.status(StatusCode.BAD_REQUEST).json(StatusMessage.BAD_REQUEST);
//       return;
//     }

//     const parsedData = prescriptionSchema.parse(req.body);

//     const updatedPrescription = await this._prescriptionService.editPrescription(appointmentId, parsedData);

//     res.status(StatusCode.OK).json({
//       status: "success",
//       message: "Prescription Updated Successfully",
//       data: updatedPrescription,
//     });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       res.status(StatusCode.BAD_REQUEST).json({
//         status: "fail",
//         message: "Validation error",
//         errors: error.errors,
//       });
//     } else {
//       next(error);
//     }
//   }
//  }



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



// async downloadPrescription(req: Request, res: Response, next: NextFunction): Promise<void>{
//   try {
//     const { appointmentId } = req.params;
//     const prescription = await this._prescriptionService.getPrescription(appointmentId)

//     if (!prescription) {
//        res.status(404).json({ message: "Prescription not found" });
//        return;
//     }

//     const doc = new PDFDocument({ margin: 50 });
//     res.setHeader("Content-Disposition", `attachment; filename=prescription-${appointmentId}.pdf`);
//     res.setHeader("Content-Type", "application/pdf");

//     doc.pipe(res);

//     // 🏥 Clinic Logo + Header
//     const logoPath = path.join(__dirname, "../../public/images/logo.png");
//     if (fs.existsSync(logoPath)) {
//       doc.image(logoPath, 50, 40, { width: 70 });
//     }
//     doc.fontSize(20).text("Prescripto Hospital", 130, 50);
//     doc.fontSize(10).text("123 Health Lane, Wellness City, India", 130, 75);
//     doc.moveDown(2);

//     // 📅 Date
//     const today = new Date().toLocaleDateString();
//     doc.fontSize(10).text(`Date: ${today}`, { align: "right" });

//     // 🧑‍⚕️ Doctor & Patient Info
//     doc.moveDown();
//     doc.fontSize(12).text(`Doctor: Dr. ${prescription.doctorId.name}`);
//     doc.text(`Patient: ${prescription.patientId.name}`);
//     doc.text(`Appointment Date: ${new Date(prescription.appointmentId.date).toLocaleDateString()}`);
//     doc.moveDown();

//     // 💊 Diagnosis
//     doc.fontSize(12).text(`Diagnosis: ${prescription.diagnosis}`);
//     if (prescription.notes) doc.text(`Notes: ${prescription.notes}`);
//     if (prescription.followUpDate) {
//       doc.text(`Follow-Up Date: ${new Date(prescription.followUpDate).toLocaleDateString()}`);
//     }

//     doc.moveDown();

//     // 💊 Medicines
//     doc.fontSize(12).text("Medicines", { underline: true });
//     prescription.medicines.forEach((med, index) => {
//       doc.text(
//         `${index + 1}. ${med.name} - ${med.dosage}, ${med.frequency}, ${med.duration}. Instructions: ${med.instructions}`
//       );
//     });

//     doc.moveDown(3);

//     // ✍️ Doctor's Signature
//     const signPath = path.join(__dirname, "../../public/images/signature.png");
//     if (fs.existsSync(signPath)) {
//       doc.image(signPath, doc.page.width - 150, doc.y, { width: 100 });
//     }
//     doc.text("Dr. " + prescription.doctorId.name, doc.page.width - 150, doc.y + 50);

//     // 📞 Footer
//     doc.moveDown(4);
//     doc
//       .fontSize(10)
//       .fillColor("gray")
//       .text("Prescripto Hospital • +91-9876543210 • support@prescripto.com", {
//         align: "center",
//       });

//     doc.end();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to generate prescription PDF" });
//   }
// };




  async downloadPrescription(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log("entered into downloadPrescription");
      const { appointmentId } = req.params;
      const prescription = await this._prescriptionService.getPrescription(appointmentId);
       console.log("prescripion : ",prescription);
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
