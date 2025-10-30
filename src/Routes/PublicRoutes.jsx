// src/Routes/PublicRoutes.jsx
import { Route } from 'react-router-dom';
import { lazy } from 'react';
import Layout from '../Components/Layouts/Layout';

const Home = lazy(() => import('../Components/Pages/Home'));
const Services = lazy(() => import('../Components/Pages/Services'));
const About = lazy(() => import('../Components/Pages/About'));
const Contact = lazy(() => import('../Components/Pages/ContactUs'));
const Signup = lazy(
  () => import('../Components/Pages/Auth_Pages/Signup_Pages/Signup')
);
const Verify = lazy(
  () => import('../Components/Pages/Auth_Pages/Signup_Pages/Verify')
);
const Login = lazy(
  () => import('../Components/Pages/Auth_Pages/Login_Pages/Login')
);
const ForgotPassword = lazy(
  () => import('../Components/Pages/Auth_Pages/Login_Pages/ForgotPassword')
);
const ResetPassword = lazy(
  () => import('../Components/Pages/Auth_Pages/Login_Pages/ResetPassword')
);
const Server500 = lazy(
  () => import('../Components/Pages/Error_Pages/Server500')
);
const Invalid404 = lazy(
  () => import('../Components/Pages/Error_Pages/Invalid404')
);

const publicRoutes = (
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="auth/signup" element={<Signup />} />
    <Route path="auth/login" element={<Login />} />
    <Route path="auth/server-error" element={<Server500 />} />
    <Route path="auth/verify" element={<Verify />} />
    <Route path="auth/forgotpassword" element={<ForgotPassword />} />
    <Route path="auth/resetpassword" element={<ResetPassword />} />
    <Route path="home" element={<Home />} />
    <Route path="home/services" element={<Services />} />
    <Route path="home/about" element={<About />} />
    <Route path="home/contact" element={<Contact />} />
    <Route path="*" element={<Invalid404 />} />
  </Route>
);

export default publicRoutes;
