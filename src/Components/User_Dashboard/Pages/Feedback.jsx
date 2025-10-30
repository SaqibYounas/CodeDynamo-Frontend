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
      <div className="lg:pl-64 md:pl-80 flex flex-col lg:flex-row p-6 gap-6 bg-gray-100 min-h-screen ">
        {/* LEFT: Feedback Form */}
        <FeedbackForm onFeedbackSubmitted={getFeedbacks} />
        {/* RIGHT: Sent Feedbacks */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
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
                    className="bg-white rounded-xl shadow p-4 cursor-pointer hover:ring-2 hover:ring-blue-300 transition duration-200 border-l-40  border-gray-600 "
                  >
                    <div className="  flex items-start gap-4">
                      <FaUserCircle className="text-3xl   text-gray-400 " />
                      <div className="w-full">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                          <span className="font-semibold text-sm sm:text-base md:text-lg underline hover:text-blue-600 line-clamp-1">
                            {toPascalCase(fb.subject)}
                          </span>
                          <span className={`text-sm font-medium `}>
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
                              className={` flex  ${
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
          <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-40 backdrop-blur-sm">
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
      </div>
    </ProfilerWrapper>
  );
}
