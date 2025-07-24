// // import  { useState } from "react";
// // import { motion } from "framer-motion";
// // import { Send, UserCircle } from "lucide-react";

// // const dummyMessages = [
// //   { id: 1, sender: "doctor", content: "Hello! How can I help you today?" },
// //   { id: 2, sender: "user", content: "I have a persistent headache for the last few days." },
// //   { id: 3, sender: "doctor", content: "Do you have any other symptoms like nausea or fever?" },
// //   { id: 4, sender: "user", content: "Just a mild fever." },
// // ];

// // export default function ChatUI() {
// //   const [message, setMessage] = useState("");
// //   const [messages, setMessages] = useState(dummyMessages);

// //   const handleSend = () => {
// //     if (!message.trim()) return;
// //     setMessages((prev) => [...prev, { id: Date.now(), sender: "user", content: message }]);
// //     setMessage("");
// //   };

// //   return (
// //     <div className="flex flex-col h-screen max-w-md mx-auto border rounded-2xl shadow-lg overflow-hidden">
// //       <div className="bg-blue-500 text-white p-4 text-lg font-semibold">Doctor Chat</div>

// //       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
// //         {messages.map((msg) => (
// //           <motion.div
// //             key={msg.id}
// //             initial={{ opacity: 0, y: 10 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.3 }}
// //             className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
// //           >
// //             <div
// //               className={`rounded-xl px-4 py-2 max-w-xs text-sm shadow-md ${
// //                 msg.sender === "user" ? "bg-blue-500 text-white" : "bg-white text-gray-800"
// //               }`}
// //             >
// //               {msg.content}
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>

// //       <div className="p-4 flex items-center border-t gap-2 bg-white">
// //         <UserCircle className="w-6 h-6 text-gray-500" />
// //         <input
// //           value={message}
// //           onChange={(e) => setMessage(e.target.value)}
// //           placeholder="Type a message..."
// //           className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
// //         />
// //         <button
// //           onClick={handleSend}
// //           className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition"
// //         >
// //           <Send className="w-5 h-5" />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }







// // import {  useState } from "react";
// // import { motion } from "framer-motion";
// // import { Send } from "lucide-react";
// // import Navbar from "../../components/Navbar";
// // import NavbarAdmin from "../../components/NavbarAdmin";
// // import Sidebar from "../../components/SideBarAdmin";
// // import { useAuthStore } from "../../store/authStore";

// // interface Message {
// //   id: number;
// //   sender: "user" | "doctor";
// //   content: string;
// //   timestamp: string;
// // }

// // const dummyMessages: Message[] = [
// //   { id: 1, sender: "user", content: "Hello, doctor!", timestamp: "10:00 AM" },
// //   { id: 2, sender: "doctor", content: "Hi! How can I help you today?", timestamp: "10:01 AM" },
// //   { id: 3, sender: "user", content: "I’ve been having headaches.", timestamp: "10:02 AM" },
// //   { id: 4, sender: "doctor", content: "Can you describe the symptoms more?", timestamp: "10:03 AM" },
// // ];

// // const ChatUI = () => {
// //   const { role } = useAuthStore();
// //   const [messages, setMessages] = useState<Message[]>(dummyMessages);
// //   const [input, setInput] = useState("");

// //   const handleSend = () => {
// //     if (!input.trim()) return;
// //     const newMessage: Message = {
// //       id: messages.length + 1,
// //       sender: "user",
// //       content: input,
// //       timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
// //     };
// //     setMessages([...messages, newMessage]);
// //     setInput("");
// //   };

// //   const chatBox = (
// //     <div className="w-full h-full max-w-4xl mx-auto p-4 flex flex-col border bg-white shadow-xl rounded-xl">
// //       <div className="font-semibold text-lg text-gray-700 px-2 py-1 border-b">Chat with Doctor</div>

// //       <div className="flex-1 overflow-y-auto space-y-3 px-4 py-2 mt-2 scroll-smooth">
// //         {messages.map((msg) => (
// //           <motion.div
// //             key={msg.id}
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.3 }}
// //             className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
// //           >
// //             <div
// //               className={`px-4 py-2 rounded-2xl text-sm max-w-xs break-words shadow ${
// //                 msg.sender === "user"
// //                   ? "bg-blue-500 text-white rounded-br-none"
// //                   : "bg-gray-100 text-gray-800 rounded-bl-none"
// //               }`}
// //             >
// //               {msg.content}
// //               <div className="text-[10px] text-gray-300 mt-1 text-right">{msg.timestamp}</div>
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>

// //       <div className="border-t px-3 py-2 flex items-center gap-2">
// //         <input
// //           type="text"
// //           className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           placeholder="Type a message..."
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           onKeyDown={(e) => e.key === "Enter" && handleSend()}
// //         />
// //         <button
// //           onClick={handleSend}
// //           className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
// //         >
// //           <Send size={18} />
// //         </button>
// //       </div>
// //     </div>
// //   );

// //   if (role === "doctor") {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
// //         <NavbarAdmin />
// //         <div className="flex flex-1 overflow-hidden">
// //           <Sidebar />
// //           <main className="flex-1 flex justify-center items-center p-4 overflow-auto">
// //             {chatBox}
// //           </main>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
// //       <Navbar />
// //       <main className="flex-1 flex items-center justify-center p-4">
// //         {chatBox}
// //       </main>
// //     </div>
// //   );
// // };

// // export default ChatUI;












// // import { useEffect, useState, useRef } from "react";
// // import io from "socket.io-client";
// // import { motion } from "framer-motion";
// // import { Send } from "lucide-react";
// // import Navbar from "../../components/Navbar";
// // import NavbarAdmin from "../../components/NavbarAdmin";
// // import Sidebar from "../../components/SideBarAdmin";
// // import { useAuthStore } from "../../store/authStore";
// // import { useLocation } from "react-router-dom"; 

// // interface Message {
// //   _id: string;
// //   sender: string;
// //   content: string;
// //   type: "text";
// //   timestamp?: string;
// // }

// // const ChatUI = () => {
// //   const { role, user } = useAuthStore();
// //   const location = useLocation();
// //   const socketRef = useRef<any>(null);
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [input, setInput] = useState("");

// //   // ✅ Get appointmentId from route state or params
// //   const appointmentId = location.state?.appointmentId; // pass this when navigating to chat

// //   const chatBoxRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     if (!appointmentId || !user) return;

// //     // const socket = io(import.meta.env.VITE_SOCKET_URL, {
// //     //   withCredentials: true,
// //     // });

// //     const token = localStorage.getItem("accessToken"); // or get it from a secure store

// //     console.log("token : ",token);
// // const socket = io("http://localhost:5000", {
// //   auth: {
// //     token: token, // 👈 this must match `socket.handshake.auth.token` on server
// //   },
// //   withCredentials: true,
// // });

// //     socketRef.current = socket;

// //     socket.on("connect", () => {
// //       console.log("🟢 Connected to socket");

// //       socket.emit("joinRoom", { appointmentId });

// //       // listen for messages
// //       socket.on("receiveMessage", (message: Message) => {
// //         setMessages((prev) => [...prev, message]);
// //         scrollToBottom();
// //       });

// //       socket.on("chatEnded", () => {
// //         alert("Chat has ended by the other user.");
// //       });
// //     });

// //     return () => {
// //       socket.disconnect();
// //     };
// //   }, [appointmentId]);

// //   const scrollToBottom = () => {
// //     setTimeout(() => {
// //       chatBoxRef.current?.scrollTo({
// //         top: chatBoxRef.current.scrollHeight,
// //         behavior: "smooth",
// //       });
// //     }, 100);
// //   };

// //   const handleSend = () => {
// //     if (!input.trim()) return;

// //     const newMessage = {
// //       appointmentId,
// //       content: input,
// //       type: "text",
// //       doctorId: role === "doctor" ? user.id : undefined,
// //       userId: role === "user" ? user.id : undefined,
// //     };

// //     socketRef.current.emit("sendMessage", newMessage);
// //     setInput("");
// //   };

// //   const chatBox = (
// //     <div className="w-full h-full max-w-4xl mx-auto p-4 flex flex-col border bg-white shadow-xl rounded-xl">
// //       <div className="font-semibold text-lg text-gray-700 px-2 py-1 border-b">Chat with {role === "doctor" ? "User" : "Doctor"}</div>

// //       <div
// //         className="flex-1 overflow-y-auto space-y-3 px-4 py-2 mt-2 scroll-smooth"
// //         ref={chatBoxRef}
// //       >
// //         {messages.map((msg) => (
// //           <motion.div
// //             key={msg._id}
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.3 }}
// //             className={`flex ${msg.sender === user.id ? "justify-end" : "justify-start"}`}
// //           >
// //             <div
// //               className={`px-4 py-2 rounded-2xl text-sm max-w-xs break-words shadow ${
// //                 msg.sender === user.id
// //                   ? "bg-blue-500 text-white rounded-br-none"
// //                   : "bg-gray-100 text-gray-800 rounded-bl-none"
// //               }`}
// //             >
// //               {msg.content}
// //               <div className="text-[10px] text-gray-300 mt-1 text-right">{msg.timestamp || ""}</div>
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>

// //       <div className="border-t px-3 py-2 flex items-center gap-2">
// //         <input
// //           type="text"
// //           className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           placeholder="Type a message..."
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           onKeyDown={(e) => e.key === "Enter" && handleSend()}
// //         />
// //         <button
// //           onClick={handleSend}
// //           className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
// //         >
// //           <Send size={18} />
// //         </button>
// //       </div>
// //     </div>
// //   );

// //   if (role === "doctor") {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
// //         <NavbarAdmin />
// //         <div className="flex flex-1 overflow-hidden">
// //           <Sidebar />
// //           <main className="flex-1 flex justify-center items-center p-4 overflow-auto">
// //             {chatBox}
// //           </main>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
// //       <Navbar />
// //       <main className="flex-1 flex items-center justify-center p-4">
// //         {chatBox}
// //       </main>
// //     </div>
// //   );
// // };

// // export default ChatUI;














// // import { useEffect, useState, useRef } from "react";
// // import io, { Socket } from "socket.io-client";
// // import { motion } from "framer-motion";
// // import { Send } from "lucide-react";
// // import Navbar from "../../components/Navbar";
// // import NavbarAdmin from "../../components/NavbarAdmin";
// // import Sidebar from "../../components/SideBarAdmin";
// // import { useAuthStore } from "../../store/authStore";
// // import { useLocation } from "react-router-dom";

// // interface Message {
// //   _id: string;
// //   sender: string;
// //   content: string;
// //   type: "text";
// //   timestamp: string | number;
// // }

// // const ChatUI = () => {
// //   const { role, user, hasHydrated } = useAuthStore();
// //   const location = useLocation();
// //   const socketRef = useRef<Socket | null>(null);
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [input, setInput] = useState("");
// //   const chatBoxRef = useRef<HTMLDivElement>(null);
 
// // // const currentUserId = user?._id;

// //   const appointmentId = location.state?.appointmentId;
// //   const userId = location.state?.userId;
// //   const doctorId = location.state?.doctorId;

// //   // Scroll to bottom after new message
// //   const scrollToBottom = () => {
// //     setTimeout(() => {
// //       chatBoxRef.current?.scrollTo({
// //         top: chatBoxRef.current.scrollHeight,
// //         behavior: "smooth",
// //       });
// //     }, 100);
// //   };

// //   useEffect(() => {

// //     const token = useAuthStore.getState().accessToken;

// //   console.log("🟡 Running socket effect:", { appointmentId, user, hasHydrated });
// //   console.log("🟡 Token from store:", token);

      
// //     if (!appointmentId || !user || !hasHydrated) return;

  

// //     if (!token) return;

// //     console.log("token : ", token);
// //     const socket = io("http://localhost:5000", {
// //       auth: { token },
// //       withCredentials: true,
// //     });

// //     socketRef.current = socket;
// //     console.log("✅ socketRef.current assigned:", socketRef.current);

// //     socket.on("connect", () => {
// //       console.log("🟢 Connected to socket:", socket.id);

// //       socket.emit("joinRoom", { appointmentId });

// //       socket.on("receiveMessage", (message: Message) => {
// //         setMessages((prev) => [...prev, message]);
// //         scrollToBottom();
// //       });

// //       socket.on("chatEnded", () => {
// //         alert("Chat has ended by the other user.");
// //       });
// //     });

// //     socket.on("connect_error", (err) => {
// //       console.error("Socket connection error:", err.message);
// //     });

// //     return () => {
// //       socket.disconnect();
// //       socketRef.current = null;
// //     };
// //   }, [appointmentId, user, hasHydrated]);



// // const handleSend = () => {
// //   console.log("📤 handleSend triggered with input:", input);
// //   const socket = socketRef.current;

// //   if (!input.trim() || !socket) {
// //     console.log("❌ Can't send. Input or socket missing.");
// //     return;
// //   }

// //   const newMessage = {
// //     appointmentId,
// //     content: input,
// //     type: "text",
// //     doctorId,
// //     userId,
   
// //   };

// //   socket.emit("sendMessage", newMessage);
// //   setInput("");
// // };


// //   const chatBox = (
// //     <div className="w-full h-full max-w-4xl mx-auto p-4 flex flex-col border bg-white shadow-xl rounded-xl">
// //       <div className="font-semibold text-lg text-gray-700 px-2 py-1 border-b">
// //         Chat with {role === "doctor" ? "User" : "Doctor"}
// //       </div>

// //       <div
// //         className="flex-1 overflow-y-auto space-y-3 px-4 py-2 mt-2 scroll-smooth"
// //         ref={chatBoxRef}
// //       >


// // {user &&
// //   messages.map((msg) => (
// //     <motion.div
// //       key={msg._id}
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.3 }}
// //       className={`flex ${msg.sender === user._id ? "justify-end" : "justify-start"}`}
// //     >
// //       <div
// //         className={`px-4 py-2 rounded-2xl text-sm max-w-xs break-words shadow ${
// //           msg.sender === user._id
// //             ? "bg-blue-500 text-white rounded-br-none"
// //             : "bg-gray-100 text-gray-800 rounded-bl-none"
// //         }`}
// //       >
// //         {msg.content}
// //         <div className="text-[10px] text-gray-300 mt-1 text-right">
// //           {new Date(msg.timestamp).toLocaleTimeString("en-IN", {
// //             hour: "2-digit",
// //             minute: "2-digit",
// //             hour12: true,
// //           })}
// //         </div>
// //       </div>
// //     </motion.div>
// //   ))}


// //       </div>

// //       <div className="border-t px-3 py-2 flex items-center gap-2">
// //         <input
// //           type="text"
// //           className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           placeholder="Type a message..."
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           onKeyDown={(e) => e.key === "Enter" && handleSend()}
// //         />
// //         <button
// //           onClick={handleSend}
// //           className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
// //         >
// //           <Send size={18} />
// //         </button>
// //       </div>
// //     </div>
// //   );

// //   if (role === "doctor") {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
// //         <NavbarAdmin />
// //         <div className="flex flex-1 overflow-hidden">
// //           <Sidebar />
// //           <main className="flex-1 flex justify-center items-center p-4 overflow-auto">
// //             {chatBox}
// //           </main>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
// //       <Navbar />
// //       <main className="flex-1 flex items-center justify-center p-4">
// //         {chatBox}
// //       </main>
// //     </div>
// //   );
// // };

// // export default ChatUI;









// // import { useEffect, useState, useRef } from "react";
// // import io, { Socket } from "socket.io-client";
// // import { motion } from "framer-motion";
// // import { Send } from "lucide-react";
// // import Navbar from "../../components/Navbar";
// // import NavbarAdmin from "../../components/NavbarAdmin";
// // import Sidebar from "../../components/SideBarAdmin";
// // import { useAuthStore } from "../../store/authStore";
// // import { useLocation } from "react-router-dom";

// // interface Message {
// //   _id: string;
// //   sender: string;
// //   content: string; // image or text
// //   type: "text" | "image";
// //   timestamp: string | number;
// // }

// // const ChatUI = () => {
// //   const { role, user, hasHydrated } = useAuthStore();
// //   const location = useLocation();
// //   const socketRef = useRef<Socket | null>(null);
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [input, setInput] = useState("");
// //   const [selectedImage, setSelectedImage] = useState<File | null>(null);
// //   const [imagePreview, setImagePreview] = useState<string | null>(null);
// //   const chatBoxRef = useRef<HTMLDivElement>(null);

// //   const appointmentId = location.state?.appointmentId;
// //   const userId = location.state?.userId;
// //   const doctorId = location.state?.doctorId;

// //   const scrollToBottom = () => {
// //     setTimeout(() => {
// //       chatBoxRef.current?.scrollTo({
// //         top: chatBoxRef.current.scrollHeight,
// //         behavior: "smooth",
// //       });
// //     }, 100);
// //   };

// //   useEffect(() => {
// //   const token = useAuthStore.getState().accessToken;
// //   if (!appointmentId || !user || !hasHydrated || !token) return;

// //   const socket = io("http://localhost:5000", {
// //     auth: { token },
// //     withCredentials: true,
// //   });

// //   socketRef.current = socket;

// //   const handleMessage = (message: Message) => {
// //     setMessages((prev) => [...prev, message]);
// //     scrollToBottom();
// //   };

// //   const handleChatEnded = () => {
// //     alert("Chat has ended by the other user.");
// //   };

// //   socket.emit("joinRoom", { appointmentId });
// //   socket.on("receiveMessage", handleMessage);
// //   socket.on("chatEnded", handleChatEnded);

// //   socket.on("connect_error", (err) => {
// //     console.error("Socket connection error:", err.message);
// //   });

// //   return () => {
// //     socket.off("receiveMessage", handleMessage);
// //     socket.off("chatEnded", handleChatEnded);
// //     socket.disconnect();
// //     socketRef.current = null;
// //   };
// // }, [appointmentId, user, hasHydrated]);


// //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file && file.type.startsWith("image/")) {
// //       setSelectedImage(file);
// //       const reader = new FileReader();
// //       reader.onloadend = () => setImagePreview(reader.result as string);
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleSend = () => {
// //     const socket = socketRef.current;

// //     if (!socket || (!input.trim() && !selectedImage)) return;

// //     let newMessage;

// //     if (selectedImage && imagePreview) {
// //       newMessage = {
// //         appointmentId,
// //         content: imagePreview,
// //         type: "image",
// //         doctorId,
// //         userId,
// //       };
// //       setSelectedImage(null);
// //       setImagePreview(null);
// //     } else {
// //       newMessage = {
// //         appointmentId,
// //         content: input,
// //         type: "text",
// //         doctorId,
// //         userId,
// //       };
// //       setInput("");
// //     }

// //     socket.emit("sendMessage", newMessage);
// //   };

// //   const chatBox = (
// //     <div className="w-full h-full max-w-4xl mx-auto p-4 flex flex-col border bg-white shadow-xl rounded-xl">
// //       <div className="font-semibold text-lg text-gray-700 px-2 py-1 border-b">
// //         Chat with {role === "doctor" ? "User" : "Doctor"}
// //       </div>

// //       <div
// //         className="flex-1 overflow-y-auto space-y-3 px-4 py-2 mt-2 scroll-smooth"
// //         ref={chatBoxRef}
// //       >
// //         {user &&
// //           messages.map((msg) => (
// //             <motion.div
// //               key={msg._id}
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.3 }}
// //               className={`flex ${msg.sender === user._id ? "justify-end" : "justify-start"}`}
// //             >
// //               <div
// //                 className={`px-4 py-2 rounded-2xl text-sm max-w-xs break-words shadow ${
// //                   msg.sender === user._id
// //                     ? "bg-blue-500 text-white rounded-br-none"
// //                     : "bg-gray-100 text-gray-800 rounded-bl-none"
// //                 }`}
// //               >
// //                 {msg.type === "text" ? (
// //                   msg.content
// //                 ) : (
// //                   <img
// //                     src={msg.content}
// //                     alt="sent"
// //                     className="max-w-[200px] rounded-md object-cover"
// //                   />
// //                 )}
// //                 <div className="text-[10px] text-gray-300 mt-1 text-right">
// //                   {new Date(msg.timestamp).toLocaleTimeString("en-IN", {
// //                     hour: "2-digit",
// //                     minute: "2-digit",
// //                     hour12: true,
// //                   })}
// //                 </div>
// //               </div>
// //             </motion.div>
// //           ))}
// //       </div>

// //       <div className="border-t px-3 py-2 flex flex-col gap-2">
// //         <div className="flex items-center gap-2">
// //           <input
// //             type="text"
// //             className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             placeholder="Type a message..."
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //             onKeyDown={(e) => e.key === "Enter" && handleSend()}
// //           />
// //           <label className="cursor-pointer text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full border border-gray-300">
// //             📎
// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={handleImageChange}
// //               className="hidden"
// //             />
// //           </label>
// //           <button
// //             onClick={handleSend}
// //             className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
// //           >
// //             <Send size={18} />
// //           </button>
// //         </div>

// //         {imagePreview && (
// //           <div className="flex items-center gap-4 mt-2">
// //             <img
// //               src={imagePreview}
// //               alt="preview"
// //               className="w-20 h-20 object-cover rounded-md"
// //             />
// //             <button
// //               onClick={() => {
// //                 setSelectedImage(null);
// //                 setImagePreview(null);
// //               }}
// //               className="text-xs text-red-500 underline"
// //             >
// //               Remove
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );

// //   if (role === "doctor") {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
// //         <NavbarAdmin />
// //         <div className="flex flex-1 overflow-hidden">
// //           <Sidebar />
// //           <main className="flex-1 flex justify-center items-center p-4 overflow-auto">
// //             {chatBox}
// //           </main>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
// //       <Navbar />
// //       <main className="flex-1 flex items-center justify-center p-4">
// //         {chatBox}
// //       </main>
// //     </div>
// //   );
// // };

// // export default ChatUI;














// // import { useEffect, useState, useRef } from "react";
// // import io, { Socket } from "socket.io-client";
// // import { motion } from "framer-motion";
// // import { Send } from "lucide-react";
// // import Navbar from "../../components/Navbar";
// // import NavbarAdmin from "../../components/NavbarAdmin";
// // import Sidebar from "../../components/SideBarAdmin";
// // import { useAuthStore } from "../../store/authStore";
// // import { useLocation } from "react-router-dom";
// // import axiosInstance from "../../utils/axios";

// // interface Message {
// //   _id: string;
// //   sender: string;
// //   content: string; 
// //   type: "text" | "image";
// //   timestamp: string | number;
// // }





// // const ChatUI = () => {
// //   const { role, user, hasHydrated } = useAuthStore();
// //   const location = useLocation();
// //   const socketRef = useRef<Socket | null>(null);
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [input, setInput] = useState("");
// //   const [selectedImage, setSelectedImage] = useState<File | null>(null);
// //   const [imagePreview, setImagePreview] = useState<string | null>(null);
// //   const chatBoxRef = useRef<HTMLDivElement>(null);

// //   const appointmentId = location.state?.appointmentId;
// //   const userId = location.state?.userId;
// //   const doctorId = location.state?.doctorId;

// //   const scrollToBottom = () => {
// //     setTimeout(() => {
// //       chatBoxRef.current?.scrollTo({
// //         top: chatBoxRef.current.scrollHeight,
// //         behavior: "smooth",
// //       });
// //     }, 100);
// //   };


// //   useEffect(() => {
// //   const fetchPreviousMessages = async () => {
// //     const token = useAuthStore.getState().accessToken;
// //     if (!appointmentId || !token) return;

// //     try {
// //       const res = await axiosInstance.get(`/messages/${appointmentId}`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       const data = res.data;
// //       console.log("data : ",data);
// //       if (Array.isArray(data.messages)) {
// //         setMessages(data.messages);
// //         scrollToBottom();
// //       }
// //     } catch (err) {
// //       console.error("Failed to fetch previous messages:", err);
// //     }
// //   };

// //   fetchPreviousMessages();
// // }, [appointmentId]);



// //   // 🟢 Set up socket after messages are loaded
// //   useEffect(() => {
// //     const token = useAuthStore.getState().accessToken;
// //     if (!appointmentId || !user || !hasHydrated || !token) return;

// //     const socket = io("http://localhost:5000", {
// //       auth: { token },
// //       withCredentials: true,
// //     });

// //     socketRef.current = socket;

// //     const handleMessage = (message: Message) => {
// //       setMessages((prev) =>
// //         prev.find((m) => m._id === message._id) ? prev : [...prev, message]
// //       );
// //       scrollToBottom();
// //     };

// //     const handleChatEnded = () => {
// //       alert("Chat has ended by the other user.");
// //     };

// //     socket.emit("joinRoom", { appointmentId });
// //     socket.on("receiveMessage", handleMessage);
// //     socket.on("chatEnded", handleChatEnded);

// //     socket.on("connect_error", (err) => {
// //       console.error("Socket connection error:", err.message);
// //     });

// //     return () => {
// //       socket.off("receiveMessage", handleMessage);
// //       socket.off("chatEnded", handleChatEnded);
// //       socket.disconnect();
// //       socketRef.current = null;
// //     };
// //   }, [appointmentId, user, hasHydrated]);

  
// //     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file && file.type.startsWith("image/")) {
// //       setSelectedImage(file);
// //       const reader = new FileReader();
// //       reader.onloadend = () => setImagePreview(reader.result as string);
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleSend = () => {
// //     const socket = socketRef.current;

// //     if (!socket || (!input.trim() && !selectedImage)) return;

// //     let newMessage;

// //     if (selectedImage && imagePreview) {
// //       newMessage = {
// //         appointmentId,
// //         content: imagePreview,
// //         type: "image",
// //         doctorId,
// //         userId,
// //       };
// //       setSelectedImage(null);
// //       setImagePreview(null);
// //     } else {
// //       newMessage = {
// //         appointmentId,
// //         content: input,
// //         type: "text",
// //         doctorId,
// //         userId,
// //       };
// //       setInput("");
// //     }

// //     socket.emit("sendMessage", newMessage);
// //   };

  
// //   const chatBox = (
// //   <div className="w-full h-full max-w-4xl mx-auto p-4 flex flex-col border bg-white shadow-xl rounded-xl">
// //     <div className="font-semibold text-lg text-gray-700 px-2 py-1 border-b">
// //       Chat with {role === "doctor" ? "User" : "Doctor"}
// //     </div>

// //     {/* Scrollable chat area */}
// //     <div
// //       className="flex-1 max-h-[400px] overflow-y-scroll scrollbar-hide space-y-3 px-4 py-2 mt-2 scroll-smooth"
// //       ref={chatBoxRef}
// //     >
// //       {user &&
// //         messages.map((msg) => (
// //           <motion.div
// //             key={msg._id}
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.3 }}
// //             className={`flex ${msg.sender === user._id ? "justify-end" : "justify-start"}`}
// //           >
// //             <div
// //               className={`px-4 py-2 rounded-2xl text-sm max-w-xs break-words shadow ${
// //                 msg.sender === user._id
// //                   ? "bg-blue-500 text-white rounded-br-none"
// //                   : "bg-gray-100 text-gray-800 rounded-bl-none"
// //               }`}
// //             >
// //               {msg.type === "text" ? (
// //                 msg.content
// //               ) : (
// //                 <img
// //                   src={msg.content}
// //                   alt="sent"
// //                   className="max-w-[200px] rounded-md object-cover"
// //                 />
// //               )}
// //               <div className="text-[10px] text-gray-300 mt-1 text-right">
// //                 {new Date(msg.timestamp).toLocaleTimeString("en-IN", {
// //                   hour: "2-digit",
// //                   minute: "2-digit",
// //                   hour12: true,
// //                 })}
// //               </div>
// //             </div>
// //           </motion.div>
// //         ))}
// //       <div ref={chatBoxRef} />
// //     </div>

// //     {/* Input section */}
// //     <div className="border-t px-3 py-2 flex flex-col gap-2">
// //       <div className="flex items-center gap-2">
// //         <input
// //           type="text"
// //           className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           placeholder="Type a message..."
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           onKeyDown={(e) => e.key === "Enter" && handleSend()}
// //         />
// //         <label className="cursor-pointer text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full border border-gray-300">
// //           📎
// //           <input
// //             type="file"
// //             accept="image/*"
// //             onChange={handleImageChange}
// //             className="hidden"
// //           />
// //         </label>
// //         <button
// //           onClick={handleSend}
// //           className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
// //         >
// //           <Send size={18} />
// //         </button>
// //       </div>

// //       {imagePreview && (
// //         <div className="flex items-center gap-4 mt-2">
// //           <img
// //             src={imagePreview}
// //             alt="preview"
// //             className="w-20 h-20 object-cover rounded-md"
// //           />
// //           <button
// //             onClick={() => {
// //               setSelectedImage(null);
// //               setImagePreview(null);
// //             }}
// //             className="text-xs text-red-500 underline"
// //           >
// //             Remove
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   </div>
// // );


// //   if (role === "doctor") {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
// //         <NavbarAdmin />
// //         <div className="flex flex-1 overflow-hidden">
// //           <Sidebar />
// //           <main className="flex-1 flex justify-center items-center p-4 overflow-auto">
// //             {chatBox}
// //           </main>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
// //       <Navbar />
// //       <main className="flex-1 flex items-center justify-center p-4">
// //         {chatBox}
// //       </main>
// //     </div>
// //   );
// // };


// // export default ChatUI;






//   // const chatBox = (
//   //   <div className="w-full h-full max-w-4xl mx-auto p-4 flex flex-col border bg-white shadow-xl rounded-xl">
//   //     <div className="font-semibold text-lg text-gray-700 px-2 py-1 border-b">
//   //       Chat with {role === "doctor" ? "User" : "Doctor"}
//   //     </div>

//   //     <div
//   //       className="flex-1 overflow-y-auto space-y-3 px-4 py-2 mt-2 scroll-smooth"
//   //       ref={chatBoxRef}
//   //     >
//   //       {user &&
//   //         messages.map((msg) => (
//   //           <motion.div
//   //             key={msg._id}
//   //             initial={{ opacity: 0, y: 20 }}
//   //             animate={{ opacity: 1, y: 0 }}
//   //             transition={{ duration: 0.3 }}
//   //             className={`flex ${msg.sender === user._id ? "justify-end" : "justify-start"}`}
//   //           >
//   //             <div
//   //               className={`px-4 py-2 rounded-2xl text-sm max-w-xs break-words shadow ${
//   //                 msg.sender === user._id
//   //                   ? "bg-blue-500 text-white rounded-br-none"
//   //                   : "bg-gray-100 text-gray-800 rounded-bl-none"
//   //               }`}
//   //             >
//   //               {msg.type === "text" ? (
//   //                 msg.content
//   //               ) : (
//   //                 <img
//   //                   src={msg.content}
//   //                   alt="sent"
//   //                   className="max-w-[200px] rounded-md object-cover"
//   //                 />
//   //               )}
//   //               <div className="text-[10px] text-gray-300 mt-1 text-right">
//   //                 {new Date(msg.timestamp).toLocaleTimeString("en-IN", {
//   //                   hour: "2-digit",
//   //                   minute: "2-digit",
//   //                   hour12: true,
//   //                 })}
//   //               </div>
//   //             </div>
//   //           </motion.div>
//   //         ))}
//   //     </div>

//   //     <div className="border-t px-3 py-2 flex flex-col gap-2">
//   //       <div className="flex items-center gap-2">
//   //         <input
//   //           type="text"
//   //           className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//   //           placeholder="Type a message..."
//   //           value={input}
//   //           onChange={(e) => setInput(e.target.value)}
//   //           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//   //         />
//   //         <label className="cursor-pointer text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full border border-gray-300">
//   //           📎
//   //           <input
//   //             type="file"
//   //             accept="image/*"
//   //             onChange={handleImageChange}
//   //             className="hidden"
//   //           />
//   //         </label>
//   //         <button
//   //           onClick={handleSend}
//   //           className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
//   //         >
//   //           <Send size={18} />
//   //         </button>
//   //       </div>

//   //       {imagePreview && (
//   //         <div className="flex items-center gap-4 mt-2">
//   //           <img
//   //             src={imagePreview}
//   //             alt="preview"
//   //             className="w-20 h-20 object-cover rounded-md"
//   //           />
//   //           <button
//   //             onClick={() => {
//   //               setSelectedImage(null);
//   //               setImagePreview(null);
//   //             }}
//   //             className="text-xs text-red-500 underline"
//   //           >
//   //             Remove
//   //           </button>
//   //         </div>
//   //       )}
//   //     </div>
//   //   </div>
//   // );









// import { useEffect, useState, useRef } from "react";
// import io, { Socket } from "socket.io-client";
// import { motion } from "framer-motion";
// import { Send } from "lucide-react";
// import Navbar from "../../components/Navbar";
// import NavbarAdmin from "../../components/NavbarAdmin";
// import Sidebar from "../../components/SideBarAdmin";
// import { useAuthStore } from "../../store/authStore";
// import { useLocation } from "react-router-dom";
// import axiosInstance from "../../utils/axios";

// interface Message {
//   _id: string;
//   sender: string;
//   content: string;
//   type: "text" | "image";
//   timestamp: string | number;
// }

// interface ChatProps {
//   appointmentId?: string;
//   userId?: string;
//   doctorId?: string;
// }

// // 🧩 ChatBox works both via <ChatBox /> or <Route state={...} />
// const ChatUI = (props: ChatProps) => {
//   const { role, user, hasHydrated } = useAuthStore();
//   const location = useLocation();
//   const socketRef = useRef<Socket | null>(null);

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const chatBoxRef = useRef<HTMLDivElement>(null);

//   // 🔁 Prefer props > fallback to location.state
//   const appointmentId = props.appointmentId ?? location.state?.appointmentId;
//   const userId = props.userId ?? location.state?.userId;
//   const doctorId = props.doctorId ?? location.state?.doctorId;

//   const scrollToBottom = () => {
//     setTimeout(() => {
//       chatBoxRef.current?.scrollTo({
//         top: chatBoxRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }, 100);
//   };

//   // 🟢 Load previous messages
//   useEffect(() => {
//     const fetchPreviousMessages = async () => {
//       const token = useAuthStore.getState().accessToken;
//       if (!appointmentId || !token) return;

//       try {
//         const res = await axiosInstance.get(`/messages/${appointmentId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (Array.isArray(res.data.messages)) {
//           setMessages(res.data.messages);
//           scrollToBottom();
//         }
//       } catch (err) {
//         console.error("Failed to fetch previous messages:", err);
//       }
//     };

//     fetchPreviousMessages();
//   }, [appointmentId]);

//   // 🟢 Set up socket
//   useEffect(() => {
//     const token = useAuthStore.getState().accessToken;
//     if (!appointmentId || !user || !hasHydrated || !token) return;

//     const socket = io("http://localhost:5000", {
//       auth: { token },
//       withCredentials: true,
//     });

//     socketRef.current = socket;

//     socket.emit("joinRoom", { appointmentId });

//     socket.on("receiveMessage", (message: Message) => {
//       setMessages((prev) =>
//         prev.find((m) => m._id === message._id) ? prev : [...prev, message]
//       );
//       scrollToBottom();
//     });

//     socket.on("chatEnded", () => {
//       alert("Chat has ended by the other user.");
//     });

//     socket.on("connect_error", (err) => {
//       console.error("Socket connection error:", err.message);
//     });

//     return () => {
//       socket.disconnect();
//       socketRef.current = null;
//     };
//   }, [appointmentId, user, hasHydrated]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file && file.type.startsWith("image/")) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setImagePreview(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSend = () => {
//     const socket = socketRef.current;
//     if (!socket || (!input.trim() && !selectedImage)) return;

//     const newMessage = {
//       appointmentId,
//       content: selectedImage ? imagePreview : input,
//       type: selectedImage ? "image" : "text",
//       doctorId,
//       userId,
//     };

//     socket.emit("sendMessage", newMessage);

//     // Clear input/image
//     setInput("");
//     setSelectedImage(null);
//     setImagePreview(null);
//   };

//   const chatBox = (
//     <div className="w-full h-full max-w-4xl mx-auto p-4 flex flex-col border bg-white shadow-xl rounded-xl">
//       <div className="font-semibold text-lg text-gray-700 px-2 py-1 border-b">
//         Chat with {role === "doctor" ? "User" : "Doctor"}
//       </div>

//       <div
//         className="flex-1 max-h-[400px] overflow-y-scroll scrollbar-hide space-y-3 px-4 py-2 mt-2 scroll-smooth"
//         ref={chatBoxRef}
//       >
//         {user &&
//           messages.map((msg) => (
//             <motion.div
//               key={msg._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//               className={`flex ${msg.sender === user._id ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-2xl text-sm max-w-xs break-words shadow ${
//                   msg.sender === user._id
//                     ? "bg-blue-500 text-white rounded-br-none"
//                     : "bg-gray-100 text-gray-800 rounded-bl-none"
//                 }`}
//               >
//                 {msg.type === "text" ? (
//                   msg.content
//                 ) : (
//                   <img
//                     src={msg.content}
//                     alt="sent"
//                     className="max-w-[200px] rounded-md object-cover"
//                   />
//                 )}
//                 <div className="text-[10px] text-gray-300 mt-1 text-right">
//                   {new Date(msg.timestamp).toLocaleTimeString("en-IN", {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                     hour12: true,
//                   })}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//       </div>

//       {/* Input */}
//       <div className="border-t px-3 py-2 flex flex-col gap-2">
//         <div className="flex items-center gap-2">
//           <input
//             type="text"
//             className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Type a message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           />
//           <label className="cursor-pointer text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full border border-gray-300">
//             📎
//             <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//           </label>
//           <button
//             onClick={handleSend}
//             className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
//           >
//             <Send size={18} />
//           </button>
//         </div>

//         {imagePreview && (
//           <div className="flex items-center gap-4 mt-2">
//             <img src={imagePreview} alt="preview" className="w-20 h-20 object-cover rounded-md" />
//             <button
//               onClick={() => {
//                 setSelectedImage(null);
//                 setImagePreview(null);
//               }}
//               className="text-xs text-red-500 underline"
//             >
//               Remove
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   // Layout by role
//   if (role === "doctor") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
//         <NavbarAdmin />
//         <div className="flex flex-1 overflow-hidden">
//           <Sidebar />
//           <main className="flex-1 flex justify-center items-center p-4 overflow-auto">
//             {chatBox}
//           </main>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
//       <Navbar />
//       <main className="flex-1 flex items-center justify-center p-4">{chatBox}</main>
//     </div>
//   );
// };

// export default ChatUI;



















import { useEffect, useState, useRef } from "react";
import io,{ Socket} from "socket.io-client";
import { motion } from "framer-motion";
import { Send, Paperclip } from "lucide-react";
import Navbar from "../../components/Navbar";
import NavbarAdmin from "../../components/NavbarAdmin";
import Sidebar from "../../components/SideBarAdmin";
import { useAuthStore } from "../../store/authStore";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { APIChatRoutes } from "../../constants/routes.constants";

interface Message {
  _id: string;
  sender: string;
  content: string;
  type: "text" | "image";
  timestamp: string | number;
}

interface ChatProps {
  appointmentId?: string;
  userId?: string;
  doctorId?: string;
}

const ChatUI = (props: ChatProps) => {
  const { role, user, hasHydrated } = useAuthStore();
  const location = useLocation();
  const socketRef = useRef<Socket | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const appointmentId = props.appointmentId ?? location.state?.appointmentId;
  const userId = props.userId ?? location.state?.userId;
  const doctorId = props.doctorId ?? location.state?.doctorId;

  const scrollToBottom = () => {
    setTimeout(() => {
      chatBoxRef.current?.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  useEffect(() => {
    const fetchPreviousMessages = async () => {
      const token = useAuthStore.getState().accessToken;
      if (!appointmentId || !token) return;

      try {
        const res = await axiosInstance.get(`${APIChatRoutes.GET_MESSAGES}/${appointmentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(res.data.messages)) {
          setMessages(res.data.messages);
          scrollToBottom();
        }
      } catch (err) {
        console.error("Failed to fetch previous messages:", err);
      }
    };

    fetchPreviousMessages();
  }, [appointmentId]);

  useEffect(() => {
    const token = useAuthStore.getState().accessToken;
    if (!appointmentId || !user || !hasHydrated || !token) return;

    const socket = io(`${import.meta.env.VITE_SOCKET_URL}/chat`, {
      auth: { token },
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.emit("joinRoom", { appointmentId });

    socket.on("receiveMessage", (message: Message) => {
      setMessages((prev) =>
        prev.find((m) => m._id === message._id) ? prev : [...prev, message]
      );
      scrollToBottom();
    });

    socket.on("chatEnded", () => {
      alert("Chat has ended by the other user.");
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [appointmentId, user, hasHydrated]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSend = () => {
    const socket = socketRef.current;
    if (!socket || (!input.trim() && !selectedImage)) return;

    const newMessage = {
      appointmentId,
      content: selectedImage ? imagePreview : input,
      type: selectedImage ? "image" : "text",
      doctorId,
      userId,
    };

    socket.emit("sendMessage", newMessage);

    setInput("");
    setSelectedImage(null);
    setImagePreview(null);
  };

  const chatBox = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto flex flex-col bg-white rounded-2xl shadow-lg h-[80vh] sm:h-[85vh]"
    >
      <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg flex items-center gap-3 rounded-t-2xl">
        <span>Chat with {role === "doctor" ? "User" : "Doctor"}</span>
      </div>

      <div
        className="flex-1 overflow-y-auto custom-scroll p-4 sm:p-6 space-y-4 "
        ref={chatBoxRef}
      >
        {user && messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            No messages yet
          </div>
        ) : (
          user &&
          messages.map((msg) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.sender === user._id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs sm:max-w-md p-3 rounded-2xl shadow-sm ${
                  msg.sender === user._id
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.type === "text" ? (
                  <p className="break-words">{msg.content}</p>
                ) : (
                  <img
                    src={msg.content}
                    alt="sent"
                    className="max-w-[200px] rounded-md object-cover"
                  />
                )}
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="border-t p-4 sm:p-6 flex flex-col gap-3 bg-gray-50 ">
        {imagePreview && (
          <div className="flex items-center gap-3">
            <img
              src={imagePreview}
              alt="preview"
              className="w-16 h-16 object-cover rounded-md border"
            />
            <button
              onClick={() => {
                setSelectedImage(null);
                setImagePreview(null);
              }}
              className="text-sm text-red-500 hover:text-red-600 underline"
            >
              Remove
            </button>
          </div>
        )}
        <div className="flex items-center gap-3 bg-white rounded-full border border-gray-200 shadow-sm p-2">
          <input
            type="text"
            className="flex-1 bg-transparent text-sm focus:outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <label className="cursor-pointer text-gray-500 hover:text-gray-700">
            <Paperclip size={20} />
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  if (role === "doctor") {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <NavbarAdmin />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 flex justify-center items-center p-4 sm:p-6 lg:p-8 overflow-auto">
            {chatBox}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-1 flex justify-center items-center p-4 sm:p-6 lg:p-8">
        {chatBox}
      </main>
    </div>
  );
};

export default ChatUI;

<style >{`
  .custom-scroll::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scroll::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }
  .custom-scroll::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
  .custom-scroll::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`}</style>