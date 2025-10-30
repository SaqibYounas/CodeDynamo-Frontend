import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { saveFeedback } from './Services/feedbackFormAPI';
import { validateFeedbackForm } from '../utils/Validate';
import { useLocalFormStorage } from '../hooks/useLocalFormStorage';
import { ProfilerWrapper } from '../utils/Profiler';

export default function FeedbackForm({ onFeedbackSubmitted }) {
  const [form, setForm] = useState({
    service: '',
    subject: '',
    message: '',
    rating: 5,
  });

  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [pending, setPending] = useState(false);

  let formKey = 'feedback-form';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useLocalFormStorage({
    formKey,
    form,
    setForm,
  });

  const handleBlur = () => {
    const data = {
      service: form.service || '',
      subject: form.subject || '',
      message: form.message || '',
    };
    const withExpiry = {
      value: data,
      expiry: Date.now() + 900 * 1000,
    };
    localStorage.setItem(formKey, JSON.stringify(withExpiry));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage('');

    const validationErrors = validateFeedbackForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setPending(true);

    const submitform = await saveFeedback({
      serviceType: form.service,
      subject: form.subject,
      message: form.message,
      stars: form.rating,
    });

    if (submitform) {
      setPending(false);
      setIsError(false);
      setResponseMessage('✅ Your feedback has been sent successfully!');
      setForm({ service: '', subject: '', message: '', rating: 5 });
      if (onFeedbackSubmitted) onFeedbackSubmitted();
    } else {
      setPending(false);
      setIsError(true);
      setResponseMessage('❌ Server error. Please try again later.');
    }
  };

  return (
    <ProfilerWrapper id="Feedback From">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 p-6 rounded-xl shadow-md w-full lg:w-1/2 h-min border border-blue-400 mt-12"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Give Feedback</h2>

        <input
          type="text"
          name="service"
          placeholder="Your Service Name"
          value={form.service}
          onChange={(e) => {
            handleChange(e);
            setErrors('');
          }}
          onBlur={handleBlur}
          required
          className="w-full mb-1 p-2 border rounded-md text-bold"
        />
        {errors.service && (
          <p className="text-red-500  mb-2">{errors.service}</p>
        )}

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => {
            handleChange(e);
            setErrors('');
          }}
          onBlur={handleBlur}
          required
          className="w-full mb-1 p-2 border rounded-md"
        />
        {errors.subject && (
          <p className="text-red-500 mb-2">{errors.subject}</p>
        )}

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={(e) => {
            handleChange(e);
            setErrors('');
          }}
          onBlur={handleBlur}
          required
          className="w-full mb-1 p-2 border rounded-md"
          rows="4"
        />
        {errors.message && (
          <p className="text-red-500  mb-2">{errors.message}</p>
        )}

        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <FaStar
              key={num}
              onClick={() => setForm({ ...form, rating: num })}
              className={`cursor-pointer ${
                num <= form.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={pending}
          className={`px-4 py-2 rounded text-white transition cursor-pointer ${
            pending
              ? 'bg-gray-400 cursor-progress'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {pending ? 'Sending...' : 'Send Feedback'}
        </button>

        {responseMessage && (
          <p
            className={`mt-4 text-sm font-semibold text-center ${
              isError ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {responseMessage}
          </p>
        )}
      </form>
    </ProfilerWrapper>
  );
}
