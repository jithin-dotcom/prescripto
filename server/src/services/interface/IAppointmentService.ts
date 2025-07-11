
import { IAppointment } from "../../models/appointment/IAppointment";

export interface IAppointmentResponse {
  _id: string;
  doctorId: string;
  userId: string;
  date: string;           
  time: string;
  status: "pending" | "confirmed" | "cancelled"; 
  transactionId?: string;
}




export interface IAppointmentService {
  createAppointment(data: Partial<IAppointment>): Promise<IAppointmentResponse>;
//   getAppointmentsByUser(userId: string): Promise<IAppointmentResponse[]>;
//   getAppointmentsByDoctor(doctorId: string): Promise<IAppointmentResponse[]>;
//   cancelAppointment(id: string): Promise<void>;
}
