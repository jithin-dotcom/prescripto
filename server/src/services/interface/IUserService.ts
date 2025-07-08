

import { IUser } from "../../types/user.type";
import { IPatientProfile } from "../../models/patient/IPatientProfile";
import { IDoctorProfile } from "../../models/doctor/IDoctorProfile";
import { Document } from "mongoose";


export interface IUserService {
   
    getTopDoctors():Promise<({user: IUser, profile: IPatientProfile | null})[]>;
   
    getAllDoctors(
     page: number,
     limit: number,
     search: string,
     sort: string,
     specialty: string,
    ): Promise<{
     data: (IUser & { profile: IDoctorProfile[] })[];
     total: number;
     totalPages: number;
     page: number;
    }>;
    getProfile(userId: string): Promise<{user: IUser, profile: IPatientProfile | IDoctorProfile | null}|null>;
    updateUserOrDoctor(
      userId: string,
      userData: Partial<IUser>,
      profileData?: Partial<IPatientProfile> | Partial<IDoctorProfile>
    ): Promise<string>
}