import React from 'react';
import { Edit2 } from 'react-feather';

const countryFlags = {
  'India': '🇮🇳',
  'United States': '🇺🇸',
  'United Kingdom': '🇬🇧',
  'Canada': '🇨🇦',
  'Australia': '🇦🇺',
  'Germany': '🇩🇪',
  'France': '🇫🇷',
  'Japan': '🇯🇵',
  'China': '🇨🇳',
  'Brazil': '🇧🇷',
};

export function ProfileCard({ name, username, country, onEdit }) {
  return (
    <div className="bg-white rounded-lg p-6 relative shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src="/placeholder.svg?height=80&width=80"
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h1 className="text-xl font-bold text-[#1F2937]">
            {name || 'Add your name'}
          </h1>
          <p className="text-[#6B7280] text-sm">{username || 'Add your username'}</p>
          <span className="text-lg">{countryFlags[country] || '🌎'}</span>
        </div>
      </div>
      <button onClick={onEdit} className="absolute top-4 right-4 p-2 hover:bg-[#f0f7ff] rounded-full">
        <Edit2 className="w-4 h-4 text-[#1F2937]" />
      </button>
    </div>
  );
}

