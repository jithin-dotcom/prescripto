

// import { IChat } from "../../models/chat/IChat";
// import { IMessage } from "../../models/message/IMessage";
// import { IChatRepository } from "../../repositories/interface/IChatRepository";
// import { IMessageRepository } from "../../repositories/interface/IMessageRepository";
// import { IChatService } from "../interface/IChatService";
// import mongoose from "mongoose";

// export class ChatService implements IChatService {
//   constructor(
//     private chatRepo: IChatRepository,
//     private messageRepo: IMessageRepository
//   ) {}

//   async findOrCreateChat(appointmentId: string, user: { _id: string; role: string }): Promise<IChat> {
//     let chat = await this.chatRepo.findByAppointmentId(appointmentId);
//     if (!chat) {
//       const newChat: Partial<IChat> = {
//         appointmentId: new mongoose.Types.ObjectId(appointmentId),
//         doctorId: user.role === "doctor" ? user._id : undefined,
//         userId: user.role === "user" ? user._id : undefined,
//         isActive: true,
//       };
//       chat = await this.chatRepo.create(newChat);
//     }
//     return chat;
//   }

//   async createMessage(
//     chatId: mongoose.Types.ObjectId,
//     senderId: string,
//     content: string,
//     type: "text" | "image"
//   ): Promise<IMessage> {
//     const message: Partial<IMessage> = {
//       chatId,
//       sender: senderId,
//       content,
//       type,
//       read: false,
//       timestamp: new Date(),
//     };
//     return await this.messageRepo.create(message);
//   }

//   async endChat(appointmentId: string): Promise<void> {
//     await this.chatRepo.endChatByAppointmentId(appointmentId);
//   }
// }









import { IChat } from "../../models/chat/IChat";
import { IMessage } from "../../models/message/IMessage";
import { IChatService } from "../interface/IChatService";
import { IChatRepository } from "../../repositories/interface/IChatRepository";
import { IMessageRepository } from "../../repositories/interface/IMessageRepository";
import mongoose from "mongoose";

export class ChatService implements IChatService {
  constructor(
    private _chatRepo: IChatRepository,
    private _messageRepo: IMessageRepository
  ) {}

  async createChat(appointmentId: string, participants: string[]): Promise<IChat> {
    try {
      if (!appointmentId || participants.length < 2) {
        throw new Error("Invalid appointment ID or participants");
      }

      const existing = await this._chatRepo.findByAppointmentId(appointmentId);
      if (existing) {
        throw new Error("Chat already exists for this appointment");
      }

      const chat = await this._chatRepo.createChat({
        appointmentId: new mongoose.Types.ObjectId(appointmentId),
        participants: participants.map(id => new mongoose.Types.ObjectId(id)),
        isActive: true,
      });

      return chat;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  }

  async deactivateChat(appointmentId: string): Promise<void> {
    try {
      await this._chatRepo.deactivateChat(appointmentId);
    } catch (error) {
      console.error("Error deactivating chat:", error);
      throw error;
    }
  }

  async getChatByAppointmentId(appointmentId: string): Promise<IChat | null> {
    try {
      return await this._chatRepo.findByAppointmentId(appointmentId);
    } catch (error) {
      console.error("Error fetching chat:", error);
      throw error;
    }
  }

  async createMessage(chatId: string, senderId: string, content: string): Promise<IMessage> {
    try {
      if (!chatId || !senderId || !content.trim()) {
        throw new Error("Invalid message data");
      }

      const message = await this._messageRepo.createMessage({
        chatId: new mongoose.Types.ObjectId(chatId),
        sender: new mongoose.Types.ObjectId(senderId),
        content,
        timestamp: new Date(),
      });

      return message;
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  }

  async getMessagesByChatId(chatId: string): Promise<IMessage[]> {
    try {
      return await this._messageRepo.getMessagesByChatId(chatId);
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }

  async getUserChats(userId: string): Promise<IChat[]> {
    try {
     return   this._chatRepo.getChatsByUser(userId);
      
    } catch (error) {
      console.log("error : ",error);
      throw error;
    }
  }
}
