import React from 'react';

const RequestsSkeleton = ({ rowCount = 5 }) => {
  const rows = Array.from({ length: rowCount });

  return (
    <div className="animate-pulse overflow-x-auto rounded-lg bg-white shadow-md">
      <table className="w-full min-w-[500px] table-auto">
        <thead className="bg-gray-200 text-sm text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3 text-left">#</th>
            <th className="px-4 py-3 text-left">Service</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, i) => (
            <tr key={i} className="border-t border-gray-200">
              <td className="px-4 py-3">
                <div className="h-4 w-6 rounded bg-gray-300"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-32 rounded bg-gray-300"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-24 rounded bg-gray-300"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-20 rounded bg-gray-300"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsSkeleton;
