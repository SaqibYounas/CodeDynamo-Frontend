import React, { createContext, useContext, useEffect, useState } from "react";
import socket from "../socket/socket";

// Context Create
const NotificationContexts = createContext();

export const NotificationProviders = ({ children }) => {
  const [services, setServices] = useState([]);
  const [newCount, setNewCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [usersData, setUserData] = useState([]);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [highlightedIds, setHighlightedIds] = useState([]);
  const [message, setMessage] = useState();
  const port = 8005;
  const baseUrl = import.meta.env.VITE_URL;
  const url = `${baseUrl}:${port}`;

  const startSocketEvents = () => {
    const sessionID = localStorage.getItem("sessionID");
    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    }

    socket.on("session", ({ sessionID, userID }) => {
      localStorage.setItem("sessionID", sessionID);
      setSession({ sessionID, userID });
    });

    socket.on("admin-notification", (request) => {
      console.log("📨 Event aya:", request);
      setNotifications((prev) => [request.message, ...prev]);
      setNewCount((prev) => prev + 1);
    });

    socket.on("admin-service", (requestData) => {
      setServices((prev) => [requestData.requestData, ...prev]);
    });

    socket.on("admin-feedback", (requestData) => {
      console.log(requestData);
      setFeedbackCount((prev) => prev + 1);
      setHighlightedIds((prev) => [...prev, requestData._id]);
    });

    socket.on("disconnect", () => {
      console.warn("❌ Socket disconnected");
    });
  };

  useEffect(() => {
    startSocketEvents();

    return () => {
      socket.off("new_message");
      socket.off("admin-service");
      socket.off("admin-feedback");
    };
  }, []);

  const getUserServicesStatus = async (page) => {
    try {
      const res = await fetch(
        `${url}/admin/services/user?page=${page}&limit=40`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();
      console.log(data);
      if (Array.isArray(data.services)) {
        setServices(data.services);
        return data.totalPages;
      } else {
        setServices([]);
        console.warn("⚠️ No services found.");
      }
    } catch (err) {
      console.error("❌ Failed to fetch services", err);
    }
  };

  const markAllRead = async (page) => {
    try {
      const res = await fetch(
        `${url}/admin/notifications/mark-read?page=${page}&limit=30`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);

      if (res.ok) {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        setNewCount(0);
      }
    } catch (err) {
      console.error("❌ Failed to mark all read", err);
    }
  };

  const fetchNotifications = async (page) => {
    try {
      const res = await fetch(
        `${url}/admin/notifications?page=${page}&limit=30`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();
      console.log(data.notifications);
      if (Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
        const unread = data.notifications.filter((n) => !n.read).length;
        setNewCount(unread);
        return data.totalPages;
      } else {
        setNotifications([]);
        setNewCount(0);
        console.warn("⚠️ No notifications found.");
      }
    } catch (err) {
      console.error("❌ Failed to fetch notifications", err);
    }
  };

  const getUsersData = async (page) => {
    try {
      const res = await fetch(
        `${url}/admin/profile/user?page=${page}&limit=40`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();
      console.log(data);
      if (Array.isArray(data.data)) {
        setUserData(data.data);
        return data.totalPages;
      } else {
        setUserData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NotificationContexts.Provider
      value={{
        services,
        notifications,
        newCount,
        markAllRead,
        fetchNotifications,
        getUserServicesStatus,
        getUsersData,
        usersData,
        feedbackCount,
        setFeedbackCount,
        highlightedIds,
        setHighlightedIds,
        message,
      }}
    >
      {children}
    </NotificationContexts.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContexts);
