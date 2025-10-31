import { io } from "socket.io-client";

let socket;

if (import.meta.env.VITE_URL) {
  const baseUrl = import.meta.env.VITE_URL;
  const port = import.meta.env.VITE_PORT;
  const url = port ? `${baseUrl}:${port}` : baseUrl;

  socket = io(url);
} else {
  console.log("Backend not deployed yet, Socket.IO disabled");
}

export default socket;
