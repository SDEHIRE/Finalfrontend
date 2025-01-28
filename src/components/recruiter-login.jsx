import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


export default function CompanyLogin() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => setVideoLoaded(true));
    }
  }, []);


  const starVariants = {
    glow: {
      opacity: [0.5, 1, 0.5],
      scale: [0.95, 1.05, 0.95],
      filter: [
        'drop-shadow(0 0 2px rgba(255,215,0,0.7))',
        'drop-shadow(0 0 8px rgba(255,215,0,0.9))',
        'drop-shadow(0 0 2px rgba(255,215,0,0.7))'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section with Video */}
      <div className="w-full md:w-1/2 h-screen relative overflow-hidden">
        {!videoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-300 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/SdePro/recruiterlogin.mp4" type="video/mp4" />

          Your browser does not support the video tag.
        </video>
        {/* Add this immediately after the closing </video> tag in the left section */}
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm"></div>
      </div>

      {/* Right Section with Login Form */}
      <div className="w-full md:w-1/2 flex flex-col">
        <header className="bg-white p-4 shadow-md">

        <motion.div
        className="relative z-10 text-4xl font-bold text-center pt-8 pb-8 text-black flex items-center justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-shadow-sm">Welcome to SDE Hire Pro</h1>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="gold"
          className="w-8 h-8 ml-2"
          variants={starVariants}
          animate="glow"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </motion.svg>
      </motion.div>

        </header>

        <div className="flex-grow p-8 flex flex-col items-center justify-center bg-white">
          <div className="w-full max-w-md space-y-8">
            <div className="bg-white shadow-md rounded-lg p-8">
              <div className="flex justify-center mb-6">
                <img src="/logo.png" alt="SDE HIRE Logo" className="h-16 w-auto" />
              </div>
              <h2 className="text-center text-xl font-semibold text-[#00B2FF] mb-6">Company Login</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-[#00B2FF] focus:ring-1 focus:ring-[#00B2FF]"
                    placeholder="Enter your username"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-[#00B2FF] focus:ring-1 focus:ring-[#00B2FF]"
                    placeholder="Enter your password"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00B2FF] hover:bg-[#0090CC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B2FF]"
                  >
                    Login
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center space-y-2">
                <a href="/forgot-password" className="text-sm text-[#00B2FF] hover:underline block">
                  Forgot Password?
                </a>
                <a href="/register-company" className="text-sm text-[#00B2FF] hover:underline block">
                  Register as a Company
                </a>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-gray-800 text-white py-4 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <p className="text-sm">&copy; 2023 SDE Hire Pro. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#00B2FF]">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-[#00B2FF]">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-[#00B2FF]">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
