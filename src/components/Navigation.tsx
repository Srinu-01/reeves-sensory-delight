
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
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.2]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  const navHeight = useTransform(scrollY, [0, 100], [80, 70]);

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
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 world-class-nav"
        style={{
          height: navHeight,
          background: `rgba(255, 255, 255, ${backgroundOpacity})`,
          backdropFilter: 'blur(24px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Enhanced border system */}
        <motion.div 
          className="absolute inset-0 border-b border-slate-200/60"
          style={{ opacity: borderOpacity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"
          style={{ opacity: borderOpacity }}
        />
        
        <div className="container mx-auto px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            
            {/* Premium Logo with enhanced design */}
            <Link to="/" className="relative group z-20">
              <motion.div
                className="flex items-center space-x-3"
                style={{ scale: logoScale }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <motion.div className="text-3xl lg:text-4xl font-serif font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-slate-900 via-amber-600 to-slate-800 bg-clip-text text-transparent">
                      Reeves
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <motion.div
                  className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full shadow-lg"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            </Link>

            {/* World-class Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 max-w-4xl mx-12">
              <div className="flex items-center space-x-2 bg-slate-50/60 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-200/50 shadow-lg shadow-slate-200/20">
                {navigationItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-300 group rounded-full ${
                          isActive 
                            ? 'text-white' 
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {/* Active background */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full shadow-lg shadow-amber-500/30"
                            layoutId="activeTab"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        
                        {/* Hover background */}
                        {!isActive && (
                          <motion.div
                            className="absolute inset-0 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm"
                            whileHover={{ scale: 1.02 }}
                          />
                        )}
                        
                        <div className="relative z-10 flex items-center space-x-2">
                          <IconComponent className="w-4 h-4" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            {/* Enhanced Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              
              {/* Contact Actions */}
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={handleCall}
                  className="group relative p-3 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 text-green-600 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-green-200/40"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-4 h-4" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </motion.button>
                
                <motion.button
                  onClick={handleWhatsApp}
                  className="group relative p-3 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 text-green-600 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-green-200/40"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageSquare className="w-4 h-4" />
                </motion.button>
              </div>
            
              {/* Enhanced User Menu */}
              {currentUser ? (
                <div className="relative user-menu-container">
                  <motion.button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:from-slate-800 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-slate-800/20 border border-slate-700/50"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-sm">Account</span>
                      <span className="text-xs text-slate-300 font-normal">
                        {isAdmin ? 'Admin' : 'Member'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </motion.button>
                  
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        className="absolute right-0 top-full mt-4 w-72 bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="p-6 border-b border-slate-100/80 bg-gradient-to-br from-slate-50/50 to-amber-50/30">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 truncate text-sm">{currentUser.email}</p>
                              <p className="text-sm text-slate-600 mt-1">
                                {isAdmin ? '👑 Administrator' : '🍽️ Valued Guest'}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="py-2">
                          <Link
                            to="/profile"
                            className="flex items-center space-x-3 px-6 py-4 text-slate-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-700 transition-all duration-200 group"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-medium">My Profile</span>
                          </Link>
                          
                          {isAdmin && (
                            <Link
                              to="/admin"
                              className="flex items-center space-x-3 px-6 py-4 text-slate-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-700 transition-all duration-200 group"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
                              <span className="font-medium">Admin Dashboard</span>
                            </Link>
                          )}
                          
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-6 py-4 text-red-600 hover:bg-red-50 transition-all duration-200 w-full text-left group"
                          >
                            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
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
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 shadow-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 rounded-full px-8 py-3 font-semibold text-sm"
                  >
                    Sign In
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-3 rounded-full bg-slate-50/80 backdrop-blur-sm border border-slate-200/60 text-slate-700 hover:bg-white/90 transition-all duration-300 shadow-sm hover:shadow-md mobile-menu-button"
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
      </motion.nav>

      {/* Enhanced Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Enhanced Backdrop */}
            <motion.div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Enhanced Mobile Menu */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white/98 backdrop-blur-xl z-50 lg:hidden shadow-2xl mobile-menu-container border-l border-slate-200/60"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="p-6 h-full overflow-y-auto">
                
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-900">Navigation</h2>
                    <p className="text-sm text-slate-600 mt-1">Explore Reeves</p>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
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
                          className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/20' 
                              : 'text-slate-700 hover:bg-gradient-to-r hover:from-slate-50 hover:to-amber-50 hover:text-amber-700'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className={`p-2 rounded-xl ${isActive ? 'bg-white/20' : 'bg-slate-100'}`}>
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
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Button
                    onClick={handleCall}
                    variant="outline"
                    className="flex items-center justify-center gap-2 border-green-200 text-green-600 hover:bg-green-50 h-14 rounded-2xl font-semibold"
                  >
                    <Phone className="w-5 h-5" />
                    Call Us
                  </Button>
                  <Button
                    onClick={handleWhatsApp}
                    variant="outline"
                    className="flex items-center justify-center gap-2 border-green-200 text-green-600 hover:bg-green-50 h-14 rounded-2xl font-semibold"
                  >
                    <MessageSquare className="w-5 h-5" />
                    WhatsApp
                  </Button>
                </motion.div>

                {/* Mobile User Section */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  {currentUser ? (
                    <div className="space-y-4">
                      <div className="p-5 bg-gradient-to-br from-slate-50 to-amber-50/50 rounded-2xl border border-slate-200/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 truncate">{currentUser.email}</p>
                            <p className="text-sm text-slate-600 mt-1">
                              {isAdmin ? '👑 Administrator' : '🍽️ Valued Guest'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-5 py-4 text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200 rounded-2xl"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="w-5 h-5" />
                        <span className="font-semibold">My Profile</span>
                      </Link>
                      
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center space-x-3 px-5 py-4 text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200 rounded-2xl"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Settings className="w-5 h-5" />
                          <span className="font-semibold">Admin Dashboard</span>
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-5 py-4 text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left rounded-2xl"
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
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-2xl h-14 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
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
