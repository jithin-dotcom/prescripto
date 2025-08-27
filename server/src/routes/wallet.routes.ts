

import { Router } from "express";
import { WalletRepository } from "../repositories/implementation/wallet.repository";
import { WalletHistoryRepository } from "../repositories/implementation/walletHistory.repository";
import { WalletService } from "../services/implementation/wallet.services";
import { WalletController } from "../controllers/implementation/wallet.controller";
import { AppointmentRepository } from "../repositories/implementation/appointment.repositories";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import { ChatRepository } from "../repositories/implementation/chat.repositories";
import { PaymentRepository } from "../repositories/implementation/payment.repositories";
import { checkRole } from "../middlewares/role.middleware";


const router = Router();
const walletRepository = new WalletRepository();
const walletHistoryRepository = new WalletHistoryRepository();
const appointmentRepository = new AppointmentRepository();
const chatRepository = new ChatRepository()
const paymentRepository = new PaymentRepository()
const walletService = new WalletService(walletRepository, walletHistoryRepository, appointmentRepository, chatRepository, paymentRepository);
const walletController = new WalletController(walletService);

router.use(verifyAccessToken);

router.get("/get-wallet", checkRole("user","doctor"), walletController.getWallet.bind(walletController));
router.get("/wallet-payment/:appointmentId", checkRole("user"), walletController.makeWalletPayment.bind(walletController));

export default router;



