import {
  FaHome,
  FaTools,
  FaListAlt,
  FaBell,
  FaUserCircle,
  FaEnvelopeOpenText,
  FaSignOutAlt,
  FaKey,
  FaBars,
  FaTimes,
  FaFileInvoice,
  FaUser,
  FaCommentDots,
} from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { logoutUser } from '../Pages/Services/Logout';
import { useNotifications } from '../context/context';
import { ProfilerWrapper } from '../utils/Profiler';
export default function UserSidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  let { newCount, fetchNotifications, newInvoiceCount } = useNotifications();

  const handleLogout = () => {
    if (logoutUser()) {
      navigate('/auth/login');
    } else {
      navigate('/auth/server-error');
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const menuItems = [
    { label: 'Dashboard', icon: <FaHome />, path: '/user/dashboard' },
    {
      label: 'Request Service',
      icon: <FaTools />,
      path: '/user/requestservice',
    },
    { label: 'My Requests', icon: <FaListAlt />, path: '/user/requests' },
    {
      label: 'Notifications',
      icon: (
        <div className="relative">
          <FaBell />
          {newCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
              {newCount}
            </span>
          )}
        </div>
      ),
      path: '/user/notifications',
    },
    { label: 'Messages', icon: <FaEnvelopeOpenText />, path: '/user/messages' },
    {
      label: 'My Invoices',
      icon: (
        <div className="relative">
          <FaFileInvoice />
          {newInvoiceCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
              {newInvoiceCount}
            </span>
          )}
        </div>
      ),
      path: '/user/my-invoices',
    },
    ,
    {
      label: 'Feedback',
      icon: <FaCommentDots />,
      path: '/user/feedback',
    },
    { label: 'My Profile', icon: <FaUserCircle />, path: '/user/profile' },
    {
      label: 'Change Password',
      icon: <FaKey />,
      path: '/user/change-password',
    },
  ];

  return (
    <ProfilerWrapper id="Sidebar">
      <>
        {/* Mobile Toggle Button */}
        <button
          className="fixed top-4 left-4 z-50 rounded bg-blue-600 p-2 text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 z-40 h-full w-64 transform bg-gray-800 text-white shadow-md transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        >
          {/* Sidebar Top */}
          <div className="border-b border-blue-600 py-4 text-center text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              CodeDynamo
              <br />
              MyUser
            </span>
          </div>

          <ul className="mt-4 space-y-2 px-4">
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleNavigate(item.path)}
                className="flex cursor-pointer items-center space-x-3 rounded p-2 transition hover:bg-blue-600"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </li>
            ))}
          </ul>

          {/* Sidebar Bottom */}
          <div className="absolute bottom-4 w-full border-t border-gray-700 px-4 pt-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center space-x-3 text-left transition hover:text-red-400"
            >
              <FaSignOutAlt />
              <span className="cursor-pointer text-sm">Logout</span>
            </button>
          </div>
        </div>
      </>
    </ProfilerWrapper>
  );
}
