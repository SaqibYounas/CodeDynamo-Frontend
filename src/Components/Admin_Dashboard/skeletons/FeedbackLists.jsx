import React from 'react';
import { FaUserCircle, FaStar } from 'react-icons/fa';

const FeedbackListSkeleton = ({ count = 6 }) => {
  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-xl border-l-4 border-gray-200 bg-white p-4 shadow-md lg:w-2xl"
        >
          <div className="mt-1 text-4xl text-gray-300">
            <FaUserCircle />
          </div>
          <div className="w-full flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-4 w-32 rounded bg-gray-300"></div>
              <div className="h-3 w-16 rounded bg-gray-200"></div>
            </div>
            <div className="h-3 w-64 rounded bg-gray-200"></div>
            <div className="mt-2 flex gap-1 text-gray-300">
              {Array.from({ length: 5 }).map((_, j) => (
                <FaStar key={j} className="h-4 w-4" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackListSkeleton;
