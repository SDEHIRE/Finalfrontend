import React from 'react';
import { motion } from 'framer-motion';

const SuccessStories = () => {
  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Success Stories</h2>
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <blockquote className="italic text-gray-600 mb-4">
          "SDE Hire's AI mentorship and coding challenges helped me land my dream job at a top tech company. The personalized learning path was a game-changer for my career."
        </blockquote>
        <div className="flex items-center">
          <img src="/ashish.jpg" alt="User avatar" className="w-10 h-10 rounded-full mr-4" />
          <div>
            <p className="font-semibold text-gray-900">Ashish Ratna</p>
            <p className="text-gray-600 text-sm">Product Devloper at Sentiantal</p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default SuccessStories;
