

import { IMessage } from "../../models/message/IMessage";
import { Document } from "mongoose";

export interface IMessageRepository {
  createMessage(data: Partial<IMessage>): Promise<IMessage & Document>;
  getMessagesByChatId(chatId: string): Promise<(IMessage & Document)[]>;
}
