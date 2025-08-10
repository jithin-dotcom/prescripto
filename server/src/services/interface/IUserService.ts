

import { IUser, ITopDoctorClean } from "../../types/user.type";
import { IPatientProfile } from "../../models/patient/IPatientProfile";
import { IDoctorProfile } from "../../models/doctor/IDoctorProfile";




export interface IUserService {
   
    // getTopDoctors():Promise<({user: IUser, profile: IPatientProfile | null})[]>;
    // getTopDoctors(): Promise<ITopDoctorClean[]> 
   
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
    ): Promise<string>;

    changePassword(userId: string, oldPassword: string, newPassword: string):Promise<void>;

    changeEmail(userId: string, password: string, newEmail: string):Promise<void>;

    getUserById(userId:string): Promise<IUser | null>;
}