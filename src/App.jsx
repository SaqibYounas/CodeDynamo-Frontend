// src/App.jsx
import React, { Profiler } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import AppErrorBoundary from './Components/Error_Handling/AppErrorBoundary';
import Header from './Components/Layouts/Main_Layouts/Header';
import Footer from './Components/Layouts/Main_Layouts/Footer';
import publicRoutes from './Routes/PublicRoutes';
import userRoutes from './Routes/UserRoutes';
import adminRoute from './Routes/AdminRoutes';
import Invalid404 from './Components/Pages/Error_Pages/Invalid404';
import Loader from './Components/User_Dashboard/Layout/Loader';
import { NotificationProvider } from './Components/User_Dashboard/context/context';
import { NotificationProviders } from './Components/Admin_Dashboard/context/context.jsx';

function AppWrapper() {
  const location = useLocation();
  const isDashboardUser = location.pathname.startsWith('/user');
  const isDashboardAdmin = location.pathname.startsWith('/admin');

  return (
    <AppErrorBoundary>
      <div className="flex min-h-screen flex-col">
        {!isDashboardUser && !isDashboardAdmin && <Header />}
        <main className="flex-grow">
          <Suspense fallback={<Loader />}>
            <Routes>
              {publicRoutes}
              {userRoutes}
              {adminRoute}

              <Route path="*" element={<Invalid404 />} />
            </Routes>
          </Suspense>
        </main>
        {!isDashboardUser && !isDashboardAdmin && <Footer />}
      </div>
    </AppErrorBoundary>
  );
}

function App() {
  return (
    <AppErrorBoundary>
      <NotificationProviders>
        <NotificationProvider>
          <BrowserRouter>
            <AppWrapper />
          </BrowserRouter>
        </NotificationProvider>
      </NotificationProviders>
    </AppErrorBoundary>
  );
}

export default App;
