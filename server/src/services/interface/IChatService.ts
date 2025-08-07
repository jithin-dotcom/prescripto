


import { IChat } from "../../models/chat/IChat";
import { IMessage } from "../../models/message/IMessage";

export interface IChatService {
  createChat(appointmentId: string, participants: string[]): Promise<IChat>;
  deactivateChat(appointmentId: string): Promise<void>;
  getChatByAppointmentId(appointmentId: string): Promise<IChat | null>;
  createMessage(chatId: string, senderId: string, content: string, type?: string): Promise<IMessage>;
  getMessagesByChatId(chatId: string): Promise<IMessage[]>;
  getUserChats(userId: string): Promise<IChat[]>;
  markMessagesAsRead(chatId: string, readerId: string): Promise<void>;
  getReadMessages(chatId: string, readerId: string): Promise<IMessage[]>;
  // onlineUserDoctor(id: string, role: string): Promise<void>;
}