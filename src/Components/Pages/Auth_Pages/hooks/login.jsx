import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../api/loginAPI';
import { loginMessages } from '../constant/loginMessages';
import { STATUS_CODES } from '../constant/statusCodes';

export const useLogin = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [response, setResponse] = useState('');
  const [pending, setPending] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const formKey = 'login-form';

  useEffect(() => {
    const itemStr = localStorage.getItem(formKey);
    if (!itemStr) return;
    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(formKey);
    } else if (emailRef.current) {
      emailRef.current.value = item.value.email;
    }
  }, []);

  const handleBlur = () => {
    const data = { email: emailRef.current?.value || '' };
    const withExpiry = { value: data, expiry: Date.now() + 900 * 1000 };
    localStorage.setItem(formKey, JSON.stringify(withExpiry));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    setEmailError('');
    setPasswordError('');
    setResponse('');

    if (!email) return setEmailError(loginMessages.emailRequired);
    if (!password) return setPasswordError(loginMessages.passwordRequired);
    if (!email.match(/^\S+@\S+\.\S+$/))
      return setEmailError(loginMessages.invalidEmail);

    setPending(true);
    try {
      const { status, data } = await loginAPI(email, password);

      if (
        status === STATUS_CODES.BAD_REQUEST &&
        data.message === loginMessages.passwordMismatch
      ) {
        setPasswordError(data.message);
      } else if (
        status === STATUS_CODES.BAD_REQUEST &&
        data.message === loginMessages.emailNotFound
      ) {
        setEmailError(data.message);
      } else if (status === STATUS_CODES.SUCCESS) {
        navigate(
          data.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'
        );
        localStorage.removeItem(formKey);
        setResponse(loginMessages.success);
      } else {
        setResponse(data.message || loginMessages.unknownError);
      }
    } catch {
      setResponse(loginMessages.networkError);
    } finally {
      setPending(false);
    }
  };

  return {
    emailRef,
    passwordRef,
    response,
    pending,
    emailError,
    passwordError,
    showPassword,
    setEmailError,
    setShowPassword,
    handleBlur,
    handleSubmit,
  };
};
