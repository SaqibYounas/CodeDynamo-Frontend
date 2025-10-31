import { useState } from 'react';
import { checkEmail } from '../api/forgotPassword';
import { STATUS_CODES } from '../constant/statusCodes';
import { forgotMessages } from '../constant/forgotMessages';

export const useForgotPassword = (navigate) => {
  const [message, setMessage] = useState('');
  const [statusCode, setStatusCode] = useState(null);

  const handleForgotPassword = async (email) => {
    const { status, data } = await checkEmail(email);
    setStatusCode(status);

    if (status === STATUS_CODES.OK) {
      if (data.message === forgotMessages.notRegistered) {
        setMessage(forgotMessages.notRegistered);
      } else if (data.message === forgotMessages.emailFound) {
        navigate(`/auth/resetpassword?email=${email}`);
      } else if (
        data.message === forgotMessages.googleAccount &&
        data.googleAccount === true
      ) {
        setMessage(forgotMessages.googleAccount);
      }
    } else if (status === STATUS_CODES.SERVER_ERROR) {
      setMessage(forgotMessages.serverError);
    } else {
      setMessage(forgotMessages.networkError);
    }
  };

  return { message, statusCode, setMessage, handleForgotPassword };
};
