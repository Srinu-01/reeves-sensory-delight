
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Phone, MessageSquare, User, LogOut, Settings, Home, UtensilsCrossed, Calendar, ShoppingBag, Image, Mail, ChevronDown } from 'lucide-react';
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
  const navOpacity = useTransform(scrollY, [0, 100], [0.85, 0.98]);
  const navBlur = useTransform(scrollY, [0, 100], [20, 40]);

  const navigationItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Menu', path: '/menu', icon: UtensilsCrossed },
    { name: 'Reservations', path: '/reservation', icon: Calendar },
    { name: 'Pre-Order', path: '/preorder', icon: ShoppingBag },
    { name: 'Gallery', path: '/gallery', icon: Image },
    { name: 'Contact', path: '/contact', icon: Mail }
  ];

  // Close menus on route change and outside clicks
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
      {/* World-Class Navigation Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.nav
          className="max-w-7xl mx-auto"
          style={{ 
            opacity: navOpacity,
            backdropFilter: `blur(${navBlur}px)`,
          }}
        >
          {/* Main Navigation Container */}
          <div className="relative bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl lg:rounded-3xl shadow-2xl shadow-black/5 overflow-hidden">
            
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-white/40 pointer-events-none" />
            
            {/* Navigation Content */}
            <div className="relative px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
              <div className="flex items-center justify-between">
                
                {/* Premium Brand Logo */}
                <Link to="/" className="flex-shrink-0 group">
                  <motion.div
                    className="flex items-center space-x-2 lg:space-x-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="relative">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 bg-clip-text text-transparent">
                          Reeves
                        </span>
                      </h1>
                      <div className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full w-full opacity-80" />
                    </div>
                    <div className="w-2 h-2 lg:w-3 lg:h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg animate-pulse" />
                  </motion.div>
                </Link>

                {/* Desktop Navigation Menu */}
                <div className="hidden lg:flex items-center justify-center flex-1 max-w-3xl mx-8">
                  <nav className="flex items-center space-x-1 bg-gray-50/80 backdrop-blur-sm rounded-2xl px-2 py-2 border border-gray-200/50 shadow-inner">
                    {navigationItems.map((item, index) => {
                      const IconComponent = item.icon;
                      const isActive = location.pathname === item.path;
                      
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Link
                            to={item.path}
                            className={`relative px-4 py-2.5 text-sm font-semibold transition-all duration-300 rounded-xl group ${
                              isActive 
                                ? 'text-white shadow-lg' 
                                : 'text-gray-700 hover:text-gray-900 hover:bg-white/70'
                            }`}
                          >
                            {/* Active state background */}
                            {isActive && (
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg shadow-amber-500/25"
                                layoutId="activeTab"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                              />
                            )}
                            
                            <div className="relative z-10 flex items-center space-x-2">
                              <IconComponent className="w-4 h-4" />
                              <span>{item.name}</span>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>
                </div>
                
                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center space-x-3">
                  
                  {/* Contact Actions */}
                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={handleCall}
                      className="p-3 rounded-xl bg-green-50 border border-green-100 text-green-600 hover:bg-green-100 hover:border-green-200 transition-all duration-200 shadow-sm hover:shadow-md"
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Phone className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      onClick={handleWhatsApp}
                      className="p-3 rounded-xl bg-green-50 border border-green-100 text-green-600 hover:bg-green-100 hover:border-green-200 transition-all duration-200 shadow-sm hover:shadow-md"
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </motion.button>
                  </div>
                
                  {/* User Menu */}
                  {currentUser ? (
                    <div className="relative user-menu-container">
                      <motion.button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="hidden xl:flex flex-col items-start">
                          <span className="text-sm font-medium">Account</span>
                          <span className="text-xs text-gray-300">
                            {isAdmin ? 'Admin' : 'Member'}
                          </span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                      </motion.button>
                      
                      <AnimatePresence>
                        {isUserMenuOpen && (
                          <motion.div
                            className="absolute right-0 top-full mt-2 w-72 bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden"
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-gray-50/50 to-amber-50/30">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                                  <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900 truncate">{currentUser.email}</p>
                                  <p className="text-sm text-gray-600">
                                    {isAdmin ? '👑 Administrator' : '🍽️ Valued Guest'}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="py-2">
                              <Link
                                to="/profile"
                                className="flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-150"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <User className="w-5 h-5" />
                                <span className="font-medium">My Profile</span>
                              </Link>
                              
                              {isAdmin && (
                                <Link
                                  to="/admin"
                                  className="flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-150"
                                  onClick={() => setIsUserMenuOpen(false)}
                                >
                                  <Settings className="w-5 h-5" />
                                  <span className="font-medium">Admin Dashboard</span>
                                </Link>
                              )}
                              
                              <button
                                onClick={handleLogout}
                                className="flex items-center space-x-3 px-6 py-3 text-red-600 hover:bg-red-50 transition-colors duration-150 w-full text-left"
                              >
                                <LogOut className="w-5 h-5" />
                                <span className="font-medium">Sign Out</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        onClick={() => setIsAuthModalOpen(true)} 
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl px-6 py-2.5 font-semibold"
                      >
                        Sign In
                      </Button>
                    </motion.div>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                  className="lg:hidden p-3 rounded-xl bg-gray-100/80 backdrop-blur-sm border border-gray-200/60 text-gray-700 hover:bg-gray-200/80 transition-all duration-200 shadow-sm mobile-menu-button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Mobile Menu */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white/98 backdrop-blur-xl z-50 lg:hidden shadow-2xl mobile-menu-container border-l border-white/30"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="p-6 h-full overflow-y-auto">
                
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">Menu</h2>
                    <p className="text-sm text-gray-600 mt-1">Navigate Reeves</p>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Navigation Items */}
                <div className="space-y-2 mb-8">
                  {navigationItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive 
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-gray-100'}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className="font-semibold">{item.name}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mobile Contact Buttons */}
                <motion.div
                  className="grid grid-cols-2 gap-3 mb-8"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Button
                    onClick={handleCall}
                    variant="outline"
                    className="flex items-center justify-center gap-2 border-green-200 text-green-600 hover:bg-green-50 h-12 rounded-xl font-semibold"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </Button>
                  <Button
                    onClick={handleWhatsApp}
                    variant="outline"
                    className="flex items-center justify-center gap-2 border-green-200 text-green-600 hover:bg-green-50 h-12 rounded-xl font-semibold"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp
                  </Button>
                </motion.div>

                {/* Mobile User Section */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  {currentUser ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-br from-gray-50 to-amber-50/50 rounded-2xl border border-gray-200/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 truncate">{currentUser.email}</p>
                            <p className="text-sm text-gray-600">
                              {isAdmin ? '👑 Administrator' : '🍽️ Valued Guest'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-150 rounded-xl"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="w-5 h-5" />
                        <span className="font-semibold">My Profile</span>
                      </Link>
                      
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-150 rounded-xl"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Settings className="w-5 h-5" />
                          <span className="font-semibold">Admin Dashboard</span>
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-150 w-full text-left rounded-xl"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-semibold">Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }} 
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl h-14 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
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
