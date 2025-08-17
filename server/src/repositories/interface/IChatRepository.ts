

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
  day: string; 
  time: string; 
  status: "confirmed" | "pending" | "cancelled"; 
  fee: number;
  payment: "paid" | "unpaid"; 
  createdAt: string; 
  updatedAt: string; 
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
  timestamp: string; 
}

export interface Chat {
  _id: mongoose.Types.ObjectId;
  appointmentId: Appointment;
  doctorId: Doctor;
  userId: User;
  participants: string[]; 
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastMessage?: LastMessage; 
}

export type GetUserChatResponse = Chat[];











