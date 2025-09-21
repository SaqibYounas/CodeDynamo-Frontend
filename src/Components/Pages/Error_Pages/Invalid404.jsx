import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-9xl font-bold text-red-500">404</h1>
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2 text-lg">
        Sorry! The page you are looking for does not exist.
      </p>
      <Link
        to="/auth/login"
        className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
