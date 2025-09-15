'use client';

import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(currentProgress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    {/* Desktop Progress Indicator */}
    <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 z-40 overflow-visible">
      {/* Race Position Tracker */}
      <div className="bg-black/80 backdrop-blur-sm border border-red-600 rounded-lg p-3 shadow-2xl overflow-visible flex flex-col items-center">
        <div className="text-white text-xs font-mono mb-2 text-center">PROGRESS</div>
        
        {/* Track Progress */}
        <div className="w-8 h-48 bg-gray-800 rounded-full relative overflow-visible mx-auto">
          {/* Track markers */}
          <div className="absolute inset-x-0 top-0 h-1 bg-green-400"></div>
          <div className="absolute inset-x-0 top-1/4 h-px bg-gray-600"></div>
          <div className="absolute inset-x-0 top-1/2 h-px bg-gray-600"></div>
          <div className="absolute inset-x-0 top-3/4 h-px bg-gray-600"></div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-red-400"></div>
          
          {/* Progress Fill */}
          <div 
            className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-red-500 to-red-400 transition-all duration-300 ease-out"
            style={{ height: `${scrollProgress}%` }}
          />
          
          {/* Car Position Indicator */}
            <div 
            className="absolute left-1/2 transition-all duration-300 ease-out"
            style={{ 
              bottom: `${scrollProgress}%`,
              transform: 'translate(-50%, 50%)'
            }}
            >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/projects/car.svg" 
              alt="Racing car" 
              className="opacity-100"
              style={{ 
                width: '200px', 
                height: '200px',
                minWidth: '200px',
                minHeight: '200px',
                maxWidth: 'none',
                maxHeight: 'none'
              }}
            />
            </div>
        </div>
        
        {/* Progress Percentage */}
        <div className="text-white text-xs font-mono mt-2 text-center">
          {Math.round(scrollProgress)}%
        </div>
      </div>
    </div>

    {/* Mobile Progress Indicator */}
    <div className="lg:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-black/80 backdrop-blur-sm border border-red-600 rounded-lg px-4 py-2 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="text-white text-xs font-mono">PROGRESS</div>
          <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          <div className="text-white text-xs font-mono">
            {Math.round(scrollProgress)}%
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
