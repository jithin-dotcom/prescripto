


import mongoose from "mongoose";
import { PatientProfileDTO } from "./IPatientProfileService";
import { IPatientProfile } from "../../../models/patient/IPatientProfile";

export const toPatientProfilePersistence = (
  patientId: string,
  dto: PatientProfileDTO
): Partial<IPatientProfile> => {
  return {
    ...dto,
    patientId: new mongoose.Types.ObjectId(patientId),
  };
};
