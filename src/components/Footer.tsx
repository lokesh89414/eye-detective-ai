
import { Eye, Github, Twitter, Facebook, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-eye-light-gray border-t border-eye-light-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and brief */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 text-eye-blue">
              <Eye className="w-8 h-8" />
              <span className="font-display font-semibold text-xl">EyeDetect</span>
            </Link>
            <p className="text-muted-foreground">
              Leveraging artificial intelligence for early detection of eye diseases. 
              Fast, accurate, and reliable analysis to protect your vision.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-eye-blue transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-eye-blue transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-eye-blue transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-eye-blue transition-colors" aria-label="Github">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-eye-blue transition-colors">Home</Link></li>
              <li><Link to="/prediction" className="text-muted-foreground hover:text-eye-blue transition-colors">Prediction</Link></li>
              <li><Link to="/about-disease" className="text-muted-foreground hover:text-eye-blue transition-colors">About Disease</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-medium text-lg mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-eye-blue" />
                <a href="mailto:contact@eyedetect.ai" className="text-muted-foreground hover:text-eye-blue transition-colors">
                  contact@eyedetect.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-eye-light-blue/10 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} EyeDetect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
