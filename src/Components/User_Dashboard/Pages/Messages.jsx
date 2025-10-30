import React, { useEffect, useState, useRef } from 'react';
import socket from '../socket/socket';
import { getMessage } from './Services/getMessage';
import { useNotifications } from '../context/context';
import { formatDate } from '../utils/formatDate';
import { ChatSkeleton } from '../skeletons/Message';
export default function Message() {
  const [messageInput, setMessageInput] = useState('');
  const [userMessages, setUserMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { message } = useNotifications();
  const bottomRef = useRef();

  const userId = localStorage.getItem('userId');

  const handleSend = () => {
    if (!messageInput.trim()) return;

    const msgObj = {
      sender: userId,
      text: messageInput,
      sentAt: new Date().toISOString(),
      role: 'user',
    };

    socket.emit('user_message', msgObj);
    setUserMessages((prev) => [...prev, msgObj]);
    setMessageInput('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [userMessages]);

  useEffect(() => {
    callapi();
  }, []);

  async function callapi() {
    let data = await getMessage();
    setUserMessages(data || []);
    setLoading(false);
  }

  useEffect(() => {
    if (message) {
      setUserMessages((prev) => [...prev, message]);
    }
  }, [message]);
  return (
    <div className="flex h-screen bg-gray-100 pt-10 md:pl-80 lg:pl-60">
      {/* Sidebar */}
      <div className="h-full w-1/3 overflow-y-auto border-r bg-white shadow-sm">
        <div className="border-b bg-gradient-to-r from-blue-700 to-purple-600 p-4 text-white">
          <h2 className="text-xl font-bold">👤 My User</h2>
        </div>

        <div className="border-b p-4 hover:bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-sm">🟢</span>
            <h3 className="font-medium text-gray-800">Admin</h3>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      {loading ? (
        <ChatSkeleton /> // Sirf skeleton jab data load ho raha ho
      ) : (
        <div className="flex h-full w-2/3 flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-white p-4 shadow">
            <h3 className="text-xl font-semibold">💬 Chat with Admin</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-2 overflow-y-auto bg-gray-50 p-4">
            {userMessages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 max-w-md rounded-xl p-3 shadow ${
                  msg.sender === userId
                    ? 'ml-auto bg-green-100'
                    : 'mr-auto bg-white'
                }`}
              >
                <div>{msg.text}</div>
                <div className="text-end text-xs text-gray-500">
                  <i>{formatDate(msg.sentAt)}</i>
                  {msg.role === 'user' && (
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

          {/* Input */}
          <div className="flex gap-2 border-t bg-white p-4">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 rounded border border-gray-300 px-4 py-2 focus:ring-blue-200 focus:outline-none"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
