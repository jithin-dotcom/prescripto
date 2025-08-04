

import { Request, Response, NextFunction } from "express";
import { IChatService } from "../../services/interface/IChatService";
import { IChatController } from "../interface/IChatController";
import { StatusCode } from "../../constants/statusCode.enum";
import { StatusMessage } from "../../constants/statusMessage";


export class ChatController implements IChatController {
  constructor(private _chatService: IChatService) {}

  
  async getChatMessages(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const { appointmentId } = req.params;
      const chat = await this._chatService.getChatByAppointmentId(appointmentId);

      if (!chat) {
         res.status(StatusCode.NOT_FOUND).json({ message: "Chat not found in controller" });
         return;
      }

      const messages = await this._chatService.getMessagesByChatId(chat._id.toString());
      res.status(StatusCode.OK).json({ chatId: chat._id, messages });
    } catch (err) {
      console.error("Error fetching chat messages:", err);
      res.status(500).json({ message: StatusMessage.INTERNAL_SERVER_ERROR });
    }
  };

   async getUserChats(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      console.log("entered into getUserChat controller");
      const userId = req.user?.id;
      console.log("user Id : ",userId);
      if (!userId){
         res.status(StatusCode.UNAUTHORIZED).json({ message: StatusMessage.UNAUTHORIZED });
         return;
      } 

      const chats = await this._chatService.getUserChats(userId);
     
      res.status(StatusCode.OK).json({ chats });
    } catch (error) {
      console.error("Error getting chats:", error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: StatusMessage.INTERNAL_SERVER_ERROR });
      
    }
  };
}
