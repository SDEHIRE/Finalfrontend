import React, { useState } from 'react';
import { Menu, X } from 'react-feather';
import { Sidebar } from './sidebar';

export function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="border-b border-[#E5E7EB] fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-3 py-1.5 bg-gradient-to-r from-[#f0f7ff] to-[#f0f7ff] relative">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md hover:bg-[#E5E7EB]/50 transition-colors relative z-10"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6 text-[#1F2937]" />
          ) : (
            <Menu className="h-6 w-6 text-[#1F2937]" />
          )}
        </button>
        <div className="flex items-center gap-2 relative z-10">
          <img
            src="/logo.png"
            alt="SDE Hire Logo"
            className="w-7 h-7 rounded-full"
          />
          <h1 className="text-lg font-bold text-[#1F2937] flex items-center gap-1">
            SDE Hire Pro
            <span className="text-yellow-300 animate-[pulse_2s_ease-in-out_infinite]">★</span>
          </h1>
        </div>
        <div className="w-6 relative z-10" />
      </div>
      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
    </header>
  );
}

