
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Philosophy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const philosophyItems = [
    {
      title: "TASTE",
      description: "Every dish is a symphony of flavors, crafted with passion and precision using the finest ingredients.",
      icon: "🍽️"
    },
    {
      title: "AMBIENCE",
      description: "Step into a world where luxury meets comfort, where every detail is designed to enchant your senses.",
      icon: "✨"
    },
    {
      title: "EMOTION",
      description: "We don't just serve food; we create memories that linger long after the last bite.",
      icon: "💫"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-serif text-slate-800 mb-6">Our Philosophy</h2>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Reeves, we believe that dining is an art form that engages all your senses. 
            Our philosophy is built on three pillars that define every aspect of your experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {philosophyItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              <motion.div
                className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                {item.icon}
              </motion.div>
              
              <h3 className="text-2xl font-serif text-slate-800 mb-4 tracking-wide">
                {item.title}
              </h3>
              
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4"></div>
              
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
