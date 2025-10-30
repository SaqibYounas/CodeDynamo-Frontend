import React from 'react';
import { FaUserCircle, FaStar } from 'react-icons/fa';

const FeedbackListSkeleton = ({ count = 6 }) => {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-start lg:w-2xl gap-3 p-4 bg-white rounded-xl shadow-md border-l-4 border-gray-200"
        >
          <div className="text-4xl text-gray-300 mt-1">
            <FaUserCircle />
          </div>
          <div className="flex-1 space-y-2 w-full">
            <div className="flex justify-between items-center">
              <div className="w-32 h-4 bg-gray-300 rounded"></div>
              <div className="w-16 h-3 bg-gray-200 rounded"></div>
            </div>
            <div className="w-64 h-3 bg-gray-200 rounded"></div>
            <div className="flex gap-1 text-gray-300 mt-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <FaStar key={j} className="w-4 h-4" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackListSkeleton;
