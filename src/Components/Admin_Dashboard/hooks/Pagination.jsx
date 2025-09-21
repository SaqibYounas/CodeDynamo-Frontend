// src/components/common/Pagination.jsx
import React from "react";

export function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
      >
        Previous
      </button>

      {!isNaN(page) && !isNaN(totalPages) ? (
        <span className="text-gray-700 text-sm mt-2">
          Page {page} of {totalPages}
        </span>
      ) : (
        <span>Loading...</span>
      )}

      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page == totalPages}
        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
