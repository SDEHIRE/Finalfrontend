import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RequestDemo = () => {
  const [selectedService, setSelectedService] = useState('');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Request Demo</h1>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 bg-[#00B2FF] text-white rounded-md hover:bg-[#0090CC] focus:outline-none focus:ring-2 focus:ring-[#00B2FF] focus:ring-offset-2 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </a>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="bg-[#00B2FF] text-white p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Request Demo Access</h2>
            <p className="text-lg">Join the Elite Network of Tech Professionals</p>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Which service are you interested in?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedService('recruitment')}
                  className={`p-4 rounded-md text-left transition-colors duration-200 ${
                    selectedService === 'recruitment'
                      ? 'bg-[#00B2FF] text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-semibold">Tech Recruitment</div>
                  <div className="text-sm opacity-90">Hire top tech talent</div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedService('assessment')}
                  className={`p-4 rounded-md text-left transition-colors duration-200 ${
                    selectedService === 'assessment'
                      ? 'bg-[#00B2FF] text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-semibold">Skill Assessment</div>
                  <div className="text-sm opacity-90">Evaluate technical skills</div>
                </motion.button>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-[#00B2FF] focus:ring-1 focus:ring-[#00B2FF]"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">
                    Country Code
                  </label>
                  <select
                    id="countryCode"
                    name="countryCode"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#00B2FF] focus:border-[#00B2FF] sm:text-sm rounded-md"
                  >
                    <option value="91">+91 (IN)</option>
                    <option value="1">+1 (US)</option>
                    <option value="44">+44 (UK)</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                      focus:outline-none focus:border-[#00B2FF] focus:ring-1 focus:ring-[#00B2FF]"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-[#00B2FF] focus:ring-1 focus:ring-[#00B2FF]"
                  placeholder="Enter your work email"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-[#00B2FF] focus:ring-1 focus:ring-[#00B2FF]"
                  placeholder="Enter your company name"
                />
              </div>

              <div>
                <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700">
                  Team Size
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#00B2FF] focus:border-[#00B2FF] sm:text-sm rounded-md"
                >
                  <option value="">Select team size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501+">501+ employees</option>
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00B2FF] hover:bg-[#0090CC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B2FF] transition-colors duration-200"
                type="submit"
              >
                Request Demo
              </motion.button>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default RequestDemo;
