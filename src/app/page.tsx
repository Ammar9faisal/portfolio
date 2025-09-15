
'use client';

import F1Header from '../components/F1Header';
import DriverHero from '../components/DriverHero';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ContactSection from '../components/ContactSection';
import ScrollProgress from '../components/ScrollProgress';

export default function Home() {


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* F1 Cockpit Header */}
      <F1Header isReady={true} />
      
      {/* Main Content */}
      <main className="relative">
        {/* Tire Track Background Pattern */}
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-1 bg-white transform rotate-2"></div>
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white transform -rotate-1"></div>
          <div className="absolute top-3/4 left-0 w-full h-1 bg-white transform rotate-1"></div>
        </div>
        
        {/* Driver Card Hero */}
        <DriverHero />
        
        {/* Projects Racing Cards */}
        <ProjectsSection />
        
        {/* Skills & Performance */}
        <SkillsSection />
        
        {/* Contact Pit Crew */}
        <ContactSection />
      </main>
      
      {/* Racing Stripes */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-400 to-red-600 z-40"></div>
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-400 to-red-600 z-40"></div>
    </div>
  );
}
