// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import CountdownTimer from './TimeCountVerify';
// import { url } from './Port';
// import { ProfilerWrapper } from '../../utils/Profiler';
// function Verify() {
//   const navigate = useNavigate();
//   const [code, setCode] = useState('');
//   const [status, setStatus] = useState('');
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [timeExpired, setTimeExpired] = useState(false);
//   const [resetKey, setResetKey] = useState(Date.now());
//   const [isResending, setIsResending] = useState(false);

//   const handleExpire = () => {
//     setTimeExpired(true);
//     setStatus('⚠️ Code expired! Please request a new one.');
//   };

//   const handleResendCode = async () => {
//     setIsResending(true);
//     try {
//       let email = localStorage.getItem('email');
//       const response = await fetch(`${url}/auth/regenerate-otp`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });
//       const data = await response.json();

//       if (response.status === 200) {
//         setStatus('✅ Code sent again. Please check your email.');
//         setTimeExpired(false);
//         setCode('');
//         setResetKey(Date.now());
//       } else {
//         setStatus(`❌ ${data.message}`);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsResending(false);
//     }
//   };

//   const handleVerifyCode = async () => {
//     if (code.length !== 6) {
//       setStatus('Enter 6 digit number');
//       return;
//     }

//     setIsVerifying(true);
//     setStatus('🔄 Verifying code...');
//     const email = localStorage.getItem('email');

//     try {
//       const res = await fetch(`${url}/auth/verify`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, code }),
//       });

//       const data = await res.json();
//       if (res.status === 200 && data.message?.includes('verified')) {
//         setStatus('✅ Email verified successfully!');
//         localStorage.removeItem('email');
//         setTimeout(() => navigate('/user/dashboard'), 2000);
//       } else if (res.status === 401) {
//         setStatus(`❌ ${data.message || 'Invalid code.'}`);
//       } else {
//         setStatus(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       setStatus('❌ Server error.');
//       navigate('/auth/server-error');
//     }

//     setIsVerifying(false);
//   };

//   return (
//     <ProfilerWrapper id="verfiy">
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="w-96 rounded-lg bg-white p-8 text-center shadow-md">
//           <h1 className="mb-4 text-2xl font-bold text-gray-800">
//             Email Verification
//           </h1>
//           <p className="mb-6 text-gray-600">
//             Enter the 6-digit code sent to your email
//           </p>

//           <input
//             type="text"
//             value={code}
//             onChange={(e) =>
//               setCode(
//                 e.target.value.replace(/\D/g, '').slice(0, 6),
//                 setStatus('')
//               )
//             }
//             placeholder="Enter code"
//             maxLength={6}
//             className="w-full rounded-md border border-gray-300 p-3 text-center text-2xl tracking-widest outline-blue-500"
//           />

//           <button
//             onClick={timeExpired ? handleResendCode : handleVerifyCode}
//             disabled={isVerifying || isResending}
//             className={`mt-4 w-full ${
//               timeExpired
//                 ? 'bg-yellow-500 hover:bg-yellow-600'
//                 : 'bg-blue-600 hover:bg-blue-700'
//             } cursor-pointer rounded py-2 text-white transition disabled:cursor-not-allowed disabled:opacity-60`}
//           >
//             {isVerifying || isResending
//               ? timeExpired
//                 ? 'Resending...'
//                 : 'Verifying...'
//               : timeExpired
//                 ? 'Resend Code'
//                 : 'Verify'}
//           </button>

//           {status && <p className="mt-4 font-medium text-gray-700">{status}</p>}

//           <CountdownTimer
//             duration={300}
//             onExpire={handleExpire}
//             resetKey={resetKey}
//           />
//         </div>
//       </div>
//     </ProfilerWrapper>
//   );
// }

// export default Verify;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from './TimeCountVerify';
import { ProfilerWrapper } from '../../utils/Profiler';
import { useVerifyCode } from './hooks/useVerifyCode';
import { useResendCode } from './hooks/useResendCode';
import {
  CODE_LENGTH,
  CODE_EXPIRED_MSG,
  VERIFY_HEADING,
  VERIFY_DESC,
} from './constant/verifyConstants';

function Verify() {
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [timeExpired, setTimeExpired] = useState(false);
  const [resetKey, setResetKey] = useState(() => Date.now());

  const { verifyCode, status, setStatus, isVerifying } =
    useVerifyCode(navigate);
  const { resendCode, isResending } = useResendCode();

  const handleExpire = () => {
    setTimeExpired(true);
    setStatus(CODE_EXPIRED_MSG);
  };

  const handleButtonClick = () => {
    if (timeExpired) {
      resendCode(setStatus, setTimeExpired, setCode, setResetKey);
    } else {
      verifyCode(code);
    }
  };

  return (
    <ProfilerWrapper id="verify">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-96 rounded-lg bg-white p-8 text-center shadow-md">
          <h1 className="mb-4 text-2xl font-bold text-gray-800">
            {VERIFY_HEADING}
          </h1>
          <p className="mb-6 text-gray-600">{VERIFY_DESC}</p>

          <input
            type="text"
            value={code}
            onChange={(e) =>
              setCode(
                e.target.value.replace(/\D/g, '').slice(0, CODE_LENGTH),
                setStatus('')
              )
            }
            placeholder="Enter code"
            maxLength={CODE_LENGTH}
            className="w-full rounded-md border border-gray-300 p-3 text-center text-2xl tracking-widest outline-blue-500"
          />

          <button
            onClick={handleButtonClick}
            disabled={isVerifying || isResending}
            className={`mt-4 w-full ${
              timeExpired
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-blue-600 hover:bg-blue-700'
            } cursor-pointer rounded py-2 text-white transition disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {isVerifying || isResending
              ? timeExpired
                ? 'Resending...'
                : 'Verifying...'
              : timeExpired
                ? 'Resend Code'
                : 'Verify'}
          </button>

          {status && <p className="mt-4 font-medium text-gray-700">{status}</p>}

          <CountdownTimer
            duration={300}
            onExpire={handleExpire}
            resetKey={resetKey}
          />
        </div>
      </div>
    </ProfilerWrapper>
  );
}

export default Verify;
