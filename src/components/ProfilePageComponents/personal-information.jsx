import React from "react"
import { Mail, Phone, MapPin, Edit2, Lock } from "react-feather"

const countryFlags = {
  India: "🇮🇳",
  "United States": "🇺🇸",
  "United Kingdom": "🇬🇧",
  Canada: "🇨🇦",
  Australia: "🇦🇺",
  Germany: "🇩🇪",
  France: "🇫🇷",
  Japan: "🇯🇵",
  China: "🇨🇳",
  Brazil: "🇧🇷",
}

export function PersonalInformation({ email, phone, country, onEdit, hasAccess }) {
  const flag = countryFlags[country] || "🌎"

  return (
    <div className="bg-white rounded-lg p-6 relative shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#1F2937]">Personal Information</h2>
        {hasAccess && (
          <button onClick={onEdit} className="p-2 hover:bg-[#f0f7ff] rounded-full">
            <Edit2 className="w-4 h-4 text-[#1F2937]" />
          </button>
        )}
      </div>
      {hasAccess ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[#6B7280]">
            <Mail className="w-4 h-4" />
            <span>{email || "Add your email"}</span>
          </div>
          <div className="flex items-center gap-3 text-[#1F2937]">
            <Phone className="w-4 h-4 text-[#6B7280]" />
            <span>{phone || "Add your phone number"}</span>
          </div>
          <div className="flex items-center gap-3 text-[#1F2937]">
            <MapPin className="w-4 h-4 text-[#6B7280]" />
            <div className="flex items-center gap-2">
              <span className="text-xl">{flag}</span>
              <span>{country || "Add your country"}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 text-[#6B7280]">
          <Lock className="w-5 h-5 text-[#00A3FF]" />
          <p className="text-sm">You don't have access to view personal information.</p>
        </div>
      )}
    </div>
  )
}

