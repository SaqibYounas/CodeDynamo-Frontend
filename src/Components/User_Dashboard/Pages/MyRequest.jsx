import React, { useEffect, useState } from 'react';
import { FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useNotifications } from '../context/context';
import { formatDate } from '../utils/formatDate';
import RequestsSkeleton from '../skeletons/MyRequest'; // ✅ Import skeleton
import { ProfilerWrapper } from '../utils/Profiler';

const statusColor = {
  pending: 'text-slate-500',
  Approved: 'text-green-500',
  Rejected: 'text-red-500',
  Completed: 'text-yellow-500',
};

const statusIcon = {
  pending: <FaClock />,
  approved: <FaCheckCircle />,
  rejected: <FaTimesCircle />,
};

const MyRequests = () => {
  const { services, getUserServicesStatus } = useNotifications();
  const [showLoader, sethideLoader] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    sethideLoader(true);
    let data = await getUserServicesStatus();
    sethideLoader(false);
  }

  return (
    <ProfilerWrapper id="My Request">
      <div className="min-h-screen bg-gray-100 p-6 md:pl-80 lg:pl-64">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">My Requests</h1>

        {showLoader ? (
          <RequestsSkeleton rowCount={services?.length || 5} />
        ) : (
          <div className="w-full overflow-x-auto rounded-lg bg-white shadow-md">
            <table className="w-full min-w-max table-auto text-sm md:text-base">
              <thead className="bg-gray-200 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-2 text-left whitespace-nowrap">#</th>
                  <th className="px-4 py-2 text-left whitespace-nowrap">
                    Service
                  </th>
                  <th className="px-4 py-2 text-left whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(services) &&
                  services.map((req, index) => (
                    <tr
                      key={req._id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="max-w-[150px] truncate px-4 py-2 font-medium text-gray-800">
                        {req.service}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-gray-600">
                        {formatDate(req.createdAt)}
                      </td>
                      <td className="flex items-center gap-1 px-4 py-2 text-sm font-semibold">
                        <span className={statusColor[req.status]}>
                          {statusIcon[req.status]}
                        </span>
                        <span
                          className={`${statusColor[req.status]} capitalize`}
                        >
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ProfilerWrapper>
  );
};

export default MyRequests;
