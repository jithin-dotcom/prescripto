

export interface Appointment {
  _id: string;
  doctorId: string;
  user: {
    _id: string;
    name: string;
    email: string;
    photo?: string;
    dateOfBirth?: string;
  };
  fee: number;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
}