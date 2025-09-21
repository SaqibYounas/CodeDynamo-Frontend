import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { ProfilerWrapper } from "../../Pages/utils/Profiler";

export default function Footer() {
  const listItemClass =
    "relative w-fit font-medium text-sm text-gray-300 transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all after:duration-300";

  return (
    <ProfilerWrapper id="Footer">
    <footer className="bg-gray-800 text-white py-10 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">CodeDynamo</h2>
          <p className="text-sm text-gray-300">
            CodeDynamo is an engineering and software agency that brings vision
            to life digitally.
          </p>
          <p className="mt-4 text-sm text-gray-400">Reviewed on</p>

          <div className="flex gap-6 text-xl text-white mt-4 ">
            <a
              href="mailto:muhammadsaqibyounas11@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D14836]"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://facebook.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-saqib-younas-0123aa329"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/SaqibYounas"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Services Section */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Services</h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li className={listItemClass}>Web Development</li>
            <li className={listItemClass}>Mobile Apps</li>
            <li className={listItemClass}>AI Integration</li>
            <li className={listItemClass}>UI/UX Design</li>
            <li className={listItemClass}>QA & Testing</li>
            <li className={listItemClass}>Cloud Services</li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li data-testid='services'>
              <Link to="/home" className={listItemClass}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/home/services" className={listItemClass}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/home/about" className={listItemClass}>
                About
              </Link>
            </li>
            <li>
              <Link to="/home/careers" className={listItemClass}>
                Careers
              </Link>
            </li>
            <li>
              <Link to="/home/contact" className={listItemClass}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Get In Touch</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className={`${listItemClass} flex items-center gap-2`}>
              <FaPhone className="text-blue-400" /> 03420339016
            </li>
            <li className={`${listItemClass} flex items-center gap-2`}>
              <FaEnvelope className="text-blue-400" />{" "}
              muhammadsaqibyounas11@gmail.com
            </li>
            <li className={`${listItemClass} flex items-start gap-2`}>
              <FaMapMarkerAlt className="text-blue-400 mt-1" />
              <span>Lahore Pakistan</span>
            </li>
          </ul>
        </div>
      </div>
      {/* Social Icons */}

      {/* Copyright */}
      <div className="text-center mt-10 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} CodeDynamo. All rights reserved.
      </div>
    </footer></ProfilerWrapper>
  );
}
