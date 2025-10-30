import React from 'react';
import { FaUserCircle, FaStar } from 'react-icons/fa';

const FeedbackSkeleton = ({ count = 3 }) => {
  const placeholders = Array.from({ length: count });

  return (
    <div className="animate-pulse space-y-4">
      {placeholders.map((_, i) => (
        <div
          key={i}
          className="rounded-xl border-l-4 border-gray-300 bg-white p-4 shadow"
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl text-gray-300">
              <FaUserCircle />
            </div>
            <div className="w-full space-y-2">
              <div className="flex justify-between">
                <div className="h-4 w-32 rounded bg-gray-300"></div>
                <div className="h-3 w-20 rounded bg-gray-200"></div>
              </div>
              <div className="h-3 w-64 rounded bg-gray-200"></div>
              <div className="flex gap-1 text-gray-300">
                {Array.from({ length: 5 }).map((_, j) => (
                  <FaStar key={j} className="h-4 w-4" />
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
