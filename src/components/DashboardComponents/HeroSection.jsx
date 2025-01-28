import React from 'react';
import { ArrowRight, Code2, Brain, Target } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-[#02b1fc] to-[#0080ff] rounded-xl p-8 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative">
        <h1 className="text-4xl font-bold mb-4 max-w-2xl">
          Empower Your Code, Ace Your Interviews!
        </h1>
        <p className="text-xl mb-8 max-w-2xl text-white/90">
          Tailored Coding Challenges & Real-World Interview Simulations at Your Fingertips
        </p>

        <div className="flex flex-col sm:flex-row gap-6 mb-8">

        <a href="/landing" className="bg-white text-[#02b1fc] hover:bg-white/90 px-4 py-2 rounded-lg font-semibold flex items-center justify-center">
            Start Learning
          </a>
          
         
          
          <a href="/cc" className="bg-white text-[#02b1fc] hover:bg-white/90 px-4 py-2 rounded-lg font-semibold flex items-center justify-center">
            Curricculam
          </a>
          <a href="/Interview" className="bg-white text-[#02b1fc] hover:bg-white/90 px-4 py-2 rounded-lg font-semibold flex items-center justify-center">
          Take this to help us know you better
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">500+</div>
              <div className="text-sm text-white/70">Coding Challenges</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">50+</div>
              <div className="text-sm text-white/70">Interview Patterns</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">100%</div>
              <div className="text-sm text-white/70">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

