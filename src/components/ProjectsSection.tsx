'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      name: "EunoiaHub",
      category: "FULL-STACK",
      description: "High-performance e-commerce platform with real-time inventory management and lightning-fast checkout process.",
      engine: "Next.js",
      aerodynamics: "Tailwind CSS",
      strategy: "PostgreSQL",
      image: "/projects/eunoiahub.png", // Add your project image here
      performance: {
        loadTime: "1.2s",
        uptime: "99.9%",
        users: "10K+",
        score: 95
      },
      position: 1,
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Redis"],
      github: "https://github.com/Ammar9faisal/EunoiaHub",
      demo: "https://eunoia-hub.vercel.app",
      status: "WINNER"
    },
    {
      name: "NeuroGait",
      category: "FULL-STACK",
      description: "WebSocket-powered chat application with file sharing, video calls, and real-time collaboration features.",
      engine: "Node.js",
      aerodynamics: "Socket.io",
      strategy: "MongoDB",
      image: "/projects/neurogait.jpg", // Add your project image here
      performance: {
        loadTime: "0.8s",
        uptime: "99.7%",
        users: "5K+",
        score: 92
      },
      position: 2,
      technologies: ["Node.js", "Socket.io", "React", "MongoDB", "WebRTC"],
      github: "https://github.com/Ammar9faisal/NeuroGait",
      demo: "https://devpost.com/software/neurogait",
      status: "PODIUM"
    },
    {
      name: "Dash2Dorm",
      category: "FRONTEND",
      description: "Interactive dashboard with real-time data visualization and advanced analytics for business intelligence.",
      engine: "React",
      aerodynamics: "D3.js",
      strategy: "Firebase",
      image: "/projects/dash2dorm.jpg", // Add your project image here
      performance: {
        loadTime: "1.5s",
        uptime: "99.5%",
        users: "2K+",
        score: 88
      },
      position: 3,
      technologies: ["React", "D3.js", "Firebase", "Chart.js", "Material-UI"],
      github: "https://github.com/Ammar9faisal/Dash2Dorm_hackthe6ix",
      demo: "https://devpost.com/software/lloyd-draft",
      status: "PODIUM"
    }
  ];

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1: return 'from-yellow-500 to-yellow-600';
      case 2: return 'from-gray-400 to-gray-500';
      case 3: return 'from-orange-600 to-orange-700';
      default: return 'from-red-600 to-red-700';
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'WINNER') return '🏆';
    if (status === 'PODIUM') return '🥈';
    return '🏁';
  };

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-wide font-mono">
            RACING <span className="text-red-500">GARAGE</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl">Championship-winning projects built for speed and performance</p>
          <div className="w-24 sm:w-32 h-1 bg-red-500 mx-auto mt-4 sm:mt-6"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-900 to-black rounded-xl lg:rounded-2xl overflow-hidden border border-gray-700 hover:border-red-500 transition-all duration-500 transform hover:scale-105"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Position Badge */}
              <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${getPositionColor(project.position)} rounded-full flex items-center justify-center z-10`}>
                <span className="text-white font-bold text-sm sm:text-base lg:text-lg">#{project.position}</span>
              </div>

              {/* Project Image */}
              <div className="relative h-40 sm:h-48 bg-gray-800 overflow-hidden">
                {/* Fallback background */}
                <div className="absolute inset-0 project-image-fallback">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl lg:text-4xl mb-2">🏎️</div>
                    <div className="text-xs opacity-75">{project.name}</div>
                    <div className="text-xs opacity-50 mt-1">[ADD PROJECT IMAGE]</div>
                  </div>
                </div>
                
                <Image
                  src={project.image}
                  alt={`${project.name} project screenshot`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 z-10"
                  onError={(e) => {
                    // Hide image on error to show fallback
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                
                {/* Image overlay for F1 theme */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20"></div>
                
                {/* Checkered flag corner */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white via-gray-300 to-black opacity-20 clip-triangle z-30"></div>
                
                {/* Racing stripes effect */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-white to-red-600 opacity-30 z-30"></div>
              </div>

              {/* Project Card */}
              <div className="p-4 sm:p-6 lg:p-8">
                {/* Project Header */}
                <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                  <div className="text-xl sm:text-2xl lg:text-3xl">{getStatusBadge(project.status)}</div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white text-lg sm:text-xl font-bold font-mono truncate">{project.name}</h3>
                    <p className="text-red-400 text-xs sm:text-sm font-mono">{project.category}</p>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="bg-black/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 border border-gray-700">
                  <h4 className="text-red-400 text-xs sm:text-sm font-bold mb-2 sm:mb-3 font-mono">TECH SPECS</h4>
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 flex-shrink-0">ENGINE:</span>
                      <span className="text-white font-mono text-right truncate ml-2">{project.engine}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 flex-shrink-0">AERO:</span>
                      <span className="text-white font-mono text-right truncate ml-2">{project.aerodynamics}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 flex-shrink-0">STRATEGY:</span>
                      <span className="text-white font-mono text-right truncate ml-2">{project.strategy}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Performance Metrics */}
                <div className="bg-gray-900/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <h4 className="text-green-400 text-xs sm:text-sm font-bold mb-2 sm:mb-3 font-mono">LAP TIMES</h4>
                  <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center text-xs">
                    <div>
                      <div className="text-green-400 font-bold font-mono text-xs sm:text-sm">{project.performance.loadTime}</div>
                      <div className="text-gray-500 text-xs">LOAD</div>
                    </div>
                    <div>
                      <div className="text-blue-400 font-bold font-mono text-xs sm:text-sm">{project.performance.uptime}</div>
                      <div className="text-gray-500 text-xs">UPTIME</div>
                    </div>
                    <div>
                      <div className="text-yellow-400 font-bold font-mono text-xs sm:text-sm">{project.performance.users}</div>
                      <div className="text-gray-500 text-xs">USERS</div>
                    </div>
                  </div>
                  
                  {/* Performance Score */}
                  <div className="mt-2 sm:mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-400 text-xs">PERFORMANCE SCORE</span>
                      <span className="text-red-400 font-bold text-xs sm:text-sm">{project.performance.score}%</span>
                    </div>
                    <div className="h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-1000"
                        style={{ width: `${project.performance.score}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Technology Stack */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs font-mono border border-red-600/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2.5 sm:py-2 px-4 rounded-lg transition-all duration-300 font-mono text-xs sm:text-sm font-semibold text-center"
                    >
                    🏁 VIEW PROJECT
                    </a>
                    <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="sm:flex-shrink-0 bg-gray-800 hover:bg-gray-700 text-white py-2.5 sm:py-2 px-4 rounded-lg transition-colors font-mono text-xs sm:text-sm text-center"
                    >
                    🐙 CODE
                    </a>
                </div>
              </div>

              {/* Hover Effect - Speed Lines */}
              {hoveredProject === index && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
                </div>
              )}

              {/* Racing Stripe */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Championship Summary */}
        <div className="bg-gradient-to-r from-black via-gray-900 to-black rounded-3xl p-8 border-2 border-red-600">
          <h3 className="text-3xl font-bold text-white text-center mb-8 font-mono">
            🏆 CHAMPIONSHIP STANDINGS
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl mb-2">🏆</div>
              <div className="text-3xl font-bold text-yellow-400 font-mono">12</div>
              <div className="text-gray-400 text-sm font-mono">RACE WINS</div>
            </div>
            <div>
              <div className="text-4xl mb-2">🥈</div>
              <div className="text-3xl font-bold text-gray-300 font-mono">8</div>
              <div className="text-gray-400 text-sm font-mono">PODIUMS</div>
            </div>
            <div>
              <div className="text-4xl mb-2">⚡</div>
              <div className="text-3xl font-bold text-blue-400 font-mono">25</div>
              <div className="text-gray-400 text-sm font-mono">FASTEST LAPS</div>
            </div>
            <div>
              <div className="text-4xl mb-2">🏁</div>
              <div className="text-3xl font-bold text-green-400 font-mono">100%</div>
              <div className="text-gray-400 text-sm font-mono">COMPLETION RATE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
