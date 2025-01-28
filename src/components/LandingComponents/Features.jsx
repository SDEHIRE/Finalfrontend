import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info } from 'lucide-react'

const Features = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const videoRefs = useRef([])
  const playPromises = useRef([])

  useEffect(() => {
    videoRefs.current.forEach(async (video, index) => {
      if (!video) return

      if (playPromises.current[index]) {
        try {
          await playPromises.current[index]
        } catch (error) {
          console.log("Previous play promise rejected:", error)
        }
      }

      if (hoveredFeature === index) {
        try {
          video.currentTime = 0
          playPromises.current[index] = video.play()
          await playPromises.current[index]
        } catch (error) {
          console.log("Error playing video:", error)
        }
      } else {
        try {
          await video.pause()
          video.currentTime = 0
        } catch (error) {
          console.log("Error pausing video:", error)
        }
      }
    })

    return () => {
      videoRefs.current.forEach(async (video, index) => {
        if (video) {
          try {
            await video.pause()
            video.currentTime = 0
          } catch (error) {
            console.log("Error cleaning up video:", error)
          }
        }
      })
    }
  }, [hoveredFeature])

  const features = [
    {
      title: "Dynamic Coding Challenges",
      description: "Tackle personalized coding challenges that adapt to your skill level and learning pace.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      video: "/Landing/Dynamicoding.mp4"
    },
    {
      title: "AI-Powered Interview Simulations",
      description: "Prepare for job interviews with our AI interviewer, Lisa, who adapts questions based on your responses.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      video: "/Landing/interview.mp4"
    },
    {
      title: "Personalized Learning Paths",
      description: "Get customized learning recommendations from Steve, your AI coding mentor.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      video: "/Landing/personalised.mp4"
    }
  ]

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4 text-indigo-600">
          Our Features
        </h2>
        <div className="flex items-center justify-center mb-12 text-gray-600">
          <Info className="w-5 h-5 mr-2" />
          <p className="text-center">Discover the power of our features - hover over each card for an interactive preview!</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-b from-[#02b1fc] to-[#0080ff] rounded-lg shadow-lg overflow-hidden cursor-pointer relative w-full h-[200px]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="p-6 h-full flex flex-col justify-between">
                <div className="flex items-center mb-4">
                  <div className="mr-4 text-white">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <AnimatePresence>
                  {hoveredFeature === index && (
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <video
                        ref={el => videoRefs.current[index] = el}
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                        loop
                        muted
                        playsInline
                      >
                        <source src={feature.video} type="video/mp4" />
                      </video>
                      <div className="relative z-10 p-6 h-full flex flex-col justify-center">
                        <h3 className="text-xl font-semibold mb-2 text-indigo-600">{feature.title}</h3>
                        <p className="text-sm text-black">{feature.description}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
