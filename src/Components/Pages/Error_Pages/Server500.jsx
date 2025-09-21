// src/pages/ServerError.jsx
import { Link } from "react-router-dom";

function ServerError() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-red-600">500</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Internal Server Error</h2>
      <p className="text-gray-600 mb-6">Something went wrong on the server. Please try again later.</p>
      <Link to="/auth/login" className="text-blue-600 hover:underline text-sm">
        ← Go back to Home
      </Link>
    </div>
  );
}

export default ServerError;
