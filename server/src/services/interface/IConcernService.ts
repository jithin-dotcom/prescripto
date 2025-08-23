

import { IConcern } from "../../models/concern/IConcern";

export interface IConcernService {
    createConcern(data: Partial<IConcern>): Promise<{success: true}>;
    changeConcernStatus(id: string, status: "resolved" | "rejected", reason: string): Promise<{message: string}>;
    getAllConcerns(page: number, limit: number, search: string, status: string): Promise<{ data: IConcernPopulated[]; total: number; page: number; pages: number }>;
    getConcernByUser(id: string, role: string, page: number, limit: number,  search: string, status: string): Promise<{
      data: IConcernPopulated[];
      total: number;
      page: number;
      pages: number;
    }>
}









export interface IConcernPopulated {
  _id: string;
  appointmentId: {
    _id: string;
    userId: string;
    doctorId: string;
    appointmentNo: number;
    day: string;
    time: string;
    status: string;
    fee: number;
    payment: string;
    createdAt: string; 
    updatedAt: string;
  };
  userId: {
    _id: string;
    name: string;
    email: string;
    role: string;
    isVerified: boolean;
    authProvider: string;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
    photo?: string;
  };
  doctorName: string;
  doctorId: {
    _id: string;
    name: string;
    email: string;
    role: string;
    isVerified: boolean;
    authProvider: string;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
    photo?: string;
  };
  title: string;
  description: string;
  status: "pending" | "resolved" | "rejected";
  reason?: string;
  createdAt: string;
  updatedAt: string;
}
