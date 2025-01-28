import React from "react"
import { Lock } from "react-feather"

export function Skills({ skills, onAddSkill, hasAccess }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#1F2937]">My Skills</h2>
        {hasAccess && (
          <button onClick={onAddSkill} className="text-[#00A3FF] text-sm hover:underline">
            + Add Skills
          </button>
        )}
      </div>
      {hasAccess ? (
        skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-[#f0f7ff] text-[#1F2937] px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-[#6B7280] text-sm">Add all the relevant skills that speak on your behalf</p>
        )
      ) : (
        <div className="flex items-center gap-3 text-[#6B7280]">
          <Lock className="w-5 h-5 text-[#00A3FF]" />
          <p className="text-sm">You don't have access to view skills.</p>
        </div>
      )}
    </div>
  )
}

