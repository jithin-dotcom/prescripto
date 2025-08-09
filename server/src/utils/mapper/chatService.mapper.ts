


import { ChatDTO, IMessageClean } from "../../services/interface/IChatService";
import { IChat } from "../../models/chat/IChat"; 
import { IMessage } from "../../models/message/IMessage";
import mongoose from "mongoose";
// import { GetUserChatCleanResponse,  } from "../../services/interface/IChatService";
// import { ObjectId } from "mongoose";

export function mapToChatDTO(chat: IChat): ChatDTO {
  return {
    _id: chat._id.toString(),
    appointmentId: chat.appointmentId.toString(),
    doctorId: chat.doctorId.toString(),
    userId: chat.userId.toString(),
    participants: chat.participants.map(p => p.toString()),
    isActive: chat.isActive,
    createdAt: chat.createdAt,
    lastMessage: {
      content: chat.lastMessage?.content,
      timestamp: chat.lastMessage?.timestamp,
    }
  };
}




export function mapMessagesClean(messages: IMessage[]): IMessageClean[] {
  return messages.map(msg => ({
    _id: (msg._id as mongoose.Types.ObjectId).toString(),
    chatId: (msg.chatId as mongoose.Types.ObjectId).toString(),
    sender: (msg.sender as mongoose.Types.ObjectId).toString(),
    type: msg.type,
    content: msg.content,
    read: msg.read,
    timestamp: msg.timestamp
  }));
}













// type IChatPopulated = Omit<IChat, 'appointmentId' | 'doctorId' | 'userId'> & {
//   appointmentId: {
//     _id: ObjectId;
//     userId: ObjectId;
//     doctorId: ObjectId;
//     appointmentNo: number;
//     day: string;
//     time: string;
//     status: string;
//     fee: number;
//     payment: string;
//     createdAt: Date;
//   };
//   doctorId: {
//     _id: ObjectId;
//     name: string;
//     photo: string;
//   };
//   userId: {
//     _id: ObjectId;
//     name: string;
//     photo: string;
//   };
// };

// export function mapUserChatsCleanDTO(chats: IChatPopulated[]): GetUserChatCleanResponse {
//   return chats.map(chat => ({
//     _id: chat._id.toString(),
//     appointmentId: {
//       _id: chat.appointmentId._id.toString(),
//       userId: chat.appointmentId.userId.toString(),
//       doctorId: chat.appointmentId.doctorId.toString(),
//       appointmentNo: chat.appointmentId.appointmentNo,
//       day: chat.appointmentId.day,
//       time: chat.appointmentId.time,
//       status: chat.appointmentId.status as "confirmed" | "pending" | "cancelled",
//       fee: chat.appointmentId.fee,
//       payment: chat.appointmentId.payment as "paid" | "unpaid",
//       createdAt: chat.appointmentId.createdAt.toISOString()
//     },
//     doctorId: {
//       _id: chat.doctorId._id.toString(),
//       name: chat.doctorId.name,
//       photo: chat.doctorId.photo
//     },
//     userId: {
//       _id: chat.userId._id.toString(),
//       name: chat.userId.name,
//       photo: chat.userId.photo
//     },
//     participants: chat.participants.map(p => p.toString()),
//     isActive: chat.isActive,
//     createdAt: chat.createdAt.toISOString(),
//     lastMessage: chat.lastMessage
//       ? {
//           content: chat.lastMessage.content,
//           timestamp: new Date(chat.lastMessage.timestamp).toISOString()
//         }
//       : undefined
//   }));
// }


