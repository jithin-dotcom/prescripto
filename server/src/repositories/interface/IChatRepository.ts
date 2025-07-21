

import { IChat } from "../../models/chat/IChat";
import { Document } from "mongoose";

export interface IChatRepository {
  findByAppointmentId(appointmentId: string): Promise<(IChat & Document) | null>;
  createChat(data: Partial<IChat>): Promise<IChat & Document>;
  deactivateChat(appointmentId: string): Promise<void>;
  getChatsByUser(userId: string): Promise<IChat[]>;
}
