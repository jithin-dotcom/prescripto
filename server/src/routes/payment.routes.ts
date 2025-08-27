

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
import { checkRole } from "../middlewares/role.middleware";


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
const paymentService = new PaymentService(paymentRepository, razorpayInstance, appointmentRepository, walletRepository, walletHistoryRepository, chatRepository, payoutRepository);
const paymentController = new PaymentController(paymentService);


router.use(verifyAccessToken);


router.post("/create-order", checkRole("user"), paymentController.createRazorpayOrder.bind(paymentController));
router.post("/verify", checkRole("user"), paymentController.verifyPaymentSignature.bind(paymentController));
router.get("/get-payment/:appointmentId", checkRole("user"), paymentController.getPaymentRecept.bind(paymentController));
router.post("/create-payout", checkRole("doctor"), paymentController.createPayout.bind(paymentController));
router.get("/get-allPayout", checkRole("admin"), paymentController.getPayouts.bind(paymentController));
router.get("/get-doctorPayout", checkRole("doctor"), paymentController.getDoctorPayouts.bind(paymentController));
router.post("/initiate-payout", checkRole("admin"), paymentController.initiatePayout.bind(paymentController));

export default router;
