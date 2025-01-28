import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleButtonRef.current !== event.target
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <header className="border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-3 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-200 relative">
        <div className="absolute inset-0 bg-white opacity-10 pattern-grid-lg"></div>
        <button
          ref={toggleButtonRef}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-200/50 transition-colors relative z-10"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6 text-gray-800" />
          ) : (
            <Menu className="h-6 w-6 text-gray-800" />
          )}
        </button>
        <div className="flex items-center gap-2 relative z-10">
          <img
            src="/logo.png"
            alt="SDE Hire Logo"
            className="w-7 h-7 rounded-full"
          />
          <h1 className="text-lg font-bold text-gray-800 flex items-center gap-1">
            SDE Hire Pro
            <span className="text-yellow-300 animate-[pulse_2s_ease-in-out_infinite]">★</span>
          </h1>
        </div>
        <div className="w-6 relative z-10" />
      </div>

      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
    </header>
  );
}

