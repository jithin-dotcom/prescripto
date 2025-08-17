

export interface IMed {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface IPrescription {
  diagnosis: string;
  notes: string;
  followUpDate?: string;
  medicines: IMed[];
}