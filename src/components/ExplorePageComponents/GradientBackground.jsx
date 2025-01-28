import React from 'react';

const GradientBackground = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-br from-[#02b1fc] via-indigo-600 to-indigo-800 opacity-90">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/5 to-black/10" />
      </div>
      <div className="absolute top-0 left-0 w-full h-[300px] opacity-30 mix-blend-overlay">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 20%, rgba(255, 255, 255, 0.1) 30%, transparent 60%)`,
          backgroundSize: '30px 30px'
        }} />
      </div>
    </>
  );
};

export default GradientBackground;