
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users } from 'lucide-react';

const LiveStatus = () => {
  const [availableTables, setAvailableTables] = useState(6);
  const [dishOfTheDay, setDishOfTheDay] = useState({
    name: "Paneer Makhani",
    price: "₹245",
    description: "Rich and creamy paneer curry with butter and aromatic spices"
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAvailableTables(prev => Math.max(2, Math.min(12, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Live Occupancy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-amber-500/30 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-amber-400 mr-3" />
                  <h3 className="text-xl font-serif text-white">Live Availability</h3>
                </div>
                
                <div className="text-center">
                  <motion.div
                    className="text-4xl font-bold text-amber-400 mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {availableTables}
                  </motion.div>
                  <p className="text-gray-300 mb-4">Tables Available</p>
                  
                  <motion.div
                    className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-3"
                    animate={{ boxShadow: ['0 0 20px rgba(245, 158, 11, 0.3)', '0 0 30px rgba(245, 158, 11, 0.5)', '0 0 20px rgba(245, 158, 11, 0.3)'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <p className="text-amber-300 text-sm font-medium">
                      {availableTables <= 4 ? '🔥 Limited Availability' : '✅ Good Availability'}
                    </p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Dish of the Day */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-amber-600 to-orange-600 border-none overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-white mr-3" />
                  <h3 className="text-xl font-serif text-white">Today's Special</h3>
                </div>
                
                <div className="text-center">
                  <motion.div
                    className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-2xl font-serif text-white mb-2">
                      {dishOfTheDay.name}
                    </h4>
                    <p className="text-3xl font-bold text-white mb-2">
                      {dishOfTheDay.price}
                    </p>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {dishOfTheDay.description}
                    </p>
                  </motion.div>
                  
                  <motion.div
                    className="inline-flex items-center text-white text-sm font-medium"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⭐ Chef's Recommendation
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveStatus;
