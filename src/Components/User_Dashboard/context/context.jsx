import React, { createContext, useContext, useState } from 'react';
import { url } from '../Pages/Services/Port';
import { Inovice } from '../../../../../User_Backend/Server/models/invoice';
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [newCount, setNewCount] = useState(0);
  const [latestNotifications, latesSetNotifications] = useState([]);
  const [services, setServices] = useState([]);
  const [message, setUserMessages] = useState([]);
  const [newInvoice, setnewInvoice] = useState([]);
  const [newInvoiceCount, setNewInvoiceCount] = useState(0);
  const getUserServicesStatus = async () => {
    try {
      const response = await fetch(`${url}/user/services/user`, {
        credentials: 'include',
      });

      const data = await response.json();

      setServices(data.services);
    } catch (err) {
      console.error('❌ Fetch failed:', err);
      setServices('Server Error! Try Again');
    }
  };
  const fetchNotifications = async (page) => {
    try {
      const res = await fetch(
        `${url}/user/notifications?page=${page}&limit=10`,
        {
          credentials: 'include',
        }
      );

      const data = await res.json();

      if (res.ok && data.notifications) {
        setNotifications(data.notifications);
        const unread = data.notifications.filter((n) => !n.read).length;
        setNewCount(unread);
        return data.totalPages; // 👈 Now you have total pages
      }
    } catch (err) {
      console.error('❌ Failed to fetch notifications', err);
    }
  };

  const markAllRead = async (page) => {
    try {
      const res = await fetch(
        `${url}/user/notifications/mark-read?page=${page}&limit=10`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.ok) {
        // ✅ Frontend state update
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        setNewCount(0);
      }
    } catch (err) {
      console.error('❌ Failed to mark all read', err);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        newCount,
        fetchNotifications,
        markAllRead,
        latestNotifications,
        getUserServicesStatus,
        services,
        latesSetNotifications,
        setNewCount,
        message,
        setUserMessages,
        setnewInvoice,
        Inovice,
        newInvoiceCount,
        setNewInvoiceCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
