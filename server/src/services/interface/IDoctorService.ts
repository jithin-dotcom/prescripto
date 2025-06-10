
import { IDoctorProfile } from "../../models/doctor/IDoctorProfile";

export interface IDoctorProfileService {
    createDoctorProfile(doctorId: string, data: Partial<IDoctorProfile>): Promise<IDoctorProfile>;
    editDoctorProfile(doctorId: string, data: Partial<IDoctorProfile>): Promise<IDoctorProfile>;
    deleteDoctorProfile(doctorId: string): Promise<void>;
}