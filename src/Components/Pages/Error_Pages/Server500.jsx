// src/pages/ServerError.jsx
import { Link } from 'react-router-dom';

function ServerError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold text-red-600">500</h1>
      <h2 className="mb-2 text-2xl font-semibold text-gray-800">
        Internal Server Error
      </h2>
      <p className="mb-6 text-gray-600">
        Something went wrong on the server. Please try again later.
      </p>
      <Link to="/auth/login" className="text-sm text-blue-600 hover:underline">
        ← Go back to Home
      </Link>
    </div>
  );
}

export default ServerError;
