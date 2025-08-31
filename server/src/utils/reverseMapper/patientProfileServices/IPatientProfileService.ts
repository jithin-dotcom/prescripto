


export interface PatientProfileDTO {
  dateOfBirth: string;
  gender: "male" | "female" | "others";
  houseName: string;
  city: string;
  state: string;
  country: string;
  pin: number;
}
