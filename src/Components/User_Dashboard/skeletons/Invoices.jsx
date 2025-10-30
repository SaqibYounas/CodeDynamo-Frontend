// /skeletons/InvoicesSkelton.jsx

import React from 'react';

export default function InvoicesSkelton({ rows = 5 }) {
  return (
    <>
      {[...Array(rows)].map((_, i) => (
        <tr key={i} className="animate-pulse border-b">
          {Array.from({ length: 8 }).map((_, j) => (
            <td key={j} className="p-3">
              <div className="h-4 w-24 rounded bg-gray-300"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
