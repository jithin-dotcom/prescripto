



export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  authProvider: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  photo: string;
}

export interface Appointment {
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
  __v: number;
}

export interface Concern {
  _id: string;
  appointmentId: Appointment;
  userId: User;
  doctorName: string;
  doctorId: User;
  title: string;
  description: string;
  status: "pending" | "resolved" | "rejected";
  reason: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Pagination {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface ApiResponse {
  status: string;
  data: Concern[];
  pagination: Pagination;
}