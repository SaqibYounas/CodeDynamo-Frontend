import React from 'react';
import { FaUserCircle, FaStar } from 'react-icons/fa';

const FeedbackSkeleton = ({ count = 3 }) => {
  const placeholders = Array.from({ length: count });

  return (
    <div className="space-y-4 animate-pulse">
      {placeholders.map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow p-4 border-l-4 border-gray-300"
        >
          <div className="flex items-start gap-4">
            <div className="text-gray-300 text-3xl">
              <FaUserCircle />
            </div>
            <div className="w-full space-y-2">
              <div className="flex justify-between">
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
                <div className="w-20 h-3 bg-gray-200 rounded"></div>
              </div>
              <div className="w-64 h-3 bg-gray-200 rounded"></div>
              <div className="flex gap-1 text-gray-300">
                {Array.from({ length: 5 }).map((_, j) => (
                  <FaStar key={j} className="w-4 h-4" />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackSkeleton;
