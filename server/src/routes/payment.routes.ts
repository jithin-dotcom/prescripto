

import { Router } from "express";
import Razorpay from "razorpay";
import { verifyAccessToken } from "../middlewares/auth.middleware";

import { PaymentRepository } from "../repositories/implementation/payment.repositories";
import { PaymentService } from "../services/implementation/payment.services";
import { PaymentController } from "../controllers/implementation/payment.controller";
import { AppointmentRepository } from "../repositories/implementation/appointment.repositories";
import { WalletRepository } from "../repositories/implementation/wallet.repository";
import { WalletHistoryRepository } from "../repositories/implementation/walletHistory.repository";
import { ChatRepository } from "../repositories/implementation/chat.repositories";
import { PayoutRepository } from "../repositories/implementation/payout.repositories";
import { DoctorProfileRepository } from "../repositories/implementation/doctorProfile.repositories";


const router = Router();


const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY!,
  key_secret: process.env.RAZORPAY_SECRET_KEY!,
});


const paymentRepository = new PaymentRepository();
const appointmentRepository = new AppointmentRepository();
const walletRepository = new WalletRepository();
const walletHistoryRepository = new WalletHistoryRepository();
const chatRepository = new ChatRepository()
const payoutRepository = new PayoutRepository()
const doctorProfileRepository = new DoctorProfileRepository()
const paymentService = new PaymentService(paymentRepository, razorpayInstance, appointmentRepository, walletRepository, walletHistoryRepository, chatRepository, payoutRepository, doctorProfileRepository);
const paymentController = new PaymentController(paymentService);


router.use(verifyAccessToken);


router.post("/create-order", paymentController.createRazorpayOrder.bind(paymentController));
router.post("/verify", paymentController.verifyPaymentSignature.bind(paymentController));
router.get("/get-payment/:appointmentId", paymentController.getPaymentRecept.bind(paymentController));
router.post("/create-payout", paymentController.createPayout.bind(paymentController));
router.get("/get-allPayout", paymentController.getPayouts.bind(paymentController));
router.get("/get-doctorPayout", paymentController.getDoctorPayouts.bind(paymentController));
router.post("/initiate-payout", paymentController.initiatePayout.bind(paymentController));

export default router;
