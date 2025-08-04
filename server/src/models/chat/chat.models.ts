import { Schema, model } from "mongoose";
import { IChat, ILastMessage } from "./IChat";



const lastMessageSchema = new Schema<ILastMessage>(
  {
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }, 
  },
  { _id: false } 
);



const chatSchema = new Schema<IChat>(
  {
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      unique: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastMessage: {
       type: lastMessageSchema,
       require: false,
    },
   
  },
  { timestamps: true }
);

export const Chat = model<IChat>("Chat", chatSchema);
