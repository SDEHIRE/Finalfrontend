import React from 'react';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <motion.div 
        className="bg-gradient-to-r from-[#02b1fc] to-indigo-600 p-8 rounded-lg text-white"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-2xl font-bold mb-4">Ready to accelerate your software development career?</h3>
        <p className="mb-6">Join thousands of developers who have already taken the leap with SDE Hire.</p>
        <motion.button 
          className="bg-white text-[#02b1fc] font-semibold py-2 px-6 rounded-md hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Free Account
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default CallToAction;