import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-bold text-red-500">404</h1>
      <h2 className="mt-4 text-3xl font-semibold text-gray-800 md:text-4xl">
        Page Not Found
      </h2>
      <p className="mt-2 text-lg text-gray-600">
        Sorry! The page you are looking for does not exist.
      </p>
      <Link
        to="/auth/login"
        className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-white shadow transition duration-300 hover:bg-blue-700"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
