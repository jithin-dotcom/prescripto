
import { IPrescription } from "../../models/prescription/IPrescription"

export interface IPrescriptionService {
    createPrescription(data: Partial<IPrescription>): Promise<IPrescription>;
    getPrescription(appointmentId: string): Promise<IPrescription | null>;
    editPrescription(appointmentId: string, data: Partial<IPrescription>): Promise<IPrescription | null>;
    generatePrescriptionPDF(prescription: any): Promise<Buffer>;
}


export interface IPrescriptionUpdateDTO {
  doctorId: string;
  patientId: string;
  diagnosis: string;
  notes?: string;
  medicines: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string;
  }[];
  followUpDate?: Date;
};
