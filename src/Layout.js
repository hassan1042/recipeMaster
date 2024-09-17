import React from 'react';
import { Outlet } from 'react-router-dom';
// Component imports
import Navbar from './components/header/Navbar';
import Footer from './components/footer/footer';


const Layout = ({ uid }) => {
  return (
    <div>
      <Navbar uid={uid} />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Layout;
