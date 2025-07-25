

// import { Socket } from "socket.io";
// import mongoose from "mongoose";
// import { Chat } from "../../models/chat/chat.models";
// import { Message } from "../../models/message/message.models";
// import { uploadToCloudinary } from "../../config/cloudinary";
// import { Namespace } from "socket.io";

// const onlineUser = new Map<string,string>();

// export const chatSocketHandler = (io: Namespace, socket: Socket) => { 
  

//   const user = socket.data.user;

//   console.log("user in socket connect", user);

//   if (!user || !user.id || !user.role) {
//     console.error("Socket connection rejected: User not authenticated.");
//     socket.disconnect();
//     return;
//   }

//   onlineUser.set(user.id, socket.id);
//   socket.broadcast.emit("user-online", user.id);

//   socket.on("get-online-users",()=>{
//      socket.emit("online-users",Array.from(onlineUser.keys()));
//   })

//   socket.on("joinRoom", async ({ appointmentId }: { appointmentId: string }) => {
    
//     if (!appointmentId || !mongoose.Types.ObjectId.isValid(appointmentId)) {
//       socket.emit("error", { message: "Invalid appointment ID." });
//       return;
//     }

//     socket.join(appointmentId);
   
//     const chat = await Chat.findOne({ appointmentId });
//     if (chat) {
//       await Message.updateMany(
//         { chatId: chat._id, read: false, sender: { $ne: user.id } },
//         { read: true }
//       );
//       const updatedMessages = await Message.find({
//         chatId: chat._id,
//         sender: { $ne: user.id },
//         read: true,
//       });
//       io.to(appointmentId).emit("messagesRead", {
//         chatId: chat._id,
//         readerId: user.id,
//         messageIds: updatedMessages.map((msg) => msg._id),
//       });
//     }
//   });

//   socket.on("sendMessage", async (data: any) => {
//     try {
//       const { appointmentId, content, type, doctorId, userId } = data;

//       if (!appointmentId || !content || !type) {
//         socket.emit("error", { message: "Missing required fields" });
//         return;
//       }

//       if (!doctorId || !userId) {
//         socket.emit("error", { message: "Missing doctorId or userId" });
//         return;
//       }

//       let chat = await Chat.findOne({ appointmentId });

//       if (!chat) {
//         chat = await Chat.create({
//           appointmentId: new mongoose.Types.ObjectId(appointmentId),
//           doctorId: new mongoose.Types.ObjectId(doctorId),
//           userId: new mongoose.Types.ObjectId(userId),
//           participants: [new mongoose.Types.ObjectId(userId), new mongoose.Types.ObjectId(doctorId)],
//           isActive: true,
//         });
//       }

//       let finalContent = content;

//       if (type === "image") {
//         const matches = content.match(/^data:(.+);base64,(.+)$/);
//         if (!matches || matches.length !== 3) {
//           socket.emit("error", { message: "Invalid image format." });
//           return;
//         }

//         const buffer = Buffer.from(matches[2], "base64");

//         try {
//           finalContent = await uploadToCloudinary(buffer, "chat_images");
//         } catch (uploadErr) {
//           console.error("Cloudinary upload error:", uploadErr);
//           socket.emit("error", { message: "Image upload failed." });
//           return;
//         }
//       }

//       const message = await Message.create({
//         chatId: chat._id,
//         content: finalContent,
//         type,
//         sender: user.id,
//         read: false,
//       });

//       io.to(appointmentId).emit("receiveMessage", message);
//     } catch (error) {
//       console.error("sendMessage error:", error);
//       socket.emit("error", { message: "Internal server error" });
//     }
//   });

//   socket.on("markAsRead", async ({ chatId }: { chatId: string }) => {

//     if (!chatId || !mongoose.Types.ObjectId.isValid(chatId)) {
//       socket.emit("error", { message: "Invalid chat ID." });
//       return;
//     }

//     const chat = await Chat.findById(chatId);
//     if (!chat) {
//       socket.emit("error", { message: "Chat not found." });
//       return;
//     }

//     await Message.updateMany(
//       { chatId, read: false, sender: { $ne: user.id } },
//       { read: true }
//     );

//     const updatedMessages = await Message.find({
//       chatId,
//       sender: { $ne: user.id },
//       read: true,
//     });

//     io.to(chat.appointmentId.toString()).emit("messagesRead", {
//       chatId,
//       readerId: user.id,
//       messageIds: updatedMessages.map((msg) => msg._id),
//     });
//   });

//   socket.on("endChat", async ({ appointmentId }: { appointmentId: string }) => {
//     try {
//       if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
//         socket.emit("error", { message: "Invalid appointment ID." });
//         return;
//       }

//       await Chat.findOneAndUpdate({ appointmentId }, { isActive: false });
//       io.to(appointmentId).emit("chatEnded");
//       console.log(`Chat ended for appointment ${appointmentId}`);
//     } catch (err) {
//       console.error("Error ending chat:", err);
//       socket.emit("error", { message: "Failed to end chat." });
//     }
//   });

  
//   socket.on("typing", ({ appointmentId, senderId }) => {
//   socket.to(appointmentId).emit("typing", { senderId });
// });

// socket.on("stopTyping", ({ appointmentId, senderId }) => {
//   socket.to(appointmentId).emit("stopTyping", { senderId });
// });

//   socket.on("disconnect", () => {
//     console.log(`User ${user.id} disconnected`);
//     onlineUser.delete(user.id);
//      socket.broadcast.emit("user-offline", user.id);
//   });
// };










import { Socket, Namespace } from "socket.io";
import mongoose from "mongoose";
import { ChatService } from "../../services/implementation/chat.services";
import { ChatRepository } from "../../repositories/implementation/chat.repositories";
import { MessageRepository } from "../../repositories/implementation/message.repositories";
import { uploadToCloudinary } from "../../config/cloudinary";

const onlineUsers = new Map<string, string>();


export const chatSocketHandler = (io: Namespace, socket: Socket) => {
  const user = socket.data.user;

  console.log("user in socket connect", user);

  if (!user || !user.id || !user.role) {
    console.error("Socket connection rejected: User not authenticated.");
    socket.disconnect();
    return;
  }

  const chatService = new ChatService(new ChatRepository(), new MessageRepository());

  onlineUsers.set(user.id, socket.id);
  socket.broadcast.emit("user-online", user.id);

  socket.on("get-online-users", () => {
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
      console.log("entered into message read");
      const { appointmentId, content, type, doctorId, userId } = data;

      if (!appointmentId || !content || !type || !doctorId || !userId) {
        socket.emit("error", { message: "Missing required fields" });
        return;
      }

      let chat = await chatService.getChatByAppointmentId(appointmentId);
      if (!chat) {
        chat = await chatService.createChat(appointmentId, [userId, doctorId]);
      }

      let finalContent = content;

      if (type === "image") {
        const matches = content.match(/^data:(.+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
          socket.emit("error", { message: "Invalid image format." });
          return;
        }

        const buffer = Buffer.from(matches[2], "base64");
        try {
          finalContent = await uploadToCloudinary(buffer, "chat_images");
        } catch (uploadErr) {
          console.error("Cloudinary upload error:", uploadErr);
          socket.emit("error", { message: "Image upload failed." });
          return;
        }
      }

      const message = await chatService.createMessage(
        chat._id.toString(),
        user.id,
        finalContent,
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
      console.log("chatid:  ",chatId);
    
      const chat = await chatService.getChatById(chatId);
      console.log("chateeee : ", chat);
      
      if (!chat) {
        console.log("chat not found ddd ")
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
      console.log(`Chat ended for appointment ${appointmentId}`);
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

  socket.on("disconnect", () => {
    console.log(`User ${user.id} disconnected`);
    onlineUsers.delete(user.id);
    socket.broadcast.emit("user-offline", user.id);
  });
};



















