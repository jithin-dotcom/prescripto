


import { ChatDTO, IMessageClean } from "../../services/interface/IChatService";
import { IChat } from "../../models/chat/IChat"; 
import { IMessage } from "../../models/message/IMessage";
import mongoose from "mongoose";


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











