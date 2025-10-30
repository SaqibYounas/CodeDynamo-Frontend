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
    <div className="relative lg:pl-64 md:pl-80 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
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
              className={`flex items-start gap-3 p-4 lg:w-2xl bg-white rounded-xl shadow-md border-l-40 transition cursor-pointer hover:ring-2 ring-blue-300 
        ${
          highlightedIds.includes(fb._id)
            ? 'border-yellow-400 ring-2 ring-yellow-300'
            : 'border-gray-600'
        }`}
            >
              <FaUserCircle className="text-4xl text-gray-400 mt-1" />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-gray-800 font-semibold hover:text-blue-700   underline  sm:text-lg line-clamp-1">
                    {toPascalCase(fb.subject)}
                  </h3>
                  <span className={`text-sm font-medium `}>
                    {formatDate(fb.createdAt)}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {fb.feedback?.length > 60
                    ? fb.feedback.slice(0, 45) + '...'
                    : fb.feedback}
                </p>

                <div className="flex gap-1 mt-2">
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto relative p-6">
            <button
              onClick={() => setSelectedFeedback(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-blue-600 mb-1">
              {toPascalCase(selectedFeedback.subject)}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              {formatDate(selectedFeedback.createdAt)}
            </p>
            <h2 className="text-lg font-bold mb-2 text-gray-800">
              {selectedFeedback.serviceType}
            </h2>
            <div className="flex mb-2">
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
            <p className="text-gray-700 leading-relaxed">
              {selectedFeedback.feedback}
            </p>
            <button
              onClick={() => setSelectedFeedback(null)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
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
