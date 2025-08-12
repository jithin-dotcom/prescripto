"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const razorpay_1 = __importDefault(require("razorpay"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const payment_repositories_1 = require("../repositories/implementation/payment.repositories");
const payment_services_1 = require("../services/implementation/payment.services");
const payment_controller_1 = require("../controllers/implementation/payment.controller");
const appointment_repositories_1 = require("../repositories/implementation/appointment.repositories");
const wallet_repository_1 = require("../repositories/implementation/wallet.repository");
const walletHistory_repository_1 = require("../repositories/implementation/walletHistory.repository");
const chat_repositories_1 = require("../repositories/implementation/chat.repositories");
const payout_repositories_1 = require("../repositories/implementation/payout.repositories");
const router = (0, express_1.Router)();
const razorpayInstance = new razorpay_1.default({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});
const paymentRepository = new payment_repositories_1.PaymentRepository();
const appointmentRepository = new appointment_repositories_1.AppointmentRepository();
const walletRepository = new wallet_repository_1.WalletRepository();
const walletHistoryRepository = new walletHistory_repository_1.WalletHistoryRepository();
const chatRepository = new chat_repositories_1.ChatRepository();
const payoutRepository = new payout_repositories_1.PayoutRepository();
const paymentService = new payment_services_1.PaymentService(paymentRepository, razorpayInstance, appointmentRepository, walletRepository, walletHistoryRepository, chatRepository, payoutRepository);
const paymentController = new payment_controller_1.PaymentController(paymentService);
router.use(auth_middleware_1.verifyAccessToken);
router.post("/create-order", paymentController.createRazorpayOrder.bind(paymentController));
router.post("/verify", paymentController.verifyPaymentSignature.bind(paymentController));
router.get("/get-payment/:appointmentId", paymentController.getPaymentRecept.bind(paymentController));
router.post("/create-payout", paymentController.createPayout.bind(paymentController));
router.get("/get-allPayout", paymentController.getPayouts.bind(paymentController));
router.get("/get-doctorPayout", paymentController.getDoctorPayouts.bind(paymentController));
router.post("/initiate-payout", paymentController.initiatePayout.bind(paymentController));
exports.default = router;
