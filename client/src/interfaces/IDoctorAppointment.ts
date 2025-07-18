

export interface Appointment {
  _id: string;
  doctorId: string;
  appointmentNo: number;
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
  payment: "paid" | "not paid" | "refund";
}