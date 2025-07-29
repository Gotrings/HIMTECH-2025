/**
 * Smoothly scrolls the window to the top with custom easing
 */
export const scrollToTop = (e?: React.MouseEvent<HTMLElement>) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  // Get the target position (top of the page)
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 800; // Animation duration in ms
  let start: number | null = null;
  
  const animation = (currentTime: number) => {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      window.requestAnimationFrame(animation);
    }
  };
  
  // Easing function for smooth animation
  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  };
  
  window.requestAnimationFrame(animation);
};
