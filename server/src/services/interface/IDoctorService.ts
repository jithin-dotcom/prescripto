
import { IDoctorProfile } from "../../models/doctor/IDoctorProfile";
import { IDoctorProfileDashboardClean } from "../../utils/mapper/doctorProfileServices";

export interface IDoctorProfileService {
    createDoctorProfile(doctorId: string, data: Partial<IDoctorProfile>): Promise<{message: string}>;
    editDoctorProfile(doctorId: string, data: Partial<IDoctorProfile>): Promise<{message: string}>;
    findDoctorProfileWithRatings(): Promise<IDoctorProfileDashboardClean[]> 
}