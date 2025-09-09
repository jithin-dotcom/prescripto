

import { DoctorProfileDTO, PatientProfileDTO, UserDTO } from "../../utils/reverseMapper/userService/IUserService";
import { GetProfileUserDTO, GetProfileDoctorProfileDTO, GetProfilePatientProfileDTO } from "../../utils/reverseMapper/userService/IUserServiceGetUser";
import { GetAllDoctorsDoctorProfileDTO, GetAllDoctorsUserDTO } from "../../utils/reverseMapper/userService/IUserService.getAllDoctors";
import { IUser } from "../../types/user.type";

export interface IUserService {
    
 
    getAllDoctors(
      page: number,
      limit: number,
      search: string,
      sort: string,
      specialty: string,
    ): Promise<{
      data: { user: GetAllDoctorsUserDTO; profile: GetAllDoctorsDoctorProfileDTO[] }[];
      total: number;
      totalPages: number;
      page: number;
    }>


    getProfile(
      userId: string
    ): Promise<{ user: GetProfileUserDTO; profile: GetProfilePatientProfileDTO | GetProfileDoctorProfileDTO | null } | null>
    
   

    updateUserOrDoctor(
      userId: string,
      userData: Partial<UserDTO>,
      profileData?: Partial<PatientProfileDTO> | Partial<DoctorProfileDTO>
    ): Promise<string>;

    changePassword(userId: string, oldPassword: string, newPassword: string):Promise<void>;

    changeEmail(userId: string, password: string, newEmail: string):Promise<void>;
    getUserById(userId:string): Promise<IUser | null>

}



