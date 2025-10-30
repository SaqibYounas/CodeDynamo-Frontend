import { Link } from 'react-router-dom';
import { ProfilerWrapper } from './utils/Profiler';
import { contactData } from './data/Contact';

function Contact() {
  const isAuthenticated = localStorage.getItem('token');
  const Icon = contactData.icon;

  return (
    <ProfilerWrapper id="contact">
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9FF] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div
          className="p-6 sm:p-10 bg-[#FAFAFA] rounded-[25px] sm:rounded-[35px] shadow-lg hover:shadow-2xl transition-all duration-300 w-full max-w-md sm:max-w-xl md:max-w-2xl text-center border"
          style={{
            borderImage: 'linear-gradient(to top, #F76680, #57007B) 1',
            borderImageSlice: 1,
          }}
        >
          <div className="mb-5 flex justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 border-purple-400 bg-white/70 shadow-md hover:scale-105 transition-transform">
              <Icon className="text-4xl sm:text-5xl text-[#57007B]" />
            </div>
          </div>

          <h2
            style={{
              background: 'linear-gradient(to right, #F76680, #57007B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
          >
            {contactData.title}
          </h2>

          <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed mb-8 text-justify sm:text-center whitespace-pre-line px-2 sm:px-4">
            This platform is proudly developed by{' '}
            <strong>{contactData.developer}</strong> and our expert team at{' '}
            <span className="bg-gradient-to-r from-[#6675F7] via-[#9E4CC9] to-[#F76680] bg-clip-text text-transparent font-semibold">
              {contactData.team}
            </span>
            .
            <br />
            {contactData.description}
          </p>

          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/auth/login"
                className="px-5 py-3 sm:px-6 sm:py-3 text-sm sm:text-base rounded-md font-semibold text-white bg-gradient-to-r from-[#6675F7] to-[#57007B] hover:opacity-90 transition shadow-md"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="px-5 py-3 sm:px-6 sm:py-3 text-sm sm:text-base rounded-md font-semibold border border-purple-400 text-gray-800 bg-white hover:bg-gray-100 transition shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <p className="text-green-600 font-medium text-sm sm:text-base">
              ✅ You are logged in. You can now send a request from your
              dashboard.
            </p>
          )}
        </div>
      </div>
    </ProfilerWrapper>
  );
}

export default Contact;
