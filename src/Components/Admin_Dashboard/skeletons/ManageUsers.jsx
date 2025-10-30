// /skeletons/ManageUsers.jsx

import React from 'react';

export default function ManageUsersSkeleton({ rows = 5 }) {
  return (
    <div className="w-full animate-pulse">
      <div className="overflow-x-auto">
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">WhatsApp</th>
              <th className="p-2">Country</th>
              <th className="p-2">Register</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(rows)].map((_, i) => (
              <tr key={i} className="border-b">
                {Array.from({ length: 8 }).map((_, j) => (
                  <td key={j} className="p-2">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
