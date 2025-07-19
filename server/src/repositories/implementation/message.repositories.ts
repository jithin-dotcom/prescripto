

import { Message } from "../../models/message/message.models";
import { IMessageRepository } from "../interface/IMessageRepository";
import { IMessage } from "../../models/message/IMessage";
import { BaseRepository } from "./base.repositories";
import { Document } from "mongoose";

export class MessageRepository extends BaseRepository<IMessage & Document> implements IMessageRepository {
  constructor() {
    super(Message);
  }

  async createMessage(data: Partial<IMessage>): Promise<IMessage & Document> {
    return await this.model.create(data);
  }

  async getMessagesByChatId(chatId: string): Promise<(IMessage & Document)[]> {
    return await this.model.find({ chatId }).sort({ timestamp: 1 }); 
  }
}
