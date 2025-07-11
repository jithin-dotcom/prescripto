

import { Router } from "express";
import { AppointmentRepository } from "../repositories/implementation/appointment.repositories";
import { AppointmentService } from "../services/implementation/appointment.services";
import { AppointmentController } from "../controllers/implementation/appointment.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";

const router = Router();


const appointmentRepository = new AppointmentRepository();
const appointmentService = new AppointmentService(appointmentRepository);
const appointmentController = new AppointmentController(appointmentService);


router.use(verifyAccessToken);


router.post("/create-appointment",appointmentController.createAppointment.bind(appointmentController));

// (Optional: Later you can add these)
// router.get("/user/:userId", appointmentController.getUserAppointments.bind(appointmentController));
// router.get("/doctor/:doctorId", appointmentController.getDoctorAppointments.bind(appointmentController));
// router.patch("/cancel/:appointmentId", appointmentController.cancelAppointment.bind(appointmentController));

export default router;
