// src/Routes/UserRoutes.jsx
import { Route } from 'react-router-dom';
import { lazy } from 'react';
import UserLayout from '../Components/User_Dashboard/Layout/UserLayout';
const Dashboard = lazy(
  () => import('../Components/User_Dashboard/Pages/Dashboard')
);
const RequestService = lazy(
  () => import('../Components/User_Dashboard/Pages/RequestService')
);
const MyRequest = lazy(
  () => import('../Components/User_Dashboard/Pages/MyRequest')
);
const Notifications = lazy(
  () => import('../Components/User_Dashboard/Pages/Notifications')
);
const Messages = lazy(
  () => import('../Components/User_Dashboard/Pages/Messages')
);
const ChangePassword = lazy(
  () => import('../Components/User_Dashboard/Pages/ChangePassword')
);
const Profile = lazy(
  () => import('../Components/User_Dashboard/Pages/Profile')
);
const MyInvoices = lazy(
  () => import('../Components/User_Dashboard/Pages/MyInvoices')
);
const Feedback = lazy(
  () => import('../Components/User_Dashboard/Pages/Feedback')
);

import ProtectedRoute from '../Components/User_Dashboard/utils/ProtectedRoute';

const userRoutes = (
  <Route
    path="/user"
    element={
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
    }
  >
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="requestservice" element={<RequestService />} />
    <Route path="requests" element={<MyRequest />} />
    <Route path="notifications" element={<Notifications />} />
    <Route path="messages" element={<Messages />} />
    <Route path="change-password" element={<ChangePassword />} />
    <Route path="profile" element={<Profile />} />
    <Route path="my-invoices" element={<MyInvoices />} />
    <Route path="feedback" element={<Feedback />} />
  </Route>
);

export default userRoutes;
