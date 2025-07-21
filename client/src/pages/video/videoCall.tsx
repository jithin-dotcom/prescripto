


// // // // // // import { useEffect, useRef, useState } from "react";
// // // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // // import { Phone, PhoneOff, Video } from "lucide-react";
// // // // // // import io from "socket.io-client";

// // // // // // type SignalData =
// // // // // //   | RTCSessionDescriptionInit
// // // // // //   | { candidate: RTCIceCandidateInit };
// // // // // // const socket = io(import.meta.env.VITE_SOCKET_URL, { withCredentials: true });

// // // // // // interface IncomingCallData {
// // // // // //   from: string;
// // // // // //   name: string;
// // // // // //   signal: SignalData;
// // // // // // }

// // // // // // export default function VideoCall() {
// // // // // //   const [stream, setStream] = useState<MediaStream | null>(null);
// // // // // //   const [callAccepted, setCallAccepted] = useState(false);
// // // // // //   const [callEnded, setCallEnded] = useState(false);
// // // // // //   const [incomingCall, setIncomingCall] = useState<IncomingCallData | null>(null);
// // // // // //   const [showIncomingPopup, setShowIncomingPopup] = useState(false);

// // // // // //   const myVideo = useRef<HTMLVideoElement>(null);
// // // // // //   const userVideo = useRef<HTMLVideoElement>(null);
// // // // // //   const peerConnection = useRef<RTCPeerConnection | null>(null);


// // // // // //   function isRTCSessionDescription(
// // // // // //   signal: SignalData
// // // // // // ): signal is RTCSessionDescriptionInit {
// // // // // //   return "type" in signal && "sdp" in signal;
// // // // // // }


// // // // // //   useEffect(() => {
// // // // // //     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
// // // // // //       .then(currentStream => {
// // // // // //         setStream(currentStream);
// // // // // //         if (myVideo.current) myVideo.current.srcObject = currentStream;
// // // // // //       });

// // // // // //     socket.on("incoming-call", ({ from, name, signal }) => {
// // // // // //       setIncomingCall({ from, name, signal });
// // // // // //       setShowIncomingPopup(true);
// // // // // //     });

// // // // // //     socket.on("call-rejected", () => {
// // // // // //       alert("Call rejected");
// // // // // //       setShowIncomingPopup(false);
// // // // // //     });

// // // // // //     return () => {
// // // // // //       socket.off("incoming-call");
// // // // // //       socket.off("call-rejected");
// // // // // //     };
// // // // // //   }, []);

// // // // // //   const handleAcceptCall = async () => {
// // // // // //     setShowIncomingPopup(false);
// // // // // //     setCallAccepted(true);

// // // // // //     const pc = new RTCPeerConnection();
// // // // // //     peerConnection.current = pc;

// // // // // //     stream?.getTracks().forEach(track => pc.addTrack(track, stream));

// // // // // //     pc.ontrack = event => {
// // // // // //       const [remoteStream] = event.streams;
// // // // // //       if (userVideo.current) userVideo.current.srcObject = remoteStream;
// // // // // //     };

// // // // // //     // await pc.setRemoteDescription(new RTCSessionDescription(incomingCall!.signal));
// // // // // //     if (isRTCSessionDescription(incomingCall!.signal)) {
// // // // // //   await pc.setRemoteDescription(new RTCSessionDescription(incomingCall!.signal));
// // // // // // } else {
// // // // // //   console.error("Signal is not a valid RTCSessionDescriptionInit");
// // // // // //   return;
// // // // // // }

// // // // // //     const answer = await pc.createAnswer();
// // // // // //     await pc.setLocalDescription(answer);

// // // // // //     socket.emit("answer-call", {
// // // // // //       to: incomingCall!.from,
// // // // // //       signal: pc.localDescription,
// // // // // //     });
// // // // // //   };

// // // // // //   const handleRejectCall = () => {
// // // // // //     setShowIncomingPopup(false);
// // // // // //     socket.emit("reject-call", { to: incomingCall?.from });
// // // // // //   };

// // // // // //   const endCall = () => {
// // // // // //     setCallEnded(true);
// // // // // //     peerConnection.current?.close();
// // // // // //     socket.emit("end-call", { to: incomingCall?.from });
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="flex flex-col h-screen w-full items-center justify-center bg-gray-100">
// // // // // //       <div className="relative w-full max-w-4xl flex flex-col items-center justify-center gap-6">
// // // // // //         <video ref={myVideo} muted autoPlay playsInline className="rounded-xl shadow-md w-full max-w-sm" />

// // // // // //         {callAccepted && (
// // // // // //           <video ref={userVideo} autoPlay playsInline className="rounded-xl shadow-md w-full max-w-sm" />
// // // // // //         )}

// // // // // //         {callAccepted && !callEnded && (
// // // // // //           <button
// // // // // //             onClick={endCall}
// // // // // //             className="mt-4 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md flex items-center gap-2"
// // // // // //           >
// // // // // //             <PhoneOff /> End Call
// // // // // //           </button>
// // // // // //         )}
// // // // // //       </div>

// // // // // //       <AnimatePresence>
// // // // // //         {showIncomingPopup && incomingCall && (
// // // // // //           <motion.div
// // // // // //             initial={{ opacity: 0, scale: 0.8 }}
// // // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // // //             exit={{ opacity: 0, scale: 0.8 }}
// // // // // //             className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
// // // // // //           >
// // // // // //             <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col gap-4 items-center">
// // // // // //               <Video size={40} className="text-blue-500" />
// // // // // //               <p className="text-lg font-semibold">Incoming call from {incomingCall.name}</p>
// // // // // //               <div className="flex gap-4">
// // // // // //                 <button
// // // // // //                   className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-md flex items-center gap-2"
// // // // // //                   onClick={handleAcceptCall}
// // // // // //                 >
// // // // // //                   <Phone /> Accept
// // // // // //                 </button>
// // // // // //                 <button
// // // // // //                   className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full shadow-md flex items-center gap-2"
// // // // // //                   onClick={handleRejectCall}
// // // // // //                 >
// // // // // //                   <PhoneOff /> Reject
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </motion.div>
// // // // // //         )}
// // // // // //       </AnimatePresence>
// // // // // //     </div>
// // // // // //   );
// // // // // // }














// // // // // import { useEffect, useRef, useState } from "react";
// // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // import { Phone, PhoneOff, Video, X } from "lucide-react";
// // // // // import io from "socket.io-client";

// // // // // type SignalData = RTCSessionDescriptionInit | { candidate: RTCIceCandidateInit };
// // // // // const socket = io(import.meta.env.VITE_SOCKET_URL, { withCredentials: true });

// // // // // interface IncomingCallData {
// // // // //   from: string;
// // // // //   name: string;
// // // // //   signal: SignalData;
// // // // // }

// // // // // export default function VideoCall() {
// // // // //   const [stream, setStream] = useState<MediaStream | null>(null);
// // // // //   const [callAccepted, setCallAccepted] = useState(false);
// // // // //   const [callEnded, setCallEnded] = useState(false);
// // // // //   const [incomingCall, setIncomingCall] = useState<IncomingCallData | null>(null);
// // // // //   const [showIncomingPopup, setShowIncomingPopup] = useState(false);
// // // // //   const [isCalling, setIsCalling] = useState(false);
// // // // //   const [calleeId, setCalleeId] = useState("");
// // // // // //   const [calleeName, setCalleeName] = useState("");

// // // // //   const myVideo = useRef<HTMLVideoElement>(null);
// // // // //   const userVideo = useRef<HTMLVideoElement>(null);
// // // // //   const peerConnection = useRef<RTCPeerConnection | null>(null);

// // // // //   function isRTCSessionDescription(
// // // // //     signal: SignalData
// // // // //   ): signal is RTCSessionDescriptionInit {
// // // // //     return "type" in signal && "sdp" in signal;
// // // // //   }

// // // // //   useEffect(() => {
// // // // //     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(currentStream => {
// // // // //       setStream(currentStream);
// // // // //       if (myVideo.current) myVideo.current.srcObject = currentStream;
// // // // //     });

// // // // //     socket.on("incoming-call", ({ from, name, signal }) => {
// // // // //       setIncomingCall({ from, name, signal });
// // // // //       setShowIncomingPopup(true);
// // // // //     });

// // // // //     socket.on("call-rejected", () => {
// // // // //       alert("Call was rejected");
// // // // //       setIsCalling(false);
// // // // //       peerConnection.current?.close();
// // // // //     });

// // // // //     socket.on("call-accepted", async ({ signal }) => {
// // // // //       setCallAccepted(true);
// // // // //       setIsCalling(false);
// // // // //       if (peerConnection.current && isRTCSessionDescription(signal)) {
// // // // //         await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
// // // // //       }
// // // // //     });

// // // // //     return () => {
// // // // //       socket.off("incoming-call");
// // // // //       socket.off("call-rejected");
// // // // //       socket.off("call-accepted");
// // // // //     };
// // // // //   }, []);

// // // // //   const startCall = async () => {
// // // // //     if (!calleeId) return alert("Enter Callee ID");

// // // // //     const pc = new RTCPeerConnection();
// // // // //     peerConnection.current = pc;
// // // // //     setIsCalling(true);

// // // // //     stream?.getTracks().forEach(track => pc.addTrack(track, stream));

// // // // //     pc.ontrack = event => {
// // // // //       const [remoteStream] = event.streams;
// // // // //       if (userVideo.current) userVideo.current.srcObject = remoteStream;
// // // // //     };

// // // // //     const offer = await pc.createOffer();
// // // // //     await pc.setLocalDescription(offer);

// // // // //     socket.emit("call-user", {
// // // // //       to: calleeId,
// // // // //       signal: pc.localDescription,
// // // // //       name: "Caller",
// // // // //     });
// // // // //   };

// // // // //   const handleAcceptCall = async () => {
// // // // //     setShowIncomingPopup(false);
// // // // //     setCallAccepted(true);

// // // // //     const pc = new RTCPeerConnection();
// // // // //     peerConnection.current = pc;

// // // // //     stream?.getTracks().forEach(track => pc.addTrack(track, stream));

// // // // //     pc.ontrack = event => {
// // // // //       const [remoteStream] = event.streams;
// // // // //       if (userVideo.current) userVideo.current.srcObject = remoteStream;
// // // // //     };

// // // // //     if (incomingCall && isRTCSessionDescription(incomingCall.signal)) {
// // // // //       await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.signal));
// // // // //     }

// // // // //     const answer = await pc.createAnswer();
// // // // //     await pc.setLocalDescription(answer);

// // // // //     socket.emit("answer-call", {
// // // // //       to: incomingCall?.from,
// // // // //       signal: pc.localDescription,
// // // // //     });
// // // // //   };

// // // // //   const handleRejectCall = () => {
// // // // //     setShowIncomingPopup(false);
// // // // //     socket.emit("reject-call", { to: incomingCall?.from });
// // // // //   };

// // // // //   const cancelCall = () => {
// // // // //     socket.emit("cancel-call", { to: calleeId });
// // // // //     peerConnection.current?.close();
// // // // //     setIsCalling(false);
// // // // //   };

// // // // //   const endCall = () => {
// // // // //     setCallEnded(true);
// // // // //     setCallAccepted(false);
// // // // //     setIsCalling(false);
// // // // //     peerConnection.current?.close();
// // // // //     socket.emit("end-call", { to: incomingCall?.from || calleeId });
// // // // //   };

// // // // //   return (
// // // // //     <div className="flex flex-col h-screen w-full items-center justify-center bg-gray-100 px-4">
// // // // //       <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
// // // // //         <div className="w-full flex flex-col items-center gap-4">
// // // // //           <input
// // // // //             placeholder="Enter Callee ID"
// // // // //             value={calleeId}
// // // // //             onChange={(e) => setCalleeId(e.target.value)}
// // // // //             className="px-4 py-2 border rounded-lg w-64"
// // // // //           />
// // // // //           {!callAccepted && !isCalling && (
// // // // //             <button
// // // // //               onClick={startCall}
// // // // //               className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full shadow-md flex items-center gap-2"
// // // // //             >
// // // // //               <Video /> Start Call
// // // // //             </button>
// // // // //           )}
// // // // //           {isCalling && !callAccepted && (
// // // // //             <button
// // // // //               onClick={cancelCall}
// // // // //               className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full shadow-md"
// // // // //             >
// // // // //               Cancel Call
// // // // //             </button>
// // // // //           )}
// // // // //         </div>

// // // // //         <video ref={myVideo} muted autoPlay playsInline className="rounded-xl shadow-md w-full max-w-sm" />
// // // // //         {callAccepted && (
// // // // //           <video ref={userVideo} autoPlay playsInline className="rounded-xl shadow-md w-full max-w-sm" />
// // // // //         )}

// // // // //         {callAccepted && !callEnded && (
// // // // //           <button
// // // // //             onClick={endCall}
// // // // //             className="mt-4 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md flex items-center gap-2"
// // // // //           >
// // // // //             <PhoneOff /> End Call
// // // // //           </button>
// // // // //         )}
// // // // //       </div>

// // // // //       <AnimatePresence>
// // // // //         {showIncomingPopup && incomingCall && (
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, scale: 0.8 }}
// // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // //             exit={{ opacity: 0, scale: 0.8 }}
// // // // //             className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
// // // // //           >
// // // // //             <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col gap-4 items-center relative">
// // // // //               <button
// // // // //                 className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
// // // // //                 onClick={() => setShowIncomingPopup(false)}
// // // // //               >
// // // // //                 <X />
// // // // //               </button>
// // // // //               <Video size={40} className="text-blue-500" />
// // // // //               <p className="text-lg font-semibold">Incoming call from {incomingCall.name}</p>
// // // // //               <div className="flex gap-4">
// // // // //                 <button
// // // // //                   className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-md flex items-center gap-2"
// // // // //                   onClick={handleAcceptCall}
// // // // //                 >
// // // // //                   <Phone /> Accept
// // // // //                 </button>
// // // // //                 <button
// // // // //                   className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full shadow-md flex items-center gap-2"
// // // // //                   onClick={handleRejectCall}
// // // // //                 >
// // // // //                   <PhoneOff /> Reject
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </motion.div>
// // // // //         )}
// // // // //       </AnimatePresence>
// // // // //     </div>
// // // // //   );
// // // // // }











// // // // import { useEffect, useRef, useState } from "react";
// // // // import { useLocation } from "react-router-dom";
// // // // import { AnimatePresence, motion } from "framer-motion";
// // // // import { Phone, PhoneOff, Video, X } from "lucide-react";
// // // // import io from "socket.io-client";

// // // // const socket = io(`${import.meta.env.VITE_SOCKET_URL}/video`, { withCredentials: true });

// // // // type SignalData = RTCSessionDescriptionInit;

// // // // interface IncomingCallData {
// // // //   from: string;
// // // //   name: string;
// // // //   signal: SignalData;
// // // // }

// // // // export default function MyVideoCall() {
// // // //   const { state } = useLocation();
// // // //   const { appointmentId, userId, doctorId } = state || {};

// // // //   const [stream, setStream] = useState<MediaStream | null>(null);
// // // //   const [incomingCall, setIncomingCall] = useState<IncomingCallData | null>(null);
// // // //   const [callAccepted, setCallAccepted] = useState(false);
// // // //   const [callEnded, setCallEnded] = useState(false);
// // // //   const [showIncomingPopup, setShowIncomingPopup] = useState(false);
// // // //   const [isCalling, setIsCalling] = useState(false);

// // // //   const myVideo = useRef<HTMLVideoElement>(null);
// // // //   const userVideo = useRef<HTMLVideoElement>(null);
// // // //   const peerConnection = useRef<RTCPeerConnection | null>(null);

// // // //   useEffect(() => {
// // // //     if (!appointmentId || !userId || !doctorId) return;

// // // //     socket.emit("join-call-room", { appointmentId, userId, doctorId });

// // // //     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(currentStream => {
// // // //       setStream(currentStream);
// // // //       if (myVideo.current) myVideo.current.srcObject = currentStream;
// // // //     });

// // // //     socket.on("incoming-call", ({ from, name, signal }) => {
// // // //       setIncomingCall({ from, name, signal });
// // // //       setShowIncomingPopup(true);
// // // //     });

// // // //     socket.on("call-rejected", () => {
// // // //       alert("Call was rejected.");
// // // //       setIsCalling(false);
// // // //     });

// // // //     socket.on("call-accepted", async ({ signal }) => {
// // // //       setCallAccepted(true);
// // // //       if (peerConnection.current) {
// // // //         await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
// // // //       }
// // // //     });

// // // //     socket.on("end-call", () => {
// // // //       handleRemoteEnd();
// // // //     });

// // // //     return () => {
// // // //       socket.disconnect();
// // // //     };
// // // //   }, [appointmentId, userId, doctorId]);

// // // //   const startCall = async () => {
// // // //     const pc = new RTCPeerConnection();
// // // //     peerConnection.current = pc;
// // // //     setIsCalling(true);

// // // //     stream?.getTracks().forEach(track => pc.addTrack(track, stream!));

// // // //     pc.ontrack = event => {
// // // //       if (userVideo.current) userVideo.current.srcObject = event.streams[0];
// // // //     };

// // // //     const offer = await pc.createOffer();
// // // //     await pc.setLocalDescription(offer);

// // // //     socket.emit("call-user", {
// // // //       to: doctorId === userId ? appointmentId : doctorId,
// // // //       from: userId,
// // // //       name: "User",
// // // //       appointmentId,
// // // //       signal: offer,
// // // //     });
// // // //   };

// // // //   const handleAcceptCall = async () => {
// // // //     setCallAccepted(true);
// // // //     setShowIncomingPopup(false);

// // // //     const pc = new RTCPeerConnection();
// // // //     peerConnection.current = pc;

// // // //     stream?.getTracks().forEach(track => pc.addTrack(track, stream!));

// // // //     pc.ontrack = event => {
// // // //       if (userVideo.current) userVideo.current.srcObject = event.streams[0];
// // // //     };

// // // //     if (incomingCall?.signal) {
// // // //       await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.signal));
// // // //     }

// // // //     const answer = await pc.createAnswer();
// // // //     await pc.setLocalDescription(answer);

// // // //     socket.emit("answer-call", {
// // // //       to: incomingCall?.from,
// // // //       appointmentId,
// // // //       signal: answer,
// // // //     });
// // // //   };

// // // //   const handleRejectCall = () => {
// // // //     setShowIncomingPopup(false);
// // // //     socket.emit("reject-call", { to: incomingCall?.from, appointmentId });
// // // //   };

// // // //   const endCall = () => {
// // // //     setCallEnded(true);
// // // //     setCallAccepted(false);
// // // //     peerConnection.current?.close();
// // // //     socket.emit("end-call", { appointmentId });
// // // //   };

// // // //   const handleRemoteEnd = () => {
// // // //     alert("Call ended by the other party.");
// // // //     setCallEnded(true);
// // // //     setCallAccepted(false);
// // // //     peerConnection.current?.close();
// // // //   };

// // // //   return (
// // // //     <div className="h-screen w-full flex items-center justify-center bg-gray-100 p-4">
// // // //       <div className="flex flex-col gap-6 items-center w-full max-w-4xl">
// // // //         {!callAccepted && !isCalling && (
// // // //           <button
// // // //             onClick={startCall}
// // // //             className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-600 shadow-md"
// // // //           >
// // // //             <Video /> Start Call
// // // //           </button>
// // // //         )}

// // // //         <video
// // // //           ref={myVideo}
// // // //           muted
// // // //           autoPlay
// // // //           playsInline
// // // //           className="rounded-lg w-full max-w-md shadow-lg"
// // // //         />
// // // //         {callAccepted && (
// // // //           <video
// // // //             ref={userVideo}
// // // //             autoPlay
// // // //             playsInline
// // // //             className="rounded-lg w-full max-w-md shadow-lg"
// // // //           />
// // // //         )}

// // // //         {callAccepted && !callEnded && (
// // // //           <button
// // // //             onClick={endCall}
// // // //             className="bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-red-600 shadow-md"
// // // //           >
// // // //             <PhoneOff /> End Call
// // // //           </button>
// // // //         )}
// // // //       </div>

// // // //       <AnimatePresence>
// // // //         {showIncomingPopup && incomingCall && (
// // // //           <motion.div
// // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // //             animate={{ opacity: 1, scale: 1 }}
// // // //             exit={{ opacity: 0, scale: 0.9 }}
// // // //             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
// // // //           >
// // // //             <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
// // // //               <button
// // // //                 className="absolute top-2 right-2"
// // // //                 onClick={() => setShowIncomingPopup(false)}
// // // //               >
// // // //                 <X />
// // // //               </button>
// // // //               <Video className="text-blue-500" size={40} />
// // // //               <p className="text-lg font-semibold">
// // // //                 Incoming call from {incomingCall.name}
// // // //               </p>
// // // //               <div className="flex gap-4">
// // // //                 <button
// // // //                   className="bg-green-500 text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-green-600"
// // // //                   onClick={handleAcceptCall}
// // // //                 >
// // // //                   <Phone /> Accept
// // // //                 </button>
// // // //                 <button
// // // //                   className="bg-red-500 text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-red-600"
// // // //                   onClick={handleRejectCall}
// // // //                 >
// // // //                   <PhoneOff /> Reject
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </motion.div>
// // // //         )}
// // // //       </AnimatePresence>
// // // //     </div>
// // // //   );
// // // // }




















// // // // import { useEffect, useRef, useState } from "react";
// // // // import { useLocation } from "react-router-dom";
// // // // import { AnimatePresence, motion } from "framer-motion";
// // // // import { Phone, PhoneOff, Video, X } from "lucide-react";
// // // // import io from "socket.io-client";

// // // // const socket = io(`${import.meta.env.VITE_SOCKET_URL}/video`, {
// // // //   withCredentials: true,
// // // // });

// // // // type SignalData = RTCSessionDescriptionInit;

// // // // interface IncomingCallData {
// // // //   from: string;
// // // //   name: string;
// // // //   signal: SignalData;
// // // // }

// // // // export default function MyVideoCall() {
// // // //   const { state } = useLocation();
// // // //   const { appointmentId, userId, doctorId } = state || {};

// // // //   const [stream, setStream] = useState<MediaStream | null>(null);
// // // //   const [incomingCall, setIncomingCall] = useState<IncomingCallData | null>(null);
// // // //   const [callAccepted, setCallAccepted] = useState(false);
// // // //   const [callEnded, setCallEnded] = useState(false);
// // // //   const [showIncomingPopup, setShowIncomingPopup] = useState(false);
// // // //   const [isCalling, setIsCalling] = useState(false);

// // // //   const myVideo = useRef<HTMLVideoElement>(null);
// // // //   const userVideo = useRef<HTMLVideoElement>(null);
// // // //   const peerConnection = useRef<RTCPeerConnection | null>(null);

// // // //   useEffect(() => {
// // // //     if (!appointmentId || !userId || !doctorId) return;

// // // //     console.log("appointmentId :",appointmentId);
// // // //      console.log("userId :",userId);
// // // //       console.log("doctorId :",doctorId);

// // // //     // Register user and join call room
// // // //     socket.emit("register-user", userId);
// // // //     socket.emit("join-call-room", { appointmentId, userId, doctorId });

// // // //     // Get local media
// // // //     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(currentStream => {
// // // //       setStream(currentStream);
// // // //       if (myVideo.current) myVideo.current.srcObject = currentStream;
// // // //     });

// // // //     // Handle incoming call
// // // //     socket.on("incoming-call", ({ from, name, signal }) => {
// // // //       setIncomingCall({ from, name, signal });
// // // //       setShowIncomingPopup(true);
// // // //     });

// // // //     socket.on("call-rejected", () => {
// // // //       alert("Call was rejected.");
// // // //       setIsCalling(false);
// // // //     });

// // // //     socket.on("call-accepted", async ({ signal }) => {
// // // //       setCallAccepted(true);
// // // //       if (peerConnection.current) {
// // // //         await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
// // // //       }
// // // //     });

// // // //     socket.on("end-call", () => {
// // // //       handleRemoteEnd();
// // // //     });

// // // //     socket.on("user-disconnected", () => {
// // // //       alert("The other user disconnected.");
// // // //       handleRemoteEnd();
// // // //     });

// // // //     return () => {
// // // //       peerConnection.current?.close();
// // // //       stream?.getTracks().forEach(track => track.stop());
// // // //       socket.disconnect();
// // // //     };
// // // //   }, [appointmentId, userId, doctorId]);

// // // //   const startCall = async () => {
// // // //     const pc = new RTCPeerConnection();
// // // //     peerConnection.current = pc;
// // // //     setIsCalling(true);

// // // //     stream?.getTracks().forEach(track => pc.addTrack(track, stream!));

// // // //     pc.ontrack = event => {
// // // //       if (userVideo.current) userVideo.current.srcObject = event.streams[0];
// // // //     };

// // // //     const offer = await pc.createOffer();
// // // //     await pc.setLocalDescription(offer);

// // // // //     const isDoctor = userId === doctorId;
// // // // // const receiverId = isDoctor ? state.patientId : doctorId;

// // // //     socket.emit("call-user", {
// // // //     //   to: doctorId === userId ? appointmentId : doctorId,
// // // //       to: doctorId === userId ? userId : doctorId, 
// // // //       from: userId,
// // // //       name: "User",
// // // //       appointmentId,
// // // //       signal: offer,
// // // //     });
// // // //   };

// // // //   const handleAcceptCall = async () => {
// // // //     setCallAccepted(true);
// // // //     setShowIncomingPopup(false);

// // // //     const pc = new RTCPeerConnection();
// // // //     peerConnection.current = pc;

// // // //     stream?.getTracks().forEach(track => pc.addTrack(track, stream!));

// // // //     pc.ontrack = event => {
// // // //       if (userVideo.current) userVideo.current.srcObject = event.streams[0];
// // // //     };

// // // //     if (incomingCall?.signal) {
// // // //       await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.signal));
// // // //     }

// // // //     const answer = await pc.createAnswer();
// // // //     await pc.setLocalDescription(answer);

// // // //     socket.emit("answer-call", {
// // // //       to: incomingCall?.from,
// // // //       appointmentId,
// // // //       signal: answer,
// // // //     });
// // // //   };

// // // //   const handleRejectCall = () => {
// // // //     setShowIncomingPopup(false);
// // // //     socket.emit("reject-call", {
// // // //       to: incomingCall?.from,
// // // //       appointmentId,
// // // //     });
// // // //   };

// // // //   const endCall = () => {
// // // //     setCallEnded(true);
// // // //     setCallAccepted(false);
// // // //     peerConnection.current?.close();

// // // //     socket.emit("end-call", {
// // // //       from: userId,
// // // //       to: doctorId === userId ? appointmentId : doctorId,
// // // //     });
// // // //   };

// // // //   const handleRemoteEnd = () => {
// // // //     setCallEnded(true);
// // // //     setCallAccepted(false);
// // // //     peerConnection.current?.close();
// // // //   };

// // // //   return (
// // // //     <div className="h-screen w-full flex items-center justify-center bg-gray-100 p-4">
// // // //       <div className="flex flex-col gap-6 items-center w-full max-w-4xl">
// // // //         {!callAccepted && !isCalling && (
// // // //           <button
// // // //             onClick={startCall}
// // // //             className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-600 shadow-md"
// // // //           >
// // // //             <Video /> Start Call
// // // //           </button>
// // // //         )}

// // // //         <video
// // // //           ref={myVideo}
// // // //           muted
// // // //           autoPlay
// // // //           playsInline
// // // //           className="rounded-lg w-full max-w-md shadow-lg"
// // // //         />
// // // //         {callAccepted && (
// // // //           <video
// // // //             ref={userVideo}
// // // //             autoPlay
// // // //             playsInline
// // // //             className="rounded-lg w-full max-w-md shadow-lg"
// // // //           />
// // // //         )}

// // // //         {callAccepted && !callEnded && (
// // // //           <button
// // // //             onClick={endCall}
// // // //             className="bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-red-600 shadow-md"
// // // //           >
// // // //             <PhoneOff /> End Call
// // // //           </button>
// // // //         )}
// // // //       </div>

// // // //       <AnimatePresence>
// // // //         {showIncomingPopup && incomingCall && (
// // // //           <motion.div
// // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // //             animate={{ opacity: 1, scale: 1 }}
// // // //             exit={{ opacity: 0, scale: 0.9 }}
// // // //             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
// // // //           >
// // // //             <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
// // // //               <button
// // // //                 className="absolute top-2 right-2"
// // // //                 onClick={() => setShowIncomingPopup(false)}
// // // //               >
// // // //                 <X />
// // // //               </button>
// // // //               <Video className="text-blue-500" size={40} />
// // // //               <p className="text-lg font-semibold">
// // // //                 Incoming call from {incomingCall.name}
// // // //               </p>
// // // //               <div className="flex gap-4">
// // // //                 <button
// // // //                   className="bg-green-500 text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-green-600"
// // // //                   onClick={handleAcceptCall}
// // // //                 >
// // // //                   <Phone /> Accept
// // // //                 </button>
// // // //                 <button
// // // //                   className="bg-red-500 text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-red-600"
// // // //                   onClick={handleRejectCall}
// // // //                 >
// // // //                   <PhoneOff /> Reject
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </motion.div>
// // // //         )}
// // // //       </AnimatePresence>
// // // //     </div>
// // // //   );
// // // // }













// // // import { useEffect, useRef, useState } from "react";
// // // import { useLocation } from "react-router-dom";
// // // import { AnimatePresence, motion } from "framer-motion";
// // // import { Phone, PhoneOff, Video, X } from "lucide-react";
// // // import { io, Socket } from "socket.io-client";

// // // type SignalData = RTCSessionDescriptionInit;

// // // interface IncomingCallData {
// // //   from: string;
// // //   name: string;
// // //   signal: SignalData;
// // // }

// // // export default function MyVideoCall() {
// // //   const { state } = useLocation();
// // //   const { appointmentId, userId, doctorId } = state || {};

// // //   const socketRef = useRef<Socket | null>(null);
// // //   const [stream, setStream] = useState<MediaStream | null>(null);
// // //   const [incomingCall, setIncomingCall] = useState<IncomingCallData | null>(null);
// // //   const [callAccepted, setCallAccepted] = useState(false);
// // //   const [callEnded, setCallEnded] = useState(false);
// // //   const [showIncomingPopup, setShowIncomingPopup] = useState(false);
// // //   const [isCalling, setIsCalling] = useState(false);

// // //   const myVideo = useRef<HTMLVideoElement>(null);
// // //   const userVideo = useRef<HTMLVideoElement>(null);
// // //   const peerConnection = useRef<RTCPeerConnection | null>(null);

// // //   useEffect(() => {
// // //     if (!appointmentId || !userId || !doctorId) return;

// // //     // 1. Connect socket once
// // //     socketRef.current = io(`${import.meta.env.VITE_SOCKET_URL}/video`, {
// // //       withCredentials: true,
// // //     });

// // //     const socket = socketRef.current;

// // //     // 2. Register user and join room
// // //     socket.emit("register-user", userId);
// // //     socket.emit("join-call-room", { appointmentId, userId, doctorId });

// // //     // 3. Get local media stream
// // //     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(currentStream => {
// // //       setStream(currentStream);
// // //       if (myVideo.current) myVideo.current.srcObject = currentStream;
// // //     });

// // //     // 4. Handle events
// // //     socket.on("incoming-call", ({ from, name, signal }) => {
// // //           console.log("📞 Incoming call received!", { from, name, signal });
// // //       setIncomingCall({ from, name, signal });
// // //       setShowIncomingPopup(true);
// // //     });

// // //     socket.on("call-rejected", () => {
// // //       alert("Call was rejected.");
// // //       setIsCalling(false);
// // //     });

// // //     socket.on("call-accepted", async ({ signal }) => {
// // //       setCallAccepted(true);
// // //       if (peerConnection.current) {
// // //         await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
// // //       }
// // //     });

// // //     socket.on("end-call", () => {
// // //       handleRemoteEnd();
// // //     });

// // //     socket.on("user-disconnected", () => {
// // //       alert("The other user disconnected.");
// // //       handleRemoteEnd();
// // //     });

// // //     // Cleanup
// // //     return () => {
// // //       peerConnection.current?.close();
// // //       stream?.getTracks().forEach(track => track.stop());
// // //       socket.disconnect();
// // //     };
// // //   }, [appointmentId, userId, doctorId]);

// // //   const startCall = async () => {
// // //     const pc = new RTCPeerConnection();
// // //     peerConnection.current = pc;
// // //     setIsCalling(true);

// // //     stream?.getTracks().forEach(track => pc.addTrack(track, stream!));

// // //     pc.ontrack = event => {
// // //       if (userVideo.current) userVideo.current.srcObject = event.streams[0];
// // //     };

// // //     const offer = await pc.createOffer();
// // //     await pc.setLocalDescription(offer);

// // //      const receiverId = userId === doctorId ? userId : doctorId;
// // //     const s = socketRef.current?.emit("call-user", {
        
// // //       to: receiverId,
// // //       from: userId,
// // //       name: "User",
// // //       appointmentId,
// // //       signal: offer,
// // //     });
// // //     console.log("call-user : ",s);
// // //   };

// // //   const handleAcceptCall = async () => {
// // //     setCallAccepted(true);
// // //     setShowIncomingPopup(false);

// // //     const pc = new RTCPeerConnection();
// // //     peerConnection.current = pc;

// // //     stream?.getTracks().forEach(track => pc.addTrack(track, stream!));

// // //     pc.ontrack = event => {
// // //       if (userVideo.current) userVideo.current.srcObject = event.streams[0];
// // //     };

// // //     if (incomingCall?.signal) {
// // //       await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.signal));
// // //     }

// // //     const answer = await pc.createAnswer();
// // //     await pc.setLocalDescription(answer);

// // //     socketRef.current?.emit("answer-call", {
// // //       to: incomingCall?.from,
// // //       appointmentId,
// // //       signal: answer,
// // //     });
// // //   };

// // //   const handleRejectCall = () => {
// // //     setShowIncomingPopup(false);
// // //     socketRef.current?.emit("reject-call", {
// // //       to: incomingCall?.from,
// // //       appointmentId,
// // //     });
// // //   };

// // //   const endCall = () => {
// // //     setCallEnded(true);
// // //     setCallAccepted(false);
// // //     peerConnection.current?.close();

// // //     socketRef.current?.emit("end-call", {
// // //       from: userId,
// // //       to: doctorId === userId ? appointmentId : doctorId,
// // //     });
// // //   };

// // //   const handleRemoteEnd = () => {
// // //     setCallEnded(true);
// // //     setCallAccepted(false);
// // //     peerConnection.current?.close();
// // //   };

// // //   return (
// // //     <div className="h-screen w-full flex items-center justify-center bg-gray-100 p-4">
// // //       <div className="flex flex-col gap-6 items-center w-full max-w-4xl">
// // //         {!callAccepted && !isCalling && (
// // //           <button
// // //             onClick={startCall}
// // //             className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-600 shadow-md"
// // //           >
// // //             <Video /> Start Call
// // //           </button>
// // //         )}

// // //         <video
// // //           ref={myVideo}
// // //           muted
// // //           autoPlay
// // //           playsInline
// // //           className="rounded-lg w-full max-w-md shadow-lg"
// // //         />
// // //         {callAccepted && (
// // //           <video
// // //             ref={userVideo}
// // //             autoPlay
// // //             playsInline
// // //             className="rounded-lg w-full max-w-md shadow-lg"
// // //           />
// // //         )}

// // //         {callAccepted && !callEnded && (
// // //           <button
// // //             onClick={endCall}
// // //             className="bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-red-600 shadow-md"
// // //           >
// // //             <PhoneOff /> End Call
// // //           </button>
// // //         )}
// // //       </div>

// // //       <AnimatePresence>
// // //         {showIncomingPopup && incomingCall && (
// // //           <motion.div
// // //             initial={{ opacity: 0, scale: 0.9 }}
// // //             animate={{ opacity: 1, scale: 1 }}
// // //             exit={{ opacity: 0, scale: 0.9 }}
// // //             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
// // //           >
// // //             <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
// // //               <button
// // //                 className="absolute top-2 right-2"
// // //                 onClick={() => setShowIncomingPopup(false)}
// // //               >
// // //                 <X />
// // //               </button>
// // //               <Video className="text-blue-500" size={40} />
// // //               <p className="text-lg font-semibold">
// // //                 Incoming call from {incomingCall.name}
// // //               </p>
// // //               <div className="flex gap-4">
// // //                 <button
// // //                   className="bg-green-500 text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-green-600"
// // //                   onClick={handleAcceptCall}
// // //                 >
// // //                   <Phone /> Accept
// // //                 </button>
// // //                 <button
// // //                   className="bg-red-500 text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-red-600"
// // //                   onClick={handleRejectCall}
// // //                 >
// // //                   <PhoneOff /> Reject
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>
// // //     </div>
// // //   );
// // // }















// // import { useEffect, useRef, useState } from "react";
// // import { useLocation } from "react-router-dom";
// // import { AnimatePresence, motion } from "framer-motion";
// // import { Phone, PhoneOff, Video, X } from "lucide-react";
// // import { io, Socket } from "socket.io-client";

// // type SignalData = RTCSessionDescriptionInit;

// // interface IncomingCallData {
// //   from: string;
// //   name: string;
// //   signal: SignalData;
// // }

// // export default function MyVideoCall() {
// //   const { state } = useLocation();
// //   const { appointmentId, userId, doctorId } = state || {};

// //   const socketRef = useRef<Socket | null>(null);
// //   const [stream, setStream] = useState<MediaStream | null>(null);
// //   const [incomingCall, setIncomingCall] = useState<IncomingCallData | null>(null);
// //   const [callAccepted, setCallAccepted] = useState(false);
// //   const [callEnded, setCallEnded] = useState(false);
// //   const [showIncomingPopup, setShowIncomingPopup] = useState(false);
// //   const [isCalling, setIsCalling] = useState(false);

// //   const myVideo = useRef<HTMLVideoElement>(null);
// //   const userVideo = useRef<HTMLVideoElement>(null);
// //   const peerConnection = useRef<RTCPeerConnection | null>(null);

// //   useEffect(() => {
// //     if (!appointmentId || !userId || !doctorId) {
// //       console.error("Missing required parameters:", { appointmentId, userId, doctorId });
// //       return;
// //     }

// //     // 1. Connect socket
// //     socketRef.current = io(`${import.meta.env.VITE_SOCKET_URL}/video`, {
// //       withCredentials: true,
// //     });

// //     const socket = socketRef.current;

// //     // 2. Register user and join rooms
// //     socket.emit("register-user", userId);
// //     socket.emit("join-call-room", { appointmentId, userId, doctorId });

// //     // 3. Get local media stream
// //     navigator.mediaDevices
// //       .getUserMedia({ video: true, audio: true })
// //       .then((currentStream) => {
// //         setStream(currentStream);
// //         if (myVideo.current) myVideo.current.srcObject = currentStream;
// //       })
// //       .catch((err) => console.error("Error accessing media devices:", err));

// //     // 4. Handle socket events
// //     socket.on("connect", () => {
// //       console.log("Socket connected:", socket.id);
// //     });

// //     socket.on("incoming-call", ({ from, name, signal }) => {
// //       console.log("📞 Incoming call received!", { from, name, signal });
// //       setIncomingCall({ from, name, signal });
// //       setShowIncomingPopup(true);
// //     });

// //     socket.on("call-rejected", () => {
// //       console.log("Call rejected by recipient");
// //       alert("Call was rejected.");
// //       setIsCalling(false);
// //     });

// //     socket.on("call-accepted", async ({ signal }) => {
// //       console.log("Call accepted, setting remote description");
// //       setCallAccepted(true);
// //       if (peerConnection.current) {
// //         await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
// //       }
// //     });

// //     socket.on("end-call", () => {
// //       console.log("Call ended by remote user");
// //       handleRemoteEnd();
// //     });

// //     socket.on("user-disconnected", () => {
// //       console.log("Remote user disconnected");
// //       alert("The other user disconnected.");
// //       handleRemoteEnd();
// //     });

// //     // Cleanup
// //     return () => {
// //       console.log("Cleaning up...");
// //       peerConnection.current?.close();
// //       stream?.getTracks().forEach((track) => track.stop());
// //       socket.disconnect();
// //     };
// //   }, [appointmentId, userId, doctorId]);

// //   const startCall = async () => {
// //     // Use ICE servers for reliable WebRTC connection
// //     const pc = new RTCPeerConnection({
// //       iceServers: [
// //         { urls: "stun:stun.l.google.com:19302" },
// //         // Add TURN servers if available
// //       ],
// //     });
// //     peerConnection.current = pc;
// //     setIsCalling(true);

// //     stream?.getTracks().forEach((track) => pc.addTrack(track, stream!));

// //     pc.ontrack = (event) => {
// //       console.log("Received remote stream");
// //       if (userVideo.current) userVideo.current.srcObject = event.streams[0];
// //     };

// //     pc.onicecandidate = (event) => {
// //       if (event.candidate) {
// //         console.log("Sending ICE candidate");
// //         socketRef.current?.emit("ice-candidate", {
// //           to: userId === doctorId ? userId : doctorId,
// //           candidate: event.candidate,
// //         });
// //       }
// //     };

// //     const offer = await pc.createOffer();
// //     await pc.setLocalDescription(offer);

// //     // Fix: Correctly determine the receiverId
// //     const receiverId = userId === doctorId ? userId : doctorId; // This was incorrect
// //     socketRef.current?.emit("call-user", {
// //       to: receiverId,
// //       from: userId,
// //       name: userId === doctorId ? "Doctor" : "User",
// //       appointmentId,
// //       signal: offer,
// //       doctorId,
// //       patientId: userId !== doctorId ? userId : undefined,
// //     });
// //     console.log("Emitting call-user to:", receiverId);
// //   };

// //   const handleAcceptCall = async () => {
// //     setCallAccepted(true);
// //     setShowIncomingPopup(false);

// //     const pc = new RTCPeerConnection({
// //       iceServers: [
// //         { urls: "stun:stun.l.google.com:19302" },
// //         // Add TURN servers if available
// //       ],
// //     });
// //     peerConnection.current = pc;

// //     stream?.getTracks().forEach((track) => pc.addTrack(track, stream!));

// //     pc.ontrack = (event) => {
// //       console.log("Received remote stream");
// //       if (userVideo.current) userVideo.current.srcObject = event.streams[0];
// //     };

// //     pc.onicecandidate = (event) => {
// //       if (event.candidate) {
// //         console.log("Sending ICE candidate");
// //         socketRef.current?.emit("ice-candidate", {
// //           to: incomingCall?.from,
// //           candidate: event.candidate,
// //         });
// //       }
// //     };

// //     if (incomingCall?.signal) {
// //       await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.signal));
// //     }

// //     const answer = await pc.createAnswer();
// //     await pc.setLocalDescription(answer);

// //     socketRef.current?.emit("answer-call", {
// //       to: incomingCall?.from,
// //       appointmentId,
// //       signal: answer,
// //     });
// //     console.log("Emitting answer-call to:", incomingCall?.from);
// //   };

// //   const handleRejectCall = () => {
// //     setShowIncomingPopup(false);
// //     socketRef.current?.emit("reject-call", {
// //       to: incomingCall?.from,
// //       appointmentId,
// //     });
// //     console.log("Emitting reject-call to:", incomingCall?.from);
// //   };

// //   const endCall = () => {
// //     setCallEnded(true);
// //     setCallAccepted(false);
// //     peerConnection.current?.close();

// //     socketRef.current?.emit("end-call", {
// //       from: userId,
// //       to: userId === doctorId ? userId : doctorId, // Corrected to send to the other party
// //       appointmentId,
// //     });
// //     console.log("Emitting end-call");
// //   };

// //   const handleRemoteEnd = () => {
// //     console.log("Handling remote call end");
// //     setCallEnded(true);
// //     setCallAccepted(false);
// //     peerConnection.current?.close();
// //   };

// //   // Handle ICE candidates
// //   socketRef.current?.on("ice-candidate", async ({ candidate }) => {
// //     if (peerConnection.current && candidate) {
// //       console.log("Adding received ICE candidate");
// //       await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
// //     }
// //   });

// //   return (
// //     <div className="h-screen w-full flex items-center justify-center bg-gray-100 p-4">
// //       <div className="flex flex-col gap-6 items-center w-full max-w-4xl">
// //         {!callAccepted && !isCalling && (
// //           <button
// //             onClick={startCall}
// //             className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-600 shadow-md"
// //           >
// //             <Video /> Start Call
// //           </button>
// //         )}

// //         <video
// //           ref={myVideo}
// //           muted
// //           autoPlay
// //           playsInline
// //           className="rounded-lg w-full max-w-md shadow-lg"
// //         />
// //         {callAccepted && (
// //           <video
// //             ref={userVideo}
// //             autoPlay
// //             playsInline
// //             className="rounded-lg w-full max-w-md shadow-lg"
// //           />
// //         )}

// //         {callAccepted && !callEnded && (
// //           <button
// //             onClick={endCall}
// //             className="bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-red-600 shadow-md"
// //           >
// //             <PhoneOff /> End Call
// //           </button>
// //         )}
// //       </div>

// //       <AnimatePresence>
// //         {showIncomingPopup && incomingCall && (
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             exit={{ opacity: 0, scale: 0.9 }}
// //             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
// //           >
// //             <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
// //               <button
// //                 className="absolute top-2 right-2"
// //                 onClick={() => setShowIncomingPopup(false)}
// //               >
// //                 <X />
// //               </button>
// //               <Video className="text-blue-500" size={40} />
// //               <p className="text-lg font-semibold">
// //                 Incoming call from {incomingCall.name}
// //               </p>
// //               <div className="flex gap-4">
// //                 <button
// //                   className="bg-green-500 text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-green-600"
// //                   onClick={handleAcceptCall}
// //                 >
// //                   <Phone /> Accept
// //                 </button>
// //                 <button
// //                   className="bg-red-500 text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-red-600"
// //                   onClick={handleRejectCall}
// //                 >
// //                   <PhoneOff /> Reject
// //                 </button>
// //               </div>
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }








import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, PhoneOff, Video, X } from "lucide-react";
import { io, Socket } from "socket.io-client";

type SignalData = RTCSessionDescriptionInit;

interface IncomingCallData {
  from: string;
  name: string;
  signal: SignalData;
}

export default function MyVideoCall() {
  const { state } = useLocation();
  const { appointmentId, userId, doctorId } = state || {};

  const socketRef = useRef<Socket | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [incomingCall, setIncomingCall] = useState<IncomingCallData | null>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [showIncomingPopup, setShowIncomingPopup] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (!appointmentId || !userId || !doctorId) {
      console.error("Missing required parameters:", { appointmentId, userId, doctorId });
      return;
    }

    console.log("appointmentId : ",appointmentId);
    console.log("userId : ",userId);
    console.log("doctorId: ",doctorId);

    // 1. Connect socket
    socketRef.current = io(`${import.meta.env.VITE_SOCKET_URL}/video`, {
      withCredentials: true,
    });

    const socket = socketRef.current;

    // 2. Register user and join rooms
    socket.emit("register-user", userId);
    socket.emit("join-call-room", { appointmentId, userId, doctorId });

    // 3. Get local media stream
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) myVideo.current.srcObject = currentStream;
      })
      .catch((err) => console.error("Error accessing media devices:", err));

    // 4. Handle socket events
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id, "for user:", userId);
    });

    socket.on("incoming-call", ({ from, name, signal }) => {
      console.log("📞 Incoming call received!", { from, name, signal });
      setIncomingCall({ from, name, signal });
      setShowIncomingPopup(true);
    });

    socket.on("call-rejected", () => {
      console.log("Call rejected by recipient");
      alert("Call was rejected.");
      setIsCalling(false);
    });

    socket.on("call-accepted", async ({ signal }) => {
      console.log("Call accepted, setting remote description");
      setCallAccepted(true);
      if (peerConnection.current) {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
      }
    });

    socket.on("end-call", () => {
      console.log("Call ended by remote user");
      handleRemoteEnd();
    });

    socket.on("user-disconnected", () => {
      console.log("Remote user disconnected");
      alert("The other user disconnected.");
      handleRemoteEnd();
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      if (peerConnection.current && candidate) {
        console.log("Adding received ICE candidate");
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    // Cleanup
    return () => {
      console.log("Cleaning up for user:", userId);
      peerConnection.current?.close();
      stream?.getTracks().forEach((track) => track.stop());
      socket.disconnect();
    };
  }, [appointmentId, userId, doctorId]);

  const startCall = async () => {
    if (!userId || !doctorId) {
      console.error("Cannot start call: userId or doctorId missing");
      return;
    }

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    peerConnection.current = pc;
    setIsCalling(true);

    stream?.getTracks().forEach((track) => pc.addTrack(track, stream!));

    pc.ontrack = (event) => {
      console.log("Received remote stream");
      if (userVideo.current) userVideo.current.srcObject = event.streams[0];
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("Sending ICE candidate to:", userId === doctorId ? userId : doctorId);
        socketRef.current?.emit("ice-candidate", {
          to: userId === doctorId ? userId : doctorId,
          candidate: event.candidate,
        });
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // Fix: Correctly determine the receiverId
    const receiverId = userId === doctorId ? userId : doctorId; // Fixed to target the other party
    socketRef.current?.emit("call-user", {
      to: receiverId,
      from: userId,
      name: userId === doctorId ? "Doctor" : "Patient",
      appointmentId,
      signal: offer,
      doctorId,
      patientId: userId !== doctorId ? userId : undefined,
    });
    console.log("Emitting call-user to:", receiverId);
  };

  const handleAcceptCall = async () => {
    setCallAccepted(true);
    setShowIncomingPopup(false);

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    peerConnection.current = pc;

    stream?.getTracks().forEach((track) => pc.addTrack(track, stream!));

    pc.ontrack = (event) => {
      console.log("Received remote stream");
      if (userVideo.current) userVideo.current.srcObject = event.streams[0];
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("Sending ICE candidate to:", incomingCall?.from);
        socketRef.current?.emit("ice-candidate", {
          to: incomingCall?.from,
          candidate: event.candidate,
        });
      }
    };

    if (incomingCall?.signal) {
      await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.signal));
    }

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    socketRef.current?.emit("answer-call", {
      to: incomingCall?.from,
      appointmentId,
      signal: answer,
    });
    console.log("Emitting answer-call to:", incomingCall?.from);
  };

  const handleRejectCall = () => {
    setShowIncomingPopup(false);
    socketRef.current?.emit("reject-call", {
      to: incomingCall?.from,
      appointmentId,
    });
    console.log("Emitting reject-call to:", incomingCall?.from);
  };

  const endCall = () => {
    setCallEnded(true);
    setCallAccepted(false);
    peerConnection.current?.close();

    socketRef.current?.emit("end-call", {
      from: userId,
      to: userId === doctorId ? userId : doctorId,
      appointmentId,
    });
    console.log("Emitting end-call");
  };

  const handleRemoteEnd = () => {
    console.log("Handling remote call end");
    setCallEnded(true);
    setCallAccepted(false);
    peerConnection.current?.close();
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col gap-6 items-center w-full max-w-4xl">
        {!callAccepted && !isCalling && (
          <button
            onClick={startCall}
            className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-600 shadow-md"
          >
            <Video /> Start Call
          </button>
        )}

        <video
          ref={myVideo}
          muted
          autoPlay
          playsInline
          className="rounded-lg w-full max-w-md shadow-lg"
        />
        {callAccepted && (
          <video
            ref={userVideo}
            autoPlay
            playsInline
            className="rounded-lg w-full max-w-md shadow-lg"
          />
        )}

        {callAccepted && !callEnded && (
          <button
            onClick={endCall}
            className="bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-red-600 shadow-md"
          >
            <PhoneOff /> End Call
          </button>
        )}
      </div>

      <AnimatePresence>
        {showIncomingPopup && incomingCall && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
              <button
                className="absolute top-2 right-2"
                onClick={() => setShowIncomingPopup(false)}
              >
                <X />
              </button>
              <Video className="text-blue-500" size={40} />
              <p className="text-lg font-semibold">
                Incoming call from {incomingCall.name}
              </p>
              <div className="flex gap-4">
                <button
                  className="bg-green-500 text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-green-600"
                  onClick={handleAcceptCall}
                >
                  <Phone /> Accept
                </button>
                <button
                  className="bg-red-500 text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-red-600"
                  onClick={handleRejectCall}
                >
                  <PhoneOff /> Reject
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}















// import { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
// import { Phone, PhoneOff, Video, X } from "lucide-react";
// import { io, Socket } from "socket.io-client";
// import { useAuthStore } from "./path-to-your-auth-store"; // Adjust the import path

// type SignalData = RTCSessionDescriptionInit;

// interface IncomingCallData {
//   from: string;
//   name: string;
//   signal: SignalData;
// }

// export default function MyVideoCall() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { appointmentId, doctorId, patientId } = state || {};
//   const { user, role, hasHydrated } = useAuthStore((state) => ({
//     user: state.user,
//     role: state.role,
//     hasHydrated: state.hasHydrated,
//   }));

//   const userId = user?.id; // Get userId from auth store

//   const socketRef = useRef<Socket | null>(null);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [incomingCall, setIncomingCall] = useState<IncomingCallData | null>(null);
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [callEnded, setCallEnded] = useState(false);
//   const [showIncomingPopup, setShowIncomingPopup] = useState(false);
//   const [isCalling, setIsCalling] = useState(false);
//   const [hasNavigated, setHasNavigated] = useState(false); // Prevent navigation loop

//   const myVideo = useRef<HTMLVideoElement>(null);
//   const userVideo = useRef<HTMLVideoElement>(null);
//   const peerConnection = useRef<RTCPeerConnection | null>(null);

//   useEffect(() => {
//     // Wait for Zustand store to hydrate
//     if (!hasHydrated) {
//       console.log("Waiting for auth store to hydrate...");
//       return;
//     }

//     // Log state and auth for debugging
//     console.log("Received state:", { appointmentId, userId, doctorId, patientId, role });

//     if (!appointmentId || !userId || !doctorId || !patientId || !role) {
//       console.error("Missing required parameters:", {
//         appointmentId,
//         userId,
//         doctorId,
//         patientId,
//         role,
//       });
//       if (!hasNavigated) {
//         alert("Invalid call parameters or authentication. Redirecting...");
//         setHasNavigated(true); // Prevent multiple navigations
//         navigate("/");
//       }
//       return;
//     }

//     // Validate role consistency
//     if (role === "doctor" && userId !== doctorId) {
//       console.error("Role mismatch: userId does not match doctorId for doctor role", {
//         userId,
//         doctorId,
//       });
//       if (!hasNavigated) {
//         alert("Authentication error: User ID does not match doctor ID. Redirecting...");
//         setHasNavigated(true);
//         navigate("/");
//       }
//       return;
//     }
//     if (role === "user" && userId !== patientId) {
//       console.error("Role mismatch: userId does not match patientId for user role", {
//         userId,
//         patientId,
//       });
//       if (!hasNavigated) {
//         alert("Authentication error: User ID does not match patient ID. Redirecting...");
//         setHasNavigated(true);
//         navigate("/");
//       }
//       return;
//     }

//     // 1. Connect socket
//     socketRef.current = io(`${import.meta.env.VITE_SOCKET_URL}/video`, {
//       withCredentials: true,
//       reconnectionAttempts: 5,
//     });

//     const socket = socketRef.current;

//     // 2. Register user and join rooms
//     socket.emit("register-user", userId);
//     socket.emit("join-call-room", { appointmentId, userId, doctorId, patientId });

//     // 3. Get local media stream
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((currentStream) => {
//         setStream(currentStream);
//         if (myVideo.current) myVideo.current.srcObject = currentStream;
//       })
//       .catch((err) => console.error("Error accessing media devices:", err));

//     // 4. Handle socket events
//     socket.on("connect", () => {
//       console.log("Socket connected:", socket.id, "for user:", userId);
//     });

//     socket.on("connect_error", (err) => {
//       console.error("Socket connection error:", err.message);
//       alert("Failed to connect to server. Please try again.");
//     });

//     socket.on("error", ({ message }) => {
//       console.error("Server error:", message);
//       alert(`Server error: ${message}`);
//     });

//     socket.on("incoming-call", ({ from, name, signal }) => {
//       console.log("📞 Incoming call received!", { from, name, signal });
//       setIncomingCall({ from, name, signal });
//       setShowIncomingPopup(true);
//     });

//     socket.on("call-rejected", () => {
//       console.log("Call rejected by recipient");
//       alert("Call was rejected.");
//       setIsCalling(false);
//     });

//     socket.on("call-accepted", async ({ signal }) => {
//       console.log("Call accepted, setting remote description");
//       setCallAccepted(true);
//       if (peerConnection.current) {
//         await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
//       }
//     });

//     socket.on("end-call", () => {
//       console.log("Call ended by remote user");
//       handleRemoteEnd();
//     });

//     socket.on("user-disconnected", () => {
//       console.log("Remote user disconnected");
//       alert("The other user disconnected.");
//       handleRemoteEnd();
//     });

//     socket.on("ice-candidate", async ({ candidate }) => {
//       if (peerConnection.current && candidate) {
//         console.log("Adding received ICE candidate");
//         await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
//       }
//     });

//     // Cleanup
//     return () => {
//       console.log("Cleaning up for user:", userId);
//       peerConnection.current?.close();
//       stream?.getTracks().forEach((track) => track.stop());
//       socket.disconnect();
//     };
//   }, [appointmentId, userId, doctorId, patientId, role, hasHydrated, navigate, hasNavigated]);

//   const startCall = async () => {
//     if (!userId || !doctorId || !patientId || !role) {
//       console.error("Cannot start call: missing parameters", {
//         userId,
//         doctorId,
//         patientId,
//         role,
//       });
//       return;
//     }

//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });
//     peerConnection.current = pc;
//     setIsCalling(true);

//     stream?.getTracks().forEach((track) => pc.addTrack(track, stream!));

//     pc.ontrack = (event) => {
//       console.log("Received remote stream");
//       if (userVideo.current) userVideo.current.srcObject = event.streams[0];
//     };

//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         const receiverId = role === "doctor" ? patientId : doctorId;
//         console.log("Sending ICE candidate to:", receiverId);
//         socketRef.current?.emit("ice-candidate", {
//           to: receiverId,
//           candidate: event.candidate,
//         });
//       }
//     };

//     const offer = await pc.createOffer();
//     await pc.setLocalDescription(offer);

//     // Determine to and from based on role
//     const to = role === "doctor" ? patientId : doctorId;
//     const from = userId;
//     const name = role === "doctor" ? "Doctor" : "Patient";

//     socketRef.current?.emit("call-user", {
//       to,
//       from,
//       name,
//       appointmentId,
//       signal: offer,
//       doctorId,
//       patientId,
//     });
//     console.log("Emitting call-user:", { to, from, name });
//   };

//   const handleAcceptCall = async () => {
//     setCallAccepted(true);
//     setShowIncomingPopup(false);

//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });
//     peerConnection.current = pc;

//     stream?.getTracks().forEach((track) => pc.addTrack(track, stream!));

//     pc.ontrack = (event) => {
//       console.log("Received remote stream");
//       if (userVideo.current) userVideo.current.srcObject = event.streams[0];
//     };

//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         console.log("Sending ICE candidate to:", incomingCall?.from);
//         socketRef.current?.emit("ice-candidate", {
//           to: incomingCall?.from,
//           candidate: event.candidate,
//         });
//       }
//     };

//     if (incomingCall?.signal) {
//       await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.signal));
//     }

//     const answer = await pc.createAnswer();
//     await pc.setLocalDescription(answer);

//     socketRef.current?.emit("answer-call", {
//       to: incomingCall?.from,
//       appointmentId,
//       signal: answer,
//     });
//     console.log("Emitting answer-call to:", incomingCall?.from);
//   };

//   const handleRejectCall = () => {
//     setShowIncomingPopup(false);
//     socketRef.current?.emit("reject-call", {
//       to: incomingCall?.from,
//       appointmentId,
//     });
//     console.log("Emitting reject-call to:", incomingCall?.from);
//   };

//   const endCall = () => {
//     setCallEnded(true);
//     setCallAccepted(false);
//     peerConnection.current?.close();

//     socketRef.current?.emit("end-call", {
//       from: userId,
//       to: role === "doctor" ? patientId : doctorId,
//       appointmentId,
//     });
//     console.log("Emitting end-call");
//   };

//   const handleRemoteEnd = () => {
//     console.log("Handling remote call end");
//     setCallEnded(true);
//     setCallAccepted(false);
//     peerConnection.current?.close();
//   };

//   return (
//     <div className="h-screen w-full flex items-center justify-center bg-gray-100 p-4">
//       <div className="flex flex-col gap-6 items-center w-full max-w-4xl">
//         {!callAccepted && !isCalling && (
//           <button
//             onClick={startCall}
//             className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-600 shadow-md"
//           >
//             <Video /> Start Call
//           </button>
//         )}

//         <video
//           ref={myVideo}
//           muted
//           autoPlay
//           playsInline
//           className="rounded-lg w-full max-w-md shadow-lg"
//         />
//         {callAccepted && (
//           <video
//             ref={userVideo}
//             autoPlay
//             playsInline
//             className="rounded-lg w-full max-w-md shadow-lg"
//           />
//         )}

//         {callAccepted && !callEnded && (
//           <button
//             onClick={endCall}
//             className="bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-red-600 shadow-md"
//           >
//             <PhoneOff /> End Call
//           </button>
//         )}
//       </div>

//       <AnimatePresence>
//         {showIncomingPopup && incomingCall && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
//           >
//             <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
//               <button
//                 className="absolute top-2 right-2"
//                 onClick={() => setShowIncomingPopup(false)}
//               >
//                 <X />
//               </button>
//               <Video className="text-blue-500" size={40} />
//               <p className="text-lg font-semibold">
//                 Incoming call from {incomingCall.name}
//               </p>
//               <div className="flex gap-4">
//                 <button
//                   className="bg-green-500 text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-green-600"
//                   onClick={handleAcceptCall}
//                 >
//                   <Phone /> Accept
//                 </button>
//                 <button
//                   className="bg-red-500 text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-red-600"
//                   onClick={handleRejectCall}
//                 >
//                   <PhoneOff /> Reject
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }






