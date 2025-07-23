

// import { Server, Socket } from "socket.io";
// import mongoose from "mongoose";
// import { Chat } from "../../models/chat/chat.models";
// import { Message } from "../../models/message/message.models";
// import { uploadToCloudinary } from "../../config/cloudinary";
// import { Namespace } from "socket.io";

// export const chatSocketHandler = (io: Namespace, socket: Socket) => { //Socket => NameSpace
//   console.log("entered into socket");

//   const user = socket.data.user;

//   console.log("user in socket connect", user);

//   if (!user || !user.id || !user.role) {
//     console.error("Socket connection rejected: User not authenticated.");
//     socket.disconnect();
//     return;
//   }

//   socket.on("joinRoom", async ({ appointmentId }: { appointmentId: string }) => {
//     // console.log("entered joinRoom");
//     if (!appointmentId || !mongoose.Types.ObjectId.isValid(appointmentId)) {
//       socket.emit("error", { message: "Invalid appointment ID." });
//       return;
//     }

//     socket.join(appointmentId);
//     // console.log(`User ${user.id} joined room: ${appointmentId}`);

   
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
//       // console.log(`Marked ${updatedMessages.length} messages as read for chat ${chat._id}`);
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
//     // console.log("entered markAsRead");

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
//     // console.log(`Marked ${updatedMessages.length} messages as read for chat ${chatId}`);
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

//   // socket.on("typing", ({ appointmentId }: { appointmentId: string }) => {
//   //   if (mongoose.Types.ObjectId.isValid(appointmentId)) {
//   //     socket.to(appointmentId).emit("typing", { userId: user.id });
//   //   }
//   // });


//   socket.on("typing", ({ appointmentId, senderId }) => {
//   socket.to(appointmentId).emit("typing", { senderId });
// });

// socket.on("stopTyping", ({ appointmentId, senderId }) => {
//   socket.to(appointmentId).emit("stopTyping", { senderId });
// });

//   socket.on("disconnect", () => {
//     console.log(`User ${user.id} disconnected`);
//   });
// };



















import { Server, Socket } from "socket.io";
import mongoose from "mongoose";
import { Chat } from "../../models/chat/chat.models";
import { Message } from "../../models/message/message.models";
import { uploadToCloudinary } from "../../config/cloudinary";
import { Namespace } from "socket.io";

const onlineUser = new Map<string,string>();

export const chatSocketHandler = (io: Namespace, socket: Socket) => { //Socket => NameSpace
  console.log("entered into socket");

  const user = socket.data.user;

  console.log("user in socket connect", user);

  if (!user || !user.id || !user.role) {
    console.error("Socket connection rejected: User not authenticated.");
    socket.disconnect();
    return;
  }


  onlineUser.set(user.id, socket.id);
  socket.broadcast.emit("user-online", user.id);

  socket.on("get-online-users",()=>{
     socket.emit("online-users",Array.from(onlineUser.keys()));
  })

  socket.on("joinRoom", async ({ appointmentId }: { appointmentId: string }) => {
    // console.log("entered joinRoom");
    if (!appointmentId || !mongoose.Types.ObjectId.isValid(appointmentId)) {
      socket.emit("error", { message: "Invalid appointment ID." });
      return;
    }

    socket.join(appointmentId);
    // console.log(`User ${user.id} joined room: ${appointmentId}`);

   
    const chat = await Chat.findOne({ appointmentId });
    if (chat) {
      await Message.updateMany(
        { chatId: chat._id, read: false, sender: { $ne: user.id } },
        { read: true }
      );
      const updatedMessages = await Message.find({
        chatId: chat._id,
        sender: { $ne: user.id },
        read: true,
      });
      io.to(appointmentId).emit("messagesRead", {
        chatId: chat._id,
        readerId: user.id,
        messageIds: updatedMessages.map((msg) => msg._id),
      });
      // console.log(`Marked ${updatedMessages.length} messages as read for chat ${chat._id}`);
    }
  });

  socket.on("sendMessage", async (data: any) => {
    try {
      const { appointmentId, content, type, doctorId, userId } = data;

      if (!appointmentId || !content || !type) {
        socket.emit("error", { message: "Missing required fields" });
        return;
      }

      if (!doctorId || !userId) {
        socket.emit("error", { message: "Missing doctorId or userId" });
        return;
      }

      let chat = await Chat.findOne({ appointmentId });

      if (!chat) {
        chat = await Chat.create({
          appointmentId: new mongoose.Types.ObjectId(appointmentId),
          doctorId: new mongoose.Types.ObjectId(doctorId),
          userId: new mongoose.Types.ObjectId(userId),
          participants: [new mongoose.Types.ObjectId(userId), new mongoose.Types.ObjectId(doctorId)],
          isActive: true,
        });
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

      const message = await Message.create({
        chatId: chat._id,
        content: finalContent,
        type,
        sender: user.id,
        read: false,
      });

      io.to(appointmentId).emit("receiveMessage", message);
    } catch (error) {
      console.error("sendMessage error:", error);
      socket.emit("error", { message: "Internal server error" });
    }
  });

  socket.on("markAsRead", async ({ chatId }: { chatId: string }) => {
    // console.log("entered markAsRead");

    if (!chatId || !mongoose.Types.ObjectId.isValid(chatId)) {
      socket.emit("error", { message: "Invalid chat ID." });
      return;
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      socket.emit("error", { message: "Chat not found." });
      return;
    }

    await Message.updateMany(
      { chatId, read: false, sender: { $ne: user.id } },
      { read: true }
    );

    const updatedMessages = await Message.find({
      chatId,
      sender: { $ne: user.id },
      read: true,
    });

    io.to(chat.appointmentId.toString()).emit("messagesRead", {
      chatId,
      readerId: user.id,
      messageIds: updatedMessages.map((msg) => msg._id),
    });
    // console.log(`Marked ${updatedMessages.length} messages as read for chat ${chatId}`);
  });

  socket.on("endChat", async ({ appointmentId }: { appointmentId: string }) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
        socket.emit("error", { message: "Invalid appointment ID." });
        return;
      }

      

      await Chat.findOneAndUpdate({ appointmentId }, { isActive: false });
      io.to(appointmentId).emit("chatEnded");
      console.log(`Chat ended for appointment ${appointmentId}`);
    } catch (err) {
      console.error("Error ending chat:", err);
      socket.emit("error", { message: "Failed to end chat." });
    }
  });

  // socket.on("typing", ({ appointmentId }: { appointmentId: string }) => {
  //   if (mongoose.Types.ObjectId.isValid(appointmentId)) {
  //     socket.to(appointmentId).emit("typing", { userId: user.id });
  //   }
  // });


  socket.on("typing", ({ appointmentId, senderId }) => {
  socket.to(appointmentId).emit("typing", { senderId });
});

socket.on("stopTyping", ({ appointmentId, senderId }) => {
  socket.to(appointmentId).emit("stopTyping", { senderId });
});

  socket.on("disconnect", () => {
    console.log(`User ${user.id} disconnected`);
    onlineUser.delete(user.id);
     socket.broadcast.emit("user-offline", user.id);
  });
};

























