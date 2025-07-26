


export interface Participant {
  _id: string;
  name: string;
  photo: string;
}

export interface ChatListItem {
  _id: string;
  appointmentId: Appointment;
  doctorId: Participant;
  userId: Participant;
  lastMessage?: string;
  timestamp: string;
}

export interface Message {
  _id: string;
  sender: string;
  content: string;
  type: "text" | "image";
  read: boolean;
  timestamp: string | number;
}

export interface Appointment {
  _id: string;
  day: string;
  time: string;
  status?: string;
}