import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaCogs,
  FaInfoCircle,
  FaEnvelope,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ProfilerWrapper } from '../../Pages/utils/Profiler';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { name: 'Home', href: '/home', icon: <FaHome /> },
    { name: 'Services', href: '/home/services', icon: <FaCogs /> },
    { name: 'About', href: '/home/about', icon: <FaInfoCircle /> },
    { name: 'Contact', href: '/home/contact', icon: <FaEnvelope /> },
  ];

  const navList = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <ProfilerWrapper id="Header">
      <header className="sticky top-0 z-50 bg-gradient-to-r from-white via-blue-50 to-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* 🔹 Logo */}
          <Link
            to="/home"
            onClick={closeMenu}
            className="flex transform items-center text-2xl font-bold transition-transform hover:scale-105 sm:text-3xl"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              CodeDynamo
            </span>
          </Link>

          {/* 🔹 Desktop Navigation */}
          <motion.nav
            className="hidden space-x-6 md:flex"
            initial="hidden"
            animate="visible"
            variants={navList}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === '/home'}
                className={({ isActive }) =>
                  `relative font-medium capitalize transition duration-300 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:content-[''] ${
                    isActive
                      ? 'text-blue-600 after:w-full'
                      : 'text-gray-700 after:w-0 hover:text-blue-500 hover:after:w-full'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </motion.nav>

          <div className="flex space-x-2">
            <Link
              to="/auth/login"
              className="rounded-md bg-gradient-to-r from-[#6675F7] to-[#57007B] px-3 py-1.5 text-xs text-white shadow-sm transition hover:opacity-90 sm:px-4 sm:py-2 sm:text-sm md:text-base"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="rounded-md bg-gradient-to-r from-[#6675F7] to-[#57007B] px-3 py-1.5 text-xs text-white shadow-sm transition hover:opacity-90 sm:px-4 sm:py-2 sm:text-sm md:text-base"
            >
              Signup
            </Link>

            <button
              onClick={toggleMenu}
              className="ml-2 text-2xl text-blue-600 md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* 🔹 Mobile Menu */}
        <div
          data-testid="mobile-menu"
          className={`fixed top-16 right-0 w-60 rounded-l-lg border-l border-gray-200 bg-white shadow-xl transition-transform duration-500 ease-in-out md:hidden ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          <ul className="flex flex-col space-y-2 py-4 text-sm font-medium">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 rounded-md px-5 py-2 transition-all duration-300 ${
                      isActive
                        ? 'bg-gray-100 text-black'
                        : 'text-gray-800 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="tracking-wide uppercase">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </header>
    </ProfilerWrapper>
  );
}
