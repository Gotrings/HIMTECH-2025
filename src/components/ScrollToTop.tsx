import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scroll to top on route change
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Nonaktifkan scroll restoration bawaan browser
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Langsung scroll ke atas tanpa animasi
    window.scrollTo(0, 0);
    
    // Pastikan scroll benar-benar di posisi 0
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      // Force reflow
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, 10);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
