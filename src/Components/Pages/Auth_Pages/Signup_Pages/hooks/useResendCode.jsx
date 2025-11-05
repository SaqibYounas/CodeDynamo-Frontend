import { useState } from 'react';
import { resendCodeApi } from '../api/resendAPI';
import { STATUS_CODES } from '../constant/statusCodes';
import { RESEND_MESSAGES } from '../constant/message';

export function useResendCode() {
  const [isResending, setIsResending] = useState(false);

  const resendCode = async (
    setStatus,
    setTimeExpired,
    setCode,
    setResetKey
  ) => {
    setIsResending(true);
    try {
      const email = localStorage.getItem('email');
      const { status, data } = await resendCodeApi(email);

      if (status === STATUS_CODES.SUCCESS) {
        setStatus(RESEND_MESSAGES.SUCCESS);
        setTimeExpired(false);
        setCode('');
        setResetKey(Date.now());
      } else {
        setStatus(`❌ ${data.message}`);
      }
    } catch {
      setStatus(RESEND_MESSAGES.FAILED);
    } finally {
      setIsResending(false);
    }
  };

  return { resendCode, isResending };
}
