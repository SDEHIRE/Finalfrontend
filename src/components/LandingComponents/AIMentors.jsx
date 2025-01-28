import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Code, Brain, Cpu, Zap, Cloud, Database } from 'lucide-react';

const Card = ({ children, style, icon: Icon, ...props }) => (
  <motion.div
    style={{
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
      position: 'relative',
      ...style
    }}
    whileHover={{ scale: 1.05, boxShadow: "0 20px 30px rgba(2, 177, 252, 0.2)" }}
    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
    {...props}
  >
    <BackgroundAnimation />
    {Icon && (
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 2 }}>
        <Icon size={24} color="#02b1fc" />
      </div>
    )}
    {children}
  </motion.div>
);

const CardHeader = ({ children }) => (
  <div style={{
    padding: '1.5rem',
    background: 'linear-gradient(to right, #02b1fc, #4f46e5)',
    position: 'relative',
    zIndex: 1
  }}>
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h3 style={{
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '0.5rem'
  }}>
    {children}
  </h3>
);

const CardContent = ({ children }) => (
  <div style={{ padding: '1.5rem 1rem', position: 'relative', zIndex: 1 }}>
    {children}
  </div>
);

const Avatar = ({ src, alt, fallback }) => {
  return (
    <div
      style={{
        height: '8rem',
        width: '8rem',
        borderRadius: '50%',
        overflow: 'hidden',
        marginBottom: '1.5rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        border: '4px solid white',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        position: 'relative'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, #02b1fc, #4f46e5, #02b1fc)',
          opacity: 0.5
        }}
      />
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 10 }} />
    </div>
  );
};

const SkillBadge = ({ skill }) => (
  <motion.li
    style={{
      backgroundColor: '#e6f7ff',
      color: '#02b1fc',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '500',
      listStyle: 'none'
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, type: "spring", stiffness: 500 }}
  >
    {skill}
  </motion.li>
);

const FloatingIcon = ({ icon: Icon, delay, style }) => (
  <motion.div
    style={{
      position: 'absolute',
      color: '#02b1fc',
      opacity: 0.2,
      ...style
    }}
    initial={{ y: -20, opacity: 0 }}
    animate={{
      y: [0, -20, 0],
      opacity: [0.2, 0.5, 0.2],
    }}
    transition={{
      y: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
      opacity: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
      delay: delay
    }}
  >
    <Icon size={40} />
  </motion.div>
);

const BackgroundAnimation = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
    <svg style={{ position: 'absolute', width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(2, 177, 252, 0.1)" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom right, #e6f7fd, #02b1fc)',
        opacity: 0.1
      }}
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%'],
      }}
      transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
    />
  </div>
);

const AIMentors = () => {
  const [hoveredMentor, setHoveredMentor] = useState(null);

  const mentors = [
    {
      name: "Steve",
      role: "Your Coding Companion",
      avatar: "/Landing/steve.jpg",
      description: "Steve provides real-time hints, personalized feedback, and topic recommendations as you work through coding challenges. He adapts to your learning style and helps you improve your skills efficiently.",
      skills: ["Python", "Data Structures", "Algorithms"],
      icon: Code
    },
    {
      name: "Lisa",
      role: "Your Interview Coach",
      avatar: "/Landing/lisa.jpeg",
      description: "Lisa simulates real-life interviewers, adapting questions and behavior based on your responses. She provides a challenging and realistic interview experience to prepare you for high-stakes technical interviews.",
      skills: ["Behavioral Questions", "Technical Interviews", "Problem Solving", "Communication Skills", "Stress Management"],
      icon: Brain
    }
  ];

  const iconPositions = [
    { icon: Code, top: '10%', left: '5%', delay: 0 },
    { icon: Brain, top: '30%', right: '10%', delay: 1 },
    { icon: Cpu, bottom: '20%', left: '15%', delay: 2 },
    { icon: Zap, top: '50%', right: '5%', delay: 3 },
    { icon: Cloud, bottom: '10%', right: '20%', delay: 4 },
    { icon: Database, top: '70%', left: '10%', delay: 5 },
  ];

  return (
    <section id="ai-mentors" style={{
      width: '100%',
      padding: '4rem 0',
      position: 'relative',
      overflow: 'hidden',
      background: 'white'
    }}>
      {iconPositions.map((item, index) => (
        <FloatingIcon key={index} icon={item.icon} delay={item.delay} style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }} />
      ))}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        position: 'relative',
        zIndex: 10
      }}>
        <motion.h2
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '3rem',
            backgroundImage: 'linear-gradient(45deg, #02b1fc, #4f46e5, #ff6b6b)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Meet Your AI Mentors
        </motion.h2>
        <div style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          {mentors.map((mentor, index) => (
            <Card
              key={mentor.name}
              icon={mentor.icon}
              onMouseEnter={() => setHoveredMentor(mentor.name)}
              onMouseLeave={() => setHoveredMentor(null)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <CardHeader>
                <Avatar src={mentor.avatar} alt={mentor.name} fallback={mentor.name[0]} />
                <CardTitle>{mentor.name} - {mentor.role}</CardTitle>
              </CardHeader>
              <CardContent>
                <p style={{ color: '#4b5563', marginBottom: '1rem', lineHeight: '1.625' }}>{mentor.description}</p>
                <AnimatePresence>
                  {hoveredMentor === mentor.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 style={{ fontWeight: '600', color: '#02b1fc', marginBottom: '0.5rem' }}>Key Skills:</h4>
                      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', padding: 0 }}>
                        {mentor.skills.map((skill, skillIndex) => (
                          <SkillBadge key={skill} skill={skill} />
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIMentors;
