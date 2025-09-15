import { useState, useEffect } from 'react';

interface F1LoadingProps {
  onComplete: () => void;
}

export default function F1Loading({ onComplete }: F1LoadingProps) {
  const [currentLight, setCurrentLight] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showGoText, setShowGoText] = useState(false);

  useEffect(() => {
    // Simulate F1 start sequence timing (more realistic)
    const timings = [
      1500, // Wait 1.5 seconds before starting
      1200, // First light
      1200, // Second light  
      1200, // Third light
      1200, // Fourth light
      1200, // Fifth light
      2500, // Hold all lights for 2.5 seconds (tension building)
      800,  // Lights out and away we go!
    ];

    let timeoutId: NodeJS.Timeout;
    let currentStep = 0;

    const playSound = (step: number) => {
      try {
        // Create audio context for sound effects
        const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        
        if (step >= 1 && step <= 5) {
          // Light activation sound - distinctive F1 beep
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          // Higher frequency for tension
          oscillator.frequency.setValueAtTime(1000 + (step * 100), audioContext.currentTime);
          oscillator.type = 'square';
          
          gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
        } else if (step === 7) {
          // Lights out sound - dramatic F1 start sound
          const oscillator1 = audioContext.createOscillator();
          const oscillator2 = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator1.connect(gainNode);
          oscillator2.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          // Dual frequency for dramatic effect
          oscillator1.frequency.setValueAtTime(600, audioContext.currentTime);
          oscillator1.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.5);
          oscillator1.type = 'sawtooth';
          
          oscillator2.frequency.setValueAtTime(300, audioContext.currentTime);
          oscillator2.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
          oscillator2.type = 'triangle';
          
          gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          
          oscillator1.start(audioContext.currentTime);
          oscillator1.stop(audioContext.currentTime + 0.5);
          oscillator2.start(audioContext.currentTime);
          oscillator2.stop(audioContext.currentTime + 0.5);
        }
      } catch {
        // Silently handle audio context errors
        console.log('Audio context not available');
      }
    };

    const nextStep = () => {
      if (currentStep === 0) {
        // Start sequence
        setCurrentLight(0);
      } else if (currentStep >= 1 && currentStep <= 5) {
        // Activate lights one by one
        setCurrentLight(currentStep);
        playSound(currentStep);
      } else if (currentStep === 6) {
        // Hold all lights
        setCurrentLight(5);
      } else if (currentStep === 7) {
        // Lights out!
        setCurrentLight(0);
        setIsComplete(true);
        setShowGoText(true);
        playSound(currentStep);
        
        // Show "GO!" text and then complete
        setTimeout(() => {
          onComplete();
        }, 1200);
        return;
      }

      currentStep++;
      timeoutId = setTimeout(nextStep, timings[currentStep - 1] || 1000);
    };

    nextStep();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      {/* F1 Grid Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-10 h-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className={`border border-white/10 ${
                i % 2 === 0 ? 'bg-white/5' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="text-center">
        {/* F1 Logo Style Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-wider font-mono">
            <span className="text-red-500">F1</span>
            <span className="text-white"> PORTFOLIO</span>
          </h1>
          <div className="w-32 h-1 bg-red-500 mx-auto"></div>
        </div>

        {/* Traffic Light Panel */}
        <div className="bg-gray-900 rounded-2xl p-8 border-4 border-gray-700 shadow-2xl mb-8 relative overflow-hidden">
          {/* Background grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-center space-x-4 mb-6">
              {[1, 2, 3, 4, 5].map((lightNumber) => (
                <div
                  key={lightNumber}
                  className="relative"
                >
                  <div
                    className={`w-16 h-16 rounded-full border-4 transition-all duration-300 relative ${
                      currentLight >= lightNumber && !isComplete
                        ? 'bg-red-500 border-red-300 shadow-lg shadow-red-500/50'
                        : 'bg-gray-800 border-gray-600'
                    }`}
                  >
                    {/* Light glow effect */}
                    {currentLight >= lightNumber && !isComplete && (
                      <>
                        <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></div>
                        <div className="absolute inset-2 rounded-full bg-red-300 animate-pulse"></div>
                        {/* Reflection effect */}
                        <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-white/40"></div>
                      </>
                    )}
                  </div>
                  
                  {/* Light number */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <span className={`text-xs font-mono ${
                      currentLight >= lightNumber && !isComplete ? 'text-red-400' : 'text-gray-600'
                    }`}>
                      {lightNumber}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Status Text */}
            <div className="text-center min-h-[60px] flex items-center justify-center">
              {!isComplete && currentLight === 0 && (
                <div className="space-y-2">
                  <p className="text-gray-400 text-lg">PREPARING FOR START...</p>
                  <div className="flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              )}
              {!isComplete && currentLight > 0 && currentLight < 5 && (
                <div className="space-y-2">
                  <p className="text-red-400 text-lg font-semibold font-mono">
                    LIGHT {currentLight} ACTIVATED
                  </p>
                  <p className="text-gray-500 text-sm font-mono">
                    SYSTEM CHECK: {Math.round((currentLight / 5) * 100)}% COMPLETE
                  </p>
                </div>
              )}
              {!isComplete && currentLight === 5 && (
                <div className="space-y-2">
                  <p className="text-yellow-400 text-xl font-bold animate-pulse font-mono">
                    ALL LIGHTS ON - READY TO RACE!
                  </p>
                  <p className="text-red-400 text-sm animate-pulse font-mono">
                    WAITING FOR LIGHTS OUT...
                  </p>
                </div>
              )}
              {isComplete && showGoText && (
                <div className="space-y-4">
                  <div className="text-green-400 text-4xl font-bold animate-bounce font-mono">
                    🏁 LIGHTS OUT AND AWAY WE GO! 🏁
                  </div>
                  <div className="text-white text-lg animate-pulse font-mono">
                    LOADING PORTFOLIO...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-96 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${(currentLight / 5) * 100}%`,
            }}
          ></div>
        </div>

        {/* Race Info */}
        <div className="mt-8 text-gray-400">
          <p className="text-sm font-mono">INITIALIZING RACE SYSTEMS...</p>
          <p className="text-xs mt-2 font-mono">
            {!isComplete ? `LIGHT ${currentLight}/5 ACTIVE` : 'RACE STARTED!'}
          </p>
        </div>
      </div>

      {/* Racing stripes animation */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50">
        <div className="w-full h-full bg-gradient-to-r from-red-500 to-white animate-pulse"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50">
        <div className="w-full h-full bg-gradient-to-r from-red-500 to-white animate-pulse"></div>
      </div>
    </div>
  );
}
