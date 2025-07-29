

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
  _id: string;
  name: string;
  profilePhoto: string;
  specialization: string;
  educationDetails: string;
  fee: number;
  about: string;
  isVerified: boolean;
  yearOfExperience: number;
  averageRating?: number;
  ratingCount?: number;
  availability: Availability[];
  slotDuration: number;
}