

import { Socket, Namespace } from "socket.io";
import mongoose from "mongoose";
import { ChatService } from "../../services/implementation/chat.services";
import { ChatRepository } from "../../repositories/implementation/chat.repositories";
import { MessageRepository } from "../../repositories/implementation/message.repositories";



const onlineUsers = new Map<string, string>();



export const chatSocketHandler = (io: Namespace, socket: Socket) => {
  const user = socket.data.user;

  if (!user || !user.id || !user.role) {
    console.error("Socket connection rejected: User not authenticated.");
    socket.disconnect();
    return;
  }

  const chatService = new ChatService(new ChatRepository(), new MessageRepository());

  onlineUsers.set(user.id, socket.id);
  socket.broadcast.emit("user-online", user.id);



  socket.on("get-online-users", async() => {
    console.log("online users : ", onlineUsers);
    socket.emit("online-users", Array.from(onlineUsers.keys()));
   
  });

  socket.on("joinRoom", async ({ appointmentId }: { appointmentId: string }) => {
    if (!appointmentId || !mongoose.Types.ObjectId.isValid(appointmentId)) {
      socket.emit("error", { message: "Invalid appointment ID." });
      return;
    }

    try {
      socket.join(appointmentId);

      const chat = await chatService.getChatByAppointmentId(appointmentId);
      if (chat) {
        await chatService.markMessagesAsRead(chat._id.toString(), user.id);
        const updatedMessages = await chatService.getReadMessages(chat._id.toString(), user.id);
        io.to(appointmentId).emit("messagesRead", {
          chatId: chat._id,
          readerId: user.id,
          messageIds: updatedMessages.map((msg) => msg._id),
        });
      }

    } catch (error) {
      console.error("joinRoom error:", error);
      socket.emit("error", { message: "Failed to join chat room." });
    }
  });



socket.on("sendMessage", async (data: any) => {
  try {
    
    const { appointmentId, content, type, doctorId, userId } = data;

    if (!appointmentId || !content || !type || !doctorId || !userId) {
      console.warn(" Missing required fields:", { appointmentId, content, type, doctorId, userId });
      socket.emit("error", { message: "Missing required fields" });
      return;
    }

   
    if (type === "image" && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(content)) {
      console.error("Invalid image URL format:", content);
      socket.emit("error", { message: "Invalid image URL format." });
      return;
    }

   
    let chat = await chatService.getChatByAppointmentId(appointmentId);
    if (!chat) {
      chat = await chatService.createChat(appointmentId, [userId, doctorId]);
    }

    if(!chat){
       throw new Error("Failed to create chat");
    }
    const message = await chatService.createMessage(
      chat._id.toString(),
      user.id, 
      content,
      type
    );

     
    io.to(appointmentId).emit("receiveMessage", message);

  } catch (error) {
    console.error("sendMessage error:", error);
    socket.emit("error", { message: "Internal server error" });
  }
});



  socket.on("markAsRead", async ({ chatId }: { chatId: string }) => {
    if (!chatId || !mongoose.Types.ObjectId.isValid(chatId)) {
      socket.emit("error", { message: "Invalid chat ID." });
      return;
    }

    try {
          
      const chat = await chatService.getChatById(chatId);
      
      if (!chat) {
        socket.emit("error", { message: "Chat not found." });
        return;
      }

      await chatService.markMessagesAsRead(chatId, user.id);
      const updatedMessages = await chatService.getReadMessages(chatId, user.id);


      io.to(chat.appointmentId.toString()).emit("messagesRead", {
        chatId,
        readerId: user.id,
        messageIds: updatedMessages.map((msg) => msg._id),
      });
    } catch (error) {
      console.error("markAsRead error:", error);
      socket.emit("error", { message: "Failed to mark messages as read." });
    }
  });

  socket.on("endChat", async ({ appointmentId }: { appointmentId: string }) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
        socket.emit("error", { message: "Invalid appointment ID." });
        return;
      }

      await chatService.deactivateChat(appointmentId);
      io.to(appointmentId).emit("chatEnded");
    } catch (error) {
      console.error("Error ending chat:", error);
      socket.emit("error", { message: "Failed to end chat." });
    }
  });

  socket.on("typing", ({ appointmentId, senderId }) => {
    socket.to(appointmentId).emit("typing", { senderId });
  });

  socket.on("stopTyping", ({ appointmentId, senderId }) => {
    socket.to(appointmentId).emit("stopTyping", { senderId });
  });

 

  socket.on("disconnect", async(reason) => {
    console.log(`User ${user.id} disconnected`);
    console.log(`User ${user.id} disconnected. Reason: ${reason}`);
    onlineUsers.delete(user.id);
    socket.broadcast.emit("user-offline", user.id);
  });
};














