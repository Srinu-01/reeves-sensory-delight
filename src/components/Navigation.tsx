
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Calendar, User, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', section: 'hero' },
    { name: 'Menu', href: '#menu', section: 'menu' },
    { name: 'About', href: '#philosophy', section: 'philosophy' },
    { name: 'Gallery', href: '#gallery', section: 'gallery' },
    { name: 'Contact', href: '#contact', section: 'contact' },
    { name: 'Pre-Order', href: '/preorder', section: null },
  ];

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToBooking = () => {
    if (location.pathname !== '/') {
      window.location.href = '/#booking';
      return;
    }
    
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.href.startsWith('/')) {
      setIsMobileMenuOpen(false);
      return;
    }
    if (item.section) {
      scrollToSection(item.section);
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-slate-900/90 backdrop-blur-md border-b border-amber-500/20 shadow-xl' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="text-2xl font-serif text-amber-400 tracking-wider"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link to="/">REEVES</Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.div key={item.name}>
                  {item.href.startsWith('/') ? (
                    <Link
                      to={item.href}
                      className="relative text-white hover:text-amber-400 transition-colors duration-300 font-medium"
                    >
                      <motion.span
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.name}
                      </motion.span>
                      <motion.div
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400 origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  ) : (
                    <motion.button
                      onClick={() => handleNavClick(item)}
                      className="relative text-white hover:text-amber-400 transition-colors duration-300 font-medium"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                      <motion.div
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400 origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/profile">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-slate-900 px-4 py-2 rounded-full transition-all duration-300"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Button
                onClick={scrollToBooking}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-2 rounded-full border border-amber-400 hover:border-amber-300 transition-all duration-300"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Reserve
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900 px-6 py-2 rounded-full transition-all duration-300"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden text-white p-2"
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6">
                <div className="text-2xl font-serif text-amber-400 tracking-wider">
                  REEVES
                </div>
                <motion.button
                  className="text-white p-2"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 flex flex-col justify-center px-6">
                {navItems.map((item, index) => (
                  <motion.div key={item.name}>
                    {item.href.startsWith('/') ? (
                      <Link
                        to={item.href}
                        className="text-white text-2xl font-light py-4 text-left border-b border-white/10 hover:text-amber-400 transition-colors duration-300 block"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <motion.span
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          {item.name}
                        </motion.span>
                      </Link>
                    ) : (
                      <motion.button
                        onClick={() => handleNavClick(item)}
                        className="text-white text-2xl font-light py-4 text-left border-b border-white/10 hover:text-amber-400 transition-colors duration-300 w-full"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        {item.name}
                      </motion.button>
                    )}
                  </motion.div>
                ))}
                
                <div className="pt-8 space-y-4">
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 rounded-full"
                    >
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Button>
                  </Link>
                  <Button
                    onClick={scrollToBooking}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 rounded-full"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Reserve Your Table
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white text-white hover:bg-white hover:text-slate-900 py-3 rounded-full"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
