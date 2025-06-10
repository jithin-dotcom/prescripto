

import { Document, Types } from "mongoose";

export interface IRefreshToken extends Document {
  userId: Types.ObjectId;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}