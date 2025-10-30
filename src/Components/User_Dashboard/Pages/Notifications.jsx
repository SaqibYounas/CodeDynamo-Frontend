import { useNotifications } from '../context/context';
import { useEffect, useState } from 'react';
import { formatDate } from '../utils/formatDate';
import { FaBell } from 'react-icons/fa';
import NotificationsSkeleton from '../skeletons/Notifications';
import { Pagination } from '../hooks/Pagination';
import { ProfilerWrapper } from '../utils/Profiler';

const Notifications = () => {
  const { fetchNotifications, markAllRead, notifications } = useNotifications();
  const [isLoading, setisLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    Api();
  }, [page]);

  async function Api() {
    setisLoading(true);
    const total = await fetchNotifications(page);
    if (total) setTotalPages(total);
    await markAllRead(page);
    setisLoading(false);
  }

  return (
    <ProfilerWrapper id="Notifications">
      <div className="min-h-screen bg-gray-100 p-6 md:pl-80 lg:pl-64">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          {notifications ? 'Notifications' : ' No any notification'}
        </h1>

        {isLoading ? (
          <NotificationsSkeleton count={notifications?.length || 6} />
        ) : (
          <div className="space-y-4">
            {Array.isArray(notifications) &&
              notifications.map((note, index) => (
                <div
                  key={index}
                  className={`flex transform items-start gap-6 rounded-lg border-l-40 p-4 shadow-lg transition-all duration-200 ease-in-out hover:ring-2 hover:ring-blue-300 lg:w-2xl ${
                    note?.read
                      ? 'scale-100 border-gray-600 bg-white'
                      : 'scale-[1.02] border-yellow-500 bg-yellow-100'
                  }`}
                >
                  <FaBell className="mt-1 text-xl text-yellow-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {note?.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      {note?.message}
                    </p>
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
    </ProfilerWrapper>
  );
};

export default Notifications;
