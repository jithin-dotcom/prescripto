

import { IConcern, IConcernDocPopulated } from "../../models/concern/IConcern";

export interface IConcernService {
    createConcern(data: Partial<IConcern>): Promise<{success: true}>;
    // getAllConcerns(page: number, limit: number ): Promise<{ data: IConcern[]; total: number; page: number; pages: number }>;
    changeConcernStatus(id: string, status: "resolved" | "rejected"): Promise<{message: string}>;
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
    createdAt: string; // ISO date string
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
  createdAt: string;
  updatedAt: string;
}
