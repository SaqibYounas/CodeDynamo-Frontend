import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNotifications } from "../context/context";
import { formatDate } from "./utils/formatDate";
import NotificationsSkeleton from "../skeletons/Notifications";
import { Pagination } from "../hooks/Pagination";

export default function AdminNotifications() {
  const { markAllRead, fetchNotifications, notifications } = useNotifications();
  const [isLoading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getNotifcations();
  }, [page]);

  async function getNotifcations() {
    try {
      setLoading(true);
      let res = await fetchNotifications();
      if (res && !isNaN(res)) {
        setTotalPages(res);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
    setLoading(false);
    setTimeout(() => {
      markAllRead(page);
    }, 2000);
  }

  return (
    <div className="lg:pl-64 md:pl-80 p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {notifications?.length > 0 ? "Notifications" : "No Admin Notification"}
      </h1>
      {isLoading ? (
        <NotificationsSkeleton count={notifications?.length || 6} />
      ) : (
        <div className="space-y-4">
          {Array.isArray(notifications) &&
            notifications.map((note, index) => (
              <div
                key={index}
                className={`border-l-40 p-4  rounded-lg shadow-lg flex items-start gap-6 transition-all duration-300 ease-in-out transform lg:w-2xl
              ${
                note?.read
                  ? "bg-white border-gray-600 text-gray-800"
                  : "bg-yellow-100 border-yellow-500 text-black"
              }`}
              >
                <FaBell className="text-xl mt-1 text-yellow-400" />
                <div>
                  {note.title && (
                    <p className="font-semibold text-1xl">{note.title}</p>
                  )}
                  <p className="text-sm mt-1">{note?.message}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(note?.createdAt)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
