import React from 'react'
import Header from './LandingComponents/Header'
import Hero from './LandingComponents/Hero'
import CompanyLogos from './LandingComponents/CompanyLogos'
import Features from './LandingComponents/Features'
import AIMentors from './LandingComponents/AIMentors'
import Services from './LandingComponents/Services'
import Testimonials from './LandingComponents/Testimonials'
import GetStarted from './LandingComponents/GetStarted'
import Footer from './LandingComponents/Footer'




const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CompanyLogos />
        <Features />
        <AIMentors />
        <Services />
        <Testimonials/>
        <GetStarted/>
        <Footer/>
      </main>
    </div>
  )
}

export default Landing
