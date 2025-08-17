

import { IChat } from "../../models/chat/IChat";
import { IMessage } from "../../models/message/IMessage";
import { ChatDTO, IChatService, IMessageClean } from "../interface/IChatService";
import { IChatRepository } from "../../repositories/interface/IChatRepository";
import { IMessageRepository } from "../../repositories/interface/IMessageRepository";
import mongoose from "mongoose";
import { mapMessagesClean, mapToChatDTO} from "../../utils/mapper/chatService.mapper";

export class ChatService implements IChatService {
  constructor(
    public _chatRepo: IChatRepository,
    public _messageRepo: IMessageRepository
  ) {}

  async createChat(appointmentId: string, participants: string[]): Promise<ChatDTO | null> {
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

      
      return mapToChatDTO(chat);
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

  async getChatByAppointmentId(appointmentId: string): Promise<ChatDTO | null> {
    try {
      const result =  await this._chatRepo.findByAppointmentId(appointmentId);
      if(!result){
        return null;
      }
    
      return mapToChatDTO(result);
    } catch (error) {
      console.error("Error fetching chat:", error);
      throw error;
    }
  }

  async getChatById(chatId: string): Promise<ChatDTO | null> {
    try {
     
      const result =  await this._chatRepo.findById(chatId);
      
      return result ? mapToChatDTO(result) : null;
      
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

      const updateChat = await this._chatRepo.updateById(chatId,{lastMessage:{
        content,
      }});
     
      return message;
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  }

  async getMessagesByChatId(chatId: string): Promise<IMessageClean[]> {
    try {
      const result =  await this._messageRepo.getMessagesByChatId(chatId);

      return mapMessagesClean(result);
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }

  async getUserChats(userId: string): Promise<IChat[]> {
    try {
      
      const result =  await this._chatRepo.getChatsByUser(userId);
  
      console.log("result getUserChat : ",result);
      return result;
      
      
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

  async getReadMessages(chatId: string, readerId: string): Promise<IMessageClean[]> {
    try {
      const result =  await this._messageRepo.getReadMessages(chatId, readerId);
      return mapMessagesClean(result);
    } catch (error) {
      console.error("Error fetching read messages:", error);
      throw error;
    }
  }

  
}



