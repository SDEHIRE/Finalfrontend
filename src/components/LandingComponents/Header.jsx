import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from "framer-motion"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const NavItem = ({ href, children }) => (
    <motion.a
      href={href}
      className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-[#40c9ff] rounded-md transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  )

  const DropdownNavItem = ({ trigger, id, children }) => {
    const isActive = activeDropdown === id

    const handleClick = (e) => {
      e.preventDefault()
      setActiveDropdown(isActive ? null : id)
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null)
      }
    }

    return (
      <div className="relative group" onKeyDown={handleKeyDown}>
        <button
          onClick={handleClick}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-[#40c9ff] transition-colors duration-200 focus:outline-none"
          aria-expanded={isActive}
          aria-haspopup="true"
        >
          {trigger}
          <motion.span
            className="ml-1"
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▼
          </motion.span>
        </button>
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  const Button = ({ children, variant, className, href }) => {
    const baseClass = "text-sm font-medium px-4 py-2 rounded transition-all duration-200"
    const variantClass = variant === "outline"
      ? "border border-gray-300 hover:bg-[#40c9ff] hover:text-white"
      : "bg-[#40c9ff] hover:bg-[#34a8ff] text-white"

    return (
      <a
        href={href}
        className={`${baseClass} ${variantClass} ${className}`}
      >
        {children}
      </a>
    )
  }

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-white shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1 flex items-center">
          <a href="/" className="flex items-center h-full">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="h-24 w-auto"
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-INTvizZ0fhEqSsWwagneXQWhJUubYC.png"
                alt="SDE HIRE"
                className="h-full w-auto object-contain"
              />
            </motion.div>
          </a>
        </div>
        <nav className="hidden md:flex items-center space-x-4" ref={dropdownRef}>
          <DropdownNavItem trigger="Products" id="products">
            <NavItem href="/Sdehire-pro-landing">SDE Hire Pro</NavItem>
            <NavItem href="https://sdehire.in/freshman/login/index.php">SDE Hire Freshmen</NavItem>
          </DropdownNavItem>
          <DropdownNavItem trigger="Services" id="services">
            <NavItem href="/ComingSoon">CertifyMe</NavItem>
            <NavItem href="/ComingSoon">NextStep</NavItem>
          </DropdownNavItem>
          <NavItem href="/events">Events</NavItem>
          <DropdownNavItem trigger="Partners" id="partners">
            <NavItem href="/ComingSoon">University Collaborations</NavItem>
            <NavItem href="/ComingSoon">Student Engagement Programs</NavItem>
            <NavItem href="/ComingSoon">Academic Partnerships</NavItem>
            <NavItem href="/ComingSoon">Industry Partnerships</NavItem>
            <NavItem href="/ComingSoon">Corporate Training Programs</NavItem>
            <NavItem href="/ComingSoon">Recruitment Opportunities</NavItem>
          </DropdownNavItem>
          <Button href="/RequestDemo" variant="outline">
            Request Demo
          </Button>
          <Button href="/explore">
            Explore
          </Button>
        </nav>
        <motion.button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gray-600">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gray-600">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </motion.button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 space-y-4">
              <NavItem href="/sde-hire-freshmen">SDE Hire Freshmen</NavItem>
              <NavItem href="/sde-hire-pro">SDE Hire Pro</NavItem>
              <NavItem href="/certify-me">CertifyMe</NavItem>
              <NavItem href="/next-step">NextStep</NavItem>
              <NavItem href="/events">Events</NavItem>
              <NavItem href="/partners">Partners</NavItem>
              <NavItem href="/request-demo">Request Demo</NavItem>
              <NavItem href="#explore">Explore</NavItem>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
