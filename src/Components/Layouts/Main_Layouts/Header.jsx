import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { ProfilerWrapper } from "../../Pages/utils/Profiler";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navList = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <ProfilerWrapper id="Header">
      <header className="bg-gradient-to-r from-white via-blue-50 to-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo (with hover zoom effect) */}
          <Link
            to="/home"
            onClick={closeMenu}
            className="flex items-center font-bold text-2xl sm:text-3xl transform transition-transform hover:scale-105"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              CodeDynamo
            </span>
          </Link>

          {/* Mobile Buttons */}
          <div className="flex items-center space-x-2 md:hidden">
            <Link
              to="/auth/login"
              className="px-3 py-1 text-sm border border-blue-600 text-white rounded-md hover:bg-blue-600 hover:text-white transition shadow-sm"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm"
            >
              Signup
            </Link>
            <button
              onClick={toggleMenu}
              className="text-blue-600 text-xl"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex space-x-6"
            initial="hidden"
            animate="visible"
            variants={navList}
          >
            {["home", "services", "about", "contact"].map((path) => (
              <NavLink
                key={path}
                to={path === "home" ? "/home" : `/home/${path}`}
                end={path === "home"}
                className={({ isActive }) =>
                  `relative font-medium capitalize transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 ${
                    isActive
                      ? "text-blue-600 after:w-full"
                      : "text-gray-700 hover:text-blue-500 after:w-0 hover:after:w-full"
                  }`
                }
              >
                {path}
              </NavLink>
            ))}
          </motion.nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-2">
            <Link
              to="/auth/login"
              className="px-4 py-2 bg-gradient-to-r from-[#6675F7] to-[#57007B] text-white rounded-md hover:opacity-90 transition shadow-sm"
            >
              Login
            </Link>

            <Link
              to="/auth/signup"
              className="px-4 py-2 bg-gradient-to-r from-[#6675F7] to-[#57007B] text-white hover:opacity-90 rounded-md transition shadow-sm"
            >
              Signup
            </Link>
          </div>
        </div>

        {/* Mobile Sidebar Navigation */}
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="md:hidden fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-white via-blue-50 to-white shadow-xl z-50 px-6 py-6 space-y-6"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
                CodeDynamo
              </span>
              <button onClick={closeMenu} className="text-blue-600 text-2xl">
                <FaTimes />
              </button>
            </div>

            {["home", "services", "about", "contact"].map((path) => (
              <NavLink
                key={path}
                to={path === "home" ? "/home" : `/home/${path}`}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `relative block font-medium capitalize transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 ${
                    isActive
                      ? "text-blue-600 after:w-full"
                      : "text-gray-700 hover:text-blue-500 after:w-0 hover:after:w-full"
                  }`
                }
              >
                {path}
              </NavLink>
            ))}
          </motion.div>
        )}
      </header>
    </ProfilerWrapper>
  );
}
