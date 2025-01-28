import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Software Engineer at Google",
    content: "SDE Hire's interview simulations with Lisa were incredibly realistic. I felt well-prepared for my actual interviews!",
  },
  {
    name: "Samantha Lee",
    role: "Full Stack Developer",
    content: "Steve's personalized coding challenges helped me improve my skills rapidly. I'm now confident in tackling complex problems.",
  },
  {
    name: "Michael Chen",
    role: "Recent CS Graduate",
    content: "The combination of adaptive learning and AI mentors made my job preparation journey engaging and effective.",
  },
];

const Card = ({ children, className, ...props }) => (
  <motion.div
    className={`bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col ${className}`}
    whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
    transition={{ duration: 0.3 }}
    {...props}
  >
    {children}
  </motion.div>
);

const CardHeader = ({ children }) => (
  <div className="p-6 bg-gradient-to-r from-blue-50 to-gray-50">{children}</div>
);

const CardContent = ({ children }) => (
  <div className="px-6 pb-6 flex-grow">{children}</div>
);

const Avatar = ({ src, fallback }) => (
  <motion.div
    className="w-12 h-12 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center"
    whileHover={{ scale: 1.1 }}
    transition={{ duration: 0.2 }}
  >
    {src ? (
      <img src={src} alt="Avatar" className="w-full h-full object-cover" />
    ) : (
      <span className="text-blue-600 font-semibold text-lg">{fallback}</span>
    )}
  </motion.div>
);

const Testimonials = () => {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Success Stories
        </motion.h2>
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="h-full"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar
                      src={`https://i.pravatar.cc/150?img=${index + 1}`}
                      fallback={testimonial.name.split(" ").map((n) => n[0]).join("")}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                      <p className="text-sm text-blue-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{testimonial.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a
            href="#more-success-stories"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            Know more Success Journeys
          </a>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 to-gray-300"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </section>
  );
};

export default Testimonials;
