

import { IPrescription } from "../../models/prescription/IPrescription";
import { IPrescriptionRepository } from "../../repositories/interface/IPrescriptionRepository";
import mongoose from "mongoose";
import { IPrescriptionService } from "../interface/IPrescriptionService";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";


export class PrescriptionService implements IPrescriptionService{
    constructor(
        private _prescriptionRepo: IPrescriptionRepository,
    ){}

    async createPrescription(data: IPrescription): Promise<IPrescription> {
        try {
            const prescription = await this._prescriptionRepo.create(data);
            if(!prescription){
                throw new Error("Failed to create Prescription");
            }
            return prescription;
            
        } catch (error) {
            if(error instanceof Error){
                throw error;
            }else{
                throw new Error("Something went wrong");
            }
        }
    }


    async getPrescription(appointmentId: string): Promise<IPrescription | null> {
        try {
            if(!appointmentId){
                throw new Error("AppointmentId missing");
            }
            const appId = new mongoose.Types.ObjectId(appointmentId);
            const prescription = await this._prescriptionRepo.getPrescription(appId);
            // if(!prescription){
            //     throw new Error("Prescription not found");
            // }
            return prescription;
        } catch (error) {
            if(error instanceof Error){
                throw error;
            }else{
                throw new Error("Something went wrong");
            }
        }
    }


    async editPrescription(appointmentId: string, data: Partial<IPrescription>): Promise<IPrescription | null> {
        try {
            console.log("entered into service ");
            if(!appointmentId){
                throw new Error("AppointmentId required");
            }
            const appId = new mongoose.Types.ObjectId(appointmentId);
            
            const result = await this._prescriptionRepo.updatePrescription(appId,data);
            
            if(!result){
                throw new Error("Failed to update Prescription");
            }
            return result;
        } catch (error) {
            if(error instanceof Error){
                throw error;
            }else{
                throw new Error("Something went wrong");
            }
        }
    }




    async generatePrescriptionPDF(prescription: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const buffers: any[] = [];

    
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      
       
    const logoPath = path.join(__dirname, "../../../public/images/logo2.png"); 
  
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 130, 25, { width: 70 });
      }

      console.log("Resolved Logo Path:", logoPath);
      console.log("File exists?", fs.existsSync(logoPath));
      doc.fontSize(20).text("Prescripto Hospital", 130, 50);
      doc.fontSize(10).text("123 Health Lane, Wellness City, India", 130, 75);
      doc.moveDown(2);

   
      const today = new Date().toLocaleDateString();
      doc.fontSize(10).text(`Date: ${today}`, { align: "right" });

      doc.moveDown();
      doc.fontSize(12).text(`Doctor: Dr. ${prescription.doctorId.name}`);
      doc.text(`Patient: ${prescription.patientId.name}`);
      doc.text(`Appointment Date: ${new Date(prescription.appointmentId.date).toLocaleDateString()}`);
      doc.moveDown();

     
      doc.fontSize(12).text(`Diagnosis: ${prescription.diagnosis}`);
      if (prescription.notes) doc.text(`Notes: ${prescription.notes}`);
      if (prescription.followUpDate) {
        doc.text(`Follow-Up Date: ${new Date(prescription.followUpDate).toLocaleDateString()}`);
      }

      doc.moveDown();

 
      doc.fontSize(12).text("Medicines", { underline: true });
      prescription.medicines.forEach((med: any, index: number) => {
        doc.text(
          `${index + 1}. ${med.name} - ${med.dosage}, ${med.frequency}, ${med.duration}. Instructions: ${med.instructions}`
        );
      });

      doc.moveDown(3);

     
      const signPath = path.join(__dirname, "../../../public/images/signature.png");
      if (fs.existsSync(signPath)) {
        doc.image(signPath, doc.page.width - 150, doc.y, { width: 100 });
      }
      doc.text("Dr. " + prescription.doctorId.name, doc.page.width - 150, doc.y + 50);

    
      doc.moveDown(4);
      doc
        .fontSize(10)
        .fillColor("gray")
        .text("Prescripto Hospital • +91-9876543210 • support@prescripto.com", {
          align: "center",
        });

      doc.end();
    });
  }





}