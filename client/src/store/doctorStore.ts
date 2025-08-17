


import { create } from "zustand";

interface DoctorData {
  name: string;
  photo: string;
  fee: number;
  isVerified: boolean;
  isBlocked: boolean;
  educationDetails: string;
  specialization: string;
  yearOfExperience: number;
}

interface DoctorState {
  doctorData: DoctorData | null;
  setDoctorData: (data: DoctorData) => void;
  clearDoctorData: () => void;
}

export const useDoctorStore = create<DoctorState>((set) => ({
  doctorData: null,

  setDoctorData: (data) => set({ doctorData: data }),

  clearDoctorData: () => set({ doctorData: null }),
}));
