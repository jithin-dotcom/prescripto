

import { Router } from "express";
import { ChatRepository } from "../repositories/implementation/chat.repositories";
import { ChatService } from "../services/implementation/chat.services";
import { ChatController } from "../controllers/implementation/chat.controller";
import { MessageRepository } from "../repositories/implementation/message.repositories";
import { verifyAccessToken } from "../middlewares/auth.middleware";

const router = Router();

// Instantiate repo, service, and controller
const chatRepository = new ChatRepository();
const messageRepository = new MessageRepository();
const chatService = new ChatService(chatRepository, messageRepository);
const chatController = new ChatController(chatService);

// Protect all chat routes with access token middleware
router.use(verifyAccessToken);

// GET /messages/:appointmentId → Get previous messages of a chat
router.get("/messages/:appointmentId", chatController.getChatMessages.bind(chatController));

// (Later you can add more like POST /send-message, etc.)

export default router;
