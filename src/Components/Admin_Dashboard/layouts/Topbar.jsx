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
    <div className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
      <h1 className="flex items-center gap-2 text-xl font-bold">
        <FaTachometerAlt className="text-blue-600" />
        Admin Dashboard
      </h1>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="rounded border border-gray-300 px-3 py-1 pl-9"
          />
          <FaSearch className="absolute top-2.5 left-2 text-gray-400" />
        </div>

        <FaUserCircle className="text-2xl text-gray-700" title="Admin" />
        <FaBell className="text-2xl text-gray-700" title="Notifications" />

        <button className="flex items-center rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600">
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}
