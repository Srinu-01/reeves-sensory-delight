
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      text: "Reeves Restaurant exceeded all expectations. The ambiance is absolutely magical, and every dish is a masterpiece. The staff's attention to detail is unparalleled.",
      dish: "Royal Hyderabadi Biryani",
      location: "Kakinada"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      rating: 5,
      text: "An extraordinary culinary journey! The flavors are authentic, the presentation is artistic, and the overall experience is nothing short of perfection.",
      dish: "Butter Chicken Supreme",
      location: "Visakhapatnam"
    },
    {
      id: 3,
      name: "Anita Reddy",
      rating: 5,
      text: "The perfect venue for our anniversary dinner. Every moment was special, from the warm welcome to the exquisite dessert. Truly a memorable experience.",
      dish: "Coastal Fish Curry",
      location: "Rajahmundry"
    },
    {
      id: 4,
      name: "Vikram Patel",
      rating: 5,
      text: "Outstanding service and incredible food quality. The atmosphere makes you feel like royalty. Reeves has set a new standard for fine dining in the region.",
      dish: "Lamb Rogan Josh",
      location: "Kakinada"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-400'
        }`}
      />
    ));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-serif text-slate-800 mb-6">Voices of Excellence</h2>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from our cherished guests about their unforgettable experiences at Reeves Restaurant.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-amber-200/50 overflow-hidden">
                <CardContent className="p-12 relative">
                  {/* Quote Icon */}
                  <motion.div
                    className="absolute top-8 left-8 text-amber-400/30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Quote className="w-16 h-16" />
                  </motion.div>

                  <div className="relative z-10">
                    {/* Rating */}
                    <motion.div
                      className="flex justify-center mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="flex space-x-1">
                        {renderStars(testimonials[currentIndex].rating)}
                      </div>
                    </motion.div>

                    {/* Testimonial Text */}
                    <motion.blockquote
                      className="text-xl md:text-2xl text-gray-700 text-center leading-relaxed mb-8 font-light italic"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      "{testimonials[currentIndex].text}"
                    </motion.blockquote>

                    {/* Customer Info */}
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <h4 className="text-xl font-semibold text-slate-800 mb-2">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-amber-600 font-medium mb-1">
                        Loved: {testimonials[currentIndex].dish}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {testimonials[currentIndex].location}
                      </p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <motion.button
              className="p-3 rounded-full bg-white shadow-lg border border-amber-200 text-slate-700 hover:bg-amber-50 hover:border-amber-300 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevTestimonial}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-amber-500 scale-125' : 'bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <motion.button
              className="p-3 rounded-full bg-white shadow-lg border border-amber-200 text-slate-700 hover:bg-amber-50 hover:border-amber-300 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextTestimonial}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
