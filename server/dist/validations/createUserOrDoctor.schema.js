"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserOrDoctorSchema = void 0;
const zod_1 = require("zod");
const doctorProfile_schema_1 = require("../validations/doctorProfile.schema");
const patientProfile_schema_1 = require("../validations/patientProfile.schema");
const auth_schema_1 = require("../validations/auth.schema");
exports.createUserOrDoctorSchema = zod_1.z.object({
    userData: auth_schema_1.signupSchema,
    profileData: zod_1.z.any(),
}).superRefine((data, ctx) => {
    if (data.userData.role === "doctor") {
        const result = doctorProfile_schema_1.doctorProfileSchema.safeParse(data.profileData);
        if (!result.success) {
            for (const issue of result.error.issues) {
                ctx.addIssue(issue);
            }
        }
    }
    else if (data.userData.role === "user") {
        const result = patientProfile_schema_1.patientProfileSchema.safeParse(data.profileData);
        if (!result.success) {
            for (const issue of result.error.issues) {
                ctx.addIssue(issue);
            }
        }
    }
});
