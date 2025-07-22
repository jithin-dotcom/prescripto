

// // // // import { Server, Socket } from "socket.io";
// // // // import { CallLogService } from "../../services/implementation/callLog.service";
// // // // import mongoose from "mongoose";
// // // // import { CallLogRepository } from "../../repositories/implementation/callLog.repository";

// // // // const callLogRepository = new CallLogRepository()
// // // // const callLogService = new CallLogService(callLogRepository);

// // // // interface CallSession {
// // // //   doctorId: string;
// // // //   patientId: string;
// // // //   appointmentId?: string;
// // // //   startTime: Date;
// // // // }

// // // // const activeCalls = new Map<string, CallSession>(); // socket.id => CallSession

// // // // export const videoCallSocketHandler = (io: Server, socket: Socket) => {
// // // //   socket.on("register-user", (userId: string) => {
// // // //     socket.data.userId = userId;
// // // //     socket.join(userId);
// // // //   });

// // // //   socket.on("call-user", ({ to, from, signal, name, doctorId, patientId, appointmentId }) => {
// // // //     activeCalls.set(from, {
// // // //       doctorId,
// // // //       patientId,
// // // //       appointmentId,
// // // //       startTime: new Date(),
// // // //     });

// // // //     io.to(to).emit("incoming-call", { from, signal, name });
// // // //   });

// // // //   socket.on("answer-call", ({ to, from, signal }) => {
// // // //     io.to(to).emit("call-answered", { from, signal });
// // // //   });

// // // //   socket.on("end-call", async ({ to, from }) => {
// // // //     const session = activeCalls.get(from);

// // // //     if (session) {
// // // //       const endTime = new Date();
// // // //       const duration = Math.floor((endTime.getTime() - session.startTime.getTime()) / 1000);

// // // //       await callLogService.logCall({
// // // //         doctorId: new mongoose.Types.ObjectId(session.doctorId),
// // // //         patientId: new mongoose.Types.ObjectId(session.patientId),
// // // //         appointmentId: session.appointmentId ? new mongoose.Types.ObjectId(session.appointmentId) : undefined,
// // // //         startTime: session.startTime,
// // // //         endTime,
// // // //         duration,
// // // //         callType: "video",
// // // //         callStatus: "completed",
// // // //       });

// // // //       activeCalls.delete(from);
// // // //     }

// // // //     io.to(to).emit("call-ended", { from });
// // // //   });

// // // //   socket.on("disconnect", () => {
// // // //     if (socket.data.userId) {
// // // //       io.to(socket.data.userId).emit("user-disconnected");
// // // //     }
// // // //   });
// // // // };














// // // import { Server, Socket } from "socket.io";
// // // import { CallLogService } from "../../services/implementation/callLog.service";
// // // import mongoose from "mongoose";
// // // import { CallLogRepository } from "../../repositories/implementation/callLog.repository";
// // // import { Namespace } from "socket.io";

// // // const callLogRepository = new CallLogRepository();
// // // const callLogService = new CallLogService(callLogRepository);

// // // interface CallSession {
// // //   doctorId: string;
// // //   patientId: string;
// // //   appointmentId?: string;
// // //   startTime: Date;
// // // }

// // // const activeCalls = new Map<string, CallSession>(); // socket.id => CallSession

// // // export const videoCallSocketHandler = (io: Namespace, socket: Socket) => { //Server => NameSpace
  
// // //   socket.on("register-user", (userId: string) => {
// // //     socket.data.userId = userId;
// // //      console.log(`User ${userId} joined room: ${userId}`);
// // //     socket.join(userId);
// // //   });


  
// // //   socket.on("join-call-room", ({ appointmentId }) => {
// // //     if (appointmentId) {
// // //       socket.join(appointmentId);
// // //     }
// // //   });

// // //   socket.on("call-user", ({ to, from, signal, name, doctorId, patientId, appointmentId }) => {
// // //     console.log("entered into call user")
// // //     activeCalls.set(from, {
// // //       doctorId,
// // //       patientId,
// // //       appointmentId,
// // //       startTime: new Date(),
// // //     });

   
// // //    console.log(`Sending incoming call to: ${to}`);

// // //     io.to(to).emit("incoming-call", { from, name, signal });
// // //   });

// // //   socket.on("answer-call", ({ to, signal, appointmentId }) => {
// // //     io.to(to).emit("call-accepted", { signal }); // 
// // //   });

// // //   socket.on("reject-call", ({ to, appointmentId }) => {
// // //     io.to(to).emit("call-rejected");
// // //   });

// // //   socket.on("end-call", async ({ to, from }) => {
// // //     const session = activeCalls.get(from);

// // //     if (session) {
// // //       const endTime = new Date();
// // //       const duration = Math.floor((endTime.getTime() - session.startTime.getTime()) / 1000);

// // //       await callLogService.logCall({
// // //         doctorId: new mongoose.Types.ObjectId(session.doctorId),
// // //         patientId: new mongoose.Types.ObjectId(session.patientId),
// // //         appointmentId: session.appointmentId
// // //           ? new mongoose.Types.ObjectId(session.appointmentId)
// // //           : undefined,
// // //         startTime: session.startTime,
// // //         endTime,
// // //         duration,
// // //         callType: "video",
// // //         callStatus: "completed",
// // //       });

// // //       activeCalls.delete(from);
// // //     }

// // //     io.to(to).emit("end-call"); 
// // //   });

// // //   socket.on("disconnect", () => {
// // //     if (socket.data.userId) {
// // //       io.to(socket.data.userId).emit("user-disconnected");
// // //     }
// // //   });
// // // };




















// // import { Server, Socket } from "socket.io";
// // import { CallLogService } from "../../services/implementation/callLog.service";
// // import { CallLogRepository } from "../../repositories/implementation/callLog.repository";
// // import mongoose from "mongoose";
// // import { Namespace } from "socket.io";

// // const callLogRepository = new CallLogRepository();
// // const callLogService = new CallLogService(callLogRepository);

// // interface CallSession {
// //   doctorId: string;
// //   patientId: string;
// //   appointmentId?: string;
// //   startTime: Date;
// // }

// // const activeCalls = new Map<string, CallSession>(); // socket.id => CallSession

// // export const videoCallSocketHandler = (io: Namespace, socket: Socket) => {
// //   console.log(`✅ Video socket connected: ${socket.id}`);

// //   socket.on("register-user", (userId: string) => {
// //     socket.data.userId = userId;
// //     console.log(`User ${userId} joined room: ${userId}`);
// //     socket.join(userId); // Ensure user joins their own userId room
// //   });

// //   socket.on("join-call-room", ({ appointmentId, userId, doctorId }) => {
// //     if (appointmentId) {
// //       console.log(`User ${userId} joined appointment room: ${appointmentId}`);
// //       socket.join(appointmentId);
// //     }
// //   });

// //   socket.on("call-user", ({ to, from, signal, name, doctorId, patientId, appointmentId }) => {
// //     console.log(`call-user event received from ${from} to ${to}`);
// //     activeCalls.set(from, {
// //       doctorId,
// //       patientId,
// //       appointmentId,
// //       startTime: new Date(),
// //     });

// //     console.log(`Sending incoming-call to: ${to}`);
// //     io.to(to).emit("incoming-call", { from, name, signal });
// //   });

 
// //  socket.on("answer-call", ({ to, signal, appointmentId }) => {
// //     console.log(`answer-call event from ${socket.data.userId} to ${to}`);
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
// //         console.log(`Call logged for appointment: ${session.appointmentId}`);
// //       } catch (err) {
// //         console.error("Error logging call:", err);
// //       }

// //       activeCalls.delete(from);
// //     }

// //     io.to(to).emit("end-call");
// //   });

// //   socket.on("ice-candidate", ({ to, candidate }) => {
// //     console.log(`ICE candidate from ${socket.data.userId} to ${to}`);
// //     io.to(to).emit("ice-candidate", { candidate });
// //   });

// //   socket.on("disconnect", () => {
// //     console.log(`Socket disconnected: ${socket.id}`);
// //     if (socket.data.userId) {
// //       io.to(socket.data.userId).emit("user-disconnected");
// //     }
// //     activeCalls.delete(socket.data.userId);
// //   });
// // };












// import { Server, Socket } from "socket.io";
// import { CallLogService } from "../../services/implementation/callLog.service";
// import { CallLogRepository } from "../../repositories/implementation/callLog.repository";
// import mongoose from "mongoose";
// import { Namespace } from "socket.io";

// const callLogRepository = new CallLogRepository();
// const callLogService = new CallLogService(callLogRepository);

// interface CallSession {
//   doctorId: string;
//   patientId: string;
//   appointmentId?: string;
//   startTime: Date;
// }

// const activeCalls = new Map<string, CallSession>(); // socket.id => CallSession

// export const videoCallSocketHandler = (io: Namespace, socket: Socket) => {
//   console.log(`✅ Video socket connected: ${socket.id}`);

//   socket.on("register-user", (userId: string) => {
//     if (!userId) {
//       console.error("Invalid userId received:", userId);
//       return;
//     }
//     socket.data.userId = userId;
//     console.log(`User ${userId} joined room: ${userId}`);
//     socket.join(userId); // Ensure user joins their own userId room
//   });

//   socket.on("join-call-room", ({ appointmentId, userId, doctorId }) => {
//     if (!appointmentId || !userId || !doctorId) {
//       console.error("Invalid join-call-room data:", { appointmentId, userId, doctorId });
//       return;
//     }
//     console.log(`User ${userId} joined appointment room: ${appointmentId}`);
//     socket.join(appointmentId);
//   });

//   socket.on("call-user", ({ to, from, signal, name, doctorId, patientId, appointmentId }) => {
//     if (!to || !from) {
//       console.error("Invalid call-user data:", { to, from });
//       return;
//     }
//     console.log(`call-user event received from ${from} to ${to}`);
//     activeCalls.set(from, {
//       doctorId,
//       patientId,
//       appointmentId,
//       startTime: new Date(),
//     });

//     console.log(`Sending incoming-call to: ${to}`);
//     io.to(to).emit("incoming-call", { from, name, signal });
//   });

//   socket.on("answer-call", ({ to, signal, appointmentId }) => {
//     console.log(`answer-call event from ${socket.data.userId} to ${to}`);
//     io.to(to).emit("call-accepted", { signal });
//   });

//   socket.on("reject-call", ({ to, appointmentId }) => {
//     console.log(`reject-call event from ${socket.data.userId} to ${to}`);
//     io.to(to).emit("call-rejected");
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
//         console.log(`Call logged for appointment: ${session.appointmentId}`);
//       } catch (err) {
//         console.error("Error logging call:", err);
//       }

//       activeCalls.delete(from);
//     }

//     io.to(to).emit("end-call");
//   });

//   socket.on("ice-candidate", ({ to, candidate }) => {
//     console.log(`ICE candidate from ${socket.data.userId} to ${to}`);
//     io.to(to).emit("ice-candidate", { candidate });
//   });

//   socket.on("disconnect", () => {
//     console.log(`Socket disconnected: ${socket.id}, user: ${socket.data.userId}`);
//     if (socket.data.userId) {
//       io.to(socket.data.userId).emit("user-disconnected");
//       activeCalls.delete(socket.data.userId);
//     }
//   });
// };















import { Server, Socket } from "socket.io";
import { CallLogService } from "../../services/implementation/callLog.service";
import { CallLogRepository } from "../../repositories/implementation/callLog.repository";
import { AppointmentRepository } from "../../repositories/implementation/appointment.repositories";
import mongoose from "mongoose";
import { Namespace } from "socket.io";

const callLogRepository = new CallLogRepository();
const appointmentRepository = new AppointmentRepository();
const callLogService = new CallLogService(callLogRepository, appointmentRepository);

interface CallSession {
  doctorId: string;
  patientId: string;
  appointmentId?: string;
  startTime: Date;
}

const activeCalls = new Map<string, CallSession>(); // userId => CallSession
const connectedUsers = new Map<string, Socket>(); // userId => Socket

export const videoCallSocketHandler = (io: Namespace, socket: Socket) => {
  console.log(`Video socket connected: ${socket.id}`);

  socket.on("register-user", (userId: string) => {
    if (!userId) {
      console.error("Invalid userId received:", userId);
      socket.emit("error", { message: "Invalid userId" });
      return;
    }

    // Disconnect previous socket for the same userId
    if (connectedUsers.has(userId)) {
      console.log(`User ${userId} already connected, disconnecting old socket`);
      connectedUsers.get(userId)?.disconnect();
    }

    socket.data.userId = userId;
    connectedUsers.set(userId, socket);
    console.log(`User ${userId} joined room: ${userId}`);
    socket.join(userId); 
    console.log(`Socket ${socket.id} rooms:`, socket.rooms);
  });

  socket.on("join-call-room", ({ appointmentId, userId, doctorId, patientId }) => {
    if (!appointmentId || !userId || !doctorId || !patientId) {
      console.error("Invalid join-call-room data:", { appointmentId, userId, doctorId, patientId });
      socket.emit("error", { message: "Invalid join-call-room data" });
      return;
    }
    console.log(`User ${userId} joined appointment room: ${appointmentId}`);
    socket.join(appointmentId);
    console.log(`Socket ${socket.id} rooms:`, socket.rooms);
  });

  // socket.on("call-user", ({ to, from, signal, name, doctorId, patientId, appointmentId }) => {
  //   if (!to || !from ) {
  //     console.error("Invalid call-user data:", { to, from });
  //     socket.emit("error", { message: "Invalid call-user data" });
  //     return;
  //   }
  //   console.log(`call-user event received from ${from} to ${to}`);
  //   activeCalls.set(from, {
  //     doctorId,
  //     patientId,
  //     appointmentId,
  //     startTime: new Date(),
  //   });
  //   activeCalls.set(to, {
  //     doctorId,
  //     patientId,
  //     appointmentId,
  //     startTime: new Date(),
  //   });

  //   console.log(`Sending incoming-call to: ${to}`);
  //   io.to(to).emit("incoming-call", { from, name, signal });
  // });



  socket.on("call-user", ({ to, from, signal, name, doctorId, patientId, appointmentId }) => {
  if (!to || !from || !appointmentId || !doctorId || !patientId) {
    console.error("Invalid call-user data:", { to, from, appointmentId });
    socket.emit("error", { message: "Invalid call-user data" });
    return;
  }

  const receiverSocket = connectedUsers.get(to);
  const senderSocket = connectedUsers.get(from);

  // Check if receiver is online
  if (!receiverSocket) {
    console.warn(`Receiver ${to} is not online`);
    socket.emit("error", { message: "User is not online or available for call." });
    return;
  }

  const receiverRooms = Array.from(receiverSocket.rooms);
  const senderRooms = Array.from(socket.rooms);

  // Check if both are in the same appointment room
  const receiverInRoom = receiverRooms.includes(appointmentId);
  const senderInRoom = senderRooms.includes(appointmentId);

  if (!receiverInRoom || !senderInRoom) {
    console.warn(`Appointment mismatch. Receiver in room: ${receiverInRoom}, Sender in room: ${senderInRoom}`);
    socket.emit("error", {
      message: "User is not online or available for call",
    });
    return;
  }

  // Log call session
  const session: CallSession = {
    doctorId,
    patientId,
    appointmentId,
    startTime: new Date(),
  };

  activeCalls.set(from, session);
  activeCalls.set(to, session);

  console.log(`Valid call initiated from ${from} to ${to} for appointment ${appointmentId}`);
  io.to(to).emit("incoming-call", { from, name, signal });
});


  socket.on("answer-call", ({ to, signal, appointmentId }) => {
    console.log(`answer-call event from ${socket.data.userId} to ${to}`);
    io.to(to).emit("call-accepted", { signal });
  });

  socket.on("reject-call", ({ to, appointmentId }) => {
    console.log(`reject-call event from ${socket.data.userId} to ${to}`);
    io.to(to).emit("call-rejected");
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
        console.log(`Call logged for appointment: ${session.appointmentId}`);
      } catch (err) {
        console.error("Error logging call:", err);
      }

      activeCalls.delete(from);
      activeCalls.delete(to);
    }

    io.to(to).emit("end-call");
  });

  socket.on("ice-candidate", ({ to, candidate }) => {
    console.log(`ICE candidate from ${socket.data.userId} to ${to}`);
    io.to(to).emit("ice-candidate", { candidate });
  });

  
  socket.on("disconnect", async () => {
  console.log(`Socket disconnected: ${socket.id}, user: ${socket.data.userId}`);

  const userId = socket.data.userId;
  const session = activeCalls.get(userId);

  if (userId) {
    connectedUsers.delete(userId);

    // Notify other participant in the call room
    if (session?.appointmentId) {
      io.to(session.appointmentId).emit("user-disconnected", {userId});
      try {
         const endTime = new Date();
         const duration = Math.floor((endTime.getTime() - session.startTime.getTime())/1000);

         await callLogService.logCall({
            doctorId: new mongoose.Types.ObjectId(session.doctorId),
            patientId: new mongoose.Types.ObjectId(session.patientId),
            appointmentId: new mongoose.Types.ObjectId(session.appointmentId),
            startTime: session.startTime,
            endTime: endTime,
            duration,
            callType: "video",
            callStatus: "dropped",
         })
          console.log(`Notified room ${session.appointmentId} that user ${userId} disconnected`);
      } catch (error) {
          console.error("Error in auto logging ");
      }
     
    }

    // activeCalls.delete(userId);
  }
});

};













// socket.on("disconnect", () => {
  //   console.log(`Socket disconnected: ${socket.id}, user: ${socket.data.userId}`);
  //   if (socket.data.userId) {
  //     connectedUsers.delete(socket.data.userId);
  //     io.to(socket.data.userId).emit("user-disconnected");
      
   
  //     activeCalls.delete(socket.data.userId);
  //   }
  // });