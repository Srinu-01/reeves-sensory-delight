
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const heroImages = [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=2071&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop'
  ];

  const fullText = "Where Taste Meets Elegance";

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = heroImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });
      
      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  // Image slideshow with crossfade
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [imagesLoaded]);

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!imagesLoaded) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">
        <div className="text-center text-white">
          <motion.div
            className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-lg font-medium">Preparing your experience...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          {heroImages.map((image, index) => (
            <motion.div
              key={`${image}-${index}`}
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url('${image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === currentImageIndex ? 1 : 0,
                scale: index === currentImageIndex ? 1.05 : 1
              }}
              transition={{ 
                duration: 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </AnimatePresence>
      </div>
      
      {/* Luxury Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />

      {/* Audio Toggle */}
      <motion.button
        className="absolute top-28 right-6 z-20 p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-black/30 transition-all duration-300 group"
        onClick={() => setIsAudioEnabled(!isAudioEnabled)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        {isAudioEnabled ? (
          <Volume2 className="w-5 h-5 group-hover:text-amber-300 transition-colors" />
        ) : (
          <VolumeX className="w-5 h-5 group-hover:text-amber-300 transition-colors" />
        )}
      </motion.button>
      
      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-serif mb-6 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent drop-shadow-2xl">
              REEVES
            </span>
          </motion.h1>
          
          <motion.div
            className="h-0.5 w-64 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8 rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
          />
        </motion.div>
        
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-amber-100 h-16 flex items-center justify-center">
            {displayText}
            <motion.span
              className="inline-block w-1 h-10 bg-amber-400 ml-2 rounded-full"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </p>
        </motion.div>
        
        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          Experience the finest culinary journey in Kakinada, where every dish tells a story 
          and every moment becomes a cherished memory.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => scrollToSection('booking')}
              className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:via-amber-700 hover:to-amber-800 text-white px-10 py-4 text-lg font-semibold rounded-full border-2 border-amber-400/50 hover:border-amber-300 transition-all duration-400 shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40"
            >
              Reserve Your Table
            </Button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => scrollToSection('menu')}
              variant="outline"
              className="border-2 border-white/80 text-white hover:bg-white hover:text-slate-900 px-10 py-4 text-lg font-semibold rounded-full backdrop-blur-sm bg-white/10 transition-all duration-400 hover:shadow-xl"
            >
              Explore Menu
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Image Indicators */}
      <motion.div
        className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.2 }}
      >
        {heroImages.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              index === currentImageIndex 
                ? 'bg-amber-400 scale-125 shadow-lg shadow-amber-400/50' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => setCurrentImageIndex(index)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </motion.div>
      
      {/* Scroll Indicator - Perfectly Centered */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center cursor-pointer group"
        onClick={() => scrollToSection('philosophy')}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.4 }}
        whileHover={{ y: -4 }}
      >
        <div className="text-white/90 group-hover:text-amber-300 transition-all duration-300">
          <p className="text-sm font-medium tracking-[0.2em] mb-4 group-hover:tracking-[0.25em] transition-all duration-300">
            DISCOVER MORE
          </p>
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 mb-1 group-hover:text-amber-300 transition-colors" />
            <div className="w-px h-12 bg-gradient-to-b from-amber-400/80 to-transparent rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
