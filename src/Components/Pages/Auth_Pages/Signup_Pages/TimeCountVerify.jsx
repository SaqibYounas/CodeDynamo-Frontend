import { useEffect, useState } from 'react';

export default function CountdownTimer({ duration = 300, onExpire, resetKey }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    let expireAt = Date.now() + duration * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      const secondsLeft = Math.floor((expireAt - now) / 1000);

      if (secondsLeft <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        if (onExpire) onExpire();
      } else {
        setTimeLeft(secondsLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [resetKey]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="text-center text-lg font-semibold text-red-600 mt-4">
      {timeLeft > 0
        ? `OTP expires in: ${formatTime(timeLeft)}`
        : 'Code expired!'}
    </div>
  );
}
