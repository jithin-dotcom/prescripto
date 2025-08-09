
import { Document } from "mongoose";
import { IPatientProfile } from "../../models/patient/IPatientProfile";

import { IUser } from "../../types/user.type";


export interface IPatientProfileService {
    createPatientProfile(patientId: string, data: Partial<IPatientProfile>): Promise<{message: string}>;
    editPatientProfile(patientId: string, data: Partial<IPatientProfile>): Promise<{message: string}>;
    deletePatientProfile(patientId: string): Promise<void>;
    uploadProfilePhoto(userId: string, file: Express.Multer.File): Promise<(IUser & Document) | null>;
}