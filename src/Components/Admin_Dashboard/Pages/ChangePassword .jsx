import React, { useRef, useState } from 'react';
import { changePassAPI } from './Services/ChangePassAPI';

export default function ChangePassword() {
  const currentRef = useRef(null);
  const newRef = useRef(null);
  const confirmRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [pending, setPending] = useState(false);

  const validate = () => {
    const current = currentRef.current.value.trim();
    const newPass = newRef.current.value.trim();
    const confirm = confirmRef.current.value.trim();
    const newErrors = {};

    if (!current) {
      newErrors.current = 'Please enter your current password';
    }

    if (!newPass.match(/^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)) {
      newErrors.new =
        'Password must be at least 8 characters and contain a special character.';
    }

    if (newPass !== confirm) {
      newErrors.confirm = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setPending(true);
    setSuccess('');
    setErrors({});

    let fromData = {
      current: currentRef.current.value,
      newPass: newRef.current.value,
    };

    try {
      let formAPI = await changePassAPI(fromData);
      if (!formAPI) {
        setSuccess('❌ Server error! Try again.');
      } else {
        setSuccess('✅ ' + formAPI);
        currentRef.current.value = '';
        newRef.current.value = '';
        confirmRef.current.value = '';
      }
    } catch (err) {
      setSuccess('❌ Something went wrong!');
    }

    setPending(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6 md:pl-80 lg:pl-64">
      <div className="w-full max-w-md rounded bg-white p-8 shadow">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="mb-1 block text-gray-700">Current Password</label>
            <input
              type="password"
              ref={currentRef}
              onChange={() => setErrors({ ...errors, current: '' })}
              className={`w-full rounded-md border px-4 py-2 ${
                errors.current ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter current password"
              disabled={pending}
            />
            {errors.current && (
              <p className="mt-1 text-sm font-semibold text-red-600">
                {errors.current}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="mb-1 block text-gray-700">New Password</label>
            <input
              type="password"
              ref={newRef}
              onChange={() => setErrors({ ...errors, new: '' })}
              className={`w-full rounded-md border px-4 py-2 ${
                errors.new ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="At least 8 characters, 1 special char"
              disabled={pending}
            />
            {errors.new && (
              <p className="mt-1 text-sm font-semibold text-red-600">
                {errors.new}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1 block text-gray-700">Confirm Password</label>
            <input
              type="password"
              ref={confirmRef}
              onChange={() => setErrors({ ...errors, confirm: '' })}
              className={`w-full rounded-md border px-4 py-2 ${
                errors.confirm ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirm new password"
              disabled={pending}
            />
            {errors.confirm && (
              <p className="mt-1 text-sm font-semibold text-red-600">
                {errors.confirm}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={pending}
              className={`cursor-poiter w-full rounded px-6 py-2 font-medium text-white transition-all duration-300 ${
                pending
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {pending ? 'Updating...' : 'Update Password'}
            </button>
          </div>

          {/* Success or Server Message */}
          {success && (
            <p
              className={`mt-4 text-center ${
                success.startsWith('✅')
                  ? 'text-green-600'
                  : 'mt-1 text-sm font-semibold text-red-600'
              }`}
            >
              {success}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
