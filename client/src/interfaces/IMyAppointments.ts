

export interface Doctor {
  _id: string;
  name: string;
  email: string;
  photo: string;
  specialization: string;
  educationDetails: string;
}

export interface Appointment {
  _id: string;
  doctor: Doctor;
  userId: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  transactionId?: string;
}