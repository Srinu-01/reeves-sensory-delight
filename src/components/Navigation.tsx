
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
  const navOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.95]);

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
      {/* World-Class Navigation */}
      <motion.nav
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl"
        style={{ opacity: navOpacity, scale: navScale }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative">
          {/* Main Navigation Container */}
          <div className="bg-white/90 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl shadow-black/10 overflow-hidden">
            
            {/* Premium gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/40 to-white/60 pointer-events-none" />
            
            {/* Navigation Content */}
            <div className="relative px-8 py-4">
              <div className="flex items-center justify-between">
                
                {/* Premium Logo */}
                <Link to="/" className="relative group">
                  <motion.div
                    className="flex items-center space-x-3"
                    style={{ scale: logoScale }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="relative">
                      <motion.h1 className="text-3xl xl:text-4xl font-serif font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 bg-clip-text text-transparent">
                          Reeves
                        </span>
                      </motion.h1>
                      <motion.div
                        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <motion.div
                      className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </Link>

                {/* Desktop Navigation Pills */}
                <div className="hidden xl:flex items-center justify-center flex-1 max-w-4xl mx-16">
                  <div className="flex items-center space-x-2 bg-slate-100/60 backdrop-blur-sm rounded-full px-8 py-4 border border-slate-200/50 shadow-lg">
                    {navigationItems.map((item, index) => {
                      const IconComponent = item.icon;
                      const isActive = location.pathname === item.path;
                      
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Link
                            to={item.path}
                            className={`relative px-6 py-3 text-sm font-semibold transition-all duration-300 group rounded-full ${
                              isActive 
                                ? 'text-white' 
                                : 'text-slate-700 hover:text-slate-900'
                            }`}
                          >
                            {/* Active background with perfect animation */}
                            {isActive && (
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-xl shadow-amber-500/40"
                                layoutId="activeNavTab"
                                transition={{ type: "spring", bounce: 0.15, duration: 0.8 }}
                              />
                            )}
                            
                            {/* Hover background */}
                            {!isActive && (
                              <motion.div
                                className="absolute inset-0 bg-white/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}
                            
                            <div className="relative z-10 flex items-center space-x-2.5">
                              <IconComponent className="w-4 h-4" />
                              <span>{item.name}</span>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Desktop Right Actions */}
                <div className="hidden xl:flex items-center space-x-4">
                  
                  {/* Contact Actions with premium design */}
                  <div className="flex items-center space-x-3">
                    <motion.button
                      onClick={handleCall}
                      className="group relative p-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200/60 text-green-700 hover:from-green-100 hover:to-emerald-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-200/50"
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Phone className="w-5 h-5" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg" />
                    </motion.button>
                    
                    <motion.button
                      onClick={handleWhatsApp}
                      className="group relative p-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200/60 text-green-700 hover:from-green-100 hover:to-emerald-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-200/50"
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageSquare className="w-5 h-5" />
                    </motion.button>
                  </div>
                
                  {/* Premium User Menu */}
                  {currentUser ? (
                    <div className="relative user-menu-container">
                      <motion.button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center space-x-4 px-6 py-3 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white hover:from-slate-800 hover:to-slate-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-slate-800/30 border border-slate-700/50"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="font-bold text-sm">Account</span>
                          <span className="text-xs text-slate-300">
                            {isAdmin ? 'Admin' : 'Member'}
                          </span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                      </motion.button>
                      
                      <AnimatePresence>
                        {isUserMenuOpen && (
                          <motion.div
                            className="absolute right-0 top-full mt-6 w-80 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden"
                            initial={{ opacity: 0, y: -20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.9 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <div className="p-8 border-b border-slate-100/80 bg-gradient-to-br from-slate-50/80 to-amber-50/50">
                              <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                                  <User className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                  <p className="font-bold text-slate-900 truncate">{currentUser.email}</p>
                                  <p className="text-sm text-slate-600 mt-2">
                                    {isAdmin ? '👑 Administrator' : '🍽️ Valued Guest'}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="py-4">
                              <Link
                                to="/profile"
                                className="flex items-center space-x-4 px-8 py-5 text-slate-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-700 transition-all duration-300 group"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <User className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                <span className="font-semibold">My Profile</span>
                              </Link>
                              
                              {isAdmin && (
                                <Link
                                  to="/admin"
                                  className="flex items-center space-x-4 px-8 py-5 text-slate-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-700 transition-all duration-300 group"
                                  onClick={() => setIsUserMenuOpen(false)}
                                >
                                  <Settings className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                  <span className="font-semibold">Admin Dashboard</span>
                                </Link>
                              )}
                              
                              <button
                                onClick={handleLogout}
                                className="flex items-center space-x-4 px-8 py-5 text-red-600 hover:bg-red-50 transition-all duration-300 w-full text-left group"
                              >
                                <LogOut className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                <span className="font-semibold">Sign Out</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        onClick={() => setIsAuthModalOpen(true)} 
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-xl hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 rounded-2xl px-10 py-4 font-bold text-base"
                      >
                        Sign In
                      </Button>
                    </motion.div>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                  className="xl:hidden p-4 rounded-2xl bg-slate-100/80 backdrop-blur-sm border border-slate-200/60 text-slate-700 hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl mobile-menu-button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Premium Backdrop */}
            <motion.div
              className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-40 xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* World-Class Mobile Menu */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-96 max-w-[90vw] bg-white/95 backdrop-blur-2xl z-50 xl:hidden shadow-2xl mobile-menu-container border-l border-white/30"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="p-8 h-full overflow-y-auto">
                
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-slate-900">Menu</h2>
                    <p className="text-base text-slate-600 mt-2">Navigate Reeves</p>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-3 rounded-2xl hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-7 h-7" />
                  </button>
                </div>

                {/* Mobile Navigation Items */}
                <div className="space-y-3 mb-10">
                  {navigationItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ x: 80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center space-x-5 px-6 py-5 rounded-2xl transition-all duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl shadow-amber-500/30' 
                              : 'text-slate-700 hover:bg-gradient-to-r hover:from-slate-50 hover:to-amber-50 hover:text-amber-700'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className={`p-3 rounded-xl ${isActive ? 'bg-white/20' : 'bg-slate-100'}`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <span className="font-bold text-lg">{item.name}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mobile Contact Buttons */}
                <motion.div
                  className="grid grid-cols-2 gap-4 mb-10"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <Button
                    onClick={handleCall}
                    variant="outline"
                    className="flex items-center justify-center gap-3 border-green-200 text-green-600 hover:bg-green-50 h-16 rounded-2xl font-bold text-base"
                  >
                    <Phone className="w-6 h-6" />
                    Call Us
                  </Button>
                  <Button
                    onClick={handleWhatsApp}
                    variant="outline"
                    className="flex items-center justify-center gap-3 border-green-200 text-green-600 hover:bg-green-50 h-16 rounded-2xl font-bold text-base"
                  >
                    <MessageSquare className="w-6 h-6" />
                    WhatsApp
                  </Button>
                </motion.div>

                {/* Mobile User Section */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  {currentUser ? (
                    <div className="space-y-6">
                      <div className="p-6 bg-gradient-to-br from-slate-50 to-amber-50/70 rounded-3xl border border-slate-200/50 shadow-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                            <User className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 truncate text-lg">{currentUser.email}</p>
                            <p className="text-base text-slate-600 mt-2">
                              {isAdmin ? '👑 Administrator' : '🍽️ Valued Guest'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Link
                        to="/profile"
                        className="flex items-center space-x-4 px-6 py-5 text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200 rounded-2xl"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="w-6 h-6" />
                        <span className="font-bold text-lg">My Profile</span>
                      </Link>
                      
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center space-x-4 px-6 py-5 text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200 rounded-2xl"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Settings className="w-6 h-6" />
                          <span className="font-bold text-lg">Admin Dashboard</span>
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-4 px-6 py-5 text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left rounded-2xl"
                      >
                        <LogOut className="w-6 h-6" />
                        <span className="font-bold text-lg">Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }} 
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-3xl h-16 font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300"
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
