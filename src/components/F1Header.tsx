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
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-red-600">
      {/* Main Cockpit Dashboard */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Driver Name Display */}
          <div className="flex items-center space-x-4">
            <div className="bg-red-600 text-white px-4 py-2 rounded font-bold text-xl tracking-wider">
              AMMAR FAISAL
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isReady ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
              <span className="text-white font-mono text-sm">
                {isReady ? 'READY' : 'STANDBY'}
              </span>
            </div>
          </div>

          {/* Dashboard Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
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

          {/* Telemetry Display */}
          <div className="hidden lg:flex items-center space-x-6 text-white font-mono text-sm">
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

      {/* LED Status Strip */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-green-400 animate-pulse opacity-70"></div>
    </header>
  );
}
