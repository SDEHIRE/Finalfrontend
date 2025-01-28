import React from 'react';
import { Trophy, Medal } from 'lucide-react';

const leaderboardData = [
  {
    rank: 1,
    name: 'Ashish',
    score: 2840,
  },
  {
    rank: 2,
    name: 'Sarah Miller',
    score: 2720,
  },
  {
    rank: 3,
    name: 'David Chen',
    score: 2650,
  },
  {
    rank: 4,
    name: 'Emma Wilson',
    score: 2590,
  },
  {
    rank: 5,
    name: 'Michael Brown',
    score: 2480,
  }
];

export default function Leaderboard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Leaderboard
        </h2>
        <span className="text-sm text-gray-500">This Week</span>
      </div>

      <div className="space-y-4">
        {leaderboardData.map((user) => (
          <div
            key={user.rank}
            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              {user.rank === 1 ? (
                <Medal className="w-5 h-5 text-yellow-500" />
              ) : user.rank === 2 ? (
                <Medal className="w-5 h-5 text-gray-400" />
              ) : user.rank === 3 ? (
                <Medal className="w-5 h-5 text-amber-600" />
              ) : (
                <span className="text-sm font-medium text-gray-500">
                  {user.rank}
                </span>
              )}
            </div>
            <div className="flex-grow ml-4">
              <h3 className="font-medium text-gray-900">{user.name}</h3>
            </div>
            <div className="text-sm font-medium text-gray-900">
              {user.score.toLocaleString()} pts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
