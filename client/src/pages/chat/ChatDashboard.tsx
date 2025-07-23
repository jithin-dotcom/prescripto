

// import { useEffect, useState, useRef } from "react";
// import { useAuthStore } from "../../store/authStore";
// import axiosInstance from "../../utils/axios";
// import Navbar from "../../components/Navbar";
// import NavbarAdmin from "../../components/NavbarAdmin";
// import { motion } from "framer-motion";
// import { Send, Paperclip } from "lucide-react";
// import io, { Socket } from "socket.io-client";
// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";

// dayjs.extend(customParseFormat);

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
//   status?:string;
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



//    const [isTyping, setIsTyping] = useState(false);
//   const [someoneTyping, setSomeoneTyping] = useState(false);
//   const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);




//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const res = await axiosInstance.get("/my-chats");
//         const chats: ChatListItem[] = res.data.chats || [];
//         console.log("chats:", chats);

//         const getDateTime = (appointment: Appointment): dayjs.Dayjs => {
//           return dayjs(`${appointment.day} ${appointment.time}`, "DD/MM/YYYY h:mm A");
//         };

//         const validChats = chats.filter(chat => {
//           const appointment = chat.appointmentId as Appointment;

//           const appointmentDateTime = dayjs(`${appointment.day} ${appointment.time}`, "DD/MM/YYYY hh:mm A");
//           const isConfirmed = appointment.status === "confirmed";
//           const isInFuture = appointmentDateTime.isAfter(dayjs());
//           return isConfirmed && isInFuture;
//         });


//       let filteredChats: ChatListItem[] = [];
//       if (role === "doctor") {
//         const latestByUser: Record<string, ChatListItem> = {};

//         validChats.forEach(chat => {
//           const userId = chat.userId._id;
//           const existing = latestByUser[userId];

//           if (
//             !existing ||
//             getDateTime(chat.appointmentId).isAfter(getDateTime(existing.appointmentId))
//           ) {
//             latestByUser[userId] = chat;
//           }
//         });

//         filteredChats = Object.values(latestByUser);
//       } else if (role === "user") {
//         const latestByDoctor: Record<string, ChatListItem> = {};

//         validChats.forEach(chat => {
//           const doctorId = chat.doctorId._id;
//           const existing = latestByDoctor[doctorId];

//           if (
//             !existing ||
//             getDateTime(chat.appointmentId).isAfter(getDateTime(existing.appointmentId))
//           ) {
//             latestByDoctor[doctorId] = chat;
//           }
//         });

//         filteredChats = Object.values(latestByDoctor);
//       }

//       setChatList(filteredChats);
//     } catch (error) {
//       console.error("Error fetching chat list:", error);
//     }
//    };

//    if (token) fetchChats();
//   },[token, role]);


//   useEffect(() => {
//     const fetchPreviousMessages = async () => {
//       if (!selectedChat || !token) return;
//       try {
//         const res = await axiosInstance.get(`/messages/${selectedChat.appointmentId._id}`);
       
//         setMessages(res.data.messages || []);
//         console.log("messages: ", res.data.messages);
//         scrollToBottom();
//       } catch (err) {
//         console.error("Failed to fetch messages:", err);
//       }
//     };

//     fetchPreviousMessages();
//   }, [selectedChat]);

//   useEffect(() => {
//     if (!selectedChat || !token || !hasHydrated) return;

//     const socket = io(`${import.meta.env.VITE_SOCKET_URL}/chat`, {
//       auth: { token },
//       withCredentials: true,
//     });

//     socketRef.current = socket;

//     socket.emit("joinRoom", { appointmentId: selectedChat.appointmentId._id });

//     socket.on("receiveMessage", (message: Message) => {
//       setMessages((prev) => (prev.find((m) => m._id === message._id) ? prev : [...prev, message]));
//       scrollToBottom();
//       socket.emit("markAsRead", { chatId: selectedChat._id });
//     });

//     socket.on("messagesRead", ({ chatId, messageIds }) => {
//       if (chatId === selectedChat._id) {
//         setMessages((prev) =>
//           prev.map((msg) =>
//             messageIds.includes(msg._id) ? { ...msg, read: true } : msg
//           )
//         );
//       }
//     });


//     // Typing indicators
//     socket.on("typing", ({ senderId }) => {
//       if (senderId !== currentUserId) {
//         setSomeoneTyping(true);
//       }
//     });

//     socket.on("stopTyping", ({ senderId }) => {
//       if (senderId !== currentUserId) {
//         setSomeoneTyping(false);
//       }
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

  
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value);

//     const socket = socketRef.current;
//     if (!socket || !selectedChat) return;

//     if (!isTyping) {
//       setIsTyping(true);
//       socket.emit("typing", {
//         appointmentId: selectedChat.appointmentId._id,
//         senderId: currentUserId,
//       });
//     }

//     if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

//     typingTimeoutRef.current = setTimeout(() => {
//       setIsTyping(false);
//       socket.emit("stopTyping", {
//         appointmentId: selectedChat.appointmentId._id,
//         senderId: currentUserId,
//       });
//     }, 1500); // 2 seconds of inactivity
//   };

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
//               {/* <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg flex items-center gap-3 rounded-t-2xl">
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
//                  */}




//                  <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 rounded-t-2xl">
//   <div className="flex items-center gap-3">
//     <img
//       src={
//         role === "doctor"
//           ? selectedChat.userId.photo
//           : selectedChat.doctorId.photo
//       }
//       alt="chat"
//       className="w-10 h-10 rounded-full object-cover"
//     />
//     <span>
//       Chat with{" "}
//       {role === "doctor"
//         ? selectedChat.userId.name
//         : selectedChat.doctorId.name}
//     </span>
//   </div>
  
//   {/* Typing indicator below user name */}
//   {someoneTyping && (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3 }}
//       className="text-sm italic text-blue-100 sm:ml-2 sm:mt-0 mt-1"
//     >
//       {role === "doctor"
//         ? `${selectedChat?.userId.name} is typing...`
//         : `${selectedChat?.doctorId.name} is typing...`}
//     </motion.div>
//   )}
// </div>
             

//               <div
//                 className="flex-1 overflow-y-auto custom-scroll p-4 sm:p-6 space-y-4 min-h-[400px] max-h-[60vh]"
//                 ref={chatBoxRef}
//               >
//                 {messages.length === 0 ? (
//                   <div className="flex-1 flex items-center justify-center text-gray-400">
//                     No messages yet
//                   </div>
//                 ) : (
//                   messages.map((msg) => {
//                     const isSender = msg.sender === currentUserId;
//                     return (
//                       <motion.div
//                         key={msg._id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className={`flex ${isSender ? "justify-end" : "justify-start"}`}
//                       >
//                         <div
//                           className={`relative max-w-xs sm:max-w-md p-3 rounded-2xl shadow-sm ${
//                             isSender
//                               ? "bg-blue-500 text-white rounded-br-none"
//                               : "bg-gray-100 text-gray-800 rounded-bl-none"
//                           }`}
//                         >
//                           {msg.type === "text" ? (
//                             <p className="break-words whitespace-pre-line">{msg.content}</p>
//                           ) : (
//                             <img
//                               src={msg.content}
//                               alt="sent"
//                               className="max-w-[200px] rounded-md object-cover"
//                             />
//                           )}

             
//                           <div className="flex justify-end items-center mt-1 space-x-1">
//                             <span className="text-[10px] text-gray-400">
//                               {new Date(msg.timestamp).toLocaleTimeString("en-IN", {
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                                 hour12: true,
//                               })}
//                             </span>
//                             {isSender && (
//                               <span className="text-xs text-blue-200">
//                                 {msg.read ? "✓✓" : "✓"}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </motion.div>
//                     );
//                   })
//                 )}
//               </div>

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
//                     // onChange={(e) => setInput(e.target.value)}
//                      onChange={handleInputChange}
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
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

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
  status?:string;
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



   const [isTyping, setIsTyping] = useState(false);
  const [someoneTyping, setSomeoneTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);




  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axiosInstance.get("/my-chats");
        const chats: ChatListItem[] = res.data.chats || [];
        console.log("chats:", chats);

        const getDateTime = (appointment: Appointment): dayjs.Dayjs => {
          return dayjs(`${appointment.day} ${appointment.time}`, "DD/MM/YYYY h:mm A");
        };

        const validChats = chats.filter(chat => {
          const appointment = chat.appointmentId as Appointment;

          const appointmentDateTime = dayjs(`${appointment.day} ${appointment.time}`, "DD/MM/YYYY hh:mm A");
          const isConfirmed = appointment.status === "confirmed";
          const isInFuture = appointmentDateTime.isAfter(dayjs());
          return isConfirmed && isInFuture;
        });


      let filteredChats: ChatListItem[] = [];
      if (role === "doctor") {
        const latestByUser: Record<string, ChatListItem> = {};

        validChats.forEach(chat => {
          const userId = chat.userId._id;
          const existing = latestByUser[userId];

          if (
            !existing ||
            getDateTime(chat.appointmentId).isAfter(getDateTime(existing.appointmentId))
          ) {
            latestByUser[userId] = chat;
          }
        });

        filteredChats = Object.values(latestByUser);
      } else if (role === "user") {
        const latestByDoctor: Record<string, ChatListItem> = {};

        validChats.forEach(chat => {
          const doctorId = chat.doctorId._id;
          const existing = latestByDoctor[doctorId];

          if (
            !existing ||
            getDateTime(chat.appointmentId).isAfter(getDateTime(existing.appointmentId))
          ) {
            latestByDoctor[doctorId] = chat;
          }
        });

        filteredChats = Object.values(latestByDoctor);
      }

      setChatList(filteredChats);
    } catch (error) {
      console.error("Error fetching chat list:", error);
    }
   };

   if (token) fetchChats();
  },[token, role]);


  useEffect(() => {
    const fetchPreviousMessages = async () => {
      if (!selectedChat || !token) return;
      try {
        const res = await axiosInstance.get(`/messages/${selectedChat.appointmentId._id}`);
       
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

    socket.emit("get-online-users");

    socket.on("online-users",(users:string[]) => {
       setOnlineUsers(users);
    })

    socket.on("user-online", (userId: string) => {
       setOnlineUsers((prev) => 
         prev.includes(userId) ? prev : [...prev, userId]
       )
    })

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


    // Typing indicators
    socket.on("typing", ({ senderId }) => {
      if (senderId !== currentUserId) {
        setSomeoneTyping(true);
      }
    });

    socket.on("stopTyping", ({ senderId }) => {
      if (senderId !== currentUserId) {
        setSomeoneTyping(false);
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

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    const socket = socketRef.current;
    if (!socket || !selectedChat) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", {
        appointmentId: selectedChat.appointmentId._id,
        senderId: currentUserId,
      });
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit("stopTyping", {
        appointmentId: selectedChat.appointmentId._id,
        senderId: currentUserId,
      });
    }, 1500); // 2 seconds of inactivity
  };

  console.log("online users : ", onlineUsers);
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
                      {onlineUsers.includes(otherPerson._id) && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
                      )}
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
              {/* <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg flex items-center gap-3 rounded-t-2xl">
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
                 */}




                 <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 rounded-t-2xl">
  <div className="flex items-center gap-3">
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
      {role === "doctor"
        ? selectedChat.userId.name
        : selectedChat.doctorId.name}
    </span>
  </div>
  
  {/* Typing indicator below user name */}
  {someoneTyping && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="text-sm italic text-blue-100 sm:ml-2 sm:mt-0 mt-1"
    >
      {role === "doctor"
        ? `${selectedChat?.userId.name} is typing...`
        : `${selectedChat?.doctorId.name} is typing...`}
    </motion.div>
  )}
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
                    // onChange={(e) => setInput(e.target.value)}
                     onChange={handleInputChange}
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

































