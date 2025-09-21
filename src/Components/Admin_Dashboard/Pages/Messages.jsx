import React, { useEffect, useState, useRef } from "react";
import { useNotifications } from "../context/context";
import { getMessagesAll } from "./Services/getMessage";
import socket from "../socket/socket";
import { formatDate } from "./utils/formatDate";
import { ChatSkeleton,SidebarSkeleton } from "../skeletons/Message";
export default function AdminChat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [userProfile, setUserProfile] = useState([]);
  const [loading,setLoading]=useState(true);
  const [message, setMessage] = useState();
  const bottomRef = useRef();

  // Send message from admin to selected user
  const handleSend = () => {
    if (!messageInput.trim() || !selectedUser) return;

    const msgObj = {
      text: messageInput,
      sentAt: new Date(),
      sender: localStorage.getItem("adminId"),
      receiver: selectedUser._id,
      role: "admin",
    };

    socket.emit("admin_message", msgObj);

    // Add message locally
    setSelectedUser((prev) => ({
      ...prev,
      messages: [...(prev.messages || []), msgObj],
    }));

    setMessageInput("");
  };
  
  useEffect(() => {
    const handleNewMessage = (message) => {
      console.log("📩 New message received:", message);
      setMessage(message);
    };

    socket.on("new_user_messages", handleNewMessage);

    return () => {
      socket.off("new_user_messages", handleNewMessage); // ✅ Clean-up
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedUser]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]); // 👈 also scroll on new message

  // Load all users and their messages
  useEffect(() => {
    userProfiles();
  }, []);

  // When a new message arrives (from user to admin)
  useEffect(() => {
    if (!message || !selectedUser) return;

    if (
      message.sender === selectedUser._id ||
      message.receiver === selectedUser._id
    ) {
      setSelectedUser((prev) => {
        const alreadyExists = prev.messages?.some(
          (msg) => msg.messageID === message.messageID
        );
        if (alreadyExists) return prev;

        return {
          ...prev,
          messages: [...(prev.messages || []), message],
        };
      });
    }
  }, [message]);

  async function userProfiles() {
    try {
      const data = await getMessagesAll();

      console.log("Fetched profiles:", data);

      // 🟡 Check for 'cached' or 'message' keys
      const messages = data.cached || data.message;
      if (Array.isArray(messages)) {
        setUserProfile(messages);
      } else {
        setUserProfile([]); 
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUserProfile([]); // fallback on error
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    userProfiles();
  }, []);
  return (
  <div className="lg:pl-60 md:pl-80 flex h-screen bg-gray-100">
    {/* Sidebar */}
    {loading ? (
      <SidebarSkeleton />
    ) : (
      <div className="w-1/3 h-full bg-white border-r shadow-sm overflow-y-auto">
        <div className="p-4 border-b bg-gradient-to-r from-blue-700 to-purple-600 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">👤 My Admin</h2>
          <span className="text-sm">Admin 🟢</span>
        </div>

        {/* User List */}
        {userProfile.map((user) => (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`p-4 cursor-pointer border-b hover:bg-gray-50 transition ${
              selectedUser?._id === user._id ? "bg-blue-100" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-800">{user.user?.name}</h3>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Chat Area */}
    {selectedUser ? (
      <div className="flex flex-col w-full p-4 overflow-y-auto">
        <div className="p-4 border-b bg-white shadow flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            💬 Chat with {selectedUser.user?.name}
          </h3>
        </div>

        {loading ? (
          <ChatSkeleton />
        ) : (
          <>
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-4">
              {selectedUser.messages?.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl shadow max-w-md my-2 ${
                    msg.role === "admin"
                      ? "bg-green-100 mr-auto text-left"
                      : "bg-white ml-auto"
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className="flex justify-end text-xs text-gray-400 italic mt-1">
                    <span>{formatDate(msg.sentAt)}</span>

                    {msg.role === "admin" && (
                      <span className="ml-2">
                        {msg.read ? (
                          <span className="text-blue-500">✔✔</span>
                        ) : (
                          <span className="text-gray-400">✔</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Box */}
            <div className="p-4 border-t bg-white flex gap-2 items-center">
              <input
                className="flex-1 border px-4 py-2 rounded-full"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
              />
              <button
                onClick={handleSend}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    ) : (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-xl">
        👈 Select a user to start chatting
      </div>
    )}
  </div>
);
}