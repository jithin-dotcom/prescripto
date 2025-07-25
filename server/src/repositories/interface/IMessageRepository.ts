

// import { IMessage } from "../../models/message/IMessage";
// import { Document } from "mongoose";

// export interface IMessageRepository {
//   createMessage(data: Partial<IMessage>): Promise<IMessage & Document>;
//   getMessagesByChatId(chatId: string): Promise<(IMessage & Document)[]>;
//   getReadMessages(chatId: string, readerId: string): Promise<(IMessage & Document)[]>;
//   markAsRead(chatId: string, readerId: string): Promise<(object)> ;
// }












import { IMessage } from "../../models/message/IMessage";
import { Document } from "mongoose";

export interface IMessageRepository {
  createMessage(data: Partial<IMessage>): Promise<IMessage & Document>;
  getMessagesByChatId(chatId: string): Promise<(IMessage & Document)[]>;
  markAsRead(chatId: string, readerId: string): Promise<void>;
  getReadMessages(chatId: string, readerId: string): Promise<(IMessage & Document)[]>;
}