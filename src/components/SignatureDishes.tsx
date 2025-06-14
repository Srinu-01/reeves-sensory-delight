
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SignatureDishes = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const dishes = [
    {
      name: "Royal Hyderabadi Biryani",
      price: "₹389",
      description: "Fragrant basmati rice layered with tender mutton, slow-cooked with aromatic spices and saffron.",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d61a?q=80&w=2070&auto=format&fit=crop",
      category: "Signature"
    },
    {
      name: "Butter Chicken Supreme",
      price: "₹295",
      description: "Succulent chicken pieces in a rich, creamy tomato-based curry with a perfect blend of spices.",
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=2084&auto=format&fit=crop",
      category: "Chef's Special"
    },
    {
      name: "Coastal Fish Curry",
      price: "₹425",
      description: "Fresh coastal fish cooked in coconut milk with curry leaves and traditional Andhra spices.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2081&auto=format&fit=crop",
      category: "Local Favorite"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-serif text-white mb-6">Signature Creations</h2>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our most celebrated dishes, each crafted with passion and perfected over years of culinary expertise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-amber-500 text-white px-3 py-1 text-sm font-medium rounded-full">
                      {dish.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-serif text-white group-hover:text-amber-300 transition-colors duration-300">
                      {dish.name}
                    </h3>
                    <span className="text-2xl font-bold text-amber-400">
                      {dish.price}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {dish.description}
                  </p>
                  
                  <motion.div
                    className="mt-4 h-px bg-gradient-to-r from-amber-500 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureDishes;
