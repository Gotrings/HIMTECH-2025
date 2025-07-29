import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    setMounted(true);
  }, [location.pathname]);

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted relative overflow-hidden animate-fade-in">
      {/* Route Animation Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-[slide-in-right_2s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-accent to-transparent animate-[slide-in-right_2s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-secondary to-transparent animate-[slide-in-right_3s_ease-in-out_infinite]" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute right-0 bottom-0 w-1 h-full bg-gradient-to-t from-transparent via-primary to-transparent animate-[slide-in-right_3s_ease-in-out_infinite_reverse]" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Floating geometric shapes with infinite loops */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full animate-[pulse_3s_ease-in-out_infinite] blur-xl"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-accent/20 rounded-full animate-[bounce_2s_ease-in-out_infinite] blur-lg"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-secondary/15 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] blur-md"></div>
        
        {/* Moving gradient orbs with continuous rotation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-full animate-[spin_20s_linear_infinite] blur-3xl"></div>
        </div>
        
        {/* Animated route lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`route-line-${i}`}
              className="absolute w-px h-20 bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-[fade-in_2s_ease-in-out_infinite]"
              style={{
                top: `${10 + i * 10}%`,
                left: `${5 + i * 12}%`,
                animationDelay: `${i * 0.3}s`,
                transform: `rotate(${i * 45}deg)`
              }}
            />
          ))}
        </div>
        
        {/* Grid pattern with pulsing animation */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px] animate-[pulse_4s_ease-in-out_infinite]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 p-8">
        {/* Animated 404 Text */}
        <div className="space-y-6">
          <div className="relative">
            <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-clip-text animate-pulse">
              404
            </h1>
            <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-primary/20 blur-sm animate-pulse" style={{ animationDelay: '0.5s' }}>
              404
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground animate-fade-in">
              Halaman Tidak Ditemukan
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Oops! Halaman yang Anda cari sepertinya telah tersesat di dimensi digital yang tidak dikenal.
            </p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button 
            onClick={() => navigate("/")}
            size="lg"
            className="min-w-[180px] bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            🏠 Kembali ke Home
          </Button>

        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full animate-ping"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '2s'
            }}
          />
        ))}
        
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`accent-${i}`}
            className="absolute w-1 h-1 bg-accent rounded-full animate-pulse"
            style={{
              top: `${30 + i * 20}%`,
              right: `${15 + i * 10}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
    </div>
  );
};

export default NotFound;