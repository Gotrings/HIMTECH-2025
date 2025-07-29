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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Halaman Tidak Ditemukan
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
              Oops! Halaman yang Anda cari sepertinya telah tersesat di dimensi digital yang tidak dikenal.
            </p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
    </div>
  );
};

export default NotFound;