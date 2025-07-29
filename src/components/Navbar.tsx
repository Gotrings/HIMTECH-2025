import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close mobile menu on route change
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled 
          ? "bg-white/80 dark:bg-himtech-navy/80 backdrop-blur-lg shadow-lg border-b border-white/10 dark:border-himtech-navy/20" 
          : "bg-white/60 dark:bg-himtech-navy/60 backdrop-blur-md border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/images/logo-1.png" 
            alt="HIMTECH Logo" 
            className="h-10 w-10"
          />
          <span className="font-bold text-xl tracking-tight">
            <span className="text-himtech-blue">HIM</span>
            <span className="text-himtech-red">TECH</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-himtech-lightBlue",
                location.pathname === link.path 
                  ? "text-himtech-lightBlue" 
                  : "text-himtech-blue dark:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden focus:outline-none"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-himtech-blue dark:text-white" />
          ) : (
            <Menu className="h-6 w-6 text-himtech-blue dark:text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-himtech-navy shadow-lg animate-fade-in">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center justify-between py-2 text-base font-medium transition-colors",
                  location.pathname === link.path 
                    ? "text-himtech-lightBlue" 
                    : "text-himtech-blue dark:text-white"
                )}
              >
                <span>{link.label}</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
