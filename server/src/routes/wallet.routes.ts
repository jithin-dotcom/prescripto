

import { Router } from "express";
import { WalletRepository } from "../repositories/implementation/wallet.repository";
import { WalletHistoryRepository } from "../repositories/implementation/walletHistory.repository";
import { WalletService } from "../services/implementation/wallet.services";
import { WalletController } from "../controllers/implementation/wallet.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";


const router = Router();
const walletRepository = new WalletRepository();
const walletHistoryRepository = new WalletHistoryRepository();
const walletService = new WalletService(walletRepository, walletHistoryRepository);
const walletController = new WalletController(walletService);

router.use(verifyAccessToken);

router.get("/get-wallet",walletController.getWallet.bind(walletController));

export default router;



