

import { IDoctorProfile } from "../../models/doctor/IDoctorProfile";
import mongoose from "mongoose";
import { IBaseRepository } from "./IBaseRepository";
import { IDoctorProfileDashboard } from "../../models/doctor/IDoctorProfile";

export interface IDoctorProfileRepository extends IBaseRepository<IDoctorProfile> {

    findByDoctorId(patientId: string | mongoose.Types.ObjectId): Promise<IDoctorProfile | null>;
    updateByDoctorId(patientId: string | mongoose.Types.ObjectId, data: Partial<IDoctorProfile>): Promise<IDoctorProfile | null>;
    // findTopDoctorsWithRating(): Promise<(IDoctorProfile | null)[]>
    findTopDoctorsWithRating(): Promise<(IDoctorProfileDashboard | null)[]>;
}