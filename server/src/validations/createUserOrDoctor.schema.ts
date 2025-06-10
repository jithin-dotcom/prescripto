
import { z } from "zod";

import { doctorProfileSchema } from "../validations/doctorProfile.schema";
import { patientProfileSchema } from "../validations/patientProfile.schema"; 
import { signupSchema } from "../validations/auth.schema"; 

export const createUserOrDoctorSchema = z.object({
  userData: signupSchema,
  profileData: z.any(), 
}).superRefine((data, ctx) => {
  if (data.userData.role === "doctor") {
    const result = doctorProfileSchema.safeParse(data.profileData);
    if (!result.success) {
      for (const issue of result.error.issues) {
        ctx.addIssue(issue);
      }
    }
  } else if (data.userData.role === "user") {
    const result = patientProfileSchema.safeParse(data.profileData);
    if (!result.success) {
      for (const issue of result.error.issues) {
        ctx.addIssue(issue);
      }
    }
  }
});