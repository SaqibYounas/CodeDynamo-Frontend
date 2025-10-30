import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { url } from './Port';
import { ProfilerWrapper } from '../../utils/Profiler';

function ForgotPassword() {
  const email = useRef('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emails = email.current.value.trim();

    try {
      const response = await fetch(`${url}/auth/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ emailkey: emails }),
      });

      const data = await response.json();

      if (response.status === 200) {
        if (data.message === 'Not registered Email! Please Signup.') {
          setMessage(data.message);
        } else if (data.message === 'Email Found') {
          navigate(`/auth/resetpassword?email=${emails}`);
        } else if (
          data.message ===
            'This user is registered via Google. Please set a website password first.' &&
          data.googleAccount === true
        ) {
          setMessage(data.message);
        }
      } else if (response.status === 500) {
        setMessage('Server Error');
      } else {
        setMessage('Network error. Try Again!');
      }
    } catch (err) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <ProfilerWrapper id="Forgot Password">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-center text-2xl font-semibold">
            Forgot Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-gray-600"
              >
                Email Address
              </label>
              <input
                id="email" // ✅ Add this line
                type="email"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                ref={email}
                required
                onChange={() => {
                  setMessage('');
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Verify Email
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center font-medium text-red-600">
              {message}
            </p>
          )}
        </div>
      </div>
    </ProfilerWrapper>
  );
}

export default ForgotPassword;
