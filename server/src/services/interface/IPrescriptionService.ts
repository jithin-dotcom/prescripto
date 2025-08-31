
import { IPrescription, IPrescriptionClean, IPatientHistoryClean } from "../../models/prescription/IPrescription"
import { PrescriptionDTO } from "../../utils/reverseMapper/prescriptionService/IPrescriptionService";

export interface IPrescriptionService {
   
    createPrescription(data: Partial<PrescriptionDTO>): Promise<{message: string}>;
    editPrescription(appointmentId: string, data: Partial<PrescriptionDTO>): Promise<{message: string}>;
    generatePrescriptionPDF(prescription: any): Promise<Buffer>;
    getEditPrescription(appointmentId: string): Promise<IPrescriptionClean | null>; 
    getPrescription(appointmentId: string): Promise<IPrescriptionClean | null>;
    
    
  getPatientHistory(
  patientId: string,
  page: number,
  limit: number
): Promise<{ data: IPatientHistoryClean[]; total: number; page: number; limit: number }>
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