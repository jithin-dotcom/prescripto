

import { IPatientHistoryClean, IPrescriptionClean } from "../../models/prescription/IPrescription";
import { IPrescriptionRepository } from "../../repositories/interface/IPrescriptionRepository";
import mongoose from "mongoose";
import { IPrescriptionService, IPrescriptionDownload } from "../interface/IPrescriptionService";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { mapPatientHistoryDTO, mapPrescription } from "../../utils/mapper/prescriptionService.mapper";
import axios from "axios";
import { PrescriptionDTO } from "../../utils/reverseMapper/prescriptionService/IPrescriptionService";
import { mapPrescriptionDTO, mapPartialPrescriptionDTO } from "../../utils/reverseMapper/prescriptionService/prescriptionService";


async function fetchImageBuffer(url: string): Promise<Buffer> {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(response.data, "binary");
}

export class PrescriptionService implements IPrescriptionService{
    constructor(
        private _prescriptionRepo: IPrescriptionRepository,
    ){}

    


    async createPrescription(data: PrescriptionDTO): Promise<{ message: string }> {
    try {
      const exists = await this._prescriptionRepo.findOne({ appointmentId: data.appointmentId });
      if (exists) {
        throw new Error("Prescription already Exists Please Edit Prescription");
      }

      const persistenceData = mapPrescriptionDTO(data);

      const prescription = await this._prescriptionRepo.create(persistenceData);
      if (!prescription) {
        throw new Error("Failed to create Prescription");
      }

      return { message: "Prescription created Successfully" };
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Something went wrong");
    }
  }


    async getPrescription(appointmentId: string): Promise<IPrescriptionClean | null> {
      try {
        if(!appointmentId){
            throw new Error("AppointmentId missing");
        }
        const appId = new mongoose.Types.ObjectId(appointmentId);
        const prescription = await this._prescriptionRepo.getPrescription(appId);
            
        if (!prescription) {
          return null; 
        }
           
        return mapPrescription(prescription);
      } catch (error) {
        if(error instanceof Error){
          throw error;
        }else{
          throw new Error("Something went wrong");
        }
      }
    }



    
    async getEditPrescription(appointmentId: string): Promise<IPrescriptionClean | null> {
      try {
        if(!appointmentId){
          throw new Error("AppointmentId missing");
        }
        const appId = new mongoose.Types.ObjectId(appointmentId);
        const prescription = await this._prescriptionRepo.getPrescription(appId);
        if(!prescription){
          throw new Error("Prescription not found");
        }
        return mapPrescription(prescription);
      } catch (error) {
        if(error instanceof Error){
          throw error;
        }else{
          throw new Error("Something went wrong");
        }
      }
    }
   


  async editPrescription(
    appointmentId: string,
    data: Partial<PrescriptionDTO>
  ): Promise<{ message: string }> {
    try {
      if (!appointmentId) {
        throw new Error("AppointmentId required");
      }

      const appId = new mongoose.Types.ObjectId(appointmentId);

      const prescription = await this._prescriptionRepo.findOne({ appointmentId: appId });
      if (!prescription) {
        throw new Error("No Prescription Found");
      }

      const persistenceData = mapPartialPrescriptionDTO(data);

      const result = await this._prescriptionRepo.updatePrescription(appId, persistenceData);

      if (!result) {
        throw new Error("Failed to update Prescription");
      }

      return { message: "Prescription Updated Successfully" };
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Something went wrong");
    }
  }



async generatePrescriptionPDF(prescription: IPrescriptionDownload): Promise<Buffer> {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const buffers: Uint8Array[] = [];

        doc.on("data", (chunk) => buffers.push(chunk));
        doc.on("end", () => {
          const pdfBuffer = Buffer.concat(buffers);
          resolve(pdfBuffer);
        });

       
        const logoPath = path.join(__dirname, "../../../public/images/logo2.png");
        if (fs.existsSync(logoPath)) {
          doc.image(logoPath, 130, 25, { width: 70 });
        }

        doc.fontSize(20).text("Prescripto Hospital", 130, 50);
        doc.fontSize(10).text("123 Health Lane, Wellness City, India", 130, 75);
        doc.moveDown(2);

        const today = new Date().toLocaleDateString();
        doc.fontSize(10).text(`Date: ${today}`, { align: "right" });

        doc.moveDown();
        doc.fontSize(12).text(`Doctor: Dr. ${prescription.doctorId.name}`);
        doc.text(`Patient: ${prescription.patientId.name}`);
        doc.text(
          `Appointment Date: ${new Date(prescription.appointmentId.date).toLocaleDateString()}`
        );
        doc.moveDown();

        doc.fontSize(12).text(`Diagnosis: ${prescription.diagnosis}`);
        if (prescription.notes) doc.text(`Notes: ${prescription.notes}`);
        if (prescription.followUpDate) {
          doc.text(
            `Follow-Up Date: ${new Date(prescription.followUpDate).toLocaleDateString()}`
          );
        }

        doc.moveDown();
        doc.fontSize(12).text("Medicines", { underline: true });
        prescription.medicines.forEach((med, index: number) => {
          doc.text(
            `${index + 1}. ${med.name} - ${med.dosage}, ${med.frequency}, ${med.duration}. Instructions: ${med.instructions}`
          );
        });

        doc.moveDown(3);

        
        try {
          if (prescription.doctorId.signature) {
            const signatureBuffer = await fetchImageBuffer(prescription.doctorId.signature);
            doc.image(signatureBuffer, doc.page.width - 150, doc.y, { width: 100 });
          } else {
            const signPath = path.join(__dirname, "../../../public/images/signature.png");
            if (fs.existsSync(signPath)) {
              doc.image(signPath, doc.page.width - 150, doc.y, { width: 100 });
            }
          }
        } catch (err) {
          console.warn("Signature load failed, using fallback.");
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
      } catch (error) {
        reject(error);
      }
    });
  }




async getPatientHistory(
  patientId: string,
  page: number,
  limit: number
): Promise<{ data: IPatientHistoryClean[]; total: number; page: number; limit: number }> {
  try {
    
    if (!patientId) {
      throw new Error("PatientId is missing");
    }

    const pId = new mongoose.Types.ObjectId(patientId);

    const { histories, total } = await this._prescriptionRepo.getPatientHistory(
      pId,
      page,
      limit
    );

    const result: IPatientHistoryClean[] = [];

    for (let history of histories) {
      if (history) {
        result.push(mapPatientHistoryDTO(history));
      }
    }

    return { data: result, total, page, limit };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Failed to fetch Patient History");
    }
  }
}


}