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
      subtitle: "Programming Languages",
      icon: "⚙️",
      color: "red",
      skills: [
        { name: "Python", level: 90, experience: "3+ years" },
        { name: "JavaScript", level: 88, experience: "3+ years" },
        { name: "TypeScript", level: 85, experience: "2+ years" },
        { name: "HTML/CSS", level: 92, experience: "3+ years" },
        { name: "Java", level: 70, experience: "2+ years" },
        { name: "SQL", level: 70, experience: "2+ years" }
      ]
    },
    {
      title: "AERODYNAMICS",
      subtitle: "Frameworks & Libraries",
      icon: "🏎️",
      color: "blue",
      skills: [
        { name: "React.js", level: 90, experience: "3+ years" },
        { name: "Node.js", level: 85, experience: "2+ years" },
        { name: "Express.js", level: 82, experience: "2+ years" },
        { name: "OpenCV", level: 88, experience: "2+ years" },
        { name: "MediaPipe", level: 60, experience: "1+ years" },
        { name: "Jest", level: 50, experience: "1+ years" }
      ]
    },
    {
      title: "RACE STRATEGY",
      subtitle: "Tools & Platforms",
      icon: "📊",
      color: "green",
      skills: [
        { name: "Git", level: 95, experience: "3+ years" },
        { name: "Appwrite", level: 75, experience: "2+ years" },
        { name: "Supabase", level: 60, experience: "1+ years" },
        { name: "Firebase", level: 60, experience: "1+ years" },
        { name: "REST APIs", level: 75, experience: "2+ years" },
        { name: "Arduino", level: 80, experience: "2+ years" }
      ]
    },
    {
      title: "AI & DATA",
      subtitle: "Machine Learning & Analytics",
      icon: "🤖",
      color: "purple",
      skills: [
        { name: "NumPy", level: 50, experience: "2+ years" },
        { name: "Matplotlib", level: 50, experience: "2+ years" },
        { name: "OpenCV", level: 50, experience: "2+ years" },
        { name: "MediaPipe", level: 75, experience: "1+ years" },
        { name: "Gemini API", level: 80, experience: "2+ years" },
        { name: "Vellum.ai", level: 75, experience: "1+ years" }
      ]
    }
  ];

  const experience = [
    {
      year: "May 2025 - Present",
      title: "Engineering Research Mentor",
      company: "K2I Academy - York University",
      description: "Mentored high school Lab Assistants in software engineering, embedded systems, and AI concepts. Led workshops using Micro:bit, Cutebot, and HuskyLens AI Image Lens for hands-on programming and sensor integration. Guided student projects through the Engineering Design Process (EDP) with a focus on AI's in advancing education.",
      milestone: "CURRENT_POSITION"
    },
    {
      year: "Sept 2023 - May 2027",
      title: "Bachelor of Engineering in Software Engineering",
      company: "York University",
      description: "Studying Software Engineering with relevant coursework in Embedded Systems, Computer Organization, Data Structures and Algorithms. Active in engineering research and mentorship programs.",
      milestone: "EDUCATION"
    },
    {
      year: "2023 - Present",
      title: "Independent Developer & Hackathon Participant",
      company: "Various Projects",
      description: "Developed multiple full-stack applications including AI-powered gait analysis systems, food delivery platforms with dynamic pricing, and wellness applications. Participated in hackathons like TerraHacks and Hack The 6ix.",
      milestone: "PROJECT_PORTFOLIO"
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
      },
      purple: {
        bg: 'bg-purple-600',
        text: 'text-purple-400',
        border: 'border-purple-600',
        gradient: 'from-purple-600 to-purple-700'
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
            <div className="bg-gray-900 rounded-lg p-2 border border-gray-700 max-w-4xl">
              <div className="flex flex-wrap justify-center gap-2">
                {skillCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-mono text-sm font-semibold transition-all duration-300 flex items-center ${
                      activeCategory === index
                        ? `bg-gradient-to-r ${getColorClasses(category.color).gradient} text-white`
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-lg mr-2">{category.icon}</span>
                    <span>{category.title}</span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-black/50 rounded-lg p-6 border border-gray-700 hover:border-red-500 transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-white font-semibold font-mono">{skill.name}</h4>
                    <span className={`font-bold font-mono ${getColorClasses(skillCategories[activeCategory].color).text}`}>
                      {skill.level}%
                    </span>
                  </div>
                  
                  {/* Skill Level Bar */}
                  <div className="mb-3">
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
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
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-700">
          <h3 className="text-3xl font-bold text-white text-center mb-8 font-mono">
            🏁 CAREER RACE CIRCUIT
          </h3>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Circuit Track */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-600"></div>
            
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="relative flex items-center">
                  {/* Milestone Marker */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-600 rounded-full border-4 border-black z-10">
                    <div className="w-full h-full bg-red-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Content - Mobile: all right, Desktop: alternating */}
                  <div className={`
                    w-full sm:w-5/12 
                    pl-8 
                    ml-auto
                    ${index % 2 === 0 
                      ? 'sm:ml-0 sm:pr-8 sm:pl-0 sm:text-right' 
                      : 'sm:ml-auto sm:pl-8'
                    }
                  `}>
                    <div className="bg-black/50 rounded-lg p-6 border border-gray-700">
                      <div className="text-red-400 font-bold font-mono text-lg mb-2">{exp.year}</div>
                      <h4 className="text-white font-semibold text-xl mb-2">{exp.title}</h4>
                      <div className="text-gray-400 font-mono text-sm mb-3">{exp.company}</div>
                      <p className="text-gray-300 text-sm">{exp.description}</p>
                      
                      {/* Achievement Badge */}
                      <div className="mt-4">
                        <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-xs font-mono border border-red-600/30">
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
      </div>
    </section>
  );
}
