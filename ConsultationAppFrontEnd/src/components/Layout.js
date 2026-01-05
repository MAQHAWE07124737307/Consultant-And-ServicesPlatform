import React from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import UserSidebar from './UserSidebar';
import ConsultantSidebar from './StuffSidebar';

const Layout = ({ children }) => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Redirect to login if no user found
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const renderSidebar = () => {
    switch (user.role) {
      case 'Admin':
        return <Sidebar />;
      case 'User':
        return <UserSidebar />;
      case 'Consultant':
        return <ConsultantSidebar />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {renderSidebar()}
      <div className="flex-grow-1 p-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;