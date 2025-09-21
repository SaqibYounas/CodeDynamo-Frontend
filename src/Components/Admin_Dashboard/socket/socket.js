// socket.js
import { io } from "socket.io-client";
import { url } from "../Pages/Services/Port";
const socket = io(url, {
  withCredentials: true,
  autoConnect: true, // manually connect
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 3000,
});

export default socket;
