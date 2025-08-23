

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Phone, PhoneOff, Video, Mic, MicOff, VideoOff, 
  Users, MoreVertical
} from "lucide-react";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";

type SignalData = RTCSessionDescriptionInit;

interface IncomingCallData {
  from: string;
  name: string;
  signal: SignalData;
}

export default function MyVideoCall() {
  const { state } = useLocation();
  const { user: currentUser } = useAuthStore();
  const myId = currentUser?._id;
  const { appointmentId, userId: patientId, doctorId } = state || {};
  const navigate = useNavigate();

  const isDoctor = myId === doctorId;
  const peerId = isDoctor ? patientId : doctorId;

  const socketRef = useRef<Socket | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [incomingCall, setIncomingCall] = useState<IncomingCallData | null>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [showIncomingPopup, setShowIncomingPopup] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [callDuration, setCallDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const hasShownMediaErrorRef = useRef(false);
  const callStartTime = useRef<number>(0);
  const durationInterval = useRef<NodeJS.Timeout  | undefined>(undefined);
  const controlsTimeout = useRef<NodeJS.Timeout  | undefined>(undefined);

  // const pendingCandidates = useRef<RTCIceCandidateInit[]>([]);
  // const remoteDescSet = useRef(false);


  
  useEffect(() => {
    if (showControls && callAccepted) {
      clearTimeout(controlsTimeout.current);
      controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(controlsTimeout.current);
  }, [showControls, callAccepted]);

  
  useEffect(() => {
    if (callAccepted && !callEnded) {
      callStartTime.current = Date.now();
      durationInterval.current = setInterval(() => {
        setCallDuration(Math.floor((Date.now() - callStartTime.current) / 1000));
      }, 1000);
    } else {
      clearInterval(durationInterval.current);
    }
    return () => clearInterval(durationInterval.current);
  }, [callAccepted, callEnded]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsAudioEnabled((prev) => !prev);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoEnabled((prev) => !prev);
    }
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
  };

  useEffect(() => {
    if (!myId || !appointmentId || !patientId || !doctorId) {
      toast.error("Missing required parameters.");
      return;
    }

    socketRef.current = io(`${import.meta.env.VITE_SOCKET_URL}/video`, {
      withCredentials: true,
    });

    const socket = socketRef.current;

    socket.emit("register-user", myId);
    socket.emit("join-call-room", { appointmentId, userId: myId, doctorId, patientId });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) myVideo.current.srcObject = currentStream;
        setConnectionStatus("ready");
      })
      .catch((err) => {
        if (!hasShownMediaErrorRef.current) {
          toast.error(
            err?.message?.includes("Permission denied")
              ? "Please allow access to camera and microphone."
              : "Could not access media devices."
          );
          hasShownMediaErrorRef.current = true;
        }
        setConnectionStatus("error");
        socketRef.current?.disconnect();
        return;
      });

    socket.on("connect", () => {
      setConnectionStatus("connected");
    });
    
    socket.on("incoming-call", ({ from, name, signal }) => {
      setIncomingCall({ from, name, signal });
      setShowIncomingPopup(true);
    });
    
    socket.on("call-rejected", () => {
      toast.error("Call was rejected");
      setIsCalling(false);
      setConnectionStatus("ready");
    });
    
    socket.on("call-accepted", async ({ signal }) => {
      setCallAccepted(true);
      setCallEnded(false);
      setIsCalling(true);
      setShowIncomingPopup(false);
      setConnectionStatus("connected");
      if (peerConnection.current) {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
      }


//       if (peerConnection.current) {
//   await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
//   remoteDescSet.current = true;

//   // flush queued candidates
//   for (const c of pendingCandidates.current) {
//     try {
//       await peerConnection.current.addIceCandidate(new RTCIceCandidate(c));
//     } catch (err) {
//       console.error("flush addIceCandidate failed", err);
//     }
//   }
//   pendingCandidates.current = [];
// }



    });
    
    socket.on("end-call", () => {
      handleRemoteEnd();
      toast.success("Call completed successfully");
       if (isDoctor) {
    navigate("/doctor-appointments", { replace: true });
  } else {
 
    sessionStorage.setItem(
  'ratingData',
  JSON.stringify({
    appointmentId,
    userId: patientId,
    doctorId,
  })
);

navigate("/rate-doctor?rate=true", { replace: true });

  }
    });

    socket.on("user-disconnected", (payload) => {
      peerConnection.current?.close();
      console.log("user-disconnected event received", payload);
      toast.error("The other user disconnected. Please try to connect again");
      setConnectionStatus("disconnected");
      handleRemoteEnd();
    });
    
    socket.on("ice-candidate", async ({ candidate }) => {
      if (peerConnection.current && candidate) {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });




//     socket.on("ice-candidate", async ({ candidate }) => {
//   if (!candidate || !peerConnection.current) return;

//   if (!remoteDescSet.current) {
//     pendingCandidates.current.push(candidate);
//     console.log("[ICE] queued candidate", candidate);
//     return;
//   }

//   try {
//     await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
//     console.log("[ICE] added candidate", candidate);
//   } catch (err) {
//     console.error("[ICE] addIceCandidate failed", err);
//   }
// });





    socket.on("error", (err) => {
      console.error("Socket error:", err);
      const errorMessage = typeof err === "string" ? err : err?.message || "An unknown error occurred";
      toast.error(errorMessage);
      setIsCalling(false);
      setConnectionStatus("ended");
    });

    return () => {
      peerConnection.current?.close();
      stream?.getTracks().forEach((track) => track.stop());
      socket.disconnect();
      clearInterval(durationInterval.current);
      clearTimeout(controlsTimeout.current);
    };
  }, [appointmentId, myId, doctorId, patientId, navigate, isDoctor]);

  const startCall = async () => {
    if (!peerId || !myId || !appointmentId) return toast.error("Missing required information.");
    setCallAccepted(false);
    setCallEnded(false);
    setIsCalling(true);
    setConnectionStatus("calling");

    // const pc = new RTCPeerConnection({ iceServers: 
    //   [
    //     { urls: "stun:stun.l.google.com:19302" },
    //     {
    //       // urls: "turn:relay1.expressturn.com:3480",
    //       urls: [

    //         "turn:relay1.expressturn.com:80?transport=udp",
    //         "turn:relay1.expressturn.com:3480?transport=udp",
    //         "turn:relay1.expressturn.com:80?transport=tcp",
    //         "turn:relay1.expressturn.com:3480?transport=tcp",
    //         "turns:relay1.expressturn.com:443?transport=tcp",
    //         "turns:relay1.expressturn.com:5349?transport=tcp",

    //       ],
    //       username: "000000002071209180",
    //       credential: "FyaAN50wngzJA/89B3S7uOdBwX8=",
    //     },
    //   ],
      
    // });
    // peerConnection.current = pc;






//     const pc = new RTCPeerConnection({
//   iceServers: [
    
//     // { urls: "stun:bn-turn1.xirsys.com" },
//     { urls: "stun:stun.l.google.com:19302" },

//     {
//       username: "bB3uz67g3u6rI6fv9syY33jvvdoS4PXBJwkIwml2pEg3hgst4kzjMTogXx9owVQSAAAAAGiofqJKaXRoaW4=",
//       credential: "52b2118c-7f64-11f0-83c6-0242ac140004",
//       urls: [
//         "turn:bn-turn1.xirsys.com:80?transport=udp",
//         "turn:bn-turn1.xirsys.com:3478?transport=udp",
//         "turn:bn-turn1.xirsys.com:80?transport=tcp",
//         "turn:bn-turn1.xirsys.com:3478?transport=tcp",
//         "turns:bn-turn1.xirsys.com:443?transport=tcp",
//         "turns:bn-turn1.xirsys.com:5349?transport=tcp"
//       ]
//     }
//   ]
// });

// peerConnection.current = pc;




const  iceServers  = (await axiosInstance.get("/ice-servers")).data;
console.log("iceServers : ",iceServers);
const pc = new RTCPeerConnection({iceServers});


setInterval(async () => {
  if (!pc) return;

  const stats = await pc.getStats();

  stats.forEach(report => {
    if (report.type === "candidate-pair" && report.state === "succeeded") {
      const localCandidateId = report.localCandidateId;
      const remoteCandidateId = report.remoteCandidateId;

      const localCandidate = stats.get(localCandidateId);
      const remoteCandidate = stats.get(remoteCandidateId);

      if (localCandidate && remoteCandidate) {
        console.log("Local candidate type:", localCandidate.candidateType);
        console.log("Remote candidate type:", remoteCandidate.candidateType);
      }
    }
  });
}, 3000)

peerConnection.current = pc;



//new added debugger
    pc.oniceconnectionstatechange = () => {
  console.log("ICE state:", pc.iceConnectionState);
  if (pc.iceConnectionState === "failed") {
    console.warn("ICE failed, restarting…");
    pc.restartIce?.();
  }
};


// Reset per-call ICE bookkeeping
// remoteDescSet.current = false;
// pendingCandidates.current = [];


    stream?.getTracks().forEach((track) => pc.addTrack(track, stream!));

    pc.ontrack = (event) => {
      if (userVideo.current) userVideo.current.srcObject = event.streams[0];
    };
    
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current?.emit("ice-candidate", {
          to: peerId,
          candidate: event.candidate,
        });
      }
    };

    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socketRef.current?.emit("call-user", {
        to: peerId,
        from: myId,
        name: isDoctor ? "Doctor" : "Patient",
        appointmentId,
        signal: offer,
        doctorId,
        patientId,
      });
    } catch (err) {
      console.log("error : ", err);
      toast.error("Error starting call. Please try again.");
      setIsCalling(false);
      setConnectionStatus("error");
    }
  };

  const handleAcceptCall = async () => {
    setCallAccepted(true);
    setCallEnded(false);
    setIsCalling(true);
    setShowIncomingPopup(false);
    setConnectionStatus("connecting");

    // const pc = new RTCPeerConnection({ iceServers: 
    //   [
    //     { urls: "stun:stun.l.google.com:19302" },
    //     {
    //       // urls: "turn:relay1.expressturn.com:3480",
    //       urls: [

    //         "turn:relay1.expressturn.com:80?transport=udp",
    //         "turn:relay1.expressturn.com:3480?transport=udp",
    //         "turn:relay1.expressturn.com:80?transport=tcp",
    //         "turn:relay1.expressturn.com:3480?transport=tcp",
    //         "turns:relay1.expressturn.com:443?transport=tcp",
    //         "turns:relay1.expressturn.com:5349?transport=tcp",

    //       ],
    //       username: "000000002071209180",
    //       credential: "FyaAN50wngzJA/89B3S7uOdBwX8=",
    //     },
    //   ]
        
    // });
    // peerConnection.current = pc;



//     const pc = new RTCPeerConnection({
//   iceServers: [
   

//     { urls: "stun:stun.l.google.com:19302" },

//     {
//       username: "bB3uz67g3u6rI6fv9syY33jvvdoS4PXBJwkIwml2pEg3hgst4kzjMTogXx9owVQSAAAAAGiofqJKaXRoaW4=",
//       credential: "52b2118c-7f64-11f0-83c6-0242ac140004",
//       urls: [
//         "turn:bn-turn1.xirsys.com:80?transport=udp",
//         "turn:bn-turn1.xirsys.com:3478?transport=udp",
//         "turn:bn-turn1.xirsys.com:80?transport=tcp",
//         "turn:bn-turn1.xirsys.com:3478?transport=tcp",
//         "turns:bn-turn1.xirsys.com:443?transport=tcp",
//         "turns:bn-turn1.xirsys.com:5349?transport=tcp"
//       ]
//     }
//   ]
// });

// peerConnection.current = pc;




const  iceServers  = (await axiosInstance.get("/ice-servers")).data;
console.log("iceservers: ",iceServers);
const pc = new RTCPeerConnection({iceServers});


setInterval(async () => {
  if (!pc) return;

  const stats = await pc.getStats();

  stats.forEach(report => {
    if (report.type === "candidate-pair" && report.state === "succeeded") {
      const localCandidateId = report.localCandidateId;
      const remoteCandidateId = report.remoteCandidateId;

      const localCandidate = stats.get(localCandidateId);
      const remoteCandidate = stats.get(remoteCandidateId);

      if (localCandidate && remoteCandidate) {
        console.log("Local candidate type:", localCandidate.candidateType);
        console.log("Remote candidate type:", remoteCandidate.candidateType);
      }
    }
  });
}, 3000)

peerConnection.current = pc;


    //new added debugger
         pc.oniceconnectionstatechange = () => {
  console.log("ICE state:", pc.iceConnectionState);
  if (pc.iceConnectionState === "failed") {
    console.warn("ICE failed, restarting…");
    pc.restartIce?.();
  }
};



// // Reset per-call ICE bookkeeping
// remoteDescSet.current = false;
// pendingCandidates.current = [];
//


    stream?.getTracks().forEach((track) => pc.addTrack(track, stream!));

    pc.ontrack = (event) => {
      if (userVideo.current) userVideo.current.srcObject = event.streams[0];
    };
    
    pc.onicecandidate = (event) => {
      if (event.candidate && incomingCall?.from) {
        socketRef.current?.emit("ice-candidate", {
          to: incomingCall.from,
          candidate: event.candidate,
        });
      }
    };

    if (incomingCall?.signal) {
      await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.signal));
    }




//     if (incomingCall?.signal) {
//   await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.signal));
//   remoteDescSet.current = true;

//   for (const c of pendingCandidates.current) {
//     try {
//       await pc.addIceCandidate(new RTCIceCandidate(c));
//     } catch (err) {
//       console.error("flush addIceCandidate failed", err);
//     }
//   }
//   pendingCandidates.current = [];
// }




    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    socketRef.current?.emit("answer-call", {
      to: incomingCall?.from,
      appointmentId,
      signal: answer,
    });
  };

  const handleRejectCall = () => {
    setShowIncomingPopup(false);
    if (incomingCall?.from) {
      socketRef.current?.emit("reject-call", {
        to: incomingCall.from,
        appointmentId,
      });
    }
  };

  const endCall = () => {
    setCallEnded(true);
    setCallAccepted(false);
    setIsCalling(false);
    setShowIncomingPopup(false);
    setConnectionStatus("ended");
    peerConnection.current?.close();
    socketRef.current?.emit("end-call", {
      from: myId,
      to: peerId,
      appointmentId,
    });
    toast.success("Call completed successfully");
   
   if (isDoctor) {
    navigate("/doctor-appointments", { replace: true });
  } else {
    
    sessionStorage.setItem(
  'ratingData',
  JSON.stringify({
    appointmentId,
    userId: patientId,
    doctorId,
  })
);

navigate("/rate-doctor?rate=true", { replace: true });
  }
  };

  const handleRemoteEnd = () => {
    setCallAccepted(false);
    setCallEnded(true);
    setIsCalling(false);
    setConnectionStatus("ended");
    peerConnection.current?.close();
  };








  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
     
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`
        }} />
      </div>

    
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-0 left-0 right-0 z-20 p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
           
            {callAccepted && (
              <div className="text-white text-sm bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                {formatDuration(callDuration)}
              </div>
            )}
          </div>
          
          <div className="text-white text-lg font-semibold">
            {isDoctor ? "Patient Consultation" : "Doctor Consultation"}
          </div>
        </div>
      </motion.div>

     
      <div className="h-full w-full relative" onMouseMove={showControlsTemporarily}>
       
        {callAccepted ? (
          <video
            ref={userVideo}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <motion.div 
                animate={{ 
                  scale: isCalling ? [1, 1.1, 1] : 1,
                  rotate: isCalling ? [0, 5, -5, 0] : 0
                }}
                transition={{ 
                  duration: 2, 
                  repeat: isCalling ? Infinity : 0, 
                  ease: "easeInOut" 
                }}
                className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
              >
                <Users className="w-16 h-16 text-white" />
              </motion.div>
              
              <h2 className="text-white text-2xl font-bold mb-4">
                {isCalling ? "Connecting..." : 
                 connectionStatus === "error" ? "Connection Error" : 
                 "Ready to Connect"}
              </h2>
              
              {connectionStatus === "error" && (
                <p className="text-red-400 mb-6">
                  Please check your camera and microphone permissions
                </p>
              )}
              
              {!callAccepted && !isCalling && connectionStatus !== "error" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startCall}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-full flex items-center gap-3 mx-auto shadow-xl transition-all duration-200"
                >
                  <Video className="w-5 h-5" />
                  Start Video Call
                </motion.button>
              )}
            </div>
          </div>
        )}

       
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-20 right-6 w-48 h-36 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 bg-black/50 backdrop-blur-sm z-10"
        >
          <video
            ref={myVideo}
            muted
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          
        
          <div className="absolute bottom-2 left-2 flex gap-1">
            {!isAudioEnabled && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-red-500/90 p-1.5 rounded-full"
              >
                <MicOff className="w-3 h-3 text-white" />
              </motion.div>
            )}
            {!isVideoEnabled && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-red-500/90 p-1.5 rounded-full"
              >
                <VideoOff className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </div>
          
          <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
            You
          </div>
        </motion.div>

       
        <AnimatePresence>
          {(showControls || !callAccepted) && callAccepted && !callEnded && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            >
              <div className="flex items-center gap-4 bg-black/40 backdrop-blur-lg rounded-2xl p-4 border border-white/10 shadow-2xl">
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleAudio}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isAudioEnabled 
                      ? "bg-slate-700 hover:bg-slate-600 text-white" 
                      : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                  }`}
                >
                  {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </motion.button>

               
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleVideo}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isVideoEnabled 
                      ? "bg-slate-700 hover:bg-slate-600 text-white" 
                      : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                  }`}
                >
                  {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </motion.button>

               
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={endCall}
                  className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-all duration-200 shadow-lg"
                >
                  <PhoneOff className="w-6 h-6" />
                </motion.button>

               
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white transition-all duration-200"
                >
                  <MoreVertical className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

       
        {(isCalling && !callAccepted) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-15"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
              />
              <p className="text-white text-xl font-semibold">Calling...</p>
              <p className="text-white/70 text-sm mt-2">Waiting for response</p>
            </div>
          </motion.div>
        )}
      </div>

     
      <AnimatePresence>
        {showIncomingPopup && incomingCall && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 relative overflow-hidden"
            >
            
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-600" />
              
              <div className="text-center">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <Video className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Incoming Call</h3>
                <p className="text-gray-600 mb-8 text-lg">
                  <span className="font-semibold">{incomingCall.name}</span> is calling you
                </p>
                
                <div className="flex gap-6 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRejectCall}
                    className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-lg transition-all duration-200"
                  >
                    <PhoneOff className="w-6 h-6" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAcceptCall}
                    className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white shadow-lg transition-all duration-200"
                  >
                    <Phone className="w-6 h-6" />
                  </motion.button>
                </div>
                
                <div className="flex justify-center gap-8 mt-6 text-sm text-gray-500">
                  <span>Decline</span>
                  <span>Accept</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}




























