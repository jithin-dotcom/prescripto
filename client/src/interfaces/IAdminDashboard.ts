


export interface Appointment {
  _id: string;
  appointmentNo: string;
  date: string;
  time: string;
  status: "confirmed" | "cancelled" | "pending" | "completed";
  payment: "paid" | "refund" | "not paid";
  method?: string;
  fee: number;
  doctor: {
    _id: string;
    name: string;
    email: string;
    fee: number;
    photo: string;
    specialization: string;
    educationDetails: string;
    yearOfExperience: number;
    isVerified: boolean;
    isBlocked: boolean;
  };
  user: {
    _id: string;
    name: string;
    email: string;
    photo: string;
    gender: "male" | "female" | "other";
    dateOfBirth: string;
    city: string;
    state: string;
    country: string;
    houseName: string;
    isVerified: boolean;
    isBlocked: boolean;
  };
}

export interface Stats {
  totalUsers: number;
  totalDoctors: number;
  appointmentsConfirmed: number;
  appointmentsCancelled: number;
  appointmentsPending: number;
  appointmentsCompleted: number;
  revenueToday: number;
  revenueThisMonth: number;
}

export interface FilterOption {
  value: "all" | "daily" | "weekly" | "monthly" | "next7days";
  label: string;
}


interface RevenueByDate {
  date: string;
  revenue: number;
}

interface RevenueByName {
  name: string;
  revenue: number;
}

export interface RevenueBreakdown {
  byDate: RevenueByDate[];
  byDoctor: RevenueByName[];
  bySpecialization: RevenueByName[];
}