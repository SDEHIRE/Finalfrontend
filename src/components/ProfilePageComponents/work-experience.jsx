import React from "react"
import { Lock } from "react-feather"

export function WorkExperience({ experiences, onAddExperience, hasAccess }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#1F2937]">Work Experience</h2>
        {hasAccess && (
          <button onClick={onAddExperience} className="text-[#00A3FF] text-sm hover:underline">
            + Add Work Experience
          </button>
        )}
      </div>
      {hasAccess ? (
        experiences.length > 0 ? (
          <ul className="space-y-4">
            {experiences.map((exp, index) => (
              <li key={index} className="p-4 bg-[#f0f7ff] rounded-lg">
                <h3 className="font-medium text-[#1F2937]">{exp.company}</h3>
                <p className="text-sm text-[#6B7280]">{exp.position}</p>
                <p className="text-sm text-[#6B7280]">{exp.duration}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#6B7280] text-sm">
            Add your work experience. Don't forget to add those internships as well.
          </p>
        )
      ) : (
        <div className="flex items-center gap-3 text-[#6B7280]">
          <Lock className="w-5 h-5 text-[#00A3FF]" />
          <p className="text-sm">You don't have access to view work experience.</p>
        </div>
      )}
    </div>
  )
}

