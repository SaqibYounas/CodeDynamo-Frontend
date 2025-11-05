import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { url } from '../Port';
import { signupMessages } from '../constant/signupMessages';
import { STATUS_CODES } from '../constant/statusCodes';

export const useSignup = () => {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [response, setResponse] = useState('');
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const formKey = 'signup-form';

  useEffect(() => {
    const itemStr = localStorage.getItem(formKey);
    if (!itemStr) return;
    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(formKey);
    } else {
      if (nameRef.current) nameRef.current.value = item.value.name;
      if (emailRef.current) emailRef.current.value = item.value.email;
    }
  }, []);

  const handleBlur = () => {
    const data = {
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || '',
    };
    const withExpiry = { value: data, expiry: Date.now() + 900 * 1000 };
    localStorage.setItem(formKey, JSON.stringify(withExpiry));
  };

  const validateInputs = () => {
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    let hasError = false;
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setResponse('');

    if (!name) {
      setNameError(signupMessages.nameRequired);
      hasError = true;
    } else if (!/^[A-Za-z ]+$/.test(name)) {
      setNameError(signupMessages.invalidName);
      hasError = true;
    }

    if (!email) {
      setEmailError(signupMessages.emailRequired);
      hasError = true;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      setEmailError(signupMessages.invalidEmail);
      hasError = true;
    }

    if (!password) {
      setPasswordError(signupMessages.passwordRequired);
      hasError = true;
    } else if (!/^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)) {
      setPasswordError(signupMessages.passwordWeak);
      hasError = true;
    }

    if (hasError) return null;
    return { name, email, password };
  };

  const handleSignup = async (signupAPI) => {
    const formData = validateInputs();
    if (!formData) return;

    const { name, email, password } = formData;
    setPending(true);
    localStorage.setItem('email', email);

    try {
      const { status, data } = await signupAPI(name, email, password);

      if (status === STATUS_CODES.CONFLICT) {
        setEmailError(data.message || signupMessages.emailExists);
      } else if (status === STATUS_CODES.SERVER_ERROR) {
        navigate('/auth/server-error');
      } else if (status === STATUS_CODES.BAD_REQUEST) {
        setEmailError(data.message || signupMessages.invalidDomain);
      } else if (status === STATUS_CODES.SUCCESS) {
        navigate('/auth/verify');
      } else {
        setResponse(signupMessages.unknownResponse);
      }

      localStorage.removeItem(formKey);
    } catch {
      setResponse(signupMessages.networkError);
    } finally {
      setPending(false);
    }
  };

  const redirectToGoogle = () => {
    localStorage.removeItem(formKey);
    window.location.href = `${url}/auth/google`;
  };

  return {
    nameRef,
    emailRef,
    passwordRef,
    nameError,
    emailError,
    passwordError,
    response,
    pending,
    showPassword,
    setNameError,
    setEmailError,
    setPasswordError,
    setShowPassword,
    handleBlur,
    handleSignup,
    redirectToGoogle,
  };
};
