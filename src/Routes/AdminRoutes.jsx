// src/Routes/AdminRoutes.jsx
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

import AdminLayout from "../Components/Admin_Dashboard/layouts/AdminLayout";
const Dashboard = lazy(() =>
  import("../Components/Admin_Dashboard/Pages/Dashboard")
);
const ManageUsers = lazy(() =>
  import("../Components/Admin_Dashboard/Pages/ManageUsers")
);
const AllRequests = lazy(() =>
  import("../Components/Admin_Dashboard/Pages/AllRequests")
);
const Messages = lazy(() =>
  import("../Components/Admin_Dashboard/Pages/Messages")
);
const Profile = lazy(() =>
  import("../Components/Admin_Dashboard/Pages/Profile")
);
const ChangePassword = lazy(() =>
  import("../Components/Admin_Dashboard/Pages/ChangePassword ")
);
const Notifications = lazy(() =>
  import("../Components/Admin_Dashboard/Pages/Notifications")
);
const InvoiceGenerate = lazy(() =>
  import("../Components/Admin_Dashboard/Pages/InvoiceGenerate")
);
const ViewFeedback= lazy(() =>
  import("../Components/Admin_Dashboard/Pages/ViewFeedback")
);
const ViewInvoices = lazy(() =>
  import("../Components/Admin_Dashboard/Pages/ViewInvoicesSend")
);
import ProtectedRoute from "../Components/Admin_Dashboard/Pages/utils/ProtectedRoute";

const AdminRoutes = (
  <Route
    path="/admin"
    element={
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    }
  >
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="manage-users" element={<ManageUsers />} />
    <Route path="allrequests" element={<AllRequests />} />
    <Route path="messages" element={<Messages />} />
    <Route path="profile" element={<Profile />} />
    <Route path="change-password" element={<ChangePassword />} />
    <Route path="notifications" element={<Notifications />} />
    <Route path="invoices-generate" element={<InvoiceGenerate />} />
    <Route path="view-invoices-send" element={<ViewInvoices />} />
    <Route path="feedback" element={<ViewFeedback />} />
  </Route>
);

export default AdminRoutes;
