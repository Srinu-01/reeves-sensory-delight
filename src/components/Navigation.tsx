
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/AuthModal';

const Navigation = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 80);
      
      // Update active section based on scroll position
      const sections = ['hero', 'philosophy', 'menu', 'dishes', 'gallery', 'testimonials', 'booking', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', path: '/', section: 'hero' },
    { name: 'About', path: '/about', section: 'philosophy' },
    { name: 'Menu', path: '/menu', section: 'menu' },
    { name: 'Reservation', path: '/reservation', section: 'booking' },
    { name: 'Pre-Order', path: '/preorder' },
    { name: 'Contact', path: '/contact', section: 'contact' }
  ];

  const handleNavClick = (item: any) => {
    if (location.pathname === '/' && item.section) {
      const element = document.getElementById(item.section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsMobileMenuOpen(false);
        return;
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl border-b border-amber-200/50 shadow-xl shadow-amber-500/5' 
            : 'bg-white/90 backdrop-blur-md'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="group relative"
              onClick={() => handleNavClick({ section: 'hero' })}
            >
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <span className="text-white font-serif font-bold text-xl">R</span>
                </div>
                <div>
                  <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-slate-800 to-amber-700 bg-clip-text text-transparent">
                    Reeves
                  </h1>
                  <p className="text-xs text-amber-600 font-medium tracking-wider">FINE DINING</p>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <div className="flex items-center space-x-1 bg-slate-50/80 backdrop-blur-sm rounded-full p-1 shadow-inner">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.path || 
                    (location.pathname === '/' && activeSection === item.section);
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => handleNavClick(item)}
                      className="relative group"
                    >
                      <motion.div
                        className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                          isActive
                            ? 'text-white shadow-lg shadow-amber-500/25'
                            : 'text-slate-700 hover:text-amber-700'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                            layoutId="activeNav"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          />
                        )}
                        <span className="relative z-10">{item.name}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* User Menu & CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              {currentUser ? (
                <div className="flex items-center space-x-3">
                  {isAdmin && (
                    <Link 
                      to="/admin"
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                    >
                      Admin
                    </Link>
                  )}
                  <Link 
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-all duration-300 group"
                  >
                    <User className="w-4 h-4 text-slate-600 group-hover:text-slate-800 transition-colors" />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Profile</span>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="border-slate-300 text-slate-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button 
                    onClick={() => setIsAuthModalOpen(true)} 
                    variant="outline" 
                    className="border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition-all duration-300"
                  >
                    Sign In
                  </Button>
                  <Link to="/reservation">
                    <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300">
                      Book Table
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
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
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl border-b border-amber-200/50 shadow-2xl"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col space-y-1">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link 
                        to={item.path}
                        onClick={() => handleNavClick(item)}
                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                          location.pathname === item.path
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                            : 'text-slate-700 hover:bg-amber-50 hover:text-amber-700'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  
                  <div className="border-t border-amber-200/50 pt-4 mt-4">
                    {currentUser ? (
                      <div className="space-y-2">
                        {isAdmin && (
                          <Link 
                            to="/admin"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl text-center font-medium"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <Link 
                          to="/profile"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center px-4 py-3 bg-slate-100 rounded-xl text-slate-700 font-medium"
                        >
                          <User className="w-5 h-5 mr-3" />
                          View Profile
                        </Link>
                        <Button
                          onClick={handleLogout}
                          variant="outline"
                          className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-5 h-5 mr-3" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button 
                          onClick={() => {
                            setIsAuthModalOpen(true);
                            setIsMobileMenuOpen(false);
                          }} 
                          variant="outline" 
                          className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                        >
                          Sign In
                        </Button>
                        <Link 
                          to="/reservation"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white">
                            Book Table
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Navigation;
