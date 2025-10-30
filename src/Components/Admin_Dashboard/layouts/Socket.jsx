import { useEffect } from 'react';
import socket from '../socket/socket';

export default function Layout({ children }) {
  useEffect(() => {
    const adminId = localStorage.getItem('adminId');

    if (!socket.connected) {
      socket.connect();

      socket.on('connect', () => {
        console.log('✅ Connected:', socket.id);

        // Agar adminId localStorage mein hai to reconnect event emit karo
        if (adminId) {
          socket.emit('reconnect-admin', { adminId });
        }
      });
      socket.on('get-id', () => {
        adminId;
      });

      socket.on('admin_id', ({ adminId }) => {
        console.log('Received admin ID:', adminId);
        localStorage.setItem('adminId', adminId);

        // 6 ghante baad remove
        setTimeout(
          () => {
            localStorage.removeItem('adminId');
          },
          6 * 60 * 60 * 1000
        );
      });

      socket.on('admin_reconnected', ({ success }) => {
        if (success) {
          console.log('♻️ Admin successfully reconnected.');
        }
      });
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return children;
}
