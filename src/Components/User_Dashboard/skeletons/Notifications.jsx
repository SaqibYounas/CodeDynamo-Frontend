import React from "react";
import { FaBell } from "react-icons/fa";

const NotificationsSkeleton = ({ count = 6 }) => {
  const items = Array.from({ length: count });

  return (
    <div className="space-y-4 animate-pulse">
      {items.map((_, i) => (
        <div
          key={i}
          className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-start gap-4 sm:gap-6 border-l-40 border-gray-300 lg:w-2xl  w-full"
        >
          <FaBell className="text-xl mt-1 text-gray-300" />
          <div className="flex-1 space-y-2 w-full">
            <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            <div className="w-full h-3 bg-gray-200 rounded"></div>
            <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsSkeleton;
