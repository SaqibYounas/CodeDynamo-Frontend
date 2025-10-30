// hooks/useForm.js
import { useState } from 'react';

export const useForm = (initialValues, validateFn) => {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [pending, setPending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
  };

  const handleSubmit = async (e, callback) => {
    e.preventDefault();
    setResponseMessage('');

    const validationErrors = validateFn(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setPending(true);
    const isSuccess = await callback(form);

    setPending(false);
    setIsError(!isSuccess);
    setResponseMessage(
      isSuccess
        ? '✅ Your feedback has been sent successfully!'
        : '❌ Server error. Please try again later.'
    );

    if (isSuccess) {
      setForm(initialValues);
    }
  };

  return {
    form,
    setForm,
    errors,
    setErrors,
    responseMessage,
    isError,
    pending,
    handleChange,
    handleSubmit,
  };
};
