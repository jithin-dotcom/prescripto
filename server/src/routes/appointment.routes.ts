

import { Router } from "express";
import { AppointmentRepository } from "../repositories/implementation/appointment.repositories";
import { AppointmentService } from "../services/implementation/appointment.services";
import { AppointmentController } from "../controllers/implementation/appointment.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import { DoctorProfileRepository } from "../repositories/implementation/doctorProfile.repositories";
import { PatientProfileRepository } from "../repositories/implementation/patientProfile.repositories";

const router = Router();


const appointmentRepository = new AppointmentRepository();
const doctorProfileRepository = new DoctorProfileRepository();
const patientProfileRepository = new PatientProfileRepository();
const appointmentService = new AppointmentService(appointmentRepository,doctorProfileRepository,patientProfileRepository);
const appointmentController = new AppointmentController(appointmentService);


router.use(verifyAccessToken);


router.post("/create-appointment",appointmentController.createAppointment.bind(appointmentController));

router.get("/user-appointments/:userId", appointmentController.getUserAppointments.bind(appointmentController));
router.get("/doctor-appointments", appointmentController.getDoctorAppointments.bind(appointmentController));
// router.patch("/cancel/:appointmentId", appointmentController.cancelAppointment.bind(appointmentController));

export default router;
