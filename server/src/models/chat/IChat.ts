

import mongoose, { Document, Types} from "mongoose";



export interface ILastMessage {
  content: string;
  timestamp: Date; 
}



export interface IChat extends Document {
    _id: mongoose.Types.ObjectId;
    appointmentId: mongoose.Types.ObjectId;
    doctorId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    isActive: boolean;
    participants: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    lastMessage?: ILastMessage;
    // lastSeenUser?: Date;
    // lastSeenDoctor?: Date;
}