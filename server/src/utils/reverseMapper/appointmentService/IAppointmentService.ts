


export interface CreateAppointmentDTO {
  userId: string; 
  doctorId: string;
  day: string;  
  time: string; 
  transactionId?: string;
}

export interface AppointmentDTO {
  id: string;
  userId: string;
  doctorId: string;
  day: string;
  time: string;
  fee?: number;
  appointmentNo: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  payment: "paid" | "not paid" | "refund";
  method?: string;
  createdAt: Date;
  updatedAt: Date;
}
