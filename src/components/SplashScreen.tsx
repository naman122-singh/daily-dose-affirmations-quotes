
import React, { useEffect } from 'react';
import { Sparkles, Quote } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // Show splash for 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-rose-300 to-pink-400 flex items-center justify-center p-4">
      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Sparkles className="w-4 h-4 text-white/40" />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="text-center relative z-10 animate-fade-in">
        {/* App Icon */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl animate-scale-in">
            <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 animate-pulse" />
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in">
          Quote of the Day
        </h1>
        
        {/* Tagline */}
        <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 drop-shadow-md animate-fade-in">
          Daily Inspiration for Your Journey
        </p>

        {/* Loading indicator */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
