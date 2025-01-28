import React from 'react';
import Header from './ExplorePageComponents/Header';
import GradientBackground from './ExplorePageComponents/GradientBackground';
import MainSections from './ExplorePageComponents/MainSections';
import SuccessStories from './ExplorePageComponents/SuccessStories';
import LaunchPadProducts from './ExplorePageComponents/LaunchPadProducts';
import OtherServices from './ExplorePageComponents/OtherServices';
import CallToAction from './ExplorePageComponents/CallToAction';
import Footer from './ExplorePageComponents/Footer';

const ExplorePage = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <GradientBackground />
      <Header />
      <MainSections />
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <SuccessStories />
        <LaunchPadProducts />
        <OtherServices />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default ExplorePage;
