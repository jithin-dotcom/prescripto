


export interface PrescriptionDTO {
  appointmentId: string;
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
  followUpDate?: string | Date;
}
