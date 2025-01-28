import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './DashboardComponents/Header';
import HeroSection from './DashboardComponents/HeroSection';
import ProjectStats from './DashboardComponents/ProjectStats';
import Calendar from './DashboardComponents/Calendar';
import NewsCard from './DashboardComponents/NewsCard';
import UpcomingSessions from './DashboardComponents/UpcomingSessions';
import UpcomingLiveSessions from './DashboardComponents/UpcomingLiveSessions';
import Leaderboard from './DashboardComponents/Leaderboard';
import { useUser } from './context/UserContext';



export default function Profile() {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userId: '',
    password: '',
  });


  useEffect(() => {
    console.log('User Data from Context:', user);
  }, [user]);

  
  useEffect(() => {
    const { state } = location;
    if (state && state.userId && state.password) {
      setUserData({
        userId: state.userId,
        password: state.password,
      });
    } 
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-[#f0f9ff] flex flex-col">
      <Header />

      <main className="flex-1 pt-14 pb-4 px-4 md:px-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Message with Logo */}
          <div className="flex items-center gap-4 mt-8 mb-6">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#02b1fc] to-indigo-600 bg-clip-text text-transparent">
              Welcome Back, {user?.username || 'N/A'}
            </h2>
          </div>
          

          <HeroSection />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Takes up 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <ProjectStats />
              <UpcomingSessions />
              <UpcomingLiveSessions />
              <Calendar />
            </div>

            {/* Right Sidebar - Takes up 1 column */}
            <div className="space-y-6">
              <NewsCard />

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/logo.png"
                    alt="SDE Hire Logo"
                    className="w-[30px] h-[30px] rounded-full"
                  />
                  <h2 className="text-lg font-semibold">Quick Actions</h2>
                </div>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="#6366F1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" />
                    </svg>
                    Start New Practice
                  </button>
                  <button className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="#5865F2"
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                    </svg>
                    Join Study Group
                  </button>
                  <button className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="#EC4899"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" />
                    </svg>
                    Schedule Mock Interview
                  </button>
                </div>
              </div>

              <Leaderboard />
            </div>
          </div>

          {/* User Details Section */}
          
        </div>
        
      </main>

      {/* Footer with Logo */}
      <footer className="bg-white border-t border-gray-200 py-4 px-8">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <img
            src="/logo.png"
            alt="SDE Hire Logo"
            className="w-6 h-6 rounded-full"
          />
          <span>© 2024 SDE Hire. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

