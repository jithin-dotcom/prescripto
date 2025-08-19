
import { IPrescription, IPrescriptionClean } from "../../models/prescription/IPrescription"

export interface IPrescriptionService {
    createPrescription(data: Partial<IPrescription>): Promise<{message: string}>;
    editPrescription(appointmentId: string, data: Partial<IPrescription>): Promise<{message: string}>;
    generatePrescriptionPDF(prescription: any): Promise<Buffer>;
    getEditPrescription(appointmentId: string): Promise<IPrescriptionClean | null>; 
    getPrescription(appointmentId: string): Promise<IPrescriptionClean | null>;
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





interface IDoctor {
  name: string;
  signature?: string;
}

interface IPatient {
  name: string;
}

interface IAppointment {
  date: string | Date;
}

interface IMedicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface IPrescriptionDownload {
  doctorId: IDoctor;
  patientId: IPatient;
  appointmentId: IAppointment;
  diagnosis: string;
  notes?: string;
  followUpDate?: string | Date;
  medicines: IMedicine[];
}