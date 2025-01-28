import React from "react"
import { Lock } from "react-feather"

export function Certifications({ certifications, onAddCertification, hasAccess }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#1F2937]">My Certifications</h2>
        {hasAccess && (
          <button onClick={onAddCertification} className="text-[#00A3FF] text-sm hover:underline">
            + Add Certifications
          </button>
        )}
      </div>
      {hasAccess ? (
        certifications.length > 0 ? (
          <ul className="space-y-2">
            {certifications.map((cert, index) => (
              <li key={index} className="text-[#1F2937]">
                {cert}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#6B7280] text-sm">You have not earned any certificates yet. Get Certified</p>
        )
      ) : (
        <div className="flex items-center gap-3 text-[#6B7280]">
          <Lock className="w-5 h-5 text-[#00A3FF]" />
          <p className="text-sm">You don't have access to view certifications.</p>
        </div>
      )}
    </div>
  )
}

