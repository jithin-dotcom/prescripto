


export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface ICurrentData {
    diagnosis:string;
    notes: string;
    followUpDate: string;
    medicine: Medicine[];
}