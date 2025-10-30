import React, { useEffect, useState, useRef } from 'react';
import { useNotifications } from '../context/context';
import { getMessagesAll } from './Services/getMessage';
import socket from '../socket/socket';
import { formatDate } from './utils/formatDate';
import { ChatSkeleton, SidebarSkeleton } from '../skeletons/Message';
export default function AdminChat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [userProfile, setUserProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();
  const bottomRef = useRef();

  // Send message from admin to selected user
  const handleSend = () => {
    if (!messageInput.trim() || !selectedUser) return;

    const msgObj = {
      text: messageInput,
      sentAt: new Date(),
      sender: localStorage.getItem('adminId'),
      receiver: selectedUser._id,
      role: 'admin',
    };

    socket.emit('admin_message', msgObj);

    // Add message locally
    setSelectedUser((prev) => ({
      ...prev,
      messages: [...(prev.messages || []), msgObj],
    }));

    setMessageInput('');
  };

  useEffect(() => {
    const handleNewMessage = (message) => {
      console.log('📩 New message received:', message);
      setMessage(message);
    };

    socket.on('new_user_messages', handleNewMessage);

    return () => {
      socket.off('new_user_messages', handleNewMessage); // ✅ Clean-up
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedUser]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
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

      console.log('Fetched profiles:', data);

      // 🟡 Check for 'cached' or 'message' keys
      const messages = data.cached || data.message;
      if (Array.isArray(messages)) {
        setUserProfile(messages);
      } else {
        setUserProfile([]);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setUserProfile([]); // fallback on error
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    userProfiles();
  }, []);
  return (
    <div className="flex h-screen bg-gray-100 md:pl-80 lg:pl-60">
      {/* Sidebar */}
      {loading ? (
        <SidebarSkeleton />
      ) : (
        <div className="h-full w-1/3 overflow-y-auto border-r bg-white shadow-sm">
          <div className="flex items-center justify-between border-b bg-gradient-to-r from-blue-700 to-purple-600 p-4 text-white">
            <h2 className="text-xl font-bold">👤 My Admin</h2>
            <span className="text-sm">Admin 🟢</span>
          </div>

          {/* User List */}
          {userProfile.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`cursor-pointer border-b p-4 transition hover:bg-gray-50 ${
                selectedUser?._id === user._id ? 'bg-blue-100' : ''
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
        <div className="flex w-full flex-col overflow-y-auto p-4">
          <div className="flex items-center justify-between border-b bg-white p-4 shadow">
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
                    className={`my-2 max-w-md rounded-xl p-3 shadow ${
                      msg.role === 'admin'
                        ? 'mr-auto bg-green-100 text-left'
                        : 'ml-auto bg-white'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div className="mt-1 flex justify-end text-xs text-gray-400 italic">
                      <span>{formatDate(msg.sentAt)}</span>

                      {msg.role === 'admin' && (
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
              <div className="flex items-center gap-2 border-t bg-white p-4">
                <input
                  className="flex-1 rounded-full border px-4 py-2"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                />
                <button
                  onClick={handleSend}
                  className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center text-xl text-gray-400">
          👈 Select a user to start chatting
        </div>
      )}
    </div>
  );
}
