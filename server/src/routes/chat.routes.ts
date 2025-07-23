

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


router.use(verifyAccessToken);


router.get("/messages/:appointmentId", chatController.getChatMessages.bind(chatController));

router.get("/my-chats",chatController.getUserChats.bind(chatController));


export default router;
