import React from 'react';
import { FaBell } from 'react-icons/fa';

const NotificationsSkeleton = ({ count = 6 }) => {
  const items = Array.from({ length: count });

  return (
    <div className="animate-pulse space-y-4">
      {items.map((_, i) => (
        <div
          key={i}
          className="flex w-full flex-col items-start gap-4 rounded-lg border-l-40 border-gray-300 bg-white p-4 shadow-md sm:flex-row sm:gap-6 lg:w-2xl"
        >
          <FaBell className="mt-1 text-xl text-gray-300" />
          <div className="w-full flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-300"></div>
            <div className="h-3 w-full rounded bg-gray-200"></div>
            <div className="h-3 w-1/2 rounded bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsSkeleton;
