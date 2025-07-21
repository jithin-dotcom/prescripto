

export interface Doctor {
  _id: string;
  name: string;
  email: string;
  photo: string;
  specialization: string;
  educationDetails: string;
  fee: number;
}

export interface Appointment {
  _id: string;
  doctor: Doctor;
  userId: string;
  date: string;
  day?:string
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  payment: "paid" | "not paid" | "refund";
  appointmentNo?: number;
  transactionId?: string;
}