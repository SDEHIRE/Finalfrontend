import React from 'react';

export default function ProLanding() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#E5F7FF', stopOpacity: 5}} />
                <stop offset="100%" style={{stopColor: '#FFFFFF', stopOpacity: 1}} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad1)" />
            <circle cx="10%" cy="10%" r="5%" fill="#00B2FF" opacity="0.6" filter="url(#glow)">
              <animate attributeName="cy" values="10%;90%;10%" dur="20s" repeatCount="indefinite" />
            </circle>
            <circle cx="90%" cy="90%" r="7%" fill="#00B2FF" opacity="0.4" filter="url(#glow)">
              <animate attributeName="cx" values="90%;10%;90%" dur="25s" repeatCount="indefinite" />
            </circle>
            <path d="M0,50 Q25,25 50,50 T100,50" stroke="#00B2FF" strokeWidth="0.5" fill="none" opacity="0.2" filter="url(#glow)">
              <animate attributeName="d" values="M0,50 Q25,25 50,50 T100,50;M0,50 Q25,75 50,50 T100,50;M0,50 Q25,25 50,50 T100,50" dur="15s" repeatCount="indefinite" />
            </path>
            <circle cx="50%" cy="50%" r="3%" fill="#0090CC" opacity="0.3" filter="url(#glow)">
              <animate attributeName="r" values="3%;5%;3%" dur="10s" repeatCount="indefinite" />
            </circle>
            <path d="M0,20 Q50,40 100,20" stroke="#0090CC" strokeWidth="0.3" fill="none" opacity="0.2" filter="url(#glow)">
              <animate attributeName="d" values="M0,20 Q50,40 100,20;M0,20 Q50,0 100,20;M0,20 Q50,40 100,20" dur="18s" repeatCount="indefinite" />
            </path>
            <rect x="80%" y="70%" width="10%" height="10%" fill="#00B2FF" opacity="0.2" filter="url(#glow)">
              <animateTransform attributeName="transform" type="rotate" from="0 85 75" to="360 85 75" dur="30s" repeatCount="indefinite" />
            </rect>
          </svg>
        </div>

        {/* Left Section - For Students */}
        <div className="flex-1 p-8 flex flex-col items-center justify-center z-10 backdrop-blur-sm bg-white bg-opacity-30">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              For <span className="text-[#00B2FF]">Students</span>
            </h1>
            <p className="text-gray-700 mb-8">
              We are the market leading Ed-tech platform to identify and start your e-learning process with the right tutors.
            </p>
            <a href="/Sdehire-pro-Student-login" className="w-full bg-[#00B2FF] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#0090CC] transition-colors duration-300 inline-block">
              Start
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-gray-200 z-10"></div>

        {/* Right Section - For Recruiters */}
        <div className="flex-1 p-8 flex flex-col items-center justify-center z-10 backdrop-blur-sm bg-white bg-opacity-30">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              For <span className="text-[#00B2FF]">Recruiters</span>
            </h1>
            <p className="text-gray-700 mb-8">
              We are the market leading Ed-tech platform to identify and start your e-learning process with the right tutors.
            </p>
            <a href="/Sdehire-pro-Company-login" className="w-full bg-[#00B2FF] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#0090CC] transition-colors duration-300 inline-block">
              Start Recruit
            </a>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 px-4 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-sm">&copy; 2023 SDE Hire Pro. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-[#00B2FF]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-[#00B2FF]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-[#00B2FF]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
