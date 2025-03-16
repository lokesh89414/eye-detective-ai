
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Eye, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Prediction', path: '/prediction' },
    { name: 'About Disease', path: '/about-disease' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-sm shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="flex items-center space-x-2 text-eye-blue hover:text-eye-dark-blue transition-colors"
          >
            <Eye className="w-8 h-8" />
            <span className="font-display font-semibold text-xl">EyeDetect</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  relative font-medium transition-colors
                  ${isActive 
                    ? 'text-eye-blue' 
                    : 'text-foreground hover:text-eye-blue'
                  }
                  after:absolute after:bottom-0 after:left-0 after:right-0 
                  after:h-0.5 after:bg-eye-blue after:origin-center
                  ${isActive 
                    ? 'after:scale-x-100' 
                    : 'after:scale-x-0 hover:after:scale-x-100'
                  }
                  after:transition-transform after:duration-300
                `}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-foreground hover:text-eye-blue focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`
          md:hidden fixed inset-0 top-[72px] bg-white z-40 transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <nav className="flex flex-col space-y-4 p-4 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                py-2 px-4 rounded-lg transition-colors text-lg
                ${isActive 
                  ? 'bg-eye-light-blue text-eye-blue font-medium' 
                  : 'text-foreground hover:bg-eye-light-gray'
                }
              `}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
