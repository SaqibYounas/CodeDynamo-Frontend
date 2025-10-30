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
      <div className="lg:pl-64 md:pl-80 p-6 min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
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
                  className={`border-l-40 p-4 rounded-lg shadow-lg flex items-start gap-6 transition-all duration-200 ease-in-out transform lg:w-2xl hover:ring-2 hover:ring-blue-300 ${
                    note?.read
                      ? 'bg-white border-gray-600 scale-100'
                      : 'bg-yellow-100 border-yellow-500 scale-[1.02]'
                  }`}
                >
                  <FaBell className="text-xl mt-1 text-yellow-400" />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {note?.title}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      {note?.message}
                    </p>
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
    </ProfilerWrapper>
  );
};

export default Notifications;
