'use client';

import { useState, useEffect } from 'react';

interface F1HeaderProps {
  isReady: boolean;
}

export default function F1Header({ isReady }: F1HeaderProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'hero', label: 'DRIVER', icon: '👤' },
    { id: 'projects', label: 'GARAGE', icon: '🏗️' },
    { id: 'skills', label: 'SPECS', icon: '⚙️' },
    { id: 'contact', label: 'RADIO', icon: '📡' }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-black via-gray-900 to-black border-b border-red-600 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        {/* Main Cockpit Dashboard */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between px-3 sm:px-6 py-3 lg:py-4 gap-3 lg:gap-0">
          {/* Driver Info Panel */}
          <div className="flex items-center justify-between lg:justify-start">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl font-mono">#1</span>
              </div>
              <div className="text-white font-bold text-lg sm:text-xl font-mono tracking-wide">
                AMMAR FAISAL
              </div>
            </div>
            <div className="flex items-center space-x-2 lg:hidden">
              <div className={`w-3 h-3 rounded-full ${isReady ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
              <span className="text-white font-mono text-xs sm:text-sm">
                {isReady ? 'READY' : 'STANDBY'}
              </span>
            </div>
          </div>
          
          {/* Desktop Status Indicator */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isReady ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
            <span className="text-white font-mono text-sm">
              {isReady ? 'READY' : 'STANDBY'}
            </span>
          </div>

          {/* Dashboard Navigation - Mobile */}
          <div className="flex lg:hidden overflow-x-auto scrollbar-hide">
            <nav className="flex items-center space-x-2 px-1 py-2 min-w-full">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 font-mono text-xs whitespace-nowrap flex-shrink-0
                    ${activeSection === item.id 
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="font-semibold">{item.label}</span>
                  {activeSection === item.id && (
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Dashboard Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-mono text-sm
                  ${activeSection === item.id 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-semibold">{item.label}</span>
                {activeSection === item.id && (
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Bottom Row - Mobile */}
          <div className="flex lg:hidden items-center justify-between">
            {/* Mobile Telemetry */}
            <div className="flex items-center space-x-3 text-white font-mono text-xs">
              <div className="text-center">
                <div className="text-red-400 font-bold">{time.getHours().toString().padStart(2, '0')}:{time.getMinutes().toString().padStart(2, '0')}</div>
                <div className="text-gray-400 text-xs">LOCAL</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-bold">ONLINE</div>
                <div className="text-gray-400 text-xs">STATUS</div>
              </div>
            </div>
            
            {/* Mobile Social Links */}
            <div className="flex items-center space-x-1">
              <button className="w-8 h-8 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-white text-sm">🐙</span>
              </button>
              <button className="w-8 h-8 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-white text-sm">💼</span>
              </button>
              <button className="w-8 h-8 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-white text-sm">🐦</span>
              </button>
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Telemetry Display */}
            <div className="flex items-center space-x-6 text-white font-mono text-sm">
              <div className="text-center">
                <div className="text-red-400 font-bold">{time.getHours().toString().padStart(2, '0')}:{time.getMinutes().toString().padStart(2, '0')}</div>
                <div className="text-gray-400 text-xs">LOCAL</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-bold">ONLINE</div>
                <div className="text-gray-400 text-xs">STATUS</div>
              </div>
              <div className="text-center">
                <div className="text-blue-400 font-bold">DEV</div>
                <div className="text-gray-400 text-xs">MODE</div>
              </div>
            </div>

            {/* Pit Crew Social Links */}
            <div className="flex items-center space-x-2">
              <button className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-white">🐙</span>
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-white">💼</span>
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-white">🐦</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LED Status Strip */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-green-400 animate-pulse opacity-70"></div>
    </header>
  );
}
