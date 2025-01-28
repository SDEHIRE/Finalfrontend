import React from 'react'
import { Twitter, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-800/90 text-white relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage: "url('/Landing/footer.jpeg')",
          backgroundPosition: "center 25%"
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40"></div>
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">About SDE Hire</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-[#40c9ff] transition-colors duration-200">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#40c9ff] transition-colors duration-200">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#40c9ff] transition-colors duration-200">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-[#40c9ff] transition-colors duration-200">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#40c9ff] transition-colors duration-200">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#40c9ff] transition-colors duration-200">
                  Community
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-[#40c9ff] transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#40c9ff] transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#40c9ff] transition-colors duration-200">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Connect</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="flex items-center hover:text-[#40c9ff] transition-colors duration-200">
                  <Twitter className="w-5 h-5 mr-2" />
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center hover:text-[#40c9ff] transition-colors duration-200">
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center hover:text-[#40c9ff] transition-colors duration-200">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-gray-400">
          © 2024 SDE Hire. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
