import { useEffect, useState } from 'react';
import { FaUserCircle, FaStar } from 'react-icons/fa';
import { getFeedbackAll } from './Services/getFeedbackAll';
import { formatDate, toPascalCase } from './utils/formatDate';
import { useNotifications } from '../context/context';
import FeedbackListSkeleton from '../skeletons/FeedbackLists';
import { Pagination } from '../hooks/Pagination';

export default function FeedbackList() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { setFeedbackCount, highlightedIds, setHighlightedIds } =
    useNotifications();

  useEffect(() => {
    setFeedbackCount(0);
    getFeedbackAlls();
  }, [page]);

  useEffect(() => {
    if (highlightedIds.length > 0) {
      const timeouts = highlightedIds.map((id) => {
        return setTimeout(() => {
          setHighlightedIds((prev) => prev.filter((i) => i !== id));
        }, 3000);
      });

      return () => timeouts.forEach(clearTimeout);
    }
  }, [highlightedIds]);

  async function getFeedbackAlls() {
    try {
      setLoading(true);
      const res = await getFeedbackAll(page);
      if (res?.feedback && Array.isArray(res.feedback)) {
        setFeedbackData(res.feedback);
        setTotalPages(res.totalPages || 1);
      } else {
        setFeedbackData([]);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setFeedbackData([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative p-6 md:pl-80 lg:pl-64">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
        {feedbackData.length > 0 ? 'User Feedback' : 'No Feedback Found'}
      </h1>

      <div className="space-y-4">
        {loading ? (
          <FeedbackListSkeleton count={feedbackData.length || 6} />
        ) : (
          feedbackData.map((fb) => (
            <div
              key={fb._id}
              onClick={() => setSelectedFeedback(fb)}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border-l-40 bg-white p-4 shadow-md ring-blue-300 transition hover:ring-2 lg:w-2xl ${
                highlightedIds.includes(fb._id)
                  ? 'border-yellow-400 ring-2 ring-yellow-300'
                  : 'border-gray-600'
              }`}
            >
              <FaUserCircle className="mt-1 text-4xl text-gray-400" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="line-clamp-1 font-semibold text-gray-800 underline hover:text-blue-700 sm:text-lg">
                    {toPascalCase(fb.subject)}
                  </h3>
                  <span className={`text-sm font-medium`}>
                    {formatDate(fb.createdAt)}
                  </span>
                </div>

                <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                  {fb.feedback?.length > 60
                    ? fb.feedback.slice(0, 45) + '...'
                    : fb.feedback}
                </p>

                <div className="mt-2 flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm ${
                        i < (fb.stars || 0)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {selectedFeedback && (
        <div className="bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="relative max-h-[80vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-lg">
            <button
              onClick={() => setSelectedFeedback(null)}
              className="absolute top-2 right-3 cursor-pointer text-xl font-bold text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
            <h2 className="mb-1 text-2xl font-bold text-blue-600">
              {toPascalCase(selectedFeedback.subject)}
            </h2>
            <p className="mb-2 text-sm text-gray-500">
              {formatDate(selectedFeedback.createdAt)}
            </p>
            <h2 className="mb-2 text-lg font-bold text-gray-800">
              {selectedFeedback.serviceType}
            </h2>
            <div className="mb-2 flex">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < (selectedFeedback.stars || 0)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="leading-relaxed text-gray-700">
              {selectedFeedback.feedback}
            </p>
            <button
              onClick={() => setSelectedFeedback(null)}
              className="mt-4 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Exit
            </button>
          </div>
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
