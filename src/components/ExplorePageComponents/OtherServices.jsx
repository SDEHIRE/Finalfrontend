import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Award, ShieldCheck, ArrowRight } from 'lucide-react';

const OtherServices = () => {
  const services = [
    {
      icon: <Compass className="h-6 w-6" />,
      title: "NextStep: Your Career Companion",
      description: "NextStep is a dedicated guide for students uncertain about their career path. It provides tailored guidance, resources, and actionable insights to help students navigate career planning with confidence.",
      link: "/nextstep"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "CertifyMe: Accredited Skills and Assessment Platform",
      description: "CertifyMe offers a robust suite of assessment modules to validate students' skills across multiple proficiency levels. Earn SDE Hire Certification and showcase your technical competencies to potential employers.",
      link: "/certifyme"
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Company Test Hosting: Advanced Testing Solution",
      description: "Leverage our advanced technology platform for secure assessments, proctoring, and malpractice detection. Streamline your recruitment process with customizable testing options and data-driven hiring decisions.",
      link: "/company-test-hosting"
    }
  ];

  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Other Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-[#02b1fc] p-2 rounded-full mr-4 text-white">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
            </div>
            <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
            <motion.a
              href={service.link}
              className="inline-flex items-center text-[#02b1fc] font-semibold hover:underline"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default OtherServices;