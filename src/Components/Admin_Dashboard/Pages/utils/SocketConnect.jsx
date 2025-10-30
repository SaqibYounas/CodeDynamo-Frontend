// Layout.jsx ya App.jsx
import { useEffect } from 'react';
import socket from '../../socket/socket';

export default function Layout({ children }) {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();

      socket.on('connect', () => {
        console.log('✅ Connected:', socket.id);
      });

      // Backend will emit this after auth
      socket.on('admin_id', ({ adminId }) => {
        console.log('Received admin ID:', adminId);
        localStorage.setItem('adminId', adminId);

        // Optional: auto remove after 6 hrs
        setTimeout(
          () => {
            localStorage.removeItem('adminId');
          },
          6 * 60 * 60 * 1000
        );
      });
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return children;
}
