
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '@/shared/types';

interface HeaderProps {
  user?: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Improved active link matching
  const isActivePath = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    if (path !== '/' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };
  
  const navItems = [
    { path: '/learn', label: 'Learn' },
    { path: '/documents', label: 'Documents' },
    { path: '/development', label: 'My Development' },
    { path: '/web-sources', label: 'Web Sources' },
    { path: '/exams', label: 'Exams' },
    { path: '/ai-assistant', label: 'AI Assistant' }
  ];

  return (
    <header className="text-white sticky top-0 w-full z-50 shadow-md" style={{ backgroundColor: '#143549' }}>
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold hover:text-blue-100 transition-colors">
              Dynava AI Teacher
            </Link>
            
            <nav className="ml-10 hidden md:flex">
              <ul className="flex space-x-6">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path}
                      className={`px-2 py-1 transition-colors hover:bg-blue-600 hover:text-white ${
                        isActivePath(item.path) 
                          ? 'font-bold' 
                          : 'font-normal'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden ml-4 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {user && (
            <div className="flex items-center">
              <span className="mr-2 hidden sm:inline">{user.name}</span>
              <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 pb-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={`block px-4 py-2 transition-colors hover:bg-blue-600 hover:text-white ${
                      isActivePath(item.path) 
                        ? 'font-bold' 
                        : 'font-normal'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
