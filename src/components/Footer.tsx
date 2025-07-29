import React, { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { FaInstagram, FaDiscord } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { scrollToTop } from '../utils/scrollUtils';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    
    // If it's the same page, just scroll to top with smooth animation
    if (location.pathname === path) {
      // Force scroll to top immediately
      window.scrollTo(0, 0);
      // Then apply smooth scroll
      scrollToTop();
      return;
    }
    
    // For different pages, navigate first
    navigate(path);
    // Then scroll to top after a small delay to ensure the page has started loading
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      scrollToTop();
    }, 10);

    // Cleanup function to prevent memory leaks
    return () => clearTimeout(timer);
  }, [location.pathname, navigate]);
  
  return (
    <footer className="bg-himtech-blue text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center mb-6">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/images/logo.png"
              alt="HIMTECH Logo"
              className="h-12 md:h-14 w-auto"
            />
            <span className="font-bold text-xl tracking-tight">
              <span className="text-white">HIM</span>
              <span className="text-himtech-red">TECH</span>
            </span>
          </Link>
          </div>
          <p className="text-gray-300 mb-6 max-w-md">
            Capturing moments and memories from our technology events, workshops, and 
            gatherings. HIMTECH celebrates innovation and connection through our stories.
          </p>
          <div className="flex space-x-4">
            <a href="https://instagram.com/himtech.metaindustri/" className="text-gray-300 hover:text-himtech-lightBlue transition-colors duration-300">
              <FaInstagram size={20} />
            </a>
            <a href="https://discord.gg/xr8enYASxx" className="text-gray-300 hover:text-himtech-lightBlue transition-colors duration-300">
              <FaDiscord size={20} />
            </a>
            <a href="mailto:humas@politeknikmeta.ac.id" className="text-gray-300 hover:text-himtech-lightBlue transition-colors duration-300">
              <MdEmail size={20} />
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link 
                to="/" 
                onClick={(e) => handleNavClick(e, '/')}
                className="text-gray-300 hover:text-himtech-lightBlue flex items-center transition-colors"
              >
                <ChevronRight className="h-4 w-4 mr-1" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/gallery" 
                onClick={(e) => handleNavClick(e, '/gallery')}
                className="text-gray-300 hover:text-himtech-lightBlue flex items-center transition-colors"
              >
                <ChevronRight className="h-4 w-4 mr-1" />
                <span>Photo Gallery</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                onClick={(e) => handleNavClick(e, '/about')}
                className="text-gray-300 hover:text-himtech-lightBlue flex items-center transition-colors"
              >
                <ChevronRight className="h-4 w-4 mr-1" />
                <span>About Us</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-4">Contact</h3>
          <address className="not-italic text-gray-300 space-y-3">
            <p>HIMTECH Organization</p>
            <p>Politeknik Meta Industri Cikarang</p>
            <p>Building 1, Floor 1,2,3</p>
            <p className="text-himtech-lightBlue mt-4">humas@politeknikmeta.ac.id</p>
          </address>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-700/50">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} HIMTECH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
