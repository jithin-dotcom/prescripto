

// // // // // import { useEffect, useState } from "react";
// // // // // import { useAuthStore } from "../../store/authStore"; // your auth store
// // // // // import ChatBox from "./Chat"; // your existing chat component
// // // // // // import axios from "axios";
// // // // // import axiosInstance from "../../utils/axios";

// // // // // interface ChatListItem {
// // // // //   appointmentId: string;
// // // // //   name: string;
// // // // //   photo: string;
// // // // //   lastMessage: string;
// // // // //   timestamp: string;
// // // // // }

// // // // // const ChatDashboard = () => {
// // // // // //   const {  user } = useAuthStore();
// // // // //   const token = useAuthStore.getState().accessToken;
// // // // //   const [chatList, setChatList] = useState<ChatListItem[]>([]);
// // // // //   const [selectedChat, setSelectedChat] = useState<ChatListItem | null>(null);

// // // // //   useEffect(() => {
// // // // //     const fetchChats = async () => {
// // // // //       try {
// // // // //         const res = await axiosInstance.get("/my-chats", {
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${token}`,
// // // // //           },
// // // // //         });
// // // // //         console.log("res : ",res.data.chats);
// // // // //         setChatList(res.data.chats); 
// // // // //         console.log("chat list: ",chatList);
// // // // //       } catch (error) {
// // // // //         console.error("Error fetching chat list:", error);
// // // // //       }
// // // // //     };

// // // // //     fetchChats();
// // // // //   }, [token]);

// // // // //   useEffect(() => {
// // // // //   console.log("Updated chatList: ", chatList);
// // // // // }, [chatList]);

// // // // //   return (
// // // // //     <div className="flex h-[calc(100vh-4rem)] bg-white overflow-hidden border rounded-lg shadow-md">
// // // // //       {/* Left Panel - Chat List */}
// // // // //       <div className="w-full md:w-1/3 lg:w-1/4 border-r overflow-y-auto scrollbar-hide">
// // // // //         <div className="p-4 font-bold text-xl border-b">Chats</div>
// // // // //         {chatList.length === 0 && (
// // // // //           <div className="p-4 text-gray-500">No chats yet</div>
// // // // //         )}
// // // // //         {chatList.map((chat) => (
// // // // //           <div
// // // // //             key={chat.appointmentId}
// // // // //             onClick={() => setSelectedChat(chat)}
// // // // //             className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 transition ${
// // // // //               selectedChat?.appointmentId === chat.appointmentId
// // // // //                 ? "bg-gray-200"
// // // // //                 : ""
// // // // //             }`}
// // // // //           >
// // // // //             <img
// // // // //               src={chat.photo}
// // // // //               alt={chat.name}
// // // // //               className="w-10 h-10 rounded-full object-cover"
// // // // //             />
// // // // //             <div className="flex-1">
// // // // //               <div className="font-semibold">{chat.name}</div>
// // // // //               <div className="text-sm text-gray-500 truncate">
// // // // //                 {chat.lastMessage || "No messages yet"}
// // // // //               </div>
// // // // //             </div>
// // // // //             <div className="text-xs text-gray-400 whitespace-nowrap">
// // // // //               {new Date(chat.timestamp).toLocaleTimeString([], {
// // // // //                 hour: "2-digit",
// // // // //                 minute: "2-digit",
// // // // //               })}
// // // // //             </div>
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>

// // // // //       {/* Right Panel - Chat Box */}
// // // // //       <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
// // // // //         {selectedChat ? (
// // // // //           <ChatBox appointmentId={selectedChat.appointmentId} userId={selectedChat.userId._id} doctorId={selectedChat.doctorId._id} />
// // // // //         ) : (
// // // // //           <div className="h-full flex items-center justify-center text-gray-500 text-lg">
// // // // //             Select a chat to start messaging
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default ChatDashboard;













// // // // import { useEffect, useState } from "react";
// // // // import { useAuthStore } from "../../store/authStore";
// // // // import ChatBox from "./Chat";
// // // // import axiosInstance from "../../utils/axios";

// // // // interface Participant {
// // // //   _id: string;
// // // //   name: string;
// // // //   photo: string;
// // // // }

// // // // interface ChatListItem {
// // // //   _id: string;
// // // //   appointmentId: string;
// // // //   doctorId: Participant;
// // // //   userId: Participant;
// // // //   lastMessage?: string;
// // // //   timestamp: string;
// // // // }

// // // // const ChatDashboard = () => {
// // // //   const token = useAuthStore.getState().accessToken;
// // // //   const currentUser = useAuthStore.getState().user;
// // // //   const currentUserId = currentUser?._id;

// // // //   const [chatList, setChatList] = useState<ChatListItem[]>([]);
// // // //   const [selectedChat, setSelectedChat] = useState<ChatListItem | null>(null);

// // // //   useEffect(() => {
// // // //     const fetchChats = async () => {
// // // //       try {
// // // //         const res = await axiosInstance.get("/my-chats", {
// // // //           headers: {
// // // //             Authorization: `Bearer ${token}`,
// // // //           },
// // // //         });
// // // //         setChatList(res.data.chats || []);
// // // //       } catch (error) {
// // // //         console.error("Error fetching chat list:", error);
// // // //       }
// // // //     };

// // // //     if (token) fetchChats();
// // // //   }, [token]);

// // // //   return (
// // // //     <div className="flex h-[calc(100vh-4rem)] bg-white overflow-hidden border rounded-lg shadow-md">
// // // //       {/* Left Panel - Chat List */}
// // // //       <div className="w-full md:w-1/3 lg:w-1/4 border-r overflow-y-auto scrollbar-hide">
// // // //         <div className="p-4 font-bold text-xl border-b">Chats</div>

// // // //         {chatList.length === 0 ? (
// // // //           <div className="p-4 text-gray-500">No chats yet</div>
// // // //         ) : (
// // // //           chatList.map((chat) => {
// // // //             // Determine who is the other person in the chat
// // // //             const otherPerson =
// // // //               chat.userId._id === currentUserId ? chat.doctorId : chat.userId;

// // // //             return (
// // // //               <div
// // // //                 key={chat.appointmentId}
// // // //                 onClick={() => setSelectedChat(chat)}
// // // //                 className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 transition ${
// // // //                   selectedChat?.appointmentId === chat.appointmentId
// // // //                     ? "bg-gray-200"
// // // //                     : ""
// // // //                 }`}
// // // //               >
// // // //                 <img
// // // //                   src={otherPerson.photo}
// // // //                   alt={otherPerson.name}
// // // //                   className="w-10 h-10 rounded-full object-cover"
// // // //                 />
// // // //                 <div className="flex-1">
// // // //                   <div className="font-semibold">{otherPerson.name}</div>
// // // //                   <div className="text-sm text-gray-500 truncate">
// // // //                     {chat.lastMessage || "No messages yet"}
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="text-xs text-gray-400 whitespace-nowrap">
// // // //                   {new Date(chat.timestamp).toLocaleTimeString([], {
// // // //                     hour: "2-digit",
// // // //                     minute: "2-digit",
// // // //                   })}
// // // //                 </div>
// // // //               </div>
// // // //             );
// // // //           })
// // // //         )}
// // // //       </div>

// // // //       {/* Right Panel - Chat Box */}
// // // //       <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
// // // //         {selectedChat ? (
// // // //           <ChatBox
// // // //             appointmentId={selectedChat.appointmentId}
// // // //             userId={selectedChat.userId._id}
// // // //             doctorId={selectedChat.doctorId._id}
// // // //           />
// // // //         ) : (
// // // //           <div className="h-full flex items-center justify-center text-gray-500 text-lg">
// // // //             Select a chat to start messaging
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ChatDashboard;


















// // // import { useEffect, useState } from "react";
// // // import { useAuthStore } from "../../store/authStore";
// // // import ChatBox from "./Chat";
// // // import axiosInstance from "../../utils/axios";
// // // import Navbar from "../../components/Navbar";
// // // import NavbarAdmin from "../../components/NavbarAdmin";
// // // import type { Appointment } from "../../interfaces/IMyAppointments";


// // // interface Participant {
// // //   _id: string;
// // //   name: string;
// // //   photo: string;
// // // }



// // // interface ChatListItem {
// // //   _id: string;
// // //   appointmentId: Appointment;
// // //   doctorId: Participant;
// // //   userId: Participant;
// // //   lastMessage?: string;
// // //   timestamp: string;
// // // }

// // // const ChatDashboard = () => {
// // //   const token = useAuthStore.getState().accessToken;
// // //   const currentUser = useAuthStore.getState().user;
// // //   const currentUserId = currentUser?._id;
// // //   const role = currentUser?.role;

// // //   const [chatList, setChatList] = useState<ChatListItem[]>([]);
// // //   const [selectedChat, setSelectedChat] = useState<ChatListItem | null>(null);

// // //   useEffect(() => {
// // //     const fetchChats = async () => {
// // //       try {
// // //         const res = await axiosInstance.get("/my-chats", {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         });
// // //         setChatList(res.data.chats || []);
// // //         console.log(res.data.chats);
// // //       } catch (error) {
// // //         console.error("Error fetching chat list:", error);
// // //       }
// // //     };

// // //     if (token) fetchChats();
// // //   }, [token]);

// // //   const chatBox = (
// // //     <div className="flex h-[calc(100vh-4rem)] bg-white overflow-hidden border rounded-lg shadow-md w-full">
// // //       {/* Left Panel - Chat List */}
// // //       <div className="w-full md:w-1/3 lg:w-1/4 border-r overflow-y-auto scrollbar-hide">
// // //         <div className="p-4 font-bold text-xl border-b">Chats</div>
// // //         {chatList.length === 0 ? (
// // //           <div className="p-4 text-gray-500">No chats yet</div>
// // //         ) : (
// // //           chatList.map((chat) => {
// // //             const otherPerson =
// // //               chat.userId._id === currentUserId ? chat.doctorId : chat.userId;

// // //             return (
// // //               <div
// // //                 key={chat.appointmentId._id}
// // //                 onClick={() => setSelectedChat(chat)}
// // //                 className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 transition ${
// // //                   selectedChat?.appointmentId === chat.appointmentId
// // //                     ? "bg-gray-200"
// // //                     : ""
// // //                 }`}
// // //               >
// // //                 <img
// // //                   src={otherPerson.photo}
// // //                   alt={otherPerson.name}
// // //                   className="w-10 h-10 rounded-full object-cover"
// // //                 />
// // //                 <div className="flex-1">
// // //                   <div className="font-semibold">{otherPerson.name}</div>
// // //                   <div className="text-sm text-gray-500 truncate">
// // //                     {chat.appointmentId.day || "No messages yet"}
// // //                   </div>
// // //                 </div>
// // //                 <div className="text-xs text-gray-400 whitespace-nowrap">
                  
// // //                   {chat.appointmentId.time}
// // //                 </div>
// // //               </div>
// // //             );
// // //           })
// // //         )}
// // //       </div>

// // //       {/* Right Panel - Chat Box */}
// // //       <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
// // //         {selectedChat ? (
// // //           <ChatBox
// // //             appointmentId={selectedChat.appointmentId._id}
// // //             userId={selectedChat.userId._id}
// // //             doctorId={selectedChat.doctorId._id}
// // //           />
// // //         ) : (
// // //           <div className="h-full flex items-center justify-center text-gray-500 text-lg">
// // //             Select a chat to start messaging
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );

// // //   // Layout by role
// // //   if (role === "doctor") {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
// // //         <NavbarAdmin />
// // //         <div className="flex flex-1 overflow-hidden">
       
// // //           <main className="flex-1 flex justify-center items-center p-4 overflow-auto">
// // //             {chatBox}
// // //           </main>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
// // //       <Navbar />
// // //       <main className="flex-1 flex items-center justify-center p-4">{chatBox}</main>
// // //     </div>
// // //   );
// // // };

// // // export default ChatDashboard;




















// // import { useEffect, useState, useRef } from "react";
// // import { useAuthStore } from "../../store/authStore";
// // import axiosInstance from "../../utils/axios";
// // import Navbar from "../../components/Navbar";
// // import NavbarAdmin from "../../components/NavbarAdmin";
// // import { motion } from "framer-motion";
// // import { Send } from "lucide-react";
// // import io, { Socket } from "socket.io-client";
// // import type { Appointment } from "../../interfaces/IMyAppointments";

// // interface Participant {
// //   _id: string;
// //   name: string;
// //   photo: string;
// // }

// // interface ChatListItem {
// //   _id: string;
// //   appointmentId: Appointment;
// //   doctorId: Participant;
// //   userId: Participant;
// //   lastMessage?: string;
// //   timestamp: string;
// // }

// // interface Message {
// //   _id: string;
// //   sender: string;
// //   content: string;
// //   type: "text" | "image";
// //   timestamp: string | number;
// // }

// // const ChatDashboard = () => {
// //   const token = useAuthStore.getState().accessToken;
// //   const { user: currentUser, role, hasHydrated } = useAuthStore();
// //   const currentUserId = currentUser?._id;

// //   const [chatList, setChatList] = useState<ChatListItem[]>([]);
// //   const [selectedChat, setSelectedChat] = useState<ChatListItem | null>(null);
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [input, setInput] = useState("");
// //   const [selectedImage, setSelectedImage] = useState<File | null>(null);
// //   const [imagePreview, setImagePreview] = useState<string | null>(null);

// //   const chatBoxRef = useRef<HTMLDivElement>(null);
// //   const socketRef = useRef<Socket | null>(null);

// //   useEffect(() => {
// //     const fetchChats = async () => {
// //       try {
// //         const res = await axiosInstance.get("/my-chats", {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         setChatList(res.data.chats || []);
// //       } catch (error) {
// //         console.error("Error fetching chat list:", error);
// //       }
// //     };

// //     if (token) fetchChats();
// //   }, [token]);

// //   useEffect(() => {
// //     const fetchPreviousMessages = async () => {
// //       if (!selectedChat || !token) return;
// //       try {
// //         const res = await axiosInstance.get(`/messages/${selectedChat.appointmentId._id}`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         setMessages(res.data.messages || []);
// //         scrollToBottom();
// //       } catch (err) {
// //         console.error("Failed to fetch messages:", err);
// //       }
// //     };

// //     fetchPreviousMessages();
// //   }, [selectedChat]);

// //   useEffect(() => {
// //     if (!selectedChat || !token || !hasHydrated) return;

// //     const socket = io("http://localhost:5000", {
// //       auth: { token },
// //       withCredentials: true,
// //     });

// //     socketRef.current = socket;

// //     socket.emit("joinRoom", { appointmentId: selectedChat.appointmentId._id });

// //     socket.on("receiveMessage", (message: Message) => {
// //       setMessages((prev) => (prev.find((m) => m._id === message._id) ? prev : [...prev, message]));
// //       scrollToBottom();
// //     });

// //     return () => {
// //       socket.disconnect();
// //       socketRef.current = null;
// //     };
// //   }, [selectedChat, token, hasHydrated]);

// //   const scrollToBottom = () => {
// //     setTimeout(() => {
// //       chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: "smooth" });
// //     }, 100);
// //   };

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
// //     if (!socket || (!input.trim() && !selectedImage) || !selectedChat) return;

// //     const newMessage = {
// //       appointmentId: selectedChat.appointmentId._id,
// //       content: selectedImage ? imagePreview : input,
// //       type: selectedImage ? "image" : "text",
// //       doctorId: selectedChat.doctorId._id,
// //       userId: selectedChat.userId._id,
// //     };

// //     socket.emit("sendMessage", newMessage);
// //     setInput("");
// //     setSelectedImage(null);
// //     setImagePreview(null);
// //   };

// //   const Layout = role === "doctor" ? NavbarAdmin : Navbar;

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
// //       <Layout />
// //       <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-hidden">
// //         {/* Chat List */}
// //         <div className="md:w-1/3 lg:w-1/4 border rounded-xl shadow-sm bg-white overflow-y-auto">
// //           <div className="p-4 font-bold text-xl border-b sticky top-0 bg-white z-10">Chats</div>
// //           {chatList.length === 0 ? (
// //             <div className="p-4 text-gray-500">No chats yet</div>
// //           ) : (
// //             chatList.map((chat) => {
// //               const otherPerson =
// //                 chat.userId._id === currentUserId ? chat.doctorId : chat.userId;

// //               return (
// //                 <motion.div
// //                   key={chat.appointmentId._id}
// //                   onClick={() => setSelectedChat(chat)}
// //                   whileTap={{ scale: 0.97 }}
// //                   className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition duration-200 ${
// //                     selectedChat?.appointmentId._id === chat.appointmentId._id ? "bg-blue-50" : ""
// //                   }`}
// //                 >
// //                   <img
// //                     src={otherPerson.photo}
// //                     alt={otherPerson.name}
// //                     className="w-10 h-10 rounded-full object-cover"
// //                   />
// //                   <div className="flex-1">
// //                     <div className="font-semibold text-gray-800">{otherPerson.name}</div>
// //                     <div className="text-sm text-gray-500 truncate">
// //                       {chat.appointmentId.day || "No messages yet"}
// //                     </div>
// //                   </div>
// //                   <div className="text-xs text-gray-400 whitespace-nowrap">
// //                     {chat.appointmentId.time}
// //                   </div>
// //                 </motion.div>
// //               );
// //             })
// //           )}
// //         </div>


// //         {/* Chat Box */} 
// // <div className="flex-1 h-full border bg-white rounded-xl shadow-md flex flex-col">
// //   {selectedChat ? (
// //     <>
// //       {/* Header */}
// //       <div className="font-semibold text-lg px-4 py-2 border-b bg-white text-gray-700">
// //         Chat with {role === "doctor" ? selectedChat.userId.name : selectedChat.doctorId.name}
// //       </div>

// //       {/* MESSAGES BOX - FIXED HEIGHT SCROLLABLE */}
// //       <div
// //         className="flex-1 custom-scroll overflow-y-auto px-4 py-2 space-y-3 min-h-[400px] max-h-[400px]"
// //         ref={chatBoxRef}
// //       >
// //         {messages.length === 0 ? (
// //           <div className="text-center text-gray-400 pt-10">No messages yet</div>
// //         ) : (
// //           messages.map((msg) => (
// //             <motion.div
// //               key={msg._id}
// //               initial={{ opacity: 0, y: 10 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               className={`flex ${msg.sender === currentUserId ? "justify-end" : "justify-start"}`}
// //             >
// //               <div
// //                 className={`px-4 py-2 rounded-2xl text-sm max-w-xs break-words shadow-sm ${
// //                   msg.sender === currentUserId
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
// //           ))
// //         )}
// //       </div>

// //       {/* INPUT BAR */}
// //       <div className="border-t px-4 py-3 flex items-center gap-2">
// //         <input
// //           type="text"
// //           className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           placeholder="Type a message..."
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           onKeyDown={(e) => e.key === "Enter" && handleSend()}
// //         />
// //         <label className="cursor-pointer">
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
// //           className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
// //         >
// //           <Send size={18} />
// //         </button>
// //       </div>

// //       {/* IMAGE PREVIEW */}
// //       {imagePreview && (
// //         <div className="p-4 flex items-center gap-4">
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
// //             className="text-sm text-red-500 underline"
// //           >
// //             Remove
// //           </button>
// //         </div>
// //       )}
// //     </>
// //   ) : (
// //     <div className="flex-1 flex items-center justify-center text-gray-500">
// //       Select a chat to start messaging
// //     </div>
// //   )}
// // </div>

// //       </main>
// //     </div>
// //   );
// // };

// // export default ChatDashboard;




















// import { useEffect, useState, useRef } from "react";
// import { useAuthStore } from "../../store/authStore";
// import axiosInstance from "../../utils/axios";
// import Navbar from "../../components/Navbar";
// import NavbarAdmin from "../../components/NavbarAdmin";
// import { motion } from "framer-motion";
// import { Send, Paperclip } from "lucide-react";
// import io,{Socket} from "socket.io-client";

// interface Participant {
//   _id: string;
//   name: string;
//   photo: string;
// }

// interface ChatListItem {
//   _id: string;
//   appointmentId: Appointment;
//   doctorId: Participant;
//   userId: Participant;
//   lastMessage?: string;
//   timestamp: string;
// }

// interface Message {
//   _id: string;
//   sender: string;
//   content: string;
//   type: "text" | "image";
//   read: boolean;
//   timestamp: string | number;
// }

// interface Appointment {
//   _id: string;
//   day: string;
//   time: string;
// }

// const ChatDashboard = () => {
//   const token = useAuthStore.getState().accessToken;
//   const { user: currentUser, role, hasHydrated } = useAuthStore();
//   const currentUserId = currentUser?._id;

//   const [chatList, setChatList] = useState<ChatListItem[]>([]);
//   const [selectedChat, setSelectedChat] = useState<ChatListItem | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const chatBoxRef = useRef<HTMLDivElement>(null);
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const res = await axiosInstance.get("/my-chats", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setChatList(res.data.chats || []);
//       } catch (error) {
//         console.error("Error fetching chat list:", error);
//       }
//     };

//     if (token) fetchChats();
//   }, [token]);

//   useEffect(() => {
//     const fetchPreviousMessages = async () => {
//       if (!selectedChat || !token) return;
//       try {
//         const res = await axiosInstance.get(`/messages/${selectedChat.appointmentId._id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setMessages(res.data.messages || []);
//         console.log("message : ",res.data.message );
//         scrollToBottom();
//       } catch (err) {
//         console.error("Failed to fetch messages:", err);
//       }
//     };

//     fetchPreviousMessages();
//   }, [selectedChat]);

//   useEffect(() => {
//     if (!selectedChat || !token || !hasHydrated) return;

//     const socket = io(import.meta.env.VITE_SOCKET_URL, {
//       auth: { token },
//       withCredentials: true,
//     });

//     socketRef.current = socket;

//     socket.emit("joinRoom", { appointmentId: selectedChat.appointmentId._id });

//     socket.on("receiveMessage", (message: Message) => {
//       setMessages((prev) => (prev.find((m) => m._id === message._id) ? prev : [...prev, message]));
//       scrollToBottom();
//       socket.emit("markAsRead",selectedChat._id);

//     });



//     return () => {
//       socket.disconnect();
//       socketRef.current = null;
//     };
//   }, [selectedChat, token, hasHydrated]);

//   const scrollToBottom = () => {
//     setTimeout(() => {
//       chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: "smooth" });
//     }, 100);
//   };

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
//     if (!socket || (!input.trim() && !selectedImage) || !selectedChat) return;

//     const newMessage = {
//       appointmentId: selectedChat.appointmentId._id,
//       content: selectedImage ? imagePreview : input,
//       type: selectedImage ? "image" : "text",
//       doctorId: selectedChat.doctorId._id,
//       userId: selectedChat.userId._id,
//     };

//     socket.emit("sendMessage", newMessage);
//     setInput("");
//     setSelectedImage(null);
//     setImagePreview(null);
//   };

//   const Layout = role === "doctor" ? NavbarAdmin : Navbar;
//   useEffect(()=>{
//     console.log("messages : ",messages);
//   })

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
//       <Layout />
//       <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
//         {/* Chat List */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.3 }}
//           className="md:w-1/3 lg:w-1/4 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
//         >
//           <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-xl sticky top-0 z-10">
//             Conversations
//           </div>
//           <div className="flex-1 overflow-y-auto custom-scroll">
//             {chatList.length === 0 ? (
//               <div className="p-6 text-gray-500 text-center">No conversations yet</div>
//             ) : (
//               chatList.map((chat) => {
//                 const otherPerson =
//                   chat.userId._id === currentUserId ? chat.doctorId : chat.userId;

//                 return (
//                   <motion.div
//                     key={chat.appointmentId._id}
//                     onClick={() => setSelectedChat(chat)}
//                     whileHover={{ backgroundColor: "#f1f5f9" }}
//                     whileTap={{ scale: 0.98 }}
//                     className={`flex items-center gap-4 p-4 cursor-pointer transition-colors duration-200 border-b border-gray-100 ${
//                       selectedChat?.appointmentId._id === chat.appointmentId._id
//                         ? "bg-blue-50"
//                         : ""
//                     }`}
//                   >
//                     <div className="relative">
//                       <img
//                         src={otherPerson.photo}
//                         alt={otherPerson.name}
//                         className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
//                       />
//                       <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <div className="font-semibold text-gray-800 truncate">{otherPerson.name}</div>
//                       <div className="text-sm text-gray-500 truncate">
//                         {chat.lastMessage || chat.appointmentId.day || "No messages yet"}
//                       </div>
//                     </div>
//                     <div className="text-xs text-gray-400 whitespace-nowrap">
//                       {/* {new Date(chat.timestamp).toLocaleTimeString("en-IN", {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                         hour12: true,
//                       })} */}
//                       {chat.appointmentId.day}
//                     </div>
//                   </motion.div>
//                 );
//               })
//             )}
//           </div>
//         </motion.div>

//         {/* Chat Box */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.3 }}
//           className="flex-1 bg-white rounded-2xl shadow-lg flex flex-col"
//         >
//           {selectedChat ? (
//             <>
//               {/* Header */}
//               <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg flex items-center gap-3 rounded-t-2xl">
//                 <img
//                   src={
//                     role === "doctor"
//                       ? selectedChat.userId.photo
//                       : selectedChat.doctorId.photo
//                   }
//                   alt="chat"
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//                 <span>
//                   Chat with{" "}
//                   {role === "doctor" ? selectedChat.userId.name : selectedChat.doctorId.name}
//                 </span>
//               </div>

//               {/* Messages Box */}
//               <div
//                 className="flex-1 overflow-y-auto custom-scroll  p-4 sm:p-6 space-y-4 min-h-[400px] max-h-[60vh] "
//                 ref={chatBoxRef}
//               >
//                 {/* {messages.length === 0 ? (
//                   <div className="flex-1 flex items-center justify-center text-gray-500">
//                     No messages yet
//                   </div>
//                 ) : (
//                   messages.map((msg) => (
//                     <motion.div
//                       key={msg._id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className={`flex ${
//                         msg.sender === currentUserId ? "justify-end" : "justify-start"
//                       }`}
//                     >
//                       <div
//                         className={`max-w-xs sm:max-w-md p-3 rounded-2xl shadow-sm ${
//                           msg.sender === currentUserId
//                             ? "bg-blue-500 text-white rounded-br-none"
//                             : "bg-gray-100 text-gray-800 rounded-bl-none"
//                         }`}
//                       >
//                         {msg.type === "text" ? (
//                           <p className="break-words">{msg.content}</p>
//                         ) : (
//                           <img
//                             src={msg.content}
//                             alt="sent"
//                             className="max-w-[200px] rounded-md object-cover"
//                           />
//                         )}
//                         <div className="text-xs text-gray-400 mt-1 text-right">
//                           {new Date(msg.timestamp).toLocaleTimeString("en-IN", {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                             hour12: true,
//                           })}
                         
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))
//                 )} */}

//                 {messages.length === 0 ? (
//   <div className="flex-1 flex items-center justify-center text-gray-400">
//     No messages yet
//   </div>
// ) : (
//   messages.map((msg) => {
//     const isSender = msg.sender === currentUserId;
//     return (
//       <motion.div
//         key={msg._id}
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.2 }}
//         className={`flex ${isSender ? "justify-end" : "justify-start"}`}
//       >
//         <div
//           className={`relative max-w-xs sm:max-w-md p-3 rounded-2xl shadow-sm ${
//             isSender
//               ? "bg-blue-500 text-white rounded-br-none"
//               : "bg-gray-100 text-gray-800 rounded-bl-none"
//           }`}
//         >
//           {msg.type === "text" ? (
//             <p className="break-words whitespace-pre-line">{msg.content}</p>
//           ) : (
//             <img
//               src={msg.content}
//               alt="sent"
//               className="max-w-[200px] rounded-md object-cover"
//             />
//           )}
//           <div className="flex justify-end items-center mt-1 space-x-1">
//             <span className="text-[10px] text-white/70">
//               {new Date(msg.timestamp).toLocaleTimeString("en-IN", {
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 hour12: true,
//               })}
//             </span>
//             {isSender && (
//               <span className="text-xs">
//                 {msg.read ? "✓✓" : "✓"}
//               </span>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     );
//   })
// )}

//               </div>

//               {/* Input Bar */}
//               <div className="border-t p-4 sm:p-6 flex items-center gap-3 bg-gray-50">
//                 {imagePreview && (
//                   <div className="flex items-center gap-3 mb-3">
//                     <img
//                       src={imagePreview}
//                       alt="preview"
//                       className="w-16 h-16 object-cover rounded-md border"
//                     />
//                     <button
//                       onClick={() => {
//                         setSelectedImage(null);
//                         setImagePreview(null);
//                       }}
//                       className="text-sm text-red-500 hover:text-red-600 underline"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 )}
//                 <div className="flex-1 flex items-center gap-3 bg-white rounded-full border border-gray-200 shadow-sm p-2">
//                   <input
//                     type="text"
//                     className="flex-1 bg-transparent text-sm focus:outline-none"
//                     placeholder="Type a message..."
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                   />
//                   <label className="cursor-pointer text-gray-500 hover:text-gray-700">
//                     <Paperclip size={20} />
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="hidden"
//                     />
//                   </label>
//                   <button
//                     onClick={handleSend}
//                     className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200"
//                   >
//                     <Send size={18} />
//                   </button>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="flex-1 flex items-center justify-center text-gray-500">
//               Select a chat to start messaging
//             </div>
//           )}
//         </motion.div>
//       </main>

//       {/* Custom Scrollbar CSS */}
//       <style >{`
//         .custom-scroll::-webkit-scrollbar {
//           width: 8px;
//         }
//         .custom-scroll::-webkit-scrollbar-track {
//           background: #f1f5f9;
//           border-radius: 4px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb {
//           background: #cbd5e1;
//           border-radius: 4px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb:hover {
//           background: #94a3b8;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ChatDashboard;
























import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "../../store/authStore";
import axiosInstance from "../../utils/axios";
import Navbar from "../../components/Navbar";
import NavbarAdmin from "../../components/NavbarAdmin";
import { motion } from "framer-motion";
import { Send, Paperclip } from "lucide-react";
import io, { Socket } from "socket.io-client";

interface Participant {
  _id: string;
  name: string;
  photo: string;
}

interface ChatListItem {
  _id: string;
  appointmentId: Appointment;
  doctorId: Participant;
  userId: Participant;
  lastMessage?: string;
  timestamp: string;
}

interface Message {
  _id: string;
  sender: string;
  content: string;
  type: "text" | "image";
  read: boolean;
  timestamp: string | number;
}

interface Appointment {
  _id: string;
  day: string;
  time: string;
}

const ChatDashboard = () => {
  const token = useAuthStore.getState().accessToken;
  const { user: currentUser, role, hasHydrated } = useAuthStore();
  const currentUserId = currentUser?._id;

  const [chatList, setChatList] = useState<ChatListItem[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatListItem | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const chatBoxRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axiosInstance.get("/my-chats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChatList(res.data.chats || []);
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    };

    if (token) fetchChats();
  }, [token]);

  useEffect(() => {
    const fetchPreviousMessages = async () => {
      if (!selectedChat || !token) return;
      try {
        const res = await axiosInstance.get(`/messages/${selectedChat.appointmentId._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(res.data.messages || []);
        console.log("messages: ", res.data.messages);
        scrollToBottom();
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchPreviousMessages();
  }, [selectedChat]);

  useEffect(() => {
    if (!selectedChat || !token || !hasHydrated) return;

    const socket = io(`${import.meta.env.VITE_SOCKET_URL}/chat`, {
      auth: { token },
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.emit("joinRoom", { appointmentId: selectedChat.appointmentId._id });

    socket.on("receiveMessage", (message: Message) => {
      setMessages((prev) => (prev.find((m) => m._id === message._id) ? prev : [...prev, message]));
      scrollToBottom();
      socket.emit("markAsRead", { chatId: selectedChat._id });
    });

    socket.on("messagesRead", ({ chatId, messageIds }) => {
      if (chatId === selectedChat._id) {
        setMessages((prev) =>
          prev.map((msg) =>
            messageIds.includes(msg._id) ? { ...msg, read: true } : msg
          )
        );
      }
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [selectedChat, token, hasHydrated]);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: "smooth" });
    }, 100);
  };

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
    if (!socket || (!input.trim() && !selectedImage) || !selectedChat) return;

    const newMessage = {
      appointmentId: selectedChat.appointmentId._id,
      content: selectedImage ? imagePreview : input,
      type: selectedImage ? "image" : "text",
      doctorId: selectedChat.doctorId._id,
      userId: selectedChat.userId._id,
    };

    socket.emit("sendMessage", newMessage);
    setInput("");
    setSelectedImage(null);
    setImagePreview(null);
  };

  const Layout = role === "doctor" ? NavbarAdmin : Navbar;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <Layout />
      <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* Chat List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="md:w-1/3 lg:w-1/4 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
        >
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-xl sticky top-0 z-10">
            Conversations
          </div>
          <div className="flex-1 overflow-y-auto custom-scroll">
            {chatList.length === 0 ? (
              <div className="p-6 text-gray-500 text-center">No conversations yet</div>
            ) : (
              chatList.map((chat) => {
                const otherPerson =
                  chat.userId._id === currentUserId ? chat.doctorId : chat.userId;

                return (
                  <motion.div
                    key={chat.appointmentId._id}
                    onClick={() => setSelectedChat(chat)}
                    whileHover={{ backgroundColor: "#f1f5f9" }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-4 p-4 cursor-pointer transition-colors duration-200 border-b border-gray-100 ${
                      selectedChat?.appointmentId._id === chat.appointmentId._id
                        ? "bg-blue-50"
                        : ""
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={otherPerson.photo}
                        alt={otherPerson.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 truncate">{otherPerson.name}</div>
                      <div className="text-sm text-gray-500 truncate">
                        {chat.lastMessage || chat.appointmentId.day || "No messages yet"}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 whitespace-nowrap">
                      {chat.appointmentId.day}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>

        {/* Chat Box */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 bg-white rounded-2xl shadow-lg flex flex-col"
        >
          {selectedChat ? (
            <>
              <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg flex items-center gap-3 rounded-t-2xl">
                <img
                  src={
                    role === "doctor"
                      ? selectedChat.userId.photo
                      : selectedChat.doctorId.photo
                  }
                  alt="chat"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span>
                  Chat with{" "}
                  {role === "doctor" ? selectedChat.userId.name : selectedChat.doctorId.name}
                </span>
              </div>

              <div
                className="flex-1 overflow-y-auto custom-scroll p-4 sm:p-6 space-y-4 min-h-[400px] max-h-[60vh]"
                ref={chatBoxRef}
              >
                {messages.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-gray-400">
                    No messages yet
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isSender = msg.sender === currentUserId;
                    return (
                      <motion.div
                        key={msg._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`relative max-w-xs sm:max-w-md p-3 rounded-2xl shadow-sm ${
                            isSender
                              ? "bg-blue-500 text-white rounded-br-none"
                              : "bg-gray-100 text-gray-800 rounded-bl-none"
                          }`}
                        >
                          {msg.type === "text" ? (
                            <p className="break-words whitespace-pre-line">{msg.content}</p>
                          ) : (
                            <img
                              src={msg.content}
                              alt="sent"
                              className="max-w-[200px] rounded-md object-cover"
                            />
                          )}
                          <div className="flex justify-end items-center mt-1 space-x-1">
                            <span className="text-[10px] text-gray-400">
                              {new Date(msg.timestamp).toLocaleTimeString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })}
                            </span>
                            {isSender && (
                              <span className="text-xs text-blue-200">
                                {msg.read ? "✓✓" : "✓"}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              <div className="border-t p-4 sm:p-6 flex items-center gap-3 bg-gray-50">
                {imagePreview && (
                  <div className="flex items-center gap-3 mb-3">
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
                <div className="flex-1 flex items-center gap-3 bg-white rounded-full border border-gray-200 shadow-sm p-2">
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
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={handleSend}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </motion.div>
      </main>

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
    </div>
  );
};

export default ChatDashboard;