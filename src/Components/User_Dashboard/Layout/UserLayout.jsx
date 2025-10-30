// src/Components/User_Dashboard/Layout/UserLayout.jsx
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from './Sidebar';
import { useLoader } from '../context/Loaders';
import Loader from './Loader';
import UserSocketProvider from '../socket/events/Socket';

const UserLayout = () => {
  const { loading } = useLoader();

  return (
    <div className="flex min-h-screen p-4">
      {/* Sidebar - always visible */}
      <UserSidebar />

      {/* Main content */}
      <div className="relative flex-1 p-4">
        {/* Loader only over Outlet area */}
        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60">
            <Loader />
          </div>
        )}

        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
        <UserSocketProvider />
      </div>
    </div>
  );
};

export default UserLayout;
