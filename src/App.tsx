import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';

import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

// Komponen untuk menangani pull-to-refresh
const PullToRefreshContainer = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const location = useLocation();
  const [key, setKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleRefresh = async () => {
    // Simulasikan loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Refresh halaman
    window.location.reload();
    return Promise.resolve();
  };

  // Reset key saat location berubah
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [location.pathname]);

  // Hanya aktifkan pull-to-refresh di mobile
  if (isMobile) {
    return (
      <div className="bg-white/80 dark:bg-himtech-navy/80">
        <PullToRefresh
          key={key}
          onRefresh={handleRefresh}
          pullingContent={
            <div className="py-3 text-center text-gray-700 dark:text-gray-200 bg-transparent">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span>Tarik ke bawah untuk refresh</span>
              </div>
            </div>
          }
          refreshingContent={
            <div className="py-3 text-center text-gray-700 dark:text-gray-200 bg-transparent">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Refreshing...</span>
              </div>
            </div>
          }
          pullDownThreshold={80}
          maxPullDownDistance={150}
          resistance={2}
          className="bg-transparent"
        >
          <div className="pt-12">{children}</div>
        </PullToRefresh>
      </div>
    );
  }

  return <div>{children}</div>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <ScrollToTop />
        <PullToRefreshContainer>
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </PullToRefreshContainer>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
