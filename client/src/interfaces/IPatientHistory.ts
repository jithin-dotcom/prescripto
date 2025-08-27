


export interface IMedicine {
  _id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface IAppointment {
  _id: string;
  appointmentNo: number;
  day: string;
  time: string;
}

export interface IPatient {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  photo: string;
}

export interface IPatientHistoryRecord {
  _id: string;
  appointmentId: IAppointment;
  diagnosis: string;
  followUpDate: string;
  notes: string;
  medicines: IMedicine[];
  patientId : IPatient
  
}

export interface IHistoryData {
  data: IPatientHistoryRecord[];
  total: number;
  page: number;
  limit: number;
}