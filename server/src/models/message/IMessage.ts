

import mongoose,{ Document} from "mongoose";


export interface IMessage extends Document {
  chatId: mongoose.Types.ObjectId;
  sender?: mongoose.Types.ObjectId;
  type: "text" | "image";
  content: string;
  read: boolean;
  timestamp: Date;
}