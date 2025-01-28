import React from "react"
import { ExternalLink, Lock } from "react-feather"

export function Links({ links, onAddLink, hasAccess }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#1F2937]">Coding Profiles </h2>
        {hasAccess && (
          <button onClick={onAddLink} className="text-[#00A3FF] text-sm hover:underline">
            + Add Links
          </button>
        )}
      </div>
      {hasAccess ? (
        links.length > 0 ? (
          <div className="space-y-2">
            {links.map((link, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-[#f0f7ff] rounded-lg">
                <img
                  src={`/placeholder.svg?height=24&width=24&text=${link.platform[0]}`}
                  alt={link.platform}
                  className="w-6 h-6"
                />
                <span className="flex-1 text-[#1F2937]">{link.platform}</span>
                <ExternalLink className="w-4 h-4 text-[#6B7280]" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#6B7280] text-sm">Add your professional and social media links.</p>
        )
      ) : (
        <div className="flex items-center gap-3 text-[#6B7280]">
          <Lock className="w-5 h-5 text-[#00A3FF]" />
          <p className="text-sm">You don't have access to view links.</p>
        </div>
      )}
    </div>
  )
}

