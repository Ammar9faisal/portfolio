'use client';

import { useState, useEffect } from 'react';

export default function DriverHero() {
  const [trafficLight, setTrafficLight] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const lightSequence = setTimeout(() => {
      if (trafficLight < 5) {
        setTrafficLight(prev => prev + 1);
      } else {
        setTrafficLight(0);
        setIsActive(true);
      }
    }, 800);

    return () => clearTimeout(lightSequence);
  }, [trafficLight]);

  const telemetryData = [
    { label: 'EXPERIENCE', value: '5+', unit: 'YEARS', color: 'text-green-400' },
    { label: 'PROJECTS', value: '100+', unit: 'COMPLETED', color: 'text-blue-400' },
    { label: 'TECHNOLOGIES', value: '25+', unit: 'MASTERED', color: 'text-yellow-400' },
    { label: 'CONTRIBUTIONS', value: '1000+', unit: 'COMMITS', color: 'text-red-400' }
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Driver Card */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-red-600 shadow-2xl">
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-2xl sm:text-3xl">AF</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide">AMMAR FAISAL</h1>
                    <p className="text-red-400 text-sm sm:text-base lg:text-lg font-mono">SOFTWARE ENGINEER</p>
                  </div>
                </div>
                <div className="text-right sm:text-right self-start sm:self-auto">
                  <div className="text-red-500 text-4xl sm:text-5xl lg:text-6xl font-bold font-mono">01</div>
                  <div className="text-gray-400 text-xs">DRIVER #</div>
                </div>
              </div>

              {/* Driver Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-black/50 rounded-lg p-3 sm:p-4 border border-gray-700">
                  <div className="text-gray-400 text-xs sm:text-sm">NATIONALITY</div>
                  <div className="text-white font-semibold text-sm sm:text-base">🇨🇦 CANADA</div>
                </div>
                <div className="bg-black/50 rounded-lg p-3 sm:p-4 border border-gray-700">
                  <div className="text-gray-400 text-xs sm:text-sm">TEAM</div>
                  <div className="text-white font-semibold text-sm sm:text-base">YORK UNIVERSITY</div>
                </div>
                <div className="bg-black/50 rounded-lg p-3 sm:p-4 border border-gray-700">
                  <div className="text-gray-400 text-xs sm:text-sm">SPECIALIZATION</div>
                  <div className="text-white font-semibold text-sm sm:text-base">FULL STACK</div>
                </div>
                <div className="bg-black/50 rounded-lg p-3 sm:p-4 border border-gray-700">
                  <div className="text-gray-400 text-xs sm:text-sm">STATUS</div>
                  <div className="text-green-400 font-semibold text-sm sm:text-base">AVAILABLE</div>
                </div>
              </div>

              {/* Championship Badge */}
              <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-yellow-300 text-lg sm:text-xl lg:text-2xl font-bold">🏆 WORLD CHAMPION</div>
                <div className="text-red-100 text-xs sm:text-sm">SOFTWARE DEVELOPMENT 2024</div>
              </div>
            </div>

            {/* Racing Number Background */}
            <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 text-[120px] sm:text-[160px] lg:text-[200px] font-bold text-red-600/10 -z-10 font-mono">01</div>
          </div>

          {/* Telemetry Dashboard */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            {/* F1 Traffic Light */}
            <div className="bg-black rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-600">
              <h3 className="text-white text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center">PERFORMANCE STATUS</h3>
              <div className="flex justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                {[1, 2, 3, 4, 5].map((light) => (
                  <div
                    key={light}
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-300 ${
                      trafficLight >= light && !isActive
                        ? 'bg-red-500 border-red-300 shadow-lg shadow-red-500/50'
                        : isActive
                        ? 'bg-green-500 border-green-300 shadow-lg shadow-green-500/50'
                        : 'bg-gray-800 border-gray-600'
                    }`}
                  />
                ))}
              </div>
              <div className="text-center">
                <div className={`font-mono text-sm sm:text-base lg:text-lg font-bold ${isActive ? 'text-green-400' : 'text-red-400'}`}>
                  {isActive ? 'ALL SYSTEMS GO!' : 'INITIALIZING...'}
                </div>
              </div>
            </div>

            {/* Telemetry Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {telemetryData.map((data, index) => (
                <div key={index} className="bg-gray-900 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-700">
                  <div className="text-gray-400 text-xs sm:text-sm font-mono mb-2">{data.label}</div>
                  <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold font-mono ${data.color} mb-1`}>
                    {data.value}
                  </div>
                  <div className="text-gray-500 text-xs font-mono">{data.unit}</div>
                  
                  {/* Performance Bar */}
                  <div className="mt-2 sm:mt-3 h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${data.color.replace('text-', 'bg-')} rounded-full animate-pulse`}
                      style={{ width: `${Math.min(parseInt(data.value) || 90, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
     
          </div>
        </div>
      </div>

      {/* Circuit Map Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 600">
          <path
            d="M100 300 Q200 100 400 300 Q600 500 700 300 Q600 100 400 300 Q200 500 100 300"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10,5"
          />
        </svg>
      </div>
    </section>
  );
}
