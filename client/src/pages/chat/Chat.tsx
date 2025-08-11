

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