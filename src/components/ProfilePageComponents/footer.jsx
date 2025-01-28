import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E7EB] py-4 px-8">
      <div className="flex items-center justify-center gap-2 text-sm text-[#1F2937]">
        <img
          src="/logo.png"
          alt="SDE Hire Logo"
          className="w-6 h-6 rounded-full"
        />
        <span>© 2024 SDE Hire. All rights reserved.</span>
      </div>
    </footer>
  );
}

