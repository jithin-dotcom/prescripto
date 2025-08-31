


import mongoose from "mongoose";
import { PrescriptionDTO } from "./IPrescriptionService";
import { IPrescription } from "../../../models/prescription/IPrescription";

export const mapPrescriptionDTO = (dto: PrescriptionDTO): Partial<IPrescription> => {
  return {
    appointmentId: new mongoose.Types.ObjectId(dto.appointmentId),
    doctorId: new mongoose.Types.ObjectId(dto.doctorId),
    patientId: new mongoose.Types.ObjectId(dto.patientId),
    diagnosis: dto.diagnosis,
    notes: dto.notes,
    medicines: dto.medicines,
    followUpDate: dto.followUpDate ? new Date(dto.followUpDate) : undefined,
  };
};





export const mapPartialPrescriptionDTO = (dto: Partial<PrescriptionDTO>): Partial<IPrescription> => {
  const mapped: Partial<IPrescription> = {};

  if (dto.appointmentId) mapped.appointmentId = new mongoose.Types.ObjectId(dto.appointmentId);
  if (dto.doctorId) mapped.doctorId = new mongoose.Types.ObjectId(dto.doctorId);
  if (dto.patientId) mapped.patientId = new mongoose.Types.ObjectId(dto.patientId);
  if (dto.diagnosis) mapped.diagnosis = dto.diagnosis;
  if (dto.notes) mapped.notes = dto.notes;
  if (dto.medicines) mapped.medicines = dto.medicines;
  if (dto.followUpDate) mapped.followUpDate = new Date(dto.followUpDate);

  return mapped;
};




// export const toDTO = (doc: IPrescription): PrescriptionDTO => {
//   return {
//     appointmentId: doc.appointmentId.toString(),
//     doctorId: doc.doctorId.toString(),
//     patientId: doc.patientId.toString(),
//     diagnosis: doc.diagnosis,
//     notes: doc.notes,
//     medicines: doc.medicines,
//     followUpDate: doc.followUpDate,
//   };
// };
