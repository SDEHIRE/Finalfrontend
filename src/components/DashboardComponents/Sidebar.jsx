import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Monitor, Video, FileText, User, Settings, X, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';

const navigation = [
  { name: 'Dashboard', icon: Home, href: '/dashboard' },
  { name: 'Guided Practice', icon: Monitor, href: '/landing' },
  { name: 'Interview Practice', icon: Video, href: '/landing' },
  
  { name: 'Profile', icon: User, href: '/profile' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export default function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useUser(); // Access logout function from the context

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout(); // Call the logout function
    console.log('Logged out successfully');
    navigate('/Sdehire-pro-Student-login'); // Redirect to login page after logout
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="SDE Hire Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-xl font-bold text-gray-900">SDEHire</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Close menu"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 flex flex-col justify-between">
        <div>
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.href);
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${
                  isActive(item.href)
                    ? 'bg-[#02b1fc] text-white'
                    : 'text-gray-600 hover:bg-[#02b1fc] hover:text-white'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1 text-left font-medium">{item.name}</span>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-600 hover:bg-red-500 hover:text-white mt-auto"
        >
          <LogOut className="w-5 h-5" />
          <span className="flex-1 text-left font-medium">Logout</span>
        </button>
      </nav>
    </div>
  );
}
