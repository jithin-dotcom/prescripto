

import { IChat } from "../../models/chat/IChat";
import mongoose, { Document, ObjectId } from "mongoose";
import { IBaseRepository } from "./IBaseRepository";

export interface IChatRepository extends IBaseRepository<IChat>{
  findByAppointmentId(appointmentId: string): Promise<(IChat & Document) | null>;
  findByDoctorId(doctorId: string): Promise<(IChat & Document) | null>;
  findByUserId(userId: string): Promise<(IChat & Document) | null>;
  findById(_id: string): Promise<(IChat & Document) | null>;
  createChat(data: Partial<IChat>): Promise<IChat & Document>;
  deactivateChat(appointmentId: string): Promise<void | null>;
  getChatsByUser(userId: string): Promise<IChat[]>;
  
}










export interface Appointment {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  appointmentNo: number;
  day: string; // e.g., "10/08/2025"
  time: string; // e.g., "9:30 PM"
  status: "confirmed" | "pending" | "cancelled"; // adjust based on your app
  fee: number;
  payment: "paid" | "unpaid"; // adjust as needed
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface Doctor {
  _id: mongoose.Types.ObjectId;
  name: string;
  photo: string;
}

export interface User {
  _id: mongoose.Types.ObjectId;
  name: string;
  photo: string;
}

export interface LastMessage {
  content: string;
  timestamp: string; // ISO date string
}

export interface Chat {
  _id: mongoose.Types.ObjectId;
  appointmentId: Appointment;
  doctorId: Doctor;
  userId: User;
  participants: string[]; // array of ObjectId strings
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastMessage?: LastMessage; // optional in case there's no message yet
}

export type GetUserChatResponse = Chat[];













// export type IChatPopulated = Omit<IChat, 'appointmentId' | 'doctorId' | 'userId'> & {
//   appointmentId: {
//     _id: ObjectId;
//     userId: ObjectId;
//     doctorId: ObjectId;
//     appointmentNo: number;
//     day: string;
//     time: string;
//     status: string;
//     fee: number;
//     payment: string;
//     createdAt: Date;
//   };
//   doctorId: {
//     _id: ObjectId;
//     name: string;
//     photo: string;
//   };
//   userId: {
//     _id: ObjectId;
//     name: string;
//     photo: string;
//   };
// };