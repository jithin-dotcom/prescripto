


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
  // onlineUserDoctor(id: string, role: string): Promise<void>;
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








// export interface AppointmentClean {
//   _id: string;
//   userId: string;
//   doctorId: string;
//   appointmentNo: number;
//   day: string;
//   time: string;
//   status: "confirmed" | "pending" | "cancelled";
//   fee: number;
//   payment: "paid" | "unpaid";
//   createdAt: string;
// }

// export interface DoctorClean {
//   _id: string;
//   name: string;
//   photo: string;
// }

// export interface UserClean {
//   _id: string;
//   name: string;
//   photo: string;
// }

// export interface LastMessageClean {
//   content: string;
//   timestamp: string;
// }

// export interface ChatClean {
//   _id: string;
//   appointmentId: AppointmentClean;
//   doctorId: DoctorClean;
//   userId: UserClean;
//   participants: string[];
//   isActive: boolean;
//   createdAt: string;
//   lastMessage?: LastMessageClean;
// }

// export type GetUserChatCleanResponse = ChatClean[];
