
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/AuthModal';

const Navigation = () => {
  const { currentUser, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reservation', path: '/reservation' },
    { name: 'Pre-Order', path: '/preorder' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleWhatsApp = () => {
    const message = "Hi! I'd like to make a reservation at Reeves Restaurant.";
    window.open(`https://wa.me/919849834102?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.open('tel:+919849834102');
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-2xl' 
          : 'bg-white/90 backdrop-blur-md border-b border-gray-200/30'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, 0.05, 0.28, 0.91] }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-serif font-bold text-slate-800 hover:text-amber-600 transition-all duration-500"
          >
            <motion.span
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-gradient-to-r from-slate-800 to-amber-600 bg-clip-text text-transparent"
            >
              Reeves
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`relative text-slate-700 hover:text-amber-600 transition-all duration-300 font-medium group py-2 ${
                    location.pathname === item.path ? 'text-amber-600' : ''
                  }`}
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: location.pathname === item.path ? '100%' : 0 
                    }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </Link>
              </motion.div>
            ))}
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={handleCall}
                className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                onClick={handleWhatsApp}
                className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="w-4 h-4" />
              </motion.button>
            </div>
            
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/profile" 
                  className="text-slate-700 hover:text-amber-600 transition-all duration-300 font-medium relative group"
                >
                  Profile
                  <motion.div 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" 
                  />
                </Link>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="text-slate-700 hover:text-amber-600 transition-all duration-300 font-medium relative group"
                  >
                    Admin
                    <motion.div 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" 
                    />
                  </Link>
                )}
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => setIsAuthModalOpen(true)} 
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
                >
                  Login
                </Button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-200"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.6, 0.05, 0.28, 0.91] }}
            >
              <div className="py-6 space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link 
                      to={item.path}
                      className={`block text-slate-700 hover:text-amber-600 transition-all duration-300 font-medium py-3 px-2 ${
                        location.pathname === item.path ? 'text-amber-600 bg-amber-50' : ''
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Action Buttons */}
                <motion.div
                  className="flex justify-center space-x-4 pt-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: navigationItems.length * 0.1 }}
                >
                  <Button 
                    onClick={handleCall}
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </Button>
                  <Button 
                    onClick={handleWhatsApp}
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp
                  </Button>
                </motion.div>
                
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: (navigationItems.length + 1) * 0.1 }}
                  className="pt-4"
                >
                  {currentUser ? (
                    <div className="space-y-3">
                      <Link 
                        to="/profile"
                        className="block text-slate-700 hover:text-amber-600 transition-all duration-300 font-medium py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      {isAdmin && (
                        <Link 
                          to="/admin"
                          className="block text-slate-700 hover:text-amber-600 transition-all duration-300 font-medium py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                    </div>
                  ) : (
                    <Button 
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }} 
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                    >
                      Login
                    </Button>
                  )}
                </motion.div>
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
