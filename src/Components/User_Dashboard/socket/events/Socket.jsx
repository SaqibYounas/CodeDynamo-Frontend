import { useEffect } from 'react';
import socket from '../socket';
import { useNotifications } from '../../context/context';

export default function Layout({ children }) {
  const {
    latesSetNotifications,
    setNewCount,
    setUserMessages,
    setnewInvoice,
    newInvoiceCout,
    setNewInvoiceCount,
  } = useNotifications();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log('userId:', userId);
    socket.connect();
    socket.on('connect', () => {
      console.log('✅ User connected:', socket.id);
      if (userId) {
        socket.emit('reconnect-user', { userId });
      }
    });

    // ✅ Notification Listeners
    const startSocketEvents = () => {
      const handleNotification = ({ notification }) => {
        console.log('📥 New Notification:', notification);
        latesSetNotifications((prev) => [notification, ...prev]);
        setNewCount((prev) => prev + 1);
      };

      socket.on('admin-message', (message) => {
        setUserMessages(message);
      });
      socket.on('notification', ({ data }) =>
        handleNotification({ notification: data })
      );
      socket.on('new_notification_online', handleNotification);
      socket.on('new_notification_offline', handleNotification);
      socket.on('new invoice', (invoice) => {
        setnewInvoice(invoice);
        setNewInvoiceCount((prev) => prev + 1);
        console.log('📥 new Invoice Event Clicked');
      });

      socket.on('disconnect', () => {
        console.warn('❌ Socket disconnected');
      });
    };

    // ✅ Start Events
    startSocketEvents();

    socket.on('userId', ({ userId }) => {
      console.log('Received user ID:', userId);
      localStorage.setItem('userId', userId);

      // Remove after 6 hours
      setTimeout(
        () => {
          localStorage.removeItem('userId');
        },
        6 * 60 * 60 * 1000
      );
    });

    socket.on('reconnect-user', ({ success }) => {
      if (success) {
        console.log('♻️ User successfully reconnected.');
      }
    });

    return () => {
      socket.disconnect();
      socket.off(); // ✅ Clean up all listeners
    };
  }, [latesSetNotifications, setNewCount]);

  return children;
}
