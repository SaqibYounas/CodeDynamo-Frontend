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
      <div className="lg:pl-64 p-6 bg-gray-100 min-h-screen md:pl-80">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Requests</h1>

        {showLoader ? (
          <RequestsSkeleton rowCount={services?.length || 5} />
        ) : (
          <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-max w-full table-auto text-sm md:text-base">
              <thead className="bg-gray-200 text-gray-700 uppercase">
                <tr>
                  <th className="text-left px-4 py-2 whitespace-nowrap">#</th>
                  <th className="text-left px-4 py-2 whitespace-nowrap">
                    Service
                  </th>
                  <th className="text-left px-4 py-2 whitespace-nowrap">
                    Date
                  </th>
                  <th className="text-left px-4 py-2 whitespace-nowrap">
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
                      <td className="px-4 py-2 font-medium text-gray-800 truncate max-w-[150px]">
                        {req.service}
                      </td>
                      <td className="px-4 py-2 text-gray-600 whitespace-nowrap">
                        {formatDate(req.createdAt)}
                      </td>
                      <td className="px-4 py-2 flex items-center gap-1 text-sm font-semibold">
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
