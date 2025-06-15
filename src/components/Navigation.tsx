
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Phone, MessageSquare, User, LogOut, Settings, Home, UtensilsCrossed, Calendar, ShoppingBag, Image, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/AuthModal';

const Navigation = () => {
  const { currentUser, isAdmin, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 50, 100], [0.85, 0.92, 0.98]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0.1, 0.3]);
  const blur = useTransform(scrollY, [0, 50, 100], [12, 16, 24]);
  const shadowOpacity = useTransform(scrollY, [0, 50], [0, 0.1]);

  const navigationItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Menu', path: '/menu', icon: UtensilsCrossed },
    { name: 'Reservation', path: '/reservation', icon: Calendar },
    { name: 'Pre-Order', path: '/preorder', icon: ShoppingBag },
    { name: 'Gallery', path: '/gallery', icon: Image },
    { name: 'Contact', path: '/contact', icon: Mail }
  ];

  // Close mobile menu on route change and outside clicks
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
      if (!target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleWhatsApp = () => {
    const message = "Hi! I'd like to make a reservation at Reeves Restaurant.";
    window.open(`https://wa.me/919849834102?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.open('tel:+919849834102');
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 premium-nav"
        style={{
          background: `rgba(255, 255, 255, ${backgroundOpacity})`,
          backdropFilter: `blur(${blur}px) saturate(1.2)`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(1.2)`,
          boxShadow: `0 8px 32px rgba(0, 0, 0, ${shadowOpacity})`,
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.6, 0.05, 0.28, 0.91] }}
      >
        {/* Adaptive borders for visibility */}
        <motion.div 
          className="absolute inset-0 rounded-none border border-white/20"
          style={{ opacity: borderOpacity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
          style={{ opacity: borderOpacity }}
        />
        
        <div className="container mx-auto px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Premium Logo */}
            <Link to="/" className="relative group z-10">
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="relative">
                  <motion.div
                    className="text-2xl lg:text-3xl font-serif font-bold tracking-wide"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  >
                    <span className="bg-gradient-to-r from-slate-900 via-amber-600 via-amber-500 to-slate-900 bg-clip-text text-transparent bg-[length:200%_100%]">
                      Reeves
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
                <motion.div
                  className="w-2 h-2 bg-amber-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-8">
              <div className="flex items-center space-x-1">
                {navigationItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        className={`relative px-4 py-3 text-sm font-medium transition-all duration-300 group rounded-xl magnetic-hover ${
                          location.pathname === item.path 
                            ? 'text-amber-600' 
                            : 'text-slate-700 hover:text-amber-600'
                        }`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-amber-50/80 to-amber-100/80 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        />
                        
                        <div className="relative z-10 flex items-center space-x-2">
                          <IconComponent className="w-4 h-4" />
                          <span>{item.name}</span>
                        </div>
                        
                        <motion.div
                          className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ 
                            scaleX: location.pathname === item.path ? 1 : 0 
                          }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Contact Buttons */}
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={handleCall}
                  className="p-2.5 rounded-full bg-gradient-to-r from-green-100/90 to-green-200/90 text-green-600 hover:from-green-200/90 hover:to-green-300/90 transition-all duration-300 shadow-lg hover:shadow-green-200/50 backdrop-blur-sm"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  onClick={handleWhatsApp}
                  className="p-2.5 rounded-full bg-gradient-to-r from-green-100/90 to-green-200/90 text-green-600 hover:from-green-200/90 hover:to-green-300/90 transition-all duration-300 shadow-lg hover:shadow-green-200/50 backdrop-blur-sm"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageSquare className="w-4 h-4" />
                </motion.button>
              </div>
            
              {/* User Menu */}
              {currentUser ? (
                <div className="relative user-menu-container">
                  <motion.button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500/90 to-amber-600/90 text-white hover:from-amber-600/90 hover:to-amber-700/90 transition-all duration-300 shadow-lg hover:shadow-amber-500/30 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <User className="w-4 h-4" />
                    <span className="font-medium text-sm">Account</span>
                  </motion.button>
                  
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        className="absolute right-0 top-full mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden premium-dropdown"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <div className="p-4 border-b border-gray-200/50 bg-gradient-to-r from-amber-50/50 to-orange-50/50">
                          <p className="font-semibold text-slate-800 truncate">{currentUser.email}</p>
                          <p className="text-sm text-slate-600 mt-1">
                            {isAdmin ? '👑 Administrator' : '🍽️ Valued Guest'}
                          </p>
                        </div>
                        
                        <div className="py-2">
                          <Link
                            to="/profile"
                            className="flex items-center space-x-3 px-4 py-3 text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <User className="w-4 h-4" />
                            <span>My Profile</span>
                          </Link>
                          
                          {isAdmin && (
                            <Link
                              to="/admin"
                              className="flex items-center space-x-3 px-4 py-3 text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Settings className="w-4 h-4" />
                              <span>Admin Dashboard</span>
                            </Link>
                          )}
                          
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={() => setIsAuthModalOpen(true)} 
                    className="bg-gradient-to-r from-amber-500/90 to-amber-600/90 hover:from-amber-600/90 hover:to-amber-700/90 text-white border-0 shadow-lg hover:shadow-amber-500/30 transition-all duration-300 rounded-full px-6 py-2.5 backdrop-blur-sm font-medium"
                  >
                    Sign In
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-3 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 text-slate-700 hover:bg-white/40 transition-all duration-300 shadow-lg mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Mobile Menu */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl z-50 lg:hidden shadow-2xl mobile-menu-container premium-mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.6, 0.05, 0.28, 0.91] }}
            >
              <div className="p-6 h-full overflow-y-auto">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-serif font-bold text-slate-800">Navigation</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Navigation Items */}
                <div className="space-y-1 mb-8">
                  {navigationItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 ${
                            location.pathname === item.path 
                              ? 'bg-gradient-to-r from-amber-50 to-amber-100 text-amber-600 shadow-sm' 
                              : 'text-slate-700 hover:bg-amber-50 hover:text-amber-600'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mobile Contact Buttons */}
                <motion.div
                  className="flex space-x-3 mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <Button
                    onClick={handleCall}
                    variant="outline"
                    size="sm"
                    className="flex-1 flex items-center justify-center gap-2 border-green-200 text-green-600 hover:bg-green-50 h-12"
                  >
                    <Phone className="w-4 h-4" />
                    Call Us
                  </Button>
                  <Button
                    onClick={handleWhatsApp}
                    variant="outline"
                    size="sm"
                    className="flex-1 flex items-center justify-center gap-2 border-green-200 text-green-600 hover:bg-green-50 h-12"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp
                  </Button>
                </motion.div>

                {/* Mobile User Section */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  {currentUser ? (
                    <div className="space-y-3">
                      <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200/50">
                        <p className="font-semibold text-slate-800 truncate">{currentUser.email}</p>
                        <p className="text-sm text-slate-600 mt-1">
                          {isAdmin ? '👑 Administrator' : '🍽️ Valued Guest'}
                        </p>
                      </div>
                      
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-3 text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 rounded-xl"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                      
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center space-x-3 px-4 py-3 text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 rounded-xl"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left rounded-xl"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }} 
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl h-12 font-medium"
                    >
                      Sign In
                    </Button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Navigation;
