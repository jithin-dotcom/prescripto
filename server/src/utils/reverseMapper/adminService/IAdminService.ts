
import { IAvailabilitySlot } from "../../../models/doctor/IDoctorProfile";


export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;  
  photo?: string;     
  signature?: string; 
}


export interface UpdatePatientProfileDTO {
  dateOfBirth?: string;
  gender?: "male" | "female" | "others";
  houseName?: string;
  city?: string;
  state?: string;
  country?: string;
  pin?: number;
}




export interface UpdateDoctorProfileDTO {
  educationDetails?: string;
  specialization?: string;
  registrationNumber?: string;
  registrationYear?: string;
  yearOfExperience?: number;
  signature?: string;
  proofDocuments?: string[];
  fee?: number;
  about?: string;
  availability?: IAvailabilitySlot[];
  slotDuration?: number;
}






export interface CreateUserDTO {
  name: string;
  email: string;
  password?: string;
  role: "user" | "doctor";
  photo?: string;
  signature?: string;
}




export interface UserWithProfileResponseDTO {
  id: string;
  name: string;
  email: string;
  role: "user" | "doctor" | "admin";
  isVerified?: boolean;
  isBlocked: boolean;
  authProvider?: string;
  photo?: string;
  signature?: string;
  profile: (UpdateDoctorProfileDTO | UpdatePatientProfileDTO)[] | null;
}