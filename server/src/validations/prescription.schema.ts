


import { z } from "zod";

export const prescriptionSchema = z.object({
  appointmentId: z.string().min(1, "Appointment ID is required"),
  doctorId: z.string().min(1, "Doctor ID is required"),
  patientId: z.string().min(1, "Patient ID is required"),
  diagnosis: z.string().min(1, "Diagnosis is required"),
  notes: z.string().min(1, "Notes are required"),
  medicines: z.array(
    z.object({
      name: z.string().min(1, "Medicine name is required"),
      dosage: z.string().min(1, "Dosage is required"),
      frequency: z.string().min(1, "Frequency is required"),
      duration: z.string().min(1, "Duration is required"),
      instructions: z.string().min(1, "Instruction is required"),
    })
  ),
  followUpDate: z.coerce.date().optional(), 
});
