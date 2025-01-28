import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const CompanyLogos = () => {
  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const logos = [
    { id: 1, name: 'Meta', src: '/CompanyLogos/Meta.png' },
    { id: 2, name: 'Netflix', src: '/CompanyLogos/netflix.png' },
    { id: 3, name: 'Microsoft', src: '/CompanyLogos/Microsoft.png' },
    { id: 4, name: 'Adobe', src: '/CompanyLogos/Adobe.png' },
    { id: 5, name: 'Apple', src: '/CompanyLogos/Apple.png' },
    { id: 6, name: 'Facebook', src: '/CompanyLogos/Facebook.png' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      }
    },
  };

  return (
    <section ref={scrollRef} className="relative py-16 bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-12 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            U Dream,
          </span>{' '}
          <span className="relative">
            We Train
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            />
          </span>
        </motion.h2>
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            className="flex space-x-12 animate-scroll relative z-10"
            style={{
              width: `calc(240px * ${logos.length})`,
            }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <motion.div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 w-60 h-24 flex items-center justify-center"
                variants={logoVariants}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-w-full h-auto transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-240px * ${logos.length}));
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default CompanyLogos;
