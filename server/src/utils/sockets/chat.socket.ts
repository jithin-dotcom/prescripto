

// // import { Server, Socket } from "socket.io";
// // import { Chat } from "../../models/chat/chat.models";
// // import { Message } from "../../models/message/message.models";
// // import mongoose from "mongoose";

// // export const chatSocketHandler = (io: Server, socket: Socket) => {
// //   const user = socket.data.user;

// //   // Join a room using appointmentId (which is unique per chat)
// //   socket.on("joinRoom", async ({ appointmentId }: { appointmentId: string }) => {
// //     socket.join(appointmentId);
// //   });

// //   // Send a message
// //   socket.on("sendMessage", async ({ appointmentId, content, type }: {
// //     appointmentId: string;
// //     content: string;
// //     type: "text" | "image";
// //   }) => {
// //     try {
// //       // Ensure a chat exists (create if not)
// //       let chat = await Chat.findOne({ appointmentId });

// //       if (!chat) {
// //         chat = await Chat.create({
// //           appointmentId: new mongoose.Types.ObjectId(appointmentId),
// //           doctorId: user.role === "doctor" ? user._id : undefined,
// //           userId: user.role === "user" ? user._id : undefined,
// //           isActive: true,
// //         });
// //       }

// //       // Create a new message in the Message collection
// //       const newMessage = await Message.create({
// //         chatId: chat._id,
// //         sender: user._id,
// //         content,
// //         type,
// //         read: false,
// //         timestamp: new Date(),
// //       });

// //       // Emit the message to everyone in the room
// //       io.to(appointmentId).emit("newMessage", {
// //         _id: newMessage._id,
// //         sender: user._id,
// //         content,
// //         type,
// //         timestamp: newMessage.timestamp,
// //         read: false,
// //       });
// //     } catch (err) {
// //       console.error("Error sending message:", err);
// //       socket.emit("error", "Failed to send message.");
// //     }
// //   });

// //   // End chat
// //   socket.on("endChat", async ({ appointmentId }: { appointmentId: string }) => {
// //     await Chat.findOneAndUpdate({ appointmentId }, { isActive: false });
// //     io.to(appointmentId).emit("chatEnded");
// //   });

// //   socket.on("disconnect", () => {
// //     console.log(`User ${user._id} disconnected`);
// //   });
// // };






// import { Server, Socket } from "socket.io";
// import { Chat } from "../../models/chat/chat.models";
// import { Message } from "../../models/message/message.models";
// import mongoose from "mongoose";

// export const chatSocketHandler = (io: Server, socket: Socket) => {
//   const user = socket.data.user;

//   if (!user || !user._id || !user.role) {
//     console.error("Socket connection rejected: User not authenticated.");
//     socket.disconnect();
//     return;
//   }

//   // Join a chat room by appointmentId
//   socket.on("joinRoom", async ({ appointmentId }: { appointmentId: string }) => {
//     if (!appointmentId || !mongoose.Types.ObjectId.isValid(appointmentId)) {
//       socket.emit("error", "Invalid appointment ID.");
//       return;
//     }

//     socket.join(appointmentId);
//     console.log(`User ${user._id} joined room: ${appointmentId}`);
//   });

//   // Send message to chat
//   socket.on("sendMessage", async ({
//     appointmentId,
//     content,
//     type
//   }: {
//     appointmentId: string;
//     content: string;
//     type: "text" | "image";
//   }) => {
//     try {
//       if (!appointmentId || !content || !type) {
//         socket.emit("error", "Missing required message data.");
//         return;
//       }

//       if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
//         socket.emit("error", "Invalid appointment ID.");
//         return;
//       }

//       // Find or create chat
//       let chat = await Chat.findOne({ appointmentId });

//       if (!chat) {
//         chat = await Chat.create({
//           appointmentId: new mongoose.Types.ObjectId(appointmentId),
//           doctorId: user.role === "doctor" ? user._id : undefined,
//           userId: user.role === "user" ? user._id : undefined,
//           isActive: true,
//         });
//       }

//       // Create message
//       const newMessage = await Message.create({
//         chatId: chat._id,
//         sender: user._id,
//         content,
//         type,
//         read: false,
//         timestamp: new Date(),
//       });

//       // Emit new message to room
//       io.to(appointmentId).emit("newMessage", {
//         _id: newMessage._id,
//         sender: user._id,
//         content,
//         type,
//         timestamp: newMessage.timestamp,
//         read: false,
//       });

//       console.log(`Message sent by ${user._id} to room ${appointmentId}`);
//     } catch (err) {
//       console.error("Error in sendMessage:", err);
//       socket.emit("error", "Failed to send message.");
//     }
//   });

//   // End the chat (optional feature)
//   socket.on("endChat", async ({ appointmentId }: { appointmentId: string }) => {
//     try {
//       await Chat.findOneAndUpdate({ appointmentId }, { isActive: false });
//       io.to(appointmentId).emit("chatEnded");
//       console.log(`Chat ended for appointment ${appointmentId}`);
//     } catch (err) {
//       console.error("Error ending chat:", err);
//       socket.emit("error", "Failed to end chat.");
//     }
//   });

//   // Disconnect handler
//   socket.on("disconnect", () => {
//     console.log(`User ${user._id} disconnected from socket`);
//   });
// };






// import { Server, Socket } from "socket.io";
// import mongoose from "mongoose";
// import { Chat } from "../../models/chat/chat.models";
// import { Message } from "../../models/message/message.models";

// export const chatSocketHandler = (io: Server, socket: Socket) => {
//   const user = socket.data.user;

//   // Reject socket if unauthenticated
//   if (!user || !user._id || !user.role) {
//     console.error("Socket connection rejected: User not authenticated.");
//     socket.disconnect();
//     return;
//   }

//   // Join room by appointment ID
//   socket.on("joinRoom", async ({ appointmentId }: { appointmentId: string }) => {
//     if (!appointmentId || !mongoose.Types.ObjectId.isValid(appointmentId)) {
//       socket.emit("error", { message: "Invalid appointment ID." });
//       return;
//     }

//     socket.join(appointmentId);
//     console.log(`User ${user._id} joined room: ${appointmentId}`);
//   });

//   // Send message
//   socket.on(
//     "sendMessage",
//     async ({
//       appointmentId,
//       content,
//       type,
//     }: {
//       appointmentId: string;
//       content: string;
//       type: "text" | "image";
//     }) => {
//       try {
//         if (!appointmentId || !content || !type) {
//           socket.emit("error", { message: "Missing required message data." });
//           return;
//         }

//         if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
//           socket.emit("error", { message: "Invalid appointment ID." });
//           return;
//         }

//         // Get or create chat
//         let chat = await Chat.findOne({ appointmentId });

//         if (!chat) {
//           chat = await Chat.create({
//             appointmentId: new mongoose.Types.ObjectId(appointmentId),
//             doctorId: user.role === "doctor" ? user._id : undefined,
//             userId: user.role === "user" ? user._id : undefined,
//             participants: [user._id], // optional: could push both ids
//             isActive: true,
//           });
//         }

//         // Create new message
//         const newMessage = await Message.create({
//           chatId: chat._id,
//           sender: user._id,
//           content,
//           type,
//           read: false,
//           timestamp: new Date(),
//         });

//         // Broadcast to room
//         io.to(appointmentId).emit("newMessage", {
//           _id: newMessage._id,
//           sender: {
//             _id: user._id,
//             role: user.role,
//           },
//           content,
//           type,
//           timestamp: newMessage.timestamp,
//           read: false,
//         });

//         console.log(`Message from ${user._id} sent to room ${appointmentId}`);
//       } catch (err) {
//         console.error("Error in sendMessage:", err);
//         socket.emit("error", { message: "Failed to send message." });
//       }
//     }
//   );

//   // End chat
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

//   socket.on("markAsRead", async ({ chatId }) => {
//   await Message.updateMany({ chatId, read: false }, { read: true });
// });

// socket.on("typing", ({ appointmentId }) => {
//   socket.to(appointmentId).emit("typing", { userId: user._id });
// });



//   // Handle disconnect
//   socket.on("disconnect", () => {
//     console.log(`User ${user._id} disconnected`);
//   });
// };





import { Server, Socket } from "socket.io";
import mongoose from "mongoose";
import { Chat } from "../../models/chat/chat.models";
import { Message } from "../../models/message/message.models";
import { IChat } from "../../models/chat/IChat"; 

export const chatSocketHandler = (io: Server, socket: Socket) => {

    console.log("entered into socket");

//     const user = {
//   _id: new mongoose.Types.ObjectId("64dca4e7fc13ae3bfb000001"), // replace with any ObjectId
//   role: "user",
// };
// socket.data.user = user;
  
   const user = socket.data.user;

  console.log("user in socket connect",user);

  if (!user || !user.id || !user.role) {
    console.error("Socket connection rejected: User not authenticated.");
    socket.disconnect();
    return;
  }

    socket.on("joinRoom", async ({ appointmentId }: { appointmentId: string }) => {
         console.log("entered into soket");
      if (!appointmentId || !mongoose.Types.ObjectId.isValid(appointmentId)) {
        socket.emit("error", { message: "Invalid appointment ID." });
        
        return;
    }

    socket.join(appointmentId);
    console.log(`User ${user.id} joined room: ${appointmentId}`);

    // Mark all messages as read for this chat
    const chat = await Chat.findOne({ appointmentId });
    if (chat) {
      await Message.updateMany(
        { chatId: chat._id, read: false, sender: { $ne: user.id } },
        { read: true }
      );
    }
  });


socket.on("sendMessage", async (data: any) => {
  try {
    const { appointmentId, content, type, doctorId, userId } = data;
    console.log("data in socket :",data);
    const user = socket.data.user;
    // console.log("user in sendMessage : ", user,user._id);

    console.log("✅ Received sendMessage payload:", {
      appointmentId,
      content,
      type,
      userToken: user,
      doctorId,
      userId,
    });

    if (!appointmentId || !content || !type) {
      console.error("❌ Missing required fields");
      socket.emit("error", { message: "Missing required fields" });
      return;
    }

    if (!doctorId || !userId) {
      console.error("❌ Missing doctorId or userId");
      socket.emit("error", { message: "Missing doctorId or userId" });
      return;
    }

    // Check if chat exists
    let chat = await Chat.findOne({ appointmentId });

    if (!chat) {
      console.log("📦 Creating new chat...");
      chat = await Chat.create({
        appointmentId: new mongoose.Types.ObjectId(appointmentId),
        doctorId: new mongoose.Types.ObjectId(doctorId),
        userId: new mongoose.Types.ObjectId(userId),
        participants: [new mongoose.Types.ObjectId(userId),new mongoose.Types.ObjectId(doctorId)],
        isActive: true,
      });
    }

    // Create the message
    const message = await Message.create({
      chatId: chat._id,
      content,
      type,
      sender: user.id,
    });

    console.log("✅ New message created:", message);

    // Emit to all in the chat room
    // io.to(`chat_${chat._id}`).emit("receiveMessage", message);
    io.to(appointmentId).emit("receiveMessage", message);
  } catch (error) {
    console.error("🔥 sendMessage error:", error);
    socket.emit("error", { message: "Internal server error" });
  }
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

  socket.on("markAsRead", async ({ chatId }: { chatId: string }) => {
    if (!chatId || !mongoose.Types.ObjectId.isValid(chatId)) {
      socket.emit("error", { message: "Invalid chat ID." });
      return;
    }

    await Message.updateMany({ chatId, read: false, sender: { $ne: user._id } }, { read: true });
  });

  socket.on("typing", ({ appointmentId }: { appointmentId: string }) => {
    if (mongoose.Types.ObjectId.isValid(appointmentId)) {
      socket.to(appointmentId).emit("typing", { userId: user.id });
    }
  });

  socket.on("disconnect", () => {
    console.log(`User ${user.id} disconnected`);
  });
};
