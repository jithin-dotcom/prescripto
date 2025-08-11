


import { IChat } from "../../models/chat/IChat";
import { IMessage } from "../../models/message/IMessage";

export interface IChatService {
  createChat(appointmentId: string, participants: string[]): Promise<ChatDTO | null>;
  deactivateChat(appointmentId: string): Promise<void>;
  getChatByAppointmentId(appointmentId: string): Promise<ChatDTO | null>;
  createMessage(chatId: string, senderId: string, content: string, type?: string): Promise<IMessage>;
  getMessagesByChatId(chatId: string): Promise<IMessageClean[]>;
  getUserChats(userId: string): Promise<IChat[]>;
  markMessagesAsRead(chatId: string, readerId: string): Promise<void>;
  getReadMessages(chatId: string, readerId: string): Promise<IMessageClean[]>;
  
}




export interface ChatDTO {
  _id: string;
  appointmentId: string;
  doctorId: string;
  userId: string;
  participants: string[];
  isActive: boolean;
  createdAt: Date;
  lastMessage: {
    content?: string;
    timestamp?: Date;
  };
}



export interface IMessageClean {
  _id: string;
  chatId: string;
  sender: string;
  type: string;
  content: string;
  read: boolean;
  timestamp: Date;
}






