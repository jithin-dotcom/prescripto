

export interface IUser {
 
  name: string;
  email: string;
  password?: string; 
  role: "user" | "doctor" | "admin";
  avatar?: string;
  isVerified?: boolean;
  googleId?: string; 
  authProvider?: "local" | "google"; 
  refreshToken?: string;
  photo?: string; 
  isBlocked: boolean;
}



export interface ISafeUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  photo: string;
  authProvider?: string;
  isBlocked: boolean;
  isVerified: boolean;
  createdAt: Date;
}








// export interface IUserDb {
//   _id: string;
//   name: string;
//   email: string;
//   password: string;
//   role: "doctor" | "patient" | "admin";
//   isVerified: boolean;
//   authProvider: string;
//   isBlocked: boolean;
//   createdAt: Date;
//   updatedAt: Date;
//   __v: number;
//   photo?: string;
// }

// export interface IDoctorProfileDb {
//   _id: string;
//   doctorId: string;
//   educationDetails: string;
//   specialization: string;
//   registrationNumber: string;
//   registrationYear: string;
//   yearOfExperience: number;
//   proofDocuments: string[];
//   fee: number;
//   about: string;
//   createdAt: Date;
//   updatedAt: Date;
//   __v: number;
//   availability: {
//     day: string;
//     slots: { from: string; to: string }[];
//   }[];
//   slotDuration: number;
//   averageRating: number;
//   ratingCount: number;
// }

// export interface ITopDoctorClean {
//   _id: string;
//   name: string;
//   email: string;
//   role: "doctor";
//   isVerified: boolean;
//   authProvider: string;
//   isBlocked: boolean;
//   createdAt: Date;
//   photo?: string;
//   profile: Omit<IDoctorProfileDb, "updatedAt" | "__v">[];
// }



export interface IUserDb extends Omit<IUser, "_id" | "createdAt" | "updatedAt" | "__v"> {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IDoctorProfile {
  _id?: string;
  doctorId: string;
  specialization: string;
  yearOfExperience: number;
  fee: number;
  educationDetails: string;
  registrationNumber: string;
  registrationYear: string;
  proofDocuments: string[];
  about: string;
  slotDuration: number;
  averageRating: number;
  ratingCount: number;
  availability: Array<{ day: string; startTime: string; endTime: string }>;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface ITopDoctorClean {
  user: Omit<IUser, "updatedAt" | "__v">;
  profile: Omit<IDoctorProfile, "updatedAt" | "__v"> | null;
}