import { useState } from 'react';
import { checkEmail } from '../api/forgotPassword';
import { STATUS_CODES } from '../constant/statusCodes';
import { forgotMessages } from '../constant/forgotMessages';

export const useForgotPassword = (navigate) => {
  const [message, setMessage] = useState('');
  const [statusCode, setStatusCode] = useState(null);

  const handleForgotPassword = async (email) => {
    try {
      const { status, data } = await checkEmail(email);
      setStatusCode(status);
      console.log(data, status);

      if (status === STATUS_CODES.SUCCESS) {
        if (data.message === forgotMessages.notRegistered) {
          setMessage(forgotMessages.notRegistered);
        } else if (data.message === forgotMessages.emailFound) {
          navigate(`/auth/resetpassword?email=${email}`);
        } else if (
          data.message === forgotMessages.googleAccount &&
          data.googleAccount === true
        ) {
          setMessage(forgotMessages.googleAccount);
        } else {
          setMessage(forgotMessages.networkError);
        }
      } else if (status === STATUS_CODES.SERVER_ERROR) {
        setMessage(forgotMessages.serverError);
      } else {
        setMessage(forgotMessages.networkError);
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setStatusCode(null);
      setMessage(forgotMessages.networkError);
    }
  };

  return { message, statusCode, setMessage, handleForgotPassword };
};
