
import { IAppointment } from "../../models/appointment/IAppointment";

// export interface IAppointmentResponse {
//   _id: string;
//   doctorId: string;
//   userId: string;
//   date: string;           
//   time: string;
//   status: "pending" | "confirmed" | "cancelled"; 
//   transactionId?: string;
// }


export interface IAppointmentResponse {
  _id: string;
    doctor: {
    _id: string;
    name: string;
    email: string;
    photo?: string;
    isVerified: string;
    educationDetails: string;
    isBlocked: boolean;
    specialization: string ;
    yearOfExperience: number;
    fee: number;

  };
  userId: string;
  date: string;           
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed"; 
  transactionId?: string;
}




export interface IAppointmentWithUserResponse {
  _id: string;
  doctorId: string;
  user: {
    _id: string;
    name: string;
    email: string;
    photo?: string;
    isVerified: boolean;
    isBlocked: boolean;

    // Patient profile fields directly inside user
    dateOfBirth?: string;
    gender?: string;
    houseName?: string;
    city?: string;
    state?: string;
    country?: string;
    pin?: number;
    // profilePhoto?: string;
  };
  date: string;
  time: string;
  status: string;
  transactionId?: string;
}





export interface IAppointmentService {
  // createAppointment(data: Partial<IAppointment>): Promise<IAppointmentResponse>;
  createAppointment(data: Partial<IAppointment>): Promise<{message:string}>;
  getAppointmentsByUser(userId: string): Promise<IAppointmentResponse[]>;
  getAppointmentsByDoctor(doctorId: string): Promise<IAppointmentWithUserResponse[]>;
//   cancelAppointment(id: string): Promise<void>;
}
