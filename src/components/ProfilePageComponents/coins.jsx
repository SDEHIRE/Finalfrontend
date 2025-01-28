import React from "react"
import { PlusCircle, Lock } from "react-feather"

export function Coins({ balance, onAddCoins, onLearnMore, hasAccess }) {
  return (
    <div className="bg-white rounded-lg p-6 relative shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-[#1F2937] text-xl">Coins Balance</h2>
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-[#FFD700]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16V12M12 8H12.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-2xl font-bold text-[#1F2937]">{balance}</span>
        </div>
      </div>
      {hasAccess ? (
        <>
          <p className="text-[#6B7280] text-sm mb-4">Use coins to unlock premium features and resources.</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={onAddCoins}
              className="w-full bg-[#00A3FF] text-white px-4 py-2 rounded-md hover:bg-[#0077CC] transition-colors flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Add Coins
            </button>
            <button onClick={onLearnMore} className="w-full text-[#00A3FF] text-sm hover:underline">
              Learn how to earn more coins →
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-3 text-[#6B7280]">
          <Lock className="w-5 h-5 text-[#00A3FF]" />
          <p className="text-sm">You don't have access to manage coins.</p>
        </div>
      )}
    </div>
  )
}

