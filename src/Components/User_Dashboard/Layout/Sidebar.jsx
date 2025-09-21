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
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { logoutUser } from "../Pages/Services/Logout";
import { useNotifications } from "../context/context";
import { ProfilerWrapper } from "../utils/Profiler";
export default function UserSidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  let { newCount, fetchNotifications, newInvoiceCount } = useNotifications();

  const handleLogout = () => {
    if (logoutUser()) {
      navigate("/auth/login");
    } else {
      navigate("/auth/server-error");
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
    { label: "Dashboard", icon: <FaHome />, path: "/user/dashboard" },
    {
      label: "Request Service",
      icon: <FaTools />,
      path: "/user/requestservice",
    },
    { label: "My Requests", icon: <FaListAlt />, path: "/user/requests" },
    {
      label: "Notifications",
      icon: (
        <div className="relative">
          <FaBell />
          {newCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {newCount}
            </span>
          )}
        </div>
      ),
      path: "/user/notifications",
    },
    { label: "Messages", icon: <FaEnvelopeOpenText />, path: "/user/messages" },
    {
      label: "My Invoices",
      icon: (
        <div className="relative">
          <FaFileInvoice />
          {newInvoiceCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {newInvoiceCount}
            </span>
          )}
        </div>
      ),
      path: "/user/my-invoices",
    },
    ,
    {
      label: "Feedback",
      icon: <FaCommentDots />,
      path: "/user/feedback",
    },
    { label: "My Profile", icon: <FaUserCircle />, path: "/user/profile" },
    {
      label: "Change Password",
      icon: <FaKey />,
      path: "/user/change-password",
    },
  ];

  return (
    <ProfilerWrapper id="Sidebar">
      <>
        {/* Mobile Toggle Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded "
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-md z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          {/* Sidebar Top */}
          <div className="text-2xl font-bold text-center py-4 border-b border-blue-600">
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
                className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-blue-600 transition"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </li>
            ))}
          </ul>

          {/* Sidebar Bottom */}
          <div className="absolute bottom-4 w-full px-4 border-t border-gray-700 pt-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full space-x-3 text-left hover:text-red-400 transition"
            >
              <FaSignOutAlt />
              <span className="text-sm cursor-pointer">Logout</span>
            </button>
          </div>
        </div>
      </>
    </ProfilerWrapper>
  );
}
