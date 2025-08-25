

import { IAppointment } from "../../models/appointment/IAppointment";





export interface IDoctorInfo {
  _id: string;
  name: string;
  email: string;
  photo: string;
  isVerified: boolean;
  isBlocked: boolean;
  educationDetails: string;
  averageRating: number;
  ratingCount: number;
  specialization: string;
  yearOfExperience: number;
  fee: number;
}

export interface IAppointmentResponse {
  _id: string;
  doctor: IDoctorInfo;
  userId: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  appointmentNo: number;
  transactionId?: string;
  payment: "paid" | "not paid" | "refund";
}



export interface ICreateAppointment {
  _id: string;
    doctor: {
    _id: string;
    name: string;
    email: string;
    photo?: string;
    isVerified: boolean | undefined;
    educationDetails: string;
    isBlocked: boolean;
    specialization: string ;
    averageRating?: number;
    ratingCount?: number;
    about: string;
    yearOfExperience: number;
    fee: number;
    availability: object[];
    slotDuration: number;

  };
  userId: string;
  date: string;           
  time: string;
  appointmentNo: number
  status: "pending" | "confirmed" | "cancelled" | "completed"; 
  transactionId?: string;
}


export interface ICreateAppointmentResponse {
  responses: ICreateAppointment[];
  timeArray: {}; 
}



export interface IDoctorUser  {
    _id: string;
    name: string,
    email: string;
    photo: string;
    isVerified: boolean;
    educationDetails: string;
    isBlocked: boolean;
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

    dateOfBirth?: string;
    gender?: string;
    houseName?: string;
    city?: string;
    state?: string;
    country?: string;
    pin?: number;
   
  };
  fee: number;
  date: string;
  time: string;
  appointmentNo: number;
  status: string;
  payment: string;
  transactionId?: string;
}

export interface IAppointmentFullResponse {
  _id: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  payment: "paid" | "not paid" | "refund";
  method?: string;
  appointmentNo: number;
  transactionId?: string;
  timeArray: string[];

  doctor: {
    _id: string;
    name: string;
    email: string;
    photo: string;
    isVerified: boolean;
    isBlocked: boolean;
    educationDetails: string;
    specialization: string;
    yearOfExperience: number;
    fee: number;
  };

  user: {
    _id: string;
    name: string;
    email: string;
    photo: string;
    isVerified: boolean;
    isBlocked: boolean;
    dateOfBirth?: string;
    gender?: string;
    houseName?: string;
    city?: string;
    state?: string;
    country?: string;
    pin?: string;
  };
}


export interface IAppointmentService {
  
  createAppointment(data: Partial<IAppointment>): Promise<{message:string}>;
  
   getAppointmentsByDoctor(
    doctorId: string,
    page: number,
    limit: number,
    status?: string
  ): Promise<{
    data: IAppointmentWithUserResponse[];
    totalDocs: number;
    totalPages: number;
    page: number;
    limit: number;
  }>
  
  getCreateAppointment(doctorId: string): Promise<ICreateAppointmentResponse>;
  getAllAppointments(page: number, limit: number, status:string): Promise<{
    data: IAppointmentFullResponse[];
    totalDocs: number;
    totalPages: number;
    page: number;
    limit: number;
  }>

  getAppointmentsByUser(
    userId: string,
    page: number,
    limit: number,
    status?: string
  ): Promise<{
    data: IAppointmentResponse[];
    totalDocs: number;
    totalPages: number;
    page: number;
    limit: number;
  }>

  updateStatus(appointmentId: string, status: string): Promise<{message: string}>;
  getAppointmentById(appointmentId: string, doctorId: string): Promise<IAppointmentWithUserResponse | null>;
  // getSingleAppointmentByUser(appointmentId : string): Promise<IAppointmentResponse | null>;

}
