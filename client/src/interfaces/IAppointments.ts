

export interface Slot {
  day: string;
  date: string;
  times: string[];
}

export interface TimeBlock {
  from: string; 
  to: string;   
}


export interface Availability {
  day: string; 
  slots: TimeBlock[];
}



export interface DoctorProfile {
  name: string;
  profilePhoto: string;
  specialization: string;
  educationDetails: string;
  fee: number;
  about: string;
  isVerified: boolean;
  yearOfExperience: number;
  availability: Availability[];
  slotDuration: number;
}