


// // import { Server, Socket } from "socket.io";
// // import { CallLogService } from "../../services/implementation/callLog.service";
// // import { CallLogRepository } from "../../repositories/implementation/callLog.repository";
// // import { AppointmentRepository } from "../../repositories/implementation/appointment.repositories";
// // import { WalletRepository } from "../../repositories/implementation/wallet.repository";
// // import { WalletHistoryRepository } from "../../repositories/implementation/walletHistory.repository";


// // import mongoose from "mongoose";
// // import { Namespace } from "socket.io";

// // const callLogRepository = new CallLogRepository();
// // const appointmentRepository = new AppointmentRepository();
// // const walletRepository = new WalletRepository();
// // const walletHistoryRepository = new WalletHistoryRepository();
 
// // const callLogService = new CallLogService(callLogRepository, appointmentRepository, walletRepository, walletHistoryRepository);

// // interface CallSession {
// //   doctorId: string;
// //   patientId: string;
// //   appointmentId?: string;
// //   startTime: Date;
// // }

// // const activeCalls = new Map<string, CallSession>(); 
// // const connectedUsers = new Map<string, Socket>(); 

// // export const videoCallSocketHandler = (io: Namespace, socket: Socket) => {
// //   console.log(`Video socket connected: ${socket.id}`);

// //   socket.on("register-user", (userId: string) => {
// //     if (!userId) {
// //       console.error("Invalid userId received:", userId);
// //       socket.emit("error", { message: "Invalid userId" });
// //       return;
// //     }

    
// //     if (connectedUsers.has(userId)) {
// //       console.log(`User ${userId} already connected, disconnecting old socket`);
// //       connectedUsers.get(userId)?.disconnect();
// //     }

// //     socket.data.userId = userId;
// //     connectedUsers.set(userId, socket);
// //     socket.join(userId); 
    
// //   });

// //   socket.on("join-call-room", ({ appointmentId, userId, doctorId, patientId }) => {
// //     if (!appointmentId || !userId || !doctorId || !patientId) {
// //       console.error("Invalid join-call-room data:", { appointmentId, userId, doctorId, patientId });
// //       socket.emit("error", { message: "Invalid join-call-room data" });
// //       return;
// //     }
// //     socket.join(appointmentId);
   
// //   });

  
// //   socket.on("call-user", ({ to, from, signal, name, doctorId, patientId, appointmentId }) => {
// //   if (!to || !from || !appointmentId || !doctorId || !patientId) {
// //     console.error("Invalid call-user data:", { to, from, appointmentId });
// //     socket.emit("error", { message: "Invalid call-user data" });
// //     return;
// //   }

// //   const receiverSocket = connectedUsers.get(to);
// //   const senderSocket = connectedUsers.get(from);

 
// //   if (!receiverSocket) {
// //     console.warn(`Receiver ${to} is not online`);
// //     socket.emit("error", { message: "User is not online or available for call." });
// //     return;
// //   }

// //   const receiverRooms = Array.from(receiverSocket.rooms);
// //   const senderRooms = Array.from(socket.rooms);

  
// //   const receiverInRoom = receiverRooms.includes(appointmentId);
// //   const senderInRoom = senderRooms.includes(appointmentId);

// //   if (!receiverInRoom || !senderInRoom) {
// //     console.warn(`Appointment mismatch. Receiver in room: ${receiverInRoom}, Sender in room: ${senderInRoom}`);
// //     socket.emit("error", {
// //       message: "User is not online or available for call",
// //     });
// //     return;
// //   }

 
// //   const session: CallSession = {
// //     doctorId,
// //     patientId,
// //     appointmentId,
// //     startTime: new Date(),
// //   };

// //   activeCalls.set(from, session);
// //   activeCalls.set(to, session);

  
// //   io.to(to).emit("incoming-call", { from, name, signal });
// // });


// //   socket.on("answer-call", ({ to, signal, appointmentId }) => {
// //     io.to(to).emit("call-accepted", { signal });
// //   });

// //   socket.on("reject-call", ({ to, appointmentId }) => {
// //     console.log(`reject-call event from ${socket.data.userId} to ${to}`);
// //     io.to(to).emit("call-rejected");
// //   });

// //   socket.on("end-call", async ({ to, from, appointmentId }) => {
// //     console.log(`end-call event from ${from} to ${to}`);
// //     const session = activeCalls.get(from);

// //     if (session) {
// //       const endTime = new Date();
// //       const duration = Math.floor((endTime.getTime() - session.startTime.getTime()) / 1000);

// //       try {
// //         await callLogService.logCall({
// //           doctorId: new mongoose.Types.ObjectId(session.doctorId),
// //           patientId: new mongoose.Types.ObjectId(session.patientId),
// //           appointmentId: session.appointmentId
// //             ? new mongoose.Types.ObjectId(session.appointmentId)
// //             : undefined,
// //           startTime: session.startTime,
// //           endTime,
// //           duration,
// //           callType: "video",
// //           callStatus: "completed",
// //         });

// //         const wallet = await callLogService.paymentDoctor({
// //            userId: new mongoose.Types.ObjectId(session.doctorId),
// //            role: "doctor",
// //         })

// //         await callLogService.doctorPaymentHistory({
// //           appointmentId: new mongoose.Types.ObjectId(session.appointmentId),
// //           walletId: wallet._id as mongoose.Types.ObjectId,
// //         })
        
// //       } catch (err) {
// //         console.error("Error logging call:", err);
// //       }

// //       activeCalls.delete(from);
// //       activeCalls.delete(to);
// //     }

// //     io.to(to).emit("end-call");
// //   });

// //   socket.on("ice-candidate", ({ to, candidate }) => {
    
// //     io.to(to).emit("ice-candidate", { candidate });
// //   });

  
// //   socket.on("disconnect", async () => {
// //   console.log(`Socket disconnected: ${socket.id}, user: ${socket.data.userId}`);

// //   const userId = socket.data.userId;
// //   const session = activeCalls.get(userId);

// //   if (userId) {
// //     connectedUsers.delete(userId);

   
// //     if (session?.appointmentId) {
// //       io.to(session.appointmentId).emit("user-disconnected", {userId});
// //       try {
// //          const endTime = new Date();
// //          const duration = Math.floor((endTime.getTime() - session.startTime.getTime())/1000);

// //          await callLogService.logCall({
// //             doctorId: new mongoose.Types.ObjectId(session.doctorId),
// //             patientId: new mongoose.Types.ObjectId(session.patientId),
// //             appointmentId: new mongoose.Types.ObjectId(session.appointmentId),
// //             startTime: session.startTime,
// //             endTime: endTime,
// //             duration,
// //             callType: "video",
// //             callStatus: "dropped",
// //          })
// //           console.log(`Notified room ${session.appointmentId} that user ${userId} disconnected`);
// //       } catch (error) {
// //           console.error("Error in auto logging ");
// //       }
     
// //     }
// //   }
// // });

// // };
// import { Server, Socket, Namespace } from "socket.io";
// import { CallLogService } from "../../services/implementation/callLog.service";
// import { CallLogRepository } from "../../repositories/implementation/callLog.repository";
// import { AppointmentRepository } from "../../repositories/implementation/appointment.repositories";
// import { WalletRepository } from "../../repositories/implementation/wallet.repository";
// import { WalletHistoryRepository } from "../../repositories/implementation/walletHistory.repository";
// import mongoose from "mongoose";

// const callLogRepository = new CallLogRepository();
// const appointmentRepository = new AppointmentRepository();
// const walletRepository = new WalletRepository();
// const walletHistoryRepository = new WalletHistoryRepository();

// const callLogService = new CallLogService(callLogRepository, appointmentRepository, walletRepository, walletHistoryRepository);

// interface CallSession {
//   doctorId: string;
//   patientId: string;
//   appointmentId?: string;
//   startTime: Date;
// }

// const activeCalls = new Map<string, CallSession>();
// const connectedUsers = new Map<string, Socket>();

// export const videoCallSocketHandler = (io: Namespace, socket: Socket) => {
//   console.log(`Video socket connected: ${socket.id}`);

//   socket.on("register-user", (userId: string) => {
//     if (!userId) {
//       console.error("Invalid userId received:", userId);
//       socket.emit("error", { message: "Invalid userId" });
//       return;
//     }

//     if (connectedUsers.has(userId)) {
//       console.log(`User ${userId} already connected, disconnecting old socket`);
//       connectedUsers.get(userId)?.disconnect();
//     }

//     socket.data.userId = userId;
//     connectedUsers.set(userId, socket);
//     socket.join(userId);
//     console.log(`User ${userId} registered and joined room ${userId}`);
//   });

//   socket.on("join-call-room", ({ appointmentId, userId, doctorId, patientId }) => {
//     if (!appointmentId || !userId || !doctorId || !patientId) {
//       console.error("Invalid join-call-room data:", { appointmentId, userId, doctorId, patientId });
//       socket.emit("error", { message: "Invalid join-call-room data" });
//       return;
//     }
//     socket.join(appointmentId);
//     console.log(`User ${userId} joined call room ${appointmentId}`);
//   });

//   socket.on("call-user", async ({ to, from, signal, name, doctorId, patientId, appointmentId }) => {
//     if (!to || !from || !appointmentId || !doctorId || !patientId) {
//       console.error("Invalid call-user data:", { to, from, appointmentId, doctorId, patientId });
//       socket.emit("error", { message: "Invalid call-user data" });
//       return;
//     }

//     const receiverSocket = connectedUsers.get(to);
//     if (!receiverSocket) {
//       console.warn(`Receiver ${to} is not online`);
//       socket.emit("error", { message: "User is not online or available for call." });
//       return;
//     }

//     // Optional: Validate appointment (e.g., check status and time)
//     try {
//       const appointment = await appointmentRepository.findById(appointmentId);
//       if (!appointment || appointment.status !== "confirmed" || new Date(appointment.day + " " + appointment.time) < new Date()) {
//         socket.emit("error", { message: "Invalid or expired appointment" });
//         return;
//       }
//     } catch (error) {
//       console.error("Error validating appointment:", error);
//       socket.emit("error", { message: "Error validating appointment" });
//       return;
//     }

//     const session: CallSession = {
//       doctorId,
//       patientId,
//       appointmentId,
//       startTime: new Date(),
//     };

//     activeCalls.set(from, session);
//     activeCalls.set(to, session);

//     // Emit incoming-call to the receiver's userId room
//     io.to(to).emit("incoming-call", { from, name, signal, appointmentId, doctorId, patientId });
//     console.log(`Emitted incoming-call to ${to} for appointment ${appointmentId}`);
//   });

//   socket.on("answer-call", ({ to, signal, appointmentId }) => {
//     if (!to || !appointmentId) {
//       socket.emit("error", { message: "Invalid answer-call data" });
//       return;
//     }
//     socket.join(appointmentId); // Join the appointment room after answering
//     io.to(to).emit("call-accepted", { signal, appointmentId });
//     console.log(`Call accepted, user ${socket.data.userId} joined room ${appointmentId}`);
//   });

//   socket.on("reject-call", ({ to, appointmentId }) => {
//     console.log(`reject-call event from ${socket.data.userId} to ${to}`);
//     if (!to) return;
//     io.to(to).emit("call-rejected", { appointmentId });
//     activeCalls.delete(socket.data.userId);
//     activeCalls.delete(to);
//   });

//   socket.on("end-call", async ({ to, from, appointmentId }) => {
//     console.log(`end-call event from ${from} to ${to}`);
//     const session = activeCalls.get(from);

//     if (session) {
//       const endTime = new Date();
//       const duration = Math.floor((endTime.getTime() - session.startTime.getTime()) / 1000);

//       try {
//         await callLogService.logCall({
//           doctorId: new mongoose.Types.ObjectId(session.doctorId),
//           patientId: new mongoose.Types.ObjectId(session.patientId),
//           appointmentId: session.appointmentId
//             ? new mongoose.Types.ObjectId(session.appointmentId)
//             : undefined,
//           startTime: session.startTime,
//           endTime,
//           duration,
//           callType: "video",
//           callStatus: "completed",
//         });

//         const wallet = await callLogService.paymentDoctor({
//           userId: new mongoose.Types.ObjectId(session.doctorId),
//           role: "doctor",
//         });

//         await callLogService.doctorPaymentHistory({
//           appointmentId: new mongoose.Types.ObjectId(session.appointmentId),
//           walletId: wallet._id as mongoose.Types.ObjectId,
//         });
//       } catch (err) {
//         console.error("Error logging call:", err);
//       }

//       activeCalls.delete(from);
//       activeCalls.delete(to);
//     }

//     io.to(to).emit("end-call", { appointmentId });
//   });

//   socket.on("ice-candidate", ({ to, candidate }) => {
//     if (!to) return;
//     io.to(to).emit("ice-candidate", { candidate });
//   });

//   socket.on("disconnect", async () => {
//     console.log(`Socket disconnected: ${socket.id}, user: ${socket.data.userId}`);

//     const userId = socket.data.userId;
//     if (userId) {
//       connectedUsers.delete(userId);
//       const session = activeCalls.get(userId);

//       if (session?.appointmentId) {
//         io.to(session.appointmentId).emit("user-disconnected", { userId });
//         try {
//           const endTime = new Date();
//           const duration = Math.floor((endTime.getTime() - session.startTime.getTime()) / 1000);

//           await callLogService.logCall({
//             doctorId: new mongoose.Types.ObjectId(session.doctorId),
//             patientId: new mongoose.Types.ObjectId(session.patientId),
//             appointmentId: new mongoose.Types.ObjectId(session.appointmentId),
//             startTime: session.startTime,
//             endTime,
//             duration,
//             callType: "video",
//             callStatus: "dropped",
//           });
//         } catch (error) {
//           console.error("Error in auto logging:", error);
//         }

//         activeCalls.delete(userId);
//       }

//       // // Update lastSeen in User collection
//       // try {
//       //   await User.updateOne({ _id: userId }, { $set: { lastSeen: new Date() } });
//       //   io.to(userId).emit("user-offline", { userId, lastSeen: new Date().toISOString() });
//       // } catch (error) {
//       //   console.error("Error updating lastSeen:", error);
//       // }
//     }
//   });
// };



















import { Server, Socket, Namespace } from "socket.io";
import { CallLogService } from "../../services/implementation/callLog.service";
import { CallLogRepository } from "../../repositories/implementation/callLog.repository";
import { AppointmentRepository } from "../../repositories/implementation/appointment.repositories";
import { WalletRepository } from "../../repositories/implementation/wallet.repository";
import { WalletHistoryRepository } from "../../repositories/implementation/walletHistory.repository";
import mongoose from "mongoose";

const callLogRepository = new CallLogRepository();
const appointmentRepository = new AppointmentRepository();
const walletRepository = new WalletRepository();
const walletHistoryRepository = new WalletHistoryRepository();

const callLogService = new CallLogService(callLogRepository, appointmentRepository, walletRepository, walletHistoryRepository);

interface CallSession {
  doctorId: string;
  patientId: string;
  appointmentId?: string;
  startTime: Date;
}

const activeCalls = new Map<string, CallSession>();
const connectedUsers = new Map<string, Socket>();

export const videoCallSocketHandler = (io: Namespace, socket: Socket) => {
  console.log(`Video socket connected: ${socket.id}`);

  socket.on("register-user", (userId: string) => {
    if (!userId) {
      console.error("Invalid userId received:", userId);
      socket.emit("error", { message: "Invalid userId" });
      return;
    }

    if (connectedUsers.has(userId)) {
      console.log(`User ${userId} already connected, disconnecting old socket`);
      connectedUsers.get(userId)?.disconnect();
    }

    socket.data.userId = userId;
    connectedUsers.set(userId, socket);
    socket.join(userId);
    console.log(`User ${userId} registered and joined room ${userId}`);
    console.log("Connected users:", Array.from(connectedUsers.keys()));
  });

  socket.on("join-call-room", ({ appointmentId, userId, doctorId, patientId }) => {
    if (!appointmentId || !userId || !doctorId || !patientId) {
      console.error("Invalid join-call-room data:", { appointmentId, userId, doctorId, patientId });
      socket.emit("error", { message: "Invalid join-call-room data" });
      return;
    }
    socket.join(appointmentId);
    console.log(`User ${userId} joined call room ${appointmentId}`);
  });

  socket.on("call-user", async ({ to, from, signal, name, doctorId, patientId, appointmentId }) => {
    console.log("Received call-user:", { to, from, signal, name, doctorId, patientId, appointmentId });
    if (!to || !from || !appointmentId || !doctorId || !patientId) {
      console.error("Invalid call-user data:", { to, from, appointmentId, doctorId, patientId });
      socket.emit("error", { message: "Invalid call-user data" });
      return;
    }

    const receiverSocket = connectedUsers.get(to);
    if (!receiverSocket) {
      console.warn(`Receiver ${to} is not online`);
      socket.emit("error", { message: "User is not online or available for call." });
      return;
    }

    // Validate appointment
    try {
      const appointment = await appointmentRepository.findById(appointmentId);
      console.log("Appointment found:", appointment);
      if (!appointment || appointment.status !== "confirmed" || new Date(appointment.day + " " + appointment.time) < new Date()) {
        console.error("Invalid or expired appointment:", appointment);
        socket.emit("error", { message: "Invalid or expired appointment" });
        return;
      }
    } catch (error) {
      console.error("Error validating appointment:", error);
      socket.emit("error", { message: "Error validating appointment" });
      return;
    }

    const session: CallSession = {
      doctorId,
      patientId,
      appointmentId,
      startTime: new Date(),
    };

    activeCalls.set(from, session);
    activeCalls.set(to, session);

    io.to(to).emit("incoming-call", { from, name, signal, appointmentId, doctorId, patientId });
    console.log(`Emitted incoming-call to ${to} for appointment ${appointmentId}`);
  });

  socket.on("answer-call", ({ to, signal, appointmentId }) => {
    if (!to || !appointmentId) {
      socket.emit("error", { message: "Invalid answer-call data" });
      return;
    }
    socket.join(appointmentId);
    io.to(to).emit("call-accepted", { signal, appointmentId });
    console.log(`Call accepted, user ${socket.data.userId} joined room ${appointmentId}`);
  });

  socket.on("reject-call", ({ to, appointmentId }) => {
    console.log(`reject-call event from ${socket.data.userId} to ${to}`);
    if (!to) return;
    io.to(to).emit("call-rejected", { appointmentId });
    activeCalls.delete(socket.data.userId);
    activeCalls.delete(to);
  });

  socket.on("end-call", async ({ to, from, appointmentId }) => {
    console.log(`end-call event from ${from} to ${to}`);
    const session = activeCalls.get(from);

    if (session) {
      const endTime = new Date();
      const duration = Math.floor((endTime.getTime() - session.startTime.getTime()) / 1000);

      try {
        await callLogService.logCall({
          doctorId: new mongoose.Types.ObjectId(session.doctorId),
          patientId: new mongoose.Types.ObjectId(session.patientId),
          appointmentId: session.appointmentId
            ? new mongoose.Types.ObjectId(session.appointmentId)
            : undefined,
          startTime: session.startTime,
          endTime,
          duration,
          callType: "video",
          callStatus: "completed",
        });

        const wallet = await callLogService.paymentDoctor({
          userId: new mongoose.Types.ObjectId(session.doctorId),
          role: "doctor",
        });

        await callLogService.doctorPaymentHistory({
          appointmentId: new mongoose.Types.ObjectId(session.appointmentId),
          walletId: wallet._id as mongoose.Types.ObjectId,
        });
      } catch (err) {
        console.error("Error logging call:", err);
      }

      activeCalls.delete(from);
      activeCalls.delete(to);
    }

    io.to(to).emit("end-call", { appointmentId });
  });

  socket.on("ice-candidate", ({ to, candidate }) => {
    if (!to) return;
    io.to(to).emit("ice-candidate", { candidate });
  });

  socket.on("disconnect", async () => {
    console.log(`Socket disconnected: ${socket.id}, user: ${socket.data.userId}`);
    console.log("Connected users after disconnect:", Array.from(connectedUsers.keys()));

    const userId = socket.data.userId;
    if (userId) {
      connectedUsers.delete(userId);
      const session = activeCalls.get(userId);

      if (session?.appointmentId) {
        io.to(session.appointmentId).emit("user-disconnected", { userId });
        try {
          const endTime = new Date();
          const duration = Math.floor((endTime.getTime() - session.startTime.getTime()) / 1000);

          await callLogService.logCall({
            doctorId: new mongoose.Types.ObjectId(session.doctorId),
            patientId: new mongoose.Types.ObjectId(session.patientId),
            appointmentId: new mongoose.Types.ObjectId(session.appointmentId),
            startTime: session.startTime,
            endTime,
            duration,
            callType: "video",
            callStatus: "dropped",
          });
        } catch (error) {
          console.error("Error in auto logging:", error);
        }

        activeCalls.delete(userId);
      }
    }
  });
};






