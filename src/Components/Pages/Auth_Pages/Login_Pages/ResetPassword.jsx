// import React, { useRef, useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { url } from './Port';
// import { ProfilerWrapper } from '../../utils/Profiler';

// function ResetPassword() {
//   const [searchParams] = useSearchParams();
//   const email = searchParams.get('email');
//   const navigate = useNavigate();

//   const passwordRef = useRef();
//   const confirmRef = useRef();

//   const [passwordError, setPasswordError] = useState('');
//   const [confirmError, setConfirmError] = useState('');
//   const [message, setMessage] = useState('');

//   const handleReset = async (e) => {
//     e.preventDefault();
//     const password = passwordRef.current.value.trim();
//     const confirmPass = confirmRef.current.value.trim();
//     let hasError = false;

//     setPasswordError('');
//     setConfirmError('');
//     setMessage('');

//     if (!password) {
//       setPasswordError('Please enter your password.');
//       passwordRef.current.focus();
//       hasError = true;
//     } else if (!/^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)) {
//       setPasswordError(
//         'Password must be at least 8 characters and include a special character.'
//       );
//       passwordRef.current.focus();
//       hasError = true;
//     }

//     if (!confirmPass) {
//       setConfirmError('Please confirm your password.');
//       confirmRef.current.focus();
//       hasError = true;
//     } else if (password !== confirmPass) {
//       setConfirmError('Passwords do not match.');
//       confirmRef.current.focus();
//       hasError = true;
//     }

//     if (hasError) return;

//     try {
//       const response = await fetch(`${url}/auth/reset-password`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (
//         response.status === 200 &&
//         data.message === 'Password updated successfully. Please login.'
//       ) {
//         setMessage('✅ Password has been reset. Redirecting...');
//         setTimeout(() => navigate('/auth/login'), 2000);
//       } else {
//         setMessage(data.message || 'Something went wrong.');
//       }
//     } catch (err) {
//       setMessage('Network error. Try again.');
//     }
//   };

//   return (
//     <ProfilerWrapper id="Reset Password">
//       <div className="flex  bg-[#F9F9FF] min-h-screen items-center justify-center px-4">
//         <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
//           <h2 className="mb-4 text-center text-2xl font-semibold">
//             Reset Password
//           </h2>
//           <form onSubmit={handleReset} className="space-y-4">
//             <div>
//               <label
//                 htmlFor="new-password"
//                 className="block font-medium text-gray-700"
//               >
//                 New Password
//               </label>
//               <input
//                 id="new-password"
//                 type="password"
//                 ref={passwordRef}
//                 className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 placeholder="At least 8 characters, 1 special char"
//                 required
//                 onChange={() => setPasswordError('')}
//               />
//               {passwordError && (
//                 <p className="mt-1 text-sm text-red-600">{passwordError}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="confirm-password"
//                 className="block font-medium text-gray-700"
//               >
//                 Confirm Password
//               </label>
//               <input
//                 id="confirm-password"
//                 type="password"
//                 ref={confirmRef}
//                 className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 placeholder="Retype password"
//                 required
//                 onChange={() => setConfirmError('')}
//               />
//               {confirmError && (
//                 <p className="mt-1 text-sm text-red-600">{confirmError}</p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="w-full cursor-pointer rounded-lg bg-[#474BCA] px-4 py-2 text-white hover:bg-blue-700"
//             >
//               Reset Password
//             </button>
//           </form>
//           {message && (
//             <p className="mt-4 text-center font-semibold text-green-600">
//               {message}
//             </p>
//           )}
//         </div>
//       </div>
//     </ProfilerWrapper>
//   );
// }

// export default ResetPassword;

import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ProfilerWrapper } from '../../utils/Profiler';
import { useResetPassword } from '../Hooks/useResetPassword';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const navigate = useNavigate();

  const {
    passwordRef,
    confirmRef,
    passwordError,
    confirmError,
    message,
    setPasswordError,
    setConfirmError,
    handleReset,
  } = useResetPassword(email, navigate);

  return (
    <ProfilerWrapper id="Reset Password">
      <div className="flex min-h-screen items-center justify-center bg-[#F9F9FF] px-4">
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-center text-2xl font-semibold">
            Reset Password
          </h2>
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label
                htmlFor="new-password"
                className="block font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                ref={passwordRef}
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="At least 8 characters, 1 special char"
                required
                onChange={() => setPasswordError('')}
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                ref={confirmRef}
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Retype password"
                required
                onChange={() => setConfirmError('')}
              />
              {confirmError && (
                <p className="mt-1 text-sm text-red-600">{confirmError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-[#474BCA] px-4 py-2 text-white hover:bg-blue-700"
            >
              Reset Password
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center font-semibold text-green-600">
              {message}
            </p>
          )}
        </div>
      </div>
    </ProfilerWrapper>
  );
}

export default ResetPassword;
