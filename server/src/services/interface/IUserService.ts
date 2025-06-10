

import { IUser } from "../../types/user.type";
import { IPatientProfile } from "../../models/patient/IPatientProfile";
import { IDoctorProfile } from "../../models/doctor/IDoctorProfile";
import { Document } from "mongoose";


export interface IUserService {
   
    getTopDoctors():Promise<({user: IUser, profile: IPatientProfile | null})[]>;
    getAllDoctors():Promise<({user: IUser, profile: IPatientProfile | null})[]>;
    getProfile(userId: string): Promise<{user: IUser, profile: IPatientProfile | IDoctorProfile | null}|null>;
    updateUserOrDoctor(
      userId: string,
      userData: Partial<IUser>,
      profileData?: Partial<IPatientProfile> | Partial<IDoctorProfile>
    ): Promise<string>
}