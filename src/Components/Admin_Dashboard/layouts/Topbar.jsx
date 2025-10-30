// components/Topbar.jsx
import {
  FaSearch,
  FaUserCircle,
  FaBell,
  FaSignOutAlt,
  FaTachometerAlt,
} from 'react-icons/fa';

export default function Topbar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <h1 className="text-xl font-bold flex items-center gap-2">
        <FaTachometerAlt className="text-blue-600" />
        Admin Dashboard
      </h1>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded px-3 py-1 pl-9"
          />
          <FaSearch className="absolute left-2 top-2.5 text-gray-400" />
        </div>

        <FaUserCircle className="text-2xl text-gray-700" title="Admin" />
        <FaBell className="text-2xl text-gray-700" title="Notifications" />

        <button className="flex items-center bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}
