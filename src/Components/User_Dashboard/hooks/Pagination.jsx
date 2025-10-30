// src/components/common/Pagination.jsx
import React from 'react';

export function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="mt-6 flex justify-center gap-4">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="cursor-pointer rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 disabled:opacity-50"
      >
        Previous
      </button>

      {!isNaN(page) && !isNaN(totalPages) ? (
        <span className="mt-2 text-sm text-gray-700">
          Page {page} of {totalPages}
        </span>
      ) : (
        <span>Loading...</span>
      )}

      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page == totalPages}
        className="cursor-pointer rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
