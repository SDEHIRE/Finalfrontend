import React from "react"
import { Edit2, Lock } from "react-feather"

export function Education({ educations, onAddEducation, onEditEducation, hasAccess }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#1F2937]">Education</h2>
        {hasAccess && (
          <button onClick={onAddEducation} className="text-[#00A3FF] text-sm hover:underline">
            + Add Education
          </button>
        )}
      </div>
      {hasAccess ? (
        educations.length > 0 ? (
          <div className="space-y-4">
            {educations.map((edu, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-[#f0f7ff] rounded-lg">
                <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                  <span className="text-xl">🏫</span>
                </div>
                <div>
                  <h3 className="font-medium text-[#1F2937]">{edu.school}</h3>
                  <p className="text-sm text-[#6B7280]">{edu.degree}</p>
                  <p className="text-sm text-[#6B7280]">{edu.duration}</p>
                </div>
                <button onClick={() => onEditEducation(index)} className="p-2 hover:bg-white rounded-full ml-auto">
                  <Edit2 className="w-4 h-4 text-[#1F2937]" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#6B7280] text-sm">Add your educational background.</p>
        )
      ) : (
        <div className="flex items-center gap-3 text-[#6B7280]">
          <Lock className="w-5 h-5 text-[#00A3FF]" />
          <p className="text-sm">You don't have access to view education information.</p>
        </div>
      )}
    </div>
  )
}

