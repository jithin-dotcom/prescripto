"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prescriptionSchema = void 0;
const zod_1 = require("zod");
exports.prescriptionSchema = zod_1.z.object({
    appointmentId: zod_1.z.string().min(1, "Appointment ID is required"),
    doctorId: zod_1.z.string().min(1, "Doctor ID is required"),
    patientId: zod_1.z.string().min(1, "Patient ID is required"),
    diagnosis: zod_1.z.string().min(1, "Diagnosis is required"),
    notes: zod_1.z.string().min(1, "Notes are required"),
    medicines: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string().min(1, "Medicine name is required"),
        dosage: zod_1.z.string().min(1, "Dosage is required"),
        frequency: zod_1.z.string().min(1, "Frequency is required"),
        duration: zod_1.z.string().min(1, "Duration is required"),
        instructions: zod_1.z.string().min(1, "Instruction is required"),
    })),
    followUpDate: zod_1.z.coerce.date().optional(),
});
