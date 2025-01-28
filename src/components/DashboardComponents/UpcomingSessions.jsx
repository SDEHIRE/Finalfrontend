import React, { useState } from 'react';
import { Video, CheckCircle, Lock } from 'lucide-react';

const sessions = [
  {
    id: 1,
    title: 'Introduction to Data Structures',
    duration: '1 hour',
    level: 'Beginner',
    type: 'Lecture',
    progress: 100,
    status: 'completed'
  },
  {
    id: 2,
    title: 'Algorithm Analysis Basics',
    duration: '1.5 hours',
    level: 'Intermediate',
    type: 'Workshop',
    progress: 40,
    status: 'in-progress'
  },
  {
    id: 3,
    title: 'Coding Interview Practice',
    duration: '2 hours',
    level: 'Advanced',
    type: 'Mock Interview',
    progress: 25,
    status: 'in-progress'
  }
];

export default function UpcomingSessions() {
  const [isFreezed, setIsFreezed] = useState(true);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Available Sessions</h2>
      <div className="relative overflow-hidden">
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Video className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-medium text-gray-900">{session.title}</h3>
                <p className="text-sm text-gray-500">
                  {session.duration} • {session.level} • {session.type}
                </p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      session.status === 'completed' 
                        ? 'bg-green-500' 
                        : 'bg-indigo-600'
                    }`}
                    style={{ width: `${session.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {session.status === 'completed' ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                ) : (
                  <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                    {session.progress > 0 ? 'Continue' : 'Start Session'}
                  </button>
                )}
                <span className="text-sm text-gray-500">{session.progress}% Complete</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button className="text-indigo-600 hover:text-indigo-800">
            View All Available Sessions
          </button>
        </div>

        {isFreezed && (
          <div className="absolute inset-0 backdrop-filter backdrop-blur-[2px] bg-white bg-opacity-10 flex items-center justify-center">
            <div className="text-center text-gray-800 bg-white bg-opacity-40 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <Lock className="h-12 w-12 mx-auto mb-3 text-blue-500 opacity-80" />
              <p className="text-xl font-bold mb-1">Frozen!</p>
              <p className="text-base">Complete atleast 40% of your DSA journey </p>
            </div>
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white rounded-full opacity-10"
                  style={{
                    width: `${Math.random() * 15 + 5}px`,
                    height: `${Math.random() * 15 + 5}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `fall ${Math.random() * 5 + 5}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes fall {
            0% { transform: translateY(-10px); opacity: 0; }
            50% { opacity: 0.1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
}

