import { Link } from "react-router-dom";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { ProfilerWrapper } from "./utils/Profiler";

function Contact() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <ProfilerWrapper id="contact">
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-100 to-gray-100 px-4 py-20">
      <div className="bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 max-w-2xl w-full text-center border border-gray-200">
        {/* Icon */}
        <div className="mb-5">
          <FaEnvelopeOpenText className="text-6xl text-blue-600 mx-auto transition-transform duration-300 hover:-translate-y-1" />
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Get in Touch
        </h2>

        {/* Description */}
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          This platform is proudly developed by <strong>Saqib</strong> and our
          expert team at{" "}
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
            CodeDynamo
          </span>
          .
          <br />
          <br />
          We build high-quality, scalable, and modern digital solutions tailored
          to your needs. Whether you're looking for support, a service request,
          or just want to say hello — we're always here to help!
          <br />
          <br />
          Please log in to contact us from your dashboard. If you're new, sign
          up and explore.
        </p>

        {/* Conditional Buttons */}
        {!isAuthenticated ? (
          <div className="flex justify-center gap-4">
            <Link
              to="/auth/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-100 transition font-semibold"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <p className="text-green-600 font-medium">
            ✅ You are logged in. You can now send a request from your
            dashboard.
          </p>
        )}
      </div>
    </div></ProfilerWrapper>
  );
}

export default Contact;
