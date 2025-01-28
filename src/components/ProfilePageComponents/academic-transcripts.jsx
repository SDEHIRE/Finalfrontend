import React from "react"
import { File, Lock } from "react-feather"

export function AcademicTranscripts({ transcripts, onAddTranscript, hasAccess }) {
  return (
    <div className="bg-white rounded-lg p-6 relative shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#1F2937]">Academic Transcripts</h2>
        {hasAccess && (
          <button onClick={onAddTranscript} className="text-[#00A3FF] text-sm hover:underline">
            + Add Transcript
          </button>
        )}
      </div>
      {hasAccess ? (
        transcripts.length > 0 ? (
          <div className="space-y-4">
            {transcripts.map((transcript, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#f0f7ff] rounded-lg">
                <div className="flex items-center gap-3">
                  <File className="w-5 h-5 text-[#00A3FF]" />
                  <span className="text-sm text-[#1F2937]">{transcript.name}</span>
                </div>
                <button className="text-[#00A3FF] text-sm hover:underline">View</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#6B7280] text-sm">Add your academic transcripts here.</p>
        )
      ) : (
        <div className="flex items-center gap-3 text-[#6B7280]">
          <Lock className="w-5 h-5 text-[#00A3FF]" />
          <p className="text-sm">You don't have access to view academic transcripts.</p>
        </div>
      )}
    </div>
  )
}

