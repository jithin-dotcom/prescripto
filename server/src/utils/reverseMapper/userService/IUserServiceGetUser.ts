


export interface GetProfileUserDTO {
  id: string;
  name: string;
  email: string;
  role: "user" | "doctor" | "admin";
  avatar?: string;
  isVerified?: boolean;
  photo?: string;
  signature?: string;
  isBlocked: boolean;
}


export interface GetProfilePatientProfileDTO {
  id: string;
  dateOfBirth: string;
  gender: "male" | "female" | "others";
  houseName: string;
  city: string;
  state: string;
  country: string;
  pin: number;
}


export interface GetProfileDoctorProfileDTO {
  id: string;
  educationDetails: string;
  specialization: string;
  registrationNumber: string;
  registrationYear: string;
  yearOfExperience: number;
  signature?: string;
  proofDocuments: string[];
  fee: number;
  about: string;
  averageRating?: number;
  ratingCount?: number;
  availability?: {
    day: string;
    slots: { from: string; to: string }[];
  }[];
  slotDuration?: number;
}
