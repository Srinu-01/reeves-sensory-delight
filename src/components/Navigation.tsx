import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/AuthModal';

const Navigation = () => {
  const { currentUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif font-bold text-slate-800 hover:text-amber-600 transition-colors">
            Reeves
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">
              Home
            </Link>
            <Link to="/about" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">
              About
            </Link>
            <Link to="/menu" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">
              Menu
            </Link>
            <a href="/#booking" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">
              Booking
            </a>
            <Link to="/contact" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">
              Contact
            </Link>
            {currentUser ? (
              <Link to="/profile" className="text-slate-700 hover:text-amber-600 transition-colors font-medium">
                Profile
              </Link>
            ) : (
              <Button onClick={() => setIsAuthModalOpen(true)} variant="outline" size="sm">
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-white border-t border-gray-200"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-4">
                <Link 
                  to="/" 
                  className="block text-slate-700 hover:text-amber-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="block text-slate-700 hover:text-amber-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/menu" 
                  className="block text-slate-700 hover:text-amber-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <a 
                  href="/#booking" 
                  className="block text-slate-700 hover:text-amber-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Booking
                </a>
                <Link 
                  to="/contact" 
                  className="block text-slate-700 hover:text-amber-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                {currentUser ? (
                  <Link 
                    to="/profile" 
                    className="block text-slate-700 hover:text-amber-600 transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                ) : (
                  <Button 
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }} 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                  >
                    Login
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </motion.nav>
  );
};

export default Navigation;
