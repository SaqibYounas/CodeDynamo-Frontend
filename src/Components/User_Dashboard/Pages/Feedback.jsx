import { useEffect, useState } from 'react';
import { FaUserCircle, FaStar } from 'react-icons/fa';
import FeedbackForm from './FeedbackForm';
import { getFeedback } from './Services/feedbackFormAPI';
import { formatDate, toPascalCase } from '../utils/formatDate';
import FeedbackSkeleton from '../skeletons/Feedback';
import { ProfilerWrapper } from '../utils/Profiler';

export default function FeedbackFormAndList() {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Step 2

  useEffect(() => {
    getFeedbacks();
  }, []);

  async function getFeedbacks() {
    setLoading(true);
    let data = await getFeedback();
    if (Array.isArray(data)) {
      setFeedbackData(data);
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <ProfilerWrapper id="Feedback">
      <div className="flex min-h-screen flex-col gap-6 bg-gray-100 p-6 md:pl-80 lg:flex-row lg:pl-64">
        {/* LEFT: Feedback Form */}
        <FeedbackForm onFeedbackSubmitted={getFeedbacks} />
        {/* RIGHT: Sent Feedbacks */}
        <div className="w-full lg:w-1/2">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-700">
            {feedbackData.length > 0 ? 'Your Feedback' : 'No Feedback'}
          </h2>
          {loading ? (
            <FeedbackSkeleton count={feedbackData?.length || 6} />
          ) : (
            <div className="space-y-4">
              {feedbackData.map((fb, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedFeedback(fb)}
                    className="cursor-pointer rounded-xl border-l-40 border-gray-600 bg-white p-4 shadow transition duration-200 hover:ring-2 hover:ring-blue-300"
                  >
                    <div className="flex items-start gap-4">
                      <FaUserCircle className="text-3xl text-gray-400" />
                      <div className="w-full">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <span className="line-clamp-1 text-sm font-semibold underline hover:text-blue-600 sm:text-base md:text-lg">
                            {toPascalCase(fb.subject)}
                          </span>
                          <span className={`text-sm font-medium`}>
                            {formatDate(fb.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-600">
                          {fb.feedback.slice(0, 20)}...
                        </p>
                        <div className="flex gap-1 lg:mt-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`flex ${
                                i < fb.stars
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal */}
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
      </div>
    </ProfilerWrapper>
  );
}
