
import { Document } from "mongoose";
import { IPatientProfile } from "../../models/patient/IPatientProfile";
import { PatientProfileDTO } from "../../utils/reverseMapper/patientProfileServices/IPatientProfileService";

import { IUser } from "../../types/user.type";


export interface IPatientProfileService {
    createPatientProfile(patientId: string, data: Partial<PatientProfileDTO>): Promise<{message: string}>;
    editPatientProfile(patientId: string, data: Partial<PatientProfileDTO>): Promise<{message: string}>;
    uploadProfilePhoto(userId: string, file: Express.Multer.File): Promise<(IUser & Document) | null>;
}