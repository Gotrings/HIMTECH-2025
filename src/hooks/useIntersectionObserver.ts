import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (refs: React.RefObject<HTMLElement>[], options?: IntersectionObserverInit) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-visible');
        } else {
          // Only reset if scrolling up
          const isScrollingUp = window.scrollY < entry.boundingClientRect.top + window.scrollY;
          if (isScrollingUp) {
            entry.target.classList.remove('animate-fade-in-visible');
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    });

    const currentObserver = observerRef.current;
    refs.forEach(ref => {
      if (ref.current) {
        currentObserver.observe(ref.current);
      }
    });

    return () => {
      if (currentObserver) {
        refs.forEach(ref => {
          if (ref.current) {
            currentObserver.unobserve(ref.current);
          }
        });
        currentObserver.disconnect();
      }
    };
  }, [refs, options]);

  return observerRef;
};
