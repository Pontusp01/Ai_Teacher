
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  // Mock user data with complete User properties
  const mockUser = {
    id: 'user1',
    name: 'Anna',
    email: 'anna@example.com',
    avatar: '',
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header user={mockUser} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
