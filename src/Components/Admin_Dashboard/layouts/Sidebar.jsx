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
  FaFileInvoiceDollar,
  FaEye,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { logoutadmin } from '../Pages/Services/Logout';
import { useNotifications } from '../context/context';
export default function UserSidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { newCount, feedbackCount } = useNotifications();

  const handleLogout = () => {
    if (logoutadmin()) {
      navigate('/auth/login');
    } else {
      navigate('/auth/server-error');
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false); // Close sidebar on navigation (mobile)
  };

  const menuItems = [
    // 📋 PM Panel Routes
    { label: 'Dashboard', icon: <FaHome />, path: '/admin/dashboard' },
    { label: 'Manage Users', icon: <FaTools />, path: '/admin/manage-users' },
    { label: 'All Requests', icon: <FaListAlt />, path: '/admin/allrequests' },

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
      path: '/admin/notifications',
    },

    {
      label: 'Messages',
      icon: <FaEnvelopeOpenText />,
      path: '/admin/messages',
    },
    {
      label: 'Invoices Generate & Send',
      icon: <FaFileInvoiceDollar />,
      path: '/admin/invoices-generate',
    },
    {
      label: 'View Invoices & Update Status',
      icon: <FaEye />,
      path: '/admin/view-invoices-send',
    },
    {
      label: 'View Feedback',
      icon: (
        <div className="relative">
          <FaEnvelopeOpenText className="text-xl" />
          {feedbackCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
              {feedbackCount}
            </span>
          )}
        </div>
      ),
      path: '/admin/feedback',
    },

    { label: 'My Profile', icon: <FaUserCircle />, path: '/admin/profile' },
    {
      label: 'Change Password',
      icon: <FaKey />,
      path: '/admin/change-password',
    },
  ];

  return (
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
            CodeDynamo <br /> MyAdmin
          </span>
        </div>

        <ul className="mt-4 space-y-2 px-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavigate(item.path)}
              className="justify-betw flex cursor-pointer items-center space-x-3 rounded p-2 transition hover:bg-blue-600"
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
            className="flex w-full cursor-pointer items-center space-x-3 text-left transition hover:text-red-400"
          >
            <FaSignOutAlt />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
