

export interface Appointment {
  _id: string;
  appointmentNo: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  payment: "paid" | "refund" | "not paid";
  fee: number;
  doctorId: string;
  user: {
    name: string;
    photo?: string;
    dateOfBirth: string;
    gender: "male" | "female" | "other";
  };
}

export interface Rating {
  rating: number;
  review: string;
  time: string;
  userName: string;
}

export interface Stats {
  totalAppointments: number;
  completedConsultations: number;
  pendingAppointments: number;
  totalEarnings: number;
  averageRating: number;
  totalReviews: number;
}

export interface FilterOption {
  value: "all" | "last7days" | "last30days" | "today" | "tomorrow" | "next7days";
  label: string;
}