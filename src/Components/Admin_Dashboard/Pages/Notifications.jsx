import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { useNotifications } from '../context/context';
import { formatDate } from './utils/formatDate';
import NotificationsSkeleton from '../skeletons/Notifications';
import { Pagination } from '../hooks/Pagination';

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
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
    setLoading(false);
    setTimeout(() => {
      markAllRead(page);
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:pl-80 lg:pl-64">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
        {notifications?.length > 0 ? 'Notifications' : 'No Admin Notification'}
      </h1>
      {isLoading ? (
        <NotificationsSkeleton count={notifications?.length || 6} />
      ) : (
        <div className="space-y-4">
          {Array.isArray(notifications) &&
            notifications.map((note, index) => (
              <div
                key={index}
                className={`flex transform items-start gap-6 rounded-lg border-l-40 p-4 shadow-lg transition-all duration-300 ease-in-out lg:w-2xl ${
                  note?.read
                    ? 'border-gray-600 bg-white text-gray-800'
                    : 'border-yellow-500 bg-yellow-100 text-black'
                }`}
              >
                <FaBell className="mt-1 text-xl text-yellow-400" />
                <div>
                  {note.title && (
                    <p className="text-1xl font-semibold">{note.title}</p>
                  )}
                  <p className="mt-1 text-sm">{note?.message}</p>
                  <p className="mt-1 text-sm text-gray-500">
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
