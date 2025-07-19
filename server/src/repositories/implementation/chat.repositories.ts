

import { Chat } from "../../models/chat/chat.models";
import { IChatRepository } from "../interface/IChatRepository";
import { IChat } from "../../models/chat/IChat";
import { BaseRepository } from "./base.repositories";
import { Document } from "mongoose";

export class ChatRepository extends BaseRepository<IChat & Document> implements IChatRepository {
  constructor() {
    super(Chat);
  }

  async findByAppointmentId(appointmentId: string): Promise<(IChat & Document) | null> {
    return await this.model.findOne({ appointmentId });
  }

  async createChat(data: Partial<IChat>): Promise<IChat & Document> {
    return await this.model.create(data);
  }

  async deactivateChat(appointmentId: string): Promise<void> {
    await this.model.findOneAndUpdate({ appointmentId }, { isActive: false });
  }
}
