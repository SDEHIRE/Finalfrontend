import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight } from 'lucide-react';

const LaunchPadProducts = () => {
  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">LaunchPad Products</h2>
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center mb-4">
          <div className="bg-[#02b1fc] p-2 rounded-full mr-4 text-white">
            <Rocket className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">SDE Hire Freshmen: The Ultimate Coding Starter Course</h3>
        </div>
        <p className="text-gray-600 mb-4 flex-grow">
          A foundational course for absolute beginners with no prior coding experience. Learn core programming concepts through hands-on exercises and real-world examples, building a solid understanding of coding basics in simple, easy-to-understand language.
        </p>
        <motion.a
          href="/freshmen"
          className="inline-flex items-center text-[#02b1fc] font-semibold hover:underline"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Start Your Coding Journey
          <ArrowRight className="ml-2 h-4 w-4" />
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

export default LaunchPadProducts;