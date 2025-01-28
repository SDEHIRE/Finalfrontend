import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useUser } from './context/UserContext';

export default function StudentLogin() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if (!username || !password) {
      setErrorMessage('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://backendexpress-mi00.onrender.com/api/learner-login', {
        firstName: username.trim(),
        mobileNumber: password.trim(),
      });

      if (response.data?.success) {
        const { sessionId, userProfile } = response.data;
        const updatedUserProfile = {
          ...userProfile,
          username: username,
          mobileNumber:password
        };

        localStorage.setItem('sessionToken', sessionId);
        login(updatedUserProfile);

        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setErrorMessage(response.data?.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.status === 404
            ? 'User not found. Please check your credentials.'
            : error.response?.data?.message || 'A server error occurred. Please try again later.'
        );
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const starVariants = {
    glow: {
      opacity: [0.5, 1, 0.5],
      scale: [0.95, 1.05, 0.95],
      filter: [
        'drop-shadow(0 0 2px rgba(255,215,0,0.7))',
        'drop-shadow(0 0 8px rgba(255,215,0,0.9))',
        'drop-shadow(0 0 2px rgba(255,215,0,0.7))',
      ],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/2 h-screen relative overflow-hidden">
        {!videoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
        <video
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/SdePro/studentlogin.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col bg-white">
        <header className="bg-white p-4 shadow-md">
          <motion.div
            className="relative z-10 text-4xl font-bold text-center pt-8 pb-8 text-black flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Welcome to SDE Hire Pro</h1>
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

        <div className="flex-grow p-8 flex flex-col items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div className="bg-white shadow-md rounded-lg p-8">
              <h2 className="text-center text-xl font-semibold text-[#00B2FF] mb-6">Learner Login</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B2FF]"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-[#00B2FF]"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 text-white bg-[#00B2FF] hover:bg-[#0090CC] rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00B2FF] focus:ring-opacity-50"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              {errorMessage && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded" role="alert">
                  {errorMessage}
                </div>
              )}
              <div className="mt-4 text-center">
                <Link to="/register" className="text-[#00B2FF] hover:underline">
                  Don't have an account? Register here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

