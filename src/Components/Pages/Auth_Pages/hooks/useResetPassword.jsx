import { useState, useRef } from 'react';
import { resetPasswordAPI } from '../api/resetPasswords';
import { STATUS_CODES } from '../constant/statusCodes';
import { resetMessages } from '../constant/resetMessages';

export const useResetPassword = (email, navigate) => {
  const passwordRef = useRef();
  const confirmRef = useRef();

  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value.trim();
    const confirmPass = confirmRef.current.value.trim();
    let hasError = false;

    setPasswordError('');
    setConfirmError('');
    setMessage('');

    if (!password) {
      setPasswordError(resetMessages.passwordRequired);
      hasError = true;
    } else if (!/^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)) {
      setPasswordError(resetMessages.passwordWeak);
      hasError = true;
    }

    if (!confirmPass) {
      setConfirmError(resetMessages.confirmRequired);
      hasError = true;
    } else if (password !== confirmPass) {
      setConfirmError(resetMessages.passwordMismatch);
      hasError = true;
    }

    if (hasError) return;

    const { status, data } = await resetPasswordAPI(email, password);

    if (status === STATUS_CODES.OK && data.message === resetMessages.success) {
      setMessage(resetMessages.successRedirect);
      setTimeout(() => navigate('/auth/login'), 2000);
    } else if (status === STATUS_CODES.SERVER_ERROR) {
      setMessage(resetMessages.serverError);
    } else {
      setMessage(data?.message || resetMessages.networkError);
    }
  };

  return {
    passwordRef,
    confirmRef,
    passwordError,
    confirmError,
    message,
    setPasswordError,
    setConfirmError,
    handleReset,
  };
};
