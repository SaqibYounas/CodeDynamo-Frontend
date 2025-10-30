import React, { useRef, useState, useEffect } from 'react';
import FormApi from './Services/FormApi';
import { useLocalFormStorage } from '../hooks/useLocalFormStorage';
import { ProfilerWrapper } from '../utils/Profiler';

// List of countries with codes
const countries = [
  { name: 'Pakistan', code: '+92' },
  { name: 'India', code: '+91' },
  { name: 'United States', code: '+1' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'Canada', code: '+1' },
  { name: 'Australia', code: '+61' },
  { name: 'Bangladesh', code: '+880' },
  { name: 'UAE', code: '+971' },
  { name: 'Saudi Arabia', code: '+966' },
  { name: 'Germany', code: '+49' },
  { name: 'France', code: '+33' },
  { name: 'Nepal', code: '+977' },
  { name: 'Afghanistan', code: '+93' },
  { name: 'Sri Lanka', code: '+94' },
  { name: 'Malaysia', code: '+60' },
  { name: 'Indonesia', code: '+62' },
  { name: 'Philippines', code: '+63' },
  { name: 'Turkey', code: '+90' },
  { name: 'Iran', code: '+98' },
  { name: 'Iraq', code: '+964' },
  { name: 'Qatar', code: '+974' },
  { name: 'Bahrain', code: '+973' },
  { name: 'Oman', code: '+968' },
  { name: 'Kuwait', code: '+965' },
  { name: 'China', code: '+86' },
  { name: 'Japan', code: '+81' },
  { name: 'South Korea', code: '+82' },
  { name: 'Singapore', code: '+65' },
  { name: 'Thailand', code: '+66' },
  { name: 'Brazil', code: '+55' },
  { name: 'Mexico', code: '+52' },
  { name: 'Argentina', code: '+54' },
  { name: 'South Africa', code: '+27' },
];

const RequestService = () => {
  const serviceRef = useRef(null);
  const messageRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [enable, setEnable] = useState(true);

  const [countryCode, setCountryCode] = useState('+92');
  const [number, setNumber] = useState('+92');

  const stripCode = (number) => number.replace(/^\+\d+\s*/, '');
  let formKey = 'requestForm';

  useLocalFormStorage({
    formKey,
    messageRef,
    serviceRef,
    setCountryCode,
    setNumber,
  });
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith(countryCode)) return;

    setNumber(value);
  };

  const handleCountryChange = (e) => {
    const newCode = e.target.value;
    const onlyNumber = stripCode(number);
    setCountryCode(newCode);
    setNumber(newCode + onlyNumber);
  };

  const handleBlur = () => {
    const data = {
      message: messageRef.current?.value || '',
      whatsapp: number || '',
      service: serviceRef.current?.value || '',
    };
    const withExpiry = {
      value: data,
      expiry: Date.now() + 900 * 1000,
    };
    localStorage.setItem(formKey, JSON.stringify(withExpiry));
  };

  const hiddenErrors = (field) => {
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
    setSuccess('');
  };

  const validate = () => {
    const service = serviceRef.current.value;
    const whatsapp = number.trim();

    const newErrors = {};

    if (!/^\+\d{10,15}$/.test(whatsapp)) {
      newErrors.whatsapp =
        'Enter a valid WhatsApp number in international format';
      setErrors(newErrors);
      return false;
    }

    if (!service) {
      newErrors.service = 'Please select a service';
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setEnable(false);

    const formData = {
      whatsapp: number,
      service: serviceRef.current.value,
      description: messageRef.current.value,
    };

    const sendForm = await FormApi(formData);

    if (sendForm) {
      setSuccess('✅ Request submitted successfully!');
      localStorage.removeItem(formKey);
      setNumber(countryCode);
      serviceRef.current.value = '';
      messageRef.current.value = '';
    } else {
      setSuccess('❌ Server Error. Try Again!');
    }

    setEnable(true);
  };

  return (
    <ProfilerWrapper id="RequestForm">
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-lg transition hover:scale-[1.01]">
          <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
            Request a Service
          </h2>

          {success && (
            <div className="mb-4 rounded border border-green-300 bg-green-100 p-3 text-center text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Country Code + WhatsApp Input */}
            <div>
              <label className="mb-1 block font-medium text-gray-700">
                Country Code:
              </label>
              <select
                className="mt-1 w-full rounded border p-2"
                value={countryCode}
                onChange={handleCountryChange}
              >
                {countries.map((c) => (
                  <option key={`${c.name}-${c.code}`} value={c.code}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>

              <label className="mt-4 mb-1 block font-medium text-gray-700">
                WhatsApp Number:
              </label>
              <input
                type="tel"
                value={number}
                onChange={handlePhoneChange}
                onBlur={handleBlur}
                maxLength={16}
                className={`w-full rounded-md border px-4 py-2 ${
                  errors.whatsapp ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.whatsapp && (
                <p className="mt-1 text-sm font-semibold text-red-600">
                  {errors.whatsapp}
                </p>
              )}
            </div>

            {/* Service */}
            <div>
              <label className="mb-1 block font-medium text-gray-700">
                Select Service
              </label>
              <select
                onChange={() => hiddenErrors('service')}
                ref={serviceRef}
                onBlur={handleBlur}
                name="service"
                className={`w-full rounded-md border px-4 py-2 focus:ring focus:ring-pink-200 ${
                  errors.service ? 'border-red-500' : 'border-gray-300'
                } text-sm md:text-base`}
              >
                <option value="">-- Choose --</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Cloud Deployment">Cloud Deployment</option>
                <option value="QA & Testing">QA & Testing</option>
                <option value="AI Integration">AI Integration</option>
              </select>
              {errors.service && (
                <p className="mt-1 text-sm font-semibold text-red-600">
                  {errors.service}
                </p>
              )}
            </div>

            {/* Project Details */}
            <div>
              <label className="mb-1 block font-medium text-gray-700">
                Project Details
              </label>
              <textarea
                onChange={() => hiddenErrors('message')}
                ref={messageRef}
                onBlur={handleBlur}
                name="message"
                rows="4"
                placeholder="Tell us about your project..."
                className={`w-full rounded-md border px-4 py-2 ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-sm font-semibold text-red-600">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={!enable}
                className={`${
                  enable ? 'bg-blue-600' : 'cursor-not-allowed bg-gray-400'
                } cursor-pointer rounded-md px-6 py-2 text-white transition duration-300 hover:scale-105`}
              >
                {enable ? 'Submit Request' : 'Submitting...'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProfilerWrapper>
  );
};

export default RequestService;
