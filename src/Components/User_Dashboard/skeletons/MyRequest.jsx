import React from "react";

const RequestsSkeleton = ({ rowCount = 5 }) => {
  const rows = Array.from({ length: rowCount });

  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto animate-pulse">
      <table className="w-full min-w-[500px] table-auto">
        <thead className="bg-gray-200 text-gray-700 text-sm uppercase">
          <tr>
            <th className="text-left px-4 py-3">#</th>
            <th className="text-left px-4 py-3">Service</th>
            <th className="text-left px-4 py-3">Date</th>
            <th className="text-left px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, i) => (
            <tr key={i} className="border-t border-gray-200">
              <td className="px-4 py-3">
                <div className="h-4 w-6 bg-gray-300 rounded"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsSkeleton;
