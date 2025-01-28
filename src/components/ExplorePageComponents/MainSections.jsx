import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Building } from 'lucide-react';

const MainSections = () => {
  return (
    <section className="relative z-10 grid md:grid-cols-2 gap-8 px-4 py-12 max-w-7xl mx-auto mt-32">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GraduationCap className="w-16 h-16 text-[#02b1fc] mb-6" />
        <div className="w-full max-w-md">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-xl font-semibold">I'm here to practice and prepare</h3>
              <p className="text-gray-600">Solve problems and learn new skills</p>
            </div>
          </div>
          <motion.a
            href="/Sdehire-pro-Student-login"
            className="w-full mt-8 bg-[#02b1fc] text-white font-medium py-3 px-6 rounded-md hover:bg-[#0290d1] transition-colors duration-300 inline-block text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create account
          </motion.a>
        </div>
      </motion.div>
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Building className="w-16 h-16 text-indigo-600 mb-6" />
        <div className="w-full max-w-md">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-xl font-semibold">I'm here to hire tech talent</h3>
              <p className="text-gray-600">Evaluate tech skills at scale</p>
            </div>
          </div>
          <motion.a
            href="/Sdehire-pro-Company-login"
            className="w-full mt-8 bg-indigo-600 text-white font-medium py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors duration-300 inline-block text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Free trial
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default MainSections;
