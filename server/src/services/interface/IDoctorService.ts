
import { IDoctorProfile } from "../../models/doctor/IDoctorProfile";

export interface IDoctorProfileService {
    createDoctorProfile(doctorId: string, data: Partial<IDoctorProfile>): Promise<{message: string}>;
    editDoctorProfile(doctorId: string, data: Partial<IDoctorProfile>): Promise<{message: string}>;
    deleteDoctorProfile(doctorId: string): Promise<void>;
}