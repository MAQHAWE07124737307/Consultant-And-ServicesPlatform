import React from 'react';
import Sidebar from './components/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();
  const hideSidebarRoutes = ['/login', '/logout'];
  const hideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div style={{ display: 'flex' }}>
      {!hideSidebar && <Sidebar />}
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;