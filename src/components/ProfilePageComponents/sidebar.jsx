import React from 'react';
import { Home, Monitor, Video, User, Settings, X, LogOut } from 'react-feather';
import { useUser } from '../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';

export function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useUser(); // Access logout function from the context

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout(); // Call the logout function
    console.log('Logged out successfully');
    navigate('/Sdehire-pro-Student-login'); // Redirect to login page after logout
  };

  const navigation = [
    { name: 'Dashboard', icon: Home, href: '/dashboard' },
    { name: 'Guided Practice', icon: Monitor, href: '/guided' },
    { name: 'Interview Practice', icon: Video, href: '/landing' },
    { name: 'Profile', icon: User, href: '/profile' },
    { name: 'Settings', icon: Settings, href: '/Noacess' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="fixed inset-y-0 left-0 pr-0 max-w-full flex">
          <div className="w-64">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-hidden">
              <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.png"
                    alt="SDE Hire Logo"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-xl font-bold text-[#1F2937]">SDEHire</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-[#E5E7EB] transition-colors"
                >
                  <X className="h-5 w-5 text-[#1F2937]" />
                </button>
              </div>
              <nav className="flex-1 px-4 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 mb-1
                      ${item.href === '/profile'
                        ? 'bg-[#00A3FF] text-white'
                        : 'text-[#1F2937] hover:bg-[#00A3FF] hover:text-white'
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1 text-left font-medium">{item.name}</span>
                  </a>
                ))}
              </nav>
              {/* Logout Button at the bottom */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-600 hover:bg-red-500 hover:text-white mt-auto"
              >
                <LogOut className="w-5 h-5" />
                <span className="flex-1 text-left font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
