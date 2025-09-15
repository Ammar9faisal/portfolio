'use client';

import { useState, useEffect } from 'react';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('skills');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: "ENGINE POWER",
      subtitle: "Backend Systems",
      icon: "⚙️",
      color: "red",
      skills: [
        { name: "Node.js", level: 95, experience: "5 years" },
        { name: "Python", level: 88, experience: "4 years" },
        { name: "PostgreSQL", level: 92, experience: "5 years" },
        { name: "MongoDB", level: 85, experience: "3 years" },
        { name: "Express.js", level: 90, experience: "4 years" },
        { name: "REST APIs", level: 95, experience: "5 years" }
      ]
    },
    {
      title: "AERODYNAMICS",
      subtitle: "Frontend Performance",
      icon: "🏎️",
      color: "blue",
      skills: [
        { name: "React.js", level: 98, experience: "5 years" },
        { name: "Next.js", level: 94, experience: "3 years" },
        { name: "TypeScript", level: 92, experience: "4 years" },
        { name: "Tailwind CSS", level: 95, experience: "3 years" },
        { name: "Vue.js", level: 85, experience: "2 years" },
        { name: "React Native", level: 80, experience: "2 years" }
      ]
    },
    {
      title: "RACE STRATEGY",
      subtitle: "Architecture & DevOps",
      icon: "📊",
      color: "green",
      skills: [
        { name: "AWS", level: 88, experience: "3 years" },
        { name: "Docker", level: 85, experience: "3 years" },
        { name: "Git", level: 98, experience: "6 years" },
        { name: "CI/CD", level: 87, experience: "3 years" },
        { name: "Microservices", level: 82, experience: "2 years" },
        { name: "System Design", level: 90, experience: "4 years" }
      ]
    }
  ];

  const experience = [
    {
      year: "2024",
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Ltd",
      description: "Leading development of scalable web applications",
      milestone: "POLE_POSITION"
    },
    {
      year: "2022",
      title: "Full Stack Developer",
      company: "Digital Solutions Inc",
      description: "Developed e-commerce platforms and APIs",
      milestone: "FASTEST_LAP"
    },
    {
      year: "2020",
      title: "Frontend Developer",
      company: "StartUp Velocity",
      description: "Built responsive web applications",
      milestone: "FIRST_WIN"
    },
    {
      year: "2019",
      title: "Junior Developer",
      company: "CodeCraft Studios",
      description: "Started professional development journey",
      milestone: "ROOKIE_YEAR"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      red: {
        bg: 'bg-red-600',
        text: 'text-red-400',
        border: 'border-red-600',
        gradient: 'from-red-600 to-red-700'
      },
      blue: {
        bg: 'bg-blue-600',
        text: 'text-blue-400',
        border: 'border-blue-600',
        gradient: 'from-blue-600 to-blue-700'
      },
      green: {
        bg: 'bg-green-600',
        text: 'text-green-400',
        border: 'border-green-600',
        gradient: 'from-green-600 to-green-700'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-wide font-mono">
            TECHNICAL <span className="text-red-500">SPECIFICATIONS</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl">Performance metrics and engineering excellence</p>
          <div className="w-24 sm:w-32 h-1 bg-red-500 mx-auto mt-4 sm:mt-6"></div>
        </div>

        {/* Skills Categories */}
        <div className="mb-12 sm:mb-16">
          {/* Category Selector */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="bg-gray-900 rounded-lg p-1 sm:p-2 border border-gray-700 w-full max-w-4xl overflow-x-auto">
              <div className="flex space-x-1 sm:space-x-0 min-w-max sm:min-w-0 sm:grid sm:grid-cols-3">
                {skillCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg font-mono text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap sm:whitespace-normal flex-shrink-0 ${
                      activeCategory === index
                        ? `bg-gradient-to-r ${getColorClasses(category.color).gradient} text-white`
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="text-sm sm:text-base lg:text-lg mr-1 sm:mr-2">{category.icon}</span>
                    <span className="hidden sm:inline">{category.title}</span>
                    <span className="sm:hidden">{category.title.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Category Display */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700">
            <div className="text-center mb-6 sm:mb-8">
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">{skillCategories[activeCategory].icon}</div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-mono mb-2">
                {skillCategories[activeCategory].title}
              </h3>
              <p className="text-gray-400 text-base sm:text-lg">{skillCategories[activeCategory].subtitle}</p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-black/50 rounded-lg p-4 sm:p-6 border border-gray-700 hover:border-red-500 transition-all duration-300"
                >
                  <div className="flex justify-between items-start sm:items-center mb-3 flex-col sm:flex-row space-y-1 sm:space-y-0">
                    <h4 className="text-white font-semibold font-mono text-sm sm:text-base">{skill.name}</h4>
                    <span className={`font-bold font-mono text-sm ${getColorClasses(skillCategories[activeCategory].color).text}`}>
                      {skill.level}%
                    </span>
                  </div>
                  
                  {/* Skill Level Bar */}
                  <div className="mb-3">
                    <div className="h-2 sm:h-3 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getColorClasses(skillCategories[activeCategory].color).gradient} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="text-gray-400 text-xs font-mono">
                    Experience: {skill.experience}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Career Timeline - Racing Circuit */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700">
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8 font-mono">
            🏁 CAREER RACE CIRCUIT
          </h3>
          
          <div className="relative">
            {/* Circuit Track */}
            <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-px h-full w-0.5 bg-gray-600"></div>
            
            <div className="space-y-6 sm:space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="relative flex items-center">
                  {/* Milestone Marker */}
                  <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-red-600 rounded-full border-2 sm:border-4 border-black z-10">
                    <div className="w-full h-full bg-red-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Content */}
                  <div className={`pl-12 sm:pl-0 sm:w-5/12 ${index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:ml-auto sm:pl-8'} w-full sm:w-auto`}>
                    <div className="bg-black/50 rounded-lg p-4 sm:p-6 border border-gray-700">
                      <div className="text-red-400 font-bold font-mono text-base sm:text-lg mb-2">{exp.year}</div>
                      <h4 className="text-white font-semibold text-lg sm:text-xl mb-2">{exp.title}</h4>
                      <div className="text-gray-400 font-mono text-sm mb-3">{exp.company}</div>
                      <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>
                      
                      {/* Achievement Badge */}
                      <div className="mt-3 sm:mt-4">
                        <span className="bg-red-600/20 text-red-400 px-2 sm:px-3 py-1 rounded-full text-xs font-mono border border-red-600/30">
                          {exp.milestone.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Dashboard */}
        <div className="mt-12 sm:mt-16 bg-black rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-red-600">
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8 font-mono">
            📊 PERFORMANCE TELEMETRY
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="bg-red-600 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white text-lg sm:text-2xl font-bold font-mono">95%</span>
              </div>
              <div className="text-white font-semibold font-mono text-sm sm:text-base">CODE QUALITY</div>
              <div className="text-gray-400 text-xs sm:text-sm font-mono">Average Score</div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white text-lg sm:text-2xl font-bold font-mono">24H</span>
              </div>
              <div className="text-white font-semibold font-mono text-sm sm:text-base">RESPONSE TIME</div>
              <div className="text-gray-400 text-xs sm:text-sm font-mono">Max Turnaround</div>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white text-lg sm:text-2xl font-bold font-mono">99%</span>
              </div>
              <div className="text-white font-semibold font-mono text-sm sm:text-base">UPTIME</div>
              <div className="text-gray-400 text-xs sm:text-sm font-mono">Project Reliability</div>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-600 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white text-lg sm:text-2xl font-bold font-mono">∞</span>
              </div>
              <div className="text-white font-semibold font-mono text-sm sm:text-base">PASSION</div>
              <div className="text-gray-400 text-xs sm:text-sm font-mono">Unlimited Drive</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
