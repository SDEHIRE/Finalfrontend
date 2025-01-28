import React from 'react';
import { motion } from 'framer-motion';
import { Building, Users, FileText } from 'lucide-react';

const Card = ({ children, className, ...props }) => (
  <motion.div
    className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    {...props}
  >
    {children}
  </motion.div>
);

const CardHeader = ({ children }) => (
  <div className="p-6">{children}</div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-xl font-semibold text-gray-800 mb-2">{children}</h3>
);

const CardContent = ({ children }) => (
  <div className="px-6 pb-6 text-gray-600">{children}</div>
);

const IconWrapper = ({ children }) => (
  <motion.div
    className="mb-4"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    {children}
  </motion.div>
);

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#7fd1fc] to-indigo-300 text-gray-800 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 bg-gradient-to-r from-indigo-900 to-blue-900 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Our Services
        </motion.h2>
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <IconWrapper>
                  <Building className="h-12 w-12 text-[#02b1fc]" />
                </IconWrapper>
                <CardTitle>Company Test Hosting</CardTitle>
              </CardHeader>
              <CardContent>
                We provide a secure platform for companies to host their technical assessments and coding tests,
                ensuring a smooth evaluation process for candidates.
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <IconWrapper>
                  <Users className="h-12 w-12 text-indigo-400" />
                </IconWrapper>
                <CardTitle>Recruitment Services</CardTitle>
              </CardHeader>
              <CardContent>
                Our AI-powered matching system helps companies find the best candidates based on skills, experience,
                and cultural fit, streamlining the recruitment process.
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <IconWrapper>
                  <FileText className="h-12 w-12 text-[#02b1fc]" />
                </IconWrapper>
                <CardTitle>Custom Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                We work with companies to create tailored coding challenges and assessments that match their specific
                technical requirements and company culture.
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="absolute top-0 left-0 right-0 h-2 bg-white"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </section>
  );
};

export default Services;
