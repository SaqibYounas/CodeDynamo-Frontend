// import { useEffect, useState } from 'react';

// export default function CountdownTimer({ duration = 300, onExpire, resetKey }) {
//   const [timeLeft, setTimeLeft] = useState(duration);

//   useEffect(() => {
//     let expireAt = Date.now() + duration * 1000;

//     const interval = setInterval(() => {
//       const now = Date.now();
//       const secondsLeft = Math.floor((expireAt - now) / 1000);

//       if (secondsLeft <= 0) {
//         clearInterval(interval);
//         setTimeLeft(0);
//         if (onExpire) onExpire();
//       } else {
//         setTimeLeft(secondsLeft);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [resetKey]);

//   const formatTime = (seconds) => {
//     const m = String(Math.floor(seconds / 60)).padStart(2, '0');
//     const s = String(seconds % 60).padStart(2, '0');
//     return `${m}:${s}`;
//   };

//   return (
//     <div className="mt-4 text-center text-lg font-semibold text-red-600">
//       {timeLeft > 0
//         ? `OTP expires in: ${formatTime(timeLeft)}`
//         : 'Code expired!'}
//     </div>
//   );
// }

import React from 'react';
import { useCountdown } from './hooks/useCountdown';
import { formatTime } from './utils/formatTime';
import {
  DEFAULT_DURATION,
  EXPIRED_TEXT,
  ACTIVE_TEXT_PREFIX,
} from './constant/timerConstants';

export default function CountdownTimer({
  duration = DEFAULT_DURATION,
  onExpire,
  resetKey,
}) {
  const timeLeft = useCountdown(duration, onExpire, resetKey);

  return (
    <div className="mt-4 text-center text-lg font-semibold text-red-600">
      {timeLeft > 0
        ? `${ACTIVE_TEXT_PREFIX} ${formatTime(timeLeft)}`
        : EXPIRED_TEXT}
    </div>
  );
}
