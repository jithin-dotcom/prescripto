

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

  async findByDoctorId(doctorId: string): Promise<(IChat & Document) | null> {
    return await this.model.findOne({ doctorId });
  }

  async findByUserId(userId: string): Promise<(IChat & Document) | null> {
    return await this.model.findOne({ userId });
  }

  async createChat(data: Partial<IChat>): Promise<IChat & Document> {
    return await this.model.create(data);
  }

  async deactivateChat(appointmentId: string): Promise<void | null> {
    return await this.model.findOneAndUpdate({ appointmentId }, { isActive: false });
  }

  async getChatsByUser(userId: string): Promise<IChat[]> {
    return await Chat.find({ participants: userId })
      .populate("appointmentId")
      .populate("userId", "name photo")
      .populate("doctorId", "name photo")
      .sort({ "lastMessage.timestamp": -1 } as Record<string, 1 | -1>);
  }

  // async updateChatByUserId(userId: string, time: Date): Promise<void> {
  //     this.model.updateMany({userId},{lastSeenUser: time});
  // }
  
  //  async updateChatByDoctorId(doctorId: string, time: Date): Promise<void> {
  //     this.model.updateMany({doctorId},{lastSeenDoctor: time});
  // }

}