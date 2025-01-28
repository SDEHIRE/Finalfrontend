import React, { useState, useEffect } from 'react'

const Hero = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Email submitted:', email)
    // Add your email submission logic here
  }

  useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.innerHTML = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fade-in-up {
        animation: fadeInUp 0.5s ease-out;
      }

      .animation-delay-200 {
        animation-delay: 200ms;
      }

      .animation-delay-400 {
        animation-delay: 400ms;
      }

      @keyframes bounce {
        0%, 100% {
          transform: translateY(-25%);
          animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
        }
        50% {
          transform: translateY(0);
          animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
        }
      }

      .animate-bounce {
        animation: bounce 1s infinite;
      }

      @keyframes wave {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }

      .animate-wave {
        animation: wave 10s linear infinite;
      }

      .animate-wave-slow {
        animation: wave 15s linear infinite;
      }

      .animate-wave-slower {
        animation: wave 20s linear infinite;
      }
    `
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  const EmailSVG = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#40c9ff] animate-bounce"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )

  const CircleGraphic = ({ className }) => (
    <div className={`absolute rounded-full bg-white bg-opacity-10 ${className}`}></div>
  )

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#40c9ff] via-[#34a8ff] to-[#5183f5]">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: `url('/Landing/hero.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
      <CircleGraphic className="w-64 h-64 -top-32 -left-32" />
      <CircleGraphic className="w-96 h-96 -bottom-48 -right-48" />
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white animate-fade-in-up">
            Redefine Your Future in Software Development
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl animate-fade-in-up animation-delay-200">
            Embark on a transformative journey with SDE Hire, where AI-driven mentors personalize your path to mastery and success in the tech world.
          </p>
          <div className="w-full max-w-sm space-y-2 animate-fade-in-up animation-delay-400">
            <form onSubmit={handleSubmit} className="flex items-stretch space-x-2">
              <div className="relative flex-grow">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#40c9ff] focus:border-transparent h-12"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <EmailSVG />
                </div>
              </div>
              <button
                type="submit"
                className="px-6 bg-[#FF4500] hover:bg-[#FF6347] text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF4500] focus:ring-opacity-50 shadow-lg hover:shadow-xl h-12 flex items-center justify-center"
              >
                Get Started
              </button>
            </form>
            <p className="text-xs text-black font-medium">
              Join thousands of successful developers. No credit card required.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <div className="relative h-48">
          <div className="absolute bottom-0 left-0 w-[200%] animate-wave-slower">
            <svg viewBox="0 0 2880 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0L2880 0V120H0V0Z" fill="url(#paint0_linear)"/>
              <defs>
                <linearGradient id="paint0_linear" x1="1440" y1="0" x2="1440" y2="120" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.1"/>
                  <stop offset="1" stopColor="white" stopOpacity="0.3"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-[200%] animate-wave-slow">
            <svg viewBox="0 0 2880 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0C720 80 2160 80 2880 0V120H0V0Z" fill="url(#paint1_linear)"/>
              <defs>
                <linearGradient id="paint1_linear" x1="1440" y1="0" x2="1440" y2="120" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.2"/>
                  <stop offset="1" stopColor="white" stopOpacity="0.5"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-[200%] animate-wave">
            <svg viewBox="0 0 2880 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0C720 120 2160 120 2880 0V120H0V0Z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
