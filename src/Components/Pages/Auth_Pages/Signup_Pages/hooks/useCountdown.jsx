import { useEffect, useState } from 'react';

export function useCountdown(duration, onExpire, resetKey) {
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

  return timeLeft;
}
