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
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl transition hover:scale-[1.01]">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Request a Service
          </h2>

          {success && (
            <div className="bg-green-100 text-green-700 text-center p-3 rounded mb-4 border border-green-300">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Country Code + WhatsApp Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Country Code:
              </label>
              <select
                className="w-full mt-1 p-2 border rounded"
                value={countryCode}
                onChange={handleCountryChange}
              >
                {countries.map((c) => (
                  <option key={`${c.name}-${c.code}`} value={c.code}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>

              <label className="block mt-4 text-gray-700 font-medium mb-1">
                WhatsApp Number:
              </label>
              <input
                type="tel"
                value={number}
                onChange={handlePhoneChange}
                onBlur={handleBlur}
                maxLength={16}
                className={`w-full px-4 py-2 border rounded-md ${
                  errors.whatsapp ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.whatsapp && (
                <p className="text-red-600 text-sm mt-1 font-semibold">
                  {errors.whatsapp}
                </p>
              )}
            </div>

            {/* Service */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Select Service
              </label>
              <select
                onChange={() => hiddenErrors('service')}
                ref={serviceRef}
                onBlur={handleBlur}
                name="service"
                className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-pink-200 ${
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
                <p className="text-red-600 text-sm mt-1 font-semibold">
                  {errors.service}
                </p>
              )}
            </div>

            {/* Project Details */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Project Details
              </label>
              <textarea
                onChange={() => hiddenErrors('message')}
                ref={messageRef}
                onBlur={handleBlur}
                name="message"
                rows="4"
                placeholder="Tell us about your project..."
                className={`w-full px-4 py-2 border rounded-md ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
              ></textarea>
              {errors.message && (
                <p className="text-red-600 text-sm mt-1 font-semibold">
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
                  enable ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                } text-white px-6 py-2 rounded-md hover:scale-105 transition duration-300 cursor-pointer`}
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
