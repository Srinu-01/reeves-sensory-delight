
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const heroImages = [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=2071&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2071&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2081&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2086&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563379091339-03246963d293?q=80&w=2070&auto=format&fit=crop'
  ];

  const fullText = "Where Taste Meets Elegance";

  // Image slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (textIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[textIndex]);
        setTextIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [textIndex, fullText]);

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('${heroImages[currentImageIndex]}')`
          }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 1.5 }}
        />
      </AnimatePresence>
      
      {/* Parallax Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Audio Toggle */}
      <motion.button
        className="absolute top-8 right-8 z-20 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300"
        onClick={() => setIsAudioEnabled(!isAudioEnabled)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        {isAudioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </motion.button>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <motion.h1
          className="text-7xl md:text-8xl font-serif mb-6 tracking-wide"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <span className="text-amber-400">REEVES</span>
        </motion.h1>
        
        <motion.div
          className="h-px w-48 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        />
        
        <motion.p
          className="text-2xl md:text-3xl font-light mb-4 text-amber-100 h-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {displayText}
          <motion.span
            className="inline-block w-1 h-8 bg-amber-400 ml-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.p>
        
        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          Experience the finest culinary journey in Kakinada, where every dish tells a story 
          and every moment becomes a cherished memory.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={scrollToBooking}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 text-lg font-medium rounded-none border-2 border-amber-400 hover:border-amber-300 transition-all duration-300 shadow-xl hover:shadow-amber-500/25"
            >
              Reserve Your Table
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={scrollToMenu}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-medium rounded-none transition-all duration-300"
            >
              Explore Menu
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Image Indicators */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        {heroImages.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? 'bg-amber-400 scale-125' : 'bg-white/50'
            }`}
            onClick={() => setCurrentImageIndex(index)}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="text-white text-center">
          <p className="text-sm mb-4 tracking-wide">SCROLL TO DISCOVER</p>
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-amber-400 to-transparent mx-auto"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
