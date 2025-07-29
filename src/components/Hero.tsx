import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: React.ReactNode;
  subtitle: string;
  className?: string;  // Added className as optional prop
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, className }) => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className={cn(
        "min-h-screen flex flex-col items-center justify-center relative overflow-hidden circuit-pattern",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-himtech-blue/10 via-himtech-blue/5 to-transparent"></div>
      
      {/* Circuit Lines Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Kurangi jumlah animasi atau gunakan CSS transform untuk performa lebih baik */}
        <div className="absolute top-1/4 left-1/4 w-px h-20 bg-himtech-lightBlue/30 animate-circuit-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-px h-24 bg-himtech-lightBlue/30 animate-circuit-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-px h-32 bg-himtech-lightBlue/30 animate-circuit-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-px h-24 bg-himtech-lightBlue/30 animate-circuit-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-px h-16 bg-himtech-lightBlue/30 animate-circuit-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="absolute top-1/4 left-1/4 w-20 h-px bg-himtech-lightBlue/30 animate-circuit-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-px bg-himtech-lightBlue/30 animate-circuit-pulse" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-px bg-himtech-lightBlue/30 animate-circuit-pulse" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-16 h-px bg-himtech-lightBlue/30 animate-circuit-pulse" style={{ animationDelay: '1.7s' }}></div>
      </div>
      
      {/* Logo and Title */}
      <div className="text-center z-10 px-6 max-w-3xl mx-auto animate-fade-in">
        <div className="flex justify-center mb-6">
          <img 
            src="/images/logo.png" 
            alt="HIMTECH Logo" 
            className="h-24 md:h-32 w-auto animate-scale-in" 
          />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-himtech-blue mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-himtech-gray mt-4 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
        onClick={scrollToContent}
      >
        <ChevronDown className="w-6 h-6 text-himtech-blue/70" />
      </div>
    </div>
  );
};

export default Hero;
