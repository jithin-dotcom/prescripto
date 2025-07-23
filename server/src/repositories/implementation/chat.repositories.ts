

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

  async deactivateChat(appointmentId: string): Promise<void> {
    await this.model.findOneAndUpdate({ appointmentId }, { isActive: false });
  }


  async getChatsByUser(userId: string): Promise<IChat[]> {
    return Chat.find({ participants: userId })
      .populate("appointmentId")
      .populate("userId", "name photo")
      .populate("doctorId", "name photo")
      .sort({ updatedAt: -1 });
  }

//   async getChatsByUser(userId: string): Promise<IChatWithLastMessage[]> {
//   const chats = await Chat.find({ participants: userId })
//     .populate("userId", "name photo")
//     .populate("doctorId", "name photo")
//     .sort({ updatedAt: -1 });

//   const chatsWithMessages = await Promise.all(
//     chats.map(async (chat) => {
//       const lastMessage = await Message.findOne({ chatId: chat._id })
//         .sort({ timestamp: -1 })
//         .limit(1);
//       return {
//         ...chat.toObject(),
//         lastMessage,
//       };
//     })
//   );

//   return chatsWithMessages;
// }

}
