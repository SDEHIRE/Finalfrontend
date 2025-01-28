import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function GetStarted({ email, setEmail, handleSubmit }) {
  return (
    <section id="get-started" className="w-full py-8 md:py-12 bg-[#f0f7fa]">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter animate-[fade-in-up_0.5s_ease-out] bg-gradient-text">
            Ready to Accelerate Your Software Development Career?
          </h2>
          <p className="max-w-3xl text-gray-600 text-sm md:text-base animate-[fade-in-up_0.5s_ease-out_0.2s]">
            Join SDE Hire today and experience the power of AI-driven learning and interview preparation.
          </p>
          <div className="w-full max-w-3xl space-y-2 animate-[fade-in-up_0.5s_ease-out_0.4s]">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-[#ff6b6b] hover:bg-[#ff5252] text-white rounded-md transition-colors duration-200 flex items-center justify-center"
              >
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </form>
            <p className="text-xs text-gray-500">
              14-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .bg-gradient-text {
          background: linear-gradient(270deg, #ff6b6b, #4ecdc4, #45b7d1, #6e5773);
          background-size: 800% 800%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientAnimation 10s ease infinite;
        }
      `}</style>
    </section>
  )
}