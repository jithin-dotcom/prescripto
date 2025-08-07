

import { IChat } from "../../models/chat/IChat";
import { Document } from "mongoose";
import { IBaseRepository } from "./IBaseRepository";

export interface IChatRepository extends IBaseRepository<IChat>{
  findByAppointmentId(appointmentId: string): Promise<(IChat & Document) | null>;
  findByDoctorId(doctorId: string): Promise<(IChat & Document) | null>;
  findByUserId(userId: string): Promise<(IChat & Document) | null>;
  findById(_id: string): Promise<(IChat & Document) | null>;
  createChat(data: Partial<IChat>): Promise<IChat & Document>;
  deactivateChat(appointmentId: string): Promise<void | null>;
  getChatsByUser(userId: string): Promise<IChat[]>;
  // updateChatByUserId(userId: string, time: Date | null): Promise<void>;
  // updateChatByDoctorId(doctorId: string, time: Date | null): Promise<void>;
}