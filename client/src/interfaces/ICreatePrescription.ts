

export interface IAppointmentWithUserResponse {
  _id: string;
  doctorId: string;
  user: {
    _id: string;
    name: string;
    email: string;
    photo?: string;
    isVerified: boolean;
    isBlocked: boolean;
    dateOfBirth: string;
    gender?: string;
    houseName?: string;
    city?: string;
    state?: string;
    country?: string;
    pin?: number;
  };
  fee: number;
  date: string;
  time: string;
  appointmentNo: number;
  status: string;
  payment: string;
  transactionId?: string;
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}