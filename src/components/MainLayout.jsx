import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar'; // Assuming Navbar is in the same directory

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin'); // Use startsWith for nested admin routes

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
    </>
  );
};

export default MainLayout;
