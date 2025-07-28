

import { Router } from "express";
import { AppointmentRepository } from "../repositories/implementation/appointment.repositories";
import { AppointmentService } from "../services/implementation/appointment.services";
import { AppointmentController } from "../controllers/implementation/appointment.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import { DoctorProfileRepository } from "../repositories/implementation/doctorProfile.repositories";
import { PatientProfileRepository } from "../repositories/implementation/patientProfile.repositories";
import { UserRepository } from "../repositories/implementation/user.repositories";
import { ChatRepository } from "../repositories/implementation/chat.repositories";
import { WalletRepository } from "../repositories/implementation/wallet.repository";
import { WalletHistoryRepository } from "../repositories/implementation/walletHistory.repository";

const router = Router();


const appointmentRepository = new AppointmentRepository();
const doctorProfileRepository = new DoctorProfileRepository();
const patientProfileRepository = new PatientProfileRepository();
const chatRepository = new ChatRepository();
const userRepository = new UserRepository();
const walletRepository = new WalletRepository();
const walletHistoryRepository = new WalletHistoryRepository();
const appointmentService = new AppointmentService(
    appointmentRepository,
    doctorProfileRepository,
    patientProfileRepository, 
    userRepository, 
    chatRepository,
    walletRepository,
    walletHistoryRepository,
);
const appointmentController = new AppointmentController(appointmentService);


router.use(verifyAccessToken);


router.post("/create-appointment",appointmentController.createAppointment.bind(appointmentController));
router.get("/all-createAppointments/:doctorId",appointmentController.getCreateAppointment.bind(appointmentController));
router.get("/user-appointments/:userId", appointmentController.getUserAppointments.bind(appointmentController));
router.get("/doctor-appointments", appointmentController.getDoctorAppointments.bind(appointmentController));
router.get("/all-appointments",appointmentController.getAllAppointments.bind(appointmentController));
router.patch("/cancel-appointment/:appointmentId",appointmentController.updateStatus.bind(appointmentController));


export default router;
