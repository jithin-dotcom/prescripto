

// import { IChat } from "../../models/chat/IChat";
// import { IMessage } from "../../models/message/IMessage";
// import { IChatService } from "../interface/IChatService";
// import { IChatRepository } from "../../repositories/interface/IChatRepository";
// import { IMessageRepository } from "../../repositories/interface/IMessageRepository";
// import mongoose from "mongoose";
// import { uploadToCloudinary } from "../../config/cloudinary";

// export class ChatService implements IChatService {
//   constructor(
//     private _chatRepo: IChatRepository,
//     private _messageRepo: IMessageRepository
//   ) {}

//   async createChat(appointmentId: string, participants: string[]): Promise<IChat> {
//     try {
//       if (!appointmentId || participants.length < 2) {
//         throw new Error("Invalid appointment ID or participants");
//       }

//       const existing = await this._chatRepo.findByAppointmentId(appointmentId);
//       if (existing) {
//         throw new Error("Chat already exists for this appointment");
//       }

//       const chat = await this._chatRepo.createChat({
//         appointmentId: new mongoose.Types.ObjectId(appointmentId),
//         participants: participants.map(id => new mongoose.Types.ObjectId(id)),
//         isActive: true,
//       });

//       return chat;
//     } catch (error) {
//       console.error("Error creating chat:", error);
//       throw error;
//     }
//   }

//   async deactivateChat(appointmentId: string): Promise<void> {
//     try {
//       await this._chatRepo.deactivateChat(appointmentId);
//     } catch (error) {
//       console.error("Error deactivating chat:", error);
//       throw error;
//     }
//   }

//   async getChatByAppointmentId(appointmentId: string): Promise<IChat | null> {
//     try {
//       return await this._chatRepo.findByAppointmentId(appointmentId);
//     } catch (error) {
//       console.error("Error fetching chat:", error);
//       throw error;
//     }
//   }

//   async createMessage(chatId: string, senderId: string, content: string): Promise<IMessage> {
//     try {
//       if (!chatId || !senderId || !content.trim()) {
//         throw new Error("Invalid message data");
//       }

//       const message = await this._messageRepo.createMessage({
//         chatId: new mongoose.Types.ObjectId(chatId),
//         sender: new mongoose.Types.ObjectId(senderId),
//         content,
//         timestamp: new Date(),
//       });

//       return message;
//     } catch (error) {
//       console.error("Error creating message:", error);
//       throw error;
//     }
//   }

//   async getMessagesByChatId(chatId: string): Promise<IMessage[]> {
//     try {
//       return await this._messageRepo.getMessagesByChatId(chatId);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       throw error;
//     }
//   }

//   async getUserChats(userId: string): Promise<IChat[]> {
//     try {
//      return   this._chatRepo.getChatsByUser(userId);
      
//     } catch (error) {
//       console.log("error : ",error);
//       throw error;
//     }
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
    public _chatRepo: IChatRepository,
    public _messageRepo: IMessageRepository
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
        participants: participants.map((id) => new mongoose.Types.ObjectId(id)),
        isActive: true,
        doctorId: new mongoose.Types.ObjectId(participants[0]),
        userId: new mongoose.Types.ObjectId(participants[1]),
      });

      return chat;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  }

  async deactivateChat(appointmentId: string): Promise<void> {
    try {
      const result = await this._chatRepo.deactivateChat(appointmentId);
      if (!result) {
        throw new Error("Chat not found or could not be deactivated");
      }
    } catch (error) {
      console.error("Error deactivating chat:", error);
      throw error;
    }
  }

  async getChatByAppointmentId(appointmentId: string): Promise<IChat | null> {
    try {
      return await this._chatRepo.findByAppointmentId(appointmentId);
      // return await this._chatRepo.findById(chatId);
    } catch (error) {
      console.error("Error fetching chat:", error);
      throw error;
    }
  }

  async getChatById(chatId: string): Promise<IChat | null> {
    try {
      // return await this._chatRepo.findByAppointmentId(appointmentId);
      return await this._chatRepo.findById(chatId);
    } catch (error) {
      console.error("Error fetching chat:", error);
      throw error;
    }
  }

  async createMessage(
    chatId: string,
    senderId: string,
    content: string,
    type: "text" | "image"
  ): Promise<IMessage> {
    try {
      if (!chatId || !senderId || !content.trim()) {
        throw new Error("Invalid message data");
      }

      const message = await this._messageRepo.createMessage({
        chatId: new mongoose.Types.ObjectId(chatId),
        sender: new mongoose.Types.ObjectId(senderId),
        content,
        type,
        timestamp: new Date(),
        read: false,
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
      return await this._chatRepo.getChatsByUser(userId);
    } catch (error) {
      console.error("Error fetching user chats:", error);
      throw error;
    }
  }

  async markMessagesAsRead(chatId: string, readerId: string): Promise<void> {
    try {
      await this._messageRepo.markAsRead(chatId, readerId);
    } catch (error) {
      console.error("Error marking messages as read:", error);
      throw error;
    }
  }

  async getReadMessages(chatId: string, readerId: string): Promise<IMessage[]> {
    try {
      return await this._messageRepo.getReadMessages(chatId, readerId);
    } catch (error) {
      console.error("Error fetching read messages:", error);
      throw error;
    }
  }
}



