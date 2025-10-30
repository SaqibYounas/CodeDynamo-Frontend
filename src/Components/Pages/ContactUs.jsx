import { Link } from 'react-router-dom';
import { ProfilerWrapper } from './utils/Profiler';
import { contactData } from './data/Contact';

function Contact() {
  const isAuthenticated = localStorage.getItem('token');
  const Icon = contactData.icon;

  return (
    <ProfilerWrapper id="contact">
      <div className="flex min-h-screen items-center justify-center bg-[#F9F9FF] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div
          className="w-full max-w-md rounded-[25px] border bg-[#FAFAFA] p-6 text-center shadow-lg transition-all duration-300 hover:shadow-2xl sm:max-w-xl sm:rounded-[35px] sm:p-10 md:max-w-2xl"
          style={{
            borderImage: 'linear-gradient(to top, #F76680, #57007B) 1',
            borderImageSlice: 1,
          }}
        >
          <div className="mb-5 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-purple-400 bg-white/70 shadow-md transition-transform hover:scale-105 sm:h-20 sm:w-20">
              <Icon className="text-4xl text-[#57007B] sm:text-5xl" />
            </div>
          </div>

          <h2
            style={{
              background: 'linear-gradient(to right, #F76680, #57007B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl"
          >
            {contactData.title}
          </h2>

          <p className="mb-8 px-2 text-justify text-base leading-relaxed whitespace-pre-line text-gray-700 sm:px-4 sm:text-center sm:text-lg md:text-xl">
            This platform is proudly developed by{' '}
            <strong>{contactData.developer}</strong> and our expert team at{' '}
            <span className="bg-gradient-to-r from-[#6675F7] via-[#9E4CC9] to-[#F76680] bg-clip-text font-semibold text-transparent">
              {contactData.team}
            </span>
            .
            <br />
            {contactData.description}
          </p>

          {!isAuthenticated ? (
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/auth/login"
                className="rounded-md bg-gradient-to-r from-[#6675F7] to-[#57007B] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90 sm:px-6 sm:py-3 sm:text-base"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="rounded-md border border-purple-400 bg-white px-5 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-100 sm:px-6 sm:py-3 sm:text-base"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <p className="text-sm font-medium text-green-600 sm:text-base">
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
