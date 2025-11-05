import { useState } from 'react';
import { verifyCodeApi } from '../api/verifyAPI';
import { VERIFY_MESSAGES } from '../constant/message';
import { STATUS_CODES } from '../constant/statusCodes';
import(STATUS_CODES);
export function useVerifyCode(navigate) {
  const [status, setStatus] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyCode = async (code) => {
    if (code.length !== 6) {
      setStatus(VERIFY_MESSAGES.INVALID_LENGTH);
      return;
    }

    setIsVerifying(true);
    setStatus(VERIFY_MESSAGES.VERIFYING);
    const email = localStorage.getItem('email');

    try {
      const { status, data } = await verifyCodeApi(email, code);

      if (
        status === STATUS_CODES.SUCCESS &&
        data.message?.includes('verified')
      ) {
        setStatus(VERIFY_MESSAGES.VERIFIED);
        localStorage.removeItem('email');
        setTimeout(() => navigate('/user/dashboard'), 2000);
      } else if (status === STATUS_CODES.UNAUTHORIZED) {
        setStatus(`❌ ${data.message || VERIFY_MESSAGES.INVALID_CODE}`);
      } else {
        setStatus(data.message);
      }
    } catch {
      setStatus(VERIFY_MESSAGES.SERVER_ERROR);
      navigate('/auth/server-error');
    } finally {
      setIsVerifying(false);
    }
  };

  return { verifyCode, status, setStatus, isVerifying };
}
