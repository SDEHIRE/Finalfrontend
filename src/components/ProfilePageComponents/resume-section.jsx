import React from "react"
import { Lock } from "react-feather"

export function ResumeSection({ resumeUploaded, onAddResume, hasAccess }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#1F2937]">My Resume</h2>
        {hasAccess ? (
          <button onClick={onAddResume} className="text-[#00A3FF] text-sm hover:underline">
            {resumeUploaded ? "Update Resume" : "+ Add Resume"}
          </button>
        ) : (
          <Lock className="w-5 h-5 text-[#00A3FF]" />
        )}
      </div>
      {hasAccess ? (
        <p className="text-[#6B7280] text-sm">
          {resumeUploaded ? "Your resume has been uploaded." : "Add your resume here"}
        </p>
      ) : (
        <div className="flex items-center gap-3 text-[#6B7280]">
          <p className="text-sm">You don't have access to manage your resume.</p>
        </div>
      )}
    </div>
  )
}

