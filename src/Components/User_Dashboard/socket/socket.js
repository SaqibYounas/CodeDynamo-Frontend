import { io } from 'socket.io-client';
import { url } from '../Pages/Services/Port';

let socket = null;

if (url) {
  socket = io(url, {
    withCredentials: true,
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 3000,
  });

  console.log(`Socket.IO ready at ${url}`);
} else {
  console.log('Backend not deployed yet, Socket.IO disabled');
}

export default socket;
