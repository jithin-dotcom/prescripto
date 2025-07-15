

export interface Doctor {
  _id: string;
  name: string;
  photo: string;
  fee: number;
}

export interface User {
  _id: string;
  name: string;
  photo: string;
  dateOfBirth: string;
}

export interface Appointment {
  _id: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  doctor: Doctor;
  user: User;
}
