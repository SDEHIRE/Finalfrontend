import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
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
    <>
      <header className="relative z-20 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/logo.png"
              alt="SDE Hire Logo"
              className="w-auto h-auto max-h-24"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(2, 177, 252, 0.5))'
              }}
            />
          </motion.div>
        </div>
      </header>

      <motion.div
        className="relative z-10 text-4xl font-bold text-center pt-8 pb-8 text-white flex items-center justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-shadow-sm">SDE Hire Pro</h1>
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
    </>
  );
};

export default Header;
