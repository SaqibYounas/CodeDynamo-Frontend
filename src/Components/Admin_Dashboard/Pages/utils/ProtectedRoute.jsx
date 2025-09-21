// components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../Services/auth";
import Loader from "../../layouts/Loader";

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function checkAuth() {
      const res = await isAuthenticated();
      console.log("isAuthenticated result:", res);
      setAuth(res); 
    }
    console.log("Children received in ProtectedRoute:", children);

    checkAuth();
  }, [location.pathname]);

  if (auth === null) {
    return (
     <Loader/>
    );
  }

  // If not authenticated, redirect to login
  if (auth === 0) return <Navigate to="/auth/login" replace />;

  // If authenticated, show children
  return children;
}
