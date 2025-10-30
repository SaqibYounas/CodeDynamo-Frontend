// src/layouts/Layout.jsx
import ScrollProgressBar from './Scroll';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <ScrollProgressBar />
      <Outlet />
    </>
  );
}
