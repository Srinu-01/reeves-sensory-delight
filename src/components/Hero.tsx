
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop')`
        }}
      />
      
      {/* Parallax Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      
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
          className="text-2xl md:text-3xl font-light mb-4 text-amber-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Where Taste Meets Elegance
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
          <Button
            onClick={scrollToBooking}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 text-lg font-medium rounded-none border-2 border-amber-400 hover:border-amber-300 transition-all duration-300 shadow-xl hover:shadow-amber-500/25"
          >
            Reserve Your Table
          </Button>
          
          <Button
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-medium rounded-none transition-all duration-300"
          >
            Explore Menu
          </Button>
        </motion.div>
      </div>
      
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
