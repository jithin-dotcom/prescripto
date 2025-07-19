

// import { IChat } from "../../models/chat/IChat";
// import { IMessage } from "../../models/message/IMessage";
// import mongoose from "mongoose";

// export interface IChatService {
//   findOrCreateChat(
//     appointmentId: string,
//     user: { _id: string; role: string }
//   ): Promise<IChat>;

//   createMessage(
//     chatId: mongoose.Types.ObjectId,
//     senderId: string,
//     content: string,
//     type: "text" | "image"
//   ): Promise<IMessage>;

//   endChat(appointmentId: string): Promise<void>;
// }





import { IChat } from "../../models/chat/IChat";
import { IMessage } from "../../models/message/IMessage";

export interface IChatService {
  createChat(appointmentId: string, participants: string[]): Promise<IChat>;
  deactivateChat(appointmentId: string): Promise<void>;
  getChatByAppointmentId(appointmentId: string): Promise<IChat | null>;

  createMessage(chatId: string, senderId: string, content: string): Promise<IMessage>;
  getMessagesByChatId(chatId: string): Promise<IMessage[]>;
}
