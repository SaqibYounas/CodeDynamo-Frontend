import SideBar from '../../Admin_Dashboard/layouts/Sidebar';
import TopBar from './Topbar';
import { Outlet } from 'react-router-dom';
import Loader from './Loader';
import { Suspense } from 'react';
import { useLoader } from '../context/Loaders';
import Layout from './Socket'; // ✅ Import your socket layout

export default function AdminLayout() {
  const { loading } = useLoader();

  return (
    <Layout>
      <div className="flex w-full h-screen">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <TopBar />

          <div className="relative flex-1 p-4">
            {/* ✅ Loader only inside this page content area */}
            {loading && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60">
                <Loader />
              </div>
            )}

            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>

        {/* ✅ Sidebar on right side */}
        <SideBar />
      </div>
    </Layout>
  );
}
