
import { IUser } from "../../types/user.type";
import { IDoctorProfile } from "../../models/doctor/IDoctorProfile";
import { IPatientProfile } from "../../models/patient/IPatientProfile";

export interface CreateUserOrDoctorInput {
  userData: Partial<IUser>;
  profileData:  (IDoctorProfile | IPatientProfile ) & IUser; 
}

export interface IAdminService {


  getAllByRole(role: string, page: number, limit: number, search: string, specialty: string): Promise<{
    // items: IUser[];
    items: IUserWithProfileResponse[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;

  createUserOrDoctor(input: CreateUserOrDoctorInput): Promise<{
    message: string;
    userId: string;
  }>;

  updateUserOrDoctor(
  userId: string,
  userData: Partial<IUser>,
  profileData?: Partial<IPatientProfile> | Partial<IDoctorProfile>
  ): Promise<string>;


 deleteUserOrDoctor(userId: string): Promise<{ message: string }>;
 toggleBlockUser(userId: string): Promise<{message: string; isBlocked: boolean}>;
 toggleVerifyUser(userId: string): Promise<{message: string; isVerified: boolean | undefined }>;
 getUserById(userId: string): Promise<object>;
 getAllUsers(): Promise<{userCount:number,doctorCount:number}>;

}






export interface IUserWithProfileResponse {
  id: string;
  name: string;
  email: string;
  role: "user" | "doctor" | "admin";
  isVerified?: boolean;
  isBlocked: boolean;
  authProvider?: string;
  photo?: string;
  profile: IDoctorProfile[] | IPatientProfile[] | null; 
}

