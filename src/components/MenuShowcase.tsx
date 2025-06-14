
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, Flame, Leaf } from 'lucide-react';

const MenuShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('signature');

  const categories = [
    { id: 'signature', name: 'Signature Dishes', icon: Star },
    { id: 'biryani', name: 'Biryani Collection', icon: Flame },
    { id: 'curries', name: 'Curries', icon: Clock },
    { id: 'vegetarian', name: 'Vegetarian', icon: Leaf }
  ];

  const menuItems = {
    signature: [
      {
        id: 1,
        name: 'Royal Hyderabadi Biryani',
        description: 'Aromatic basmati rice layered with tender mutton, slow-cooked with saffron and royal spices',
        price: 589,
        image: 'https://images.unsplash.com/photo-1563379091339-03246963d293?q=80&w=2070&auto=format&fit=crop',
        badges: ['Chef Special', 'Best Seller'],
        prepTime: '45 mins'
      },
      {
        id: 2,
        name: 'Coastal Fish Curry',
        description: 'Fresh catch of the day in a coconut-based curry with traditional Andhra spices',
        price: 425,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2081&auto=format&fit=crop',
        badges: ['Local Favorite'],
        prepTime: '30 mins'
      },
      {
        id: 3,
        name: 'Tandoori Platter Supreme',
        description: 'An assortment of chicken, lamb, and prawns marinated in yogurt and spices, cooked in clay oven',
        price: 695,
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2086&auto=format&fit=crop',
        badges: ['Serves 2'],
        prepTime: '40 mins'
      }
    ],
    biryani: [
      {
        id: 4,
        name: 'Chicken Dum Biryani',
        description: 'Classic chicken biryani with perfectly spiced rice and tender chicken pieces',
        price: 389,
        image: 'https://images.unsplash.com/photo-1563379091339-03246963d293?q=80&w=2070&auto=format&fit=crop',
        badges: ['Popular'],
        prepTime: '40 mins'
      },
      {
        id: 5,
        name: 'Vegetable Biryani',
        description: 'Fragrant basmati rice with seasonal vegetables and aromatic spices',
        price: 289,
        image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=2055&auto=format&fit=crop',
        badges: ['Vegetarian'],
        prepTime: '35 mins'
      }
    ],
    curries: [
      {
        id: 6,
        name: 'Butter Chicken',
        description: 'Tender chicken in a rich, creamy tomato-based sauce with butter and cream',
        price: 345,
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=2084&auto=format&fit=crop',
        badges: ['Mild Spice'],
        prepTime: '25 mins'
      },
      {
        id: 7,
        name: 'Gongura Mutton',
        description: 'Traditional Andhra mutton curry with tangy gongura leaves and regional spices',
        price: 465,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2081&auto=format&fit=crop',
        badges: ['Regional Special', 'Spicy'],
        prepTime: '50 mins'
      }
    ],
    vegetarian: [
      {
        id: 8,
        name: 'Paneer Makhani',
        description: 'Cottage cheese cubes in a rich, creamy tomato and cashew gravy',
        price: 295,
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2127&auto=format&fit=crop',
        badges: ['Vegetarian', 'Creamy'],
        prepTime: '20 mins'
      },
      {
        id: 9,
        name: 'Dal Tadka',
        description: 'Yellow lentils tempered with cumin, garlic, and aromatic spices',
        price: 185,
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2070&auto=format&fit=crop',
        badges: ['Comfort Food'],
        prepTime: '15 mins'
      }
    ]
  };

  return (
    <section id="menu" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-serif text-slate-800 mb-6">Culinary Excellence</h2>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated menu featuring traditional recipes elevated with modern techniques and premium ingredients.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                  : 'border-amber-300 text-amber-700 hover:bg-amber-50'
              }`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {menuItems[activeCategory as keyof typeof menuItems]?.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-amber-200/50 hover:border-amber-300">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {item.badges.map((badge, badgeIndex) => (
                        <Badge
                          key={badgeIndex}
                          className="bg-amber-500 text-white text-xs px-2 py-1"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    {/* Prep Time */}
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center text-white text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {item.prepTime}
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-serif text-slate-800 group-hover:text-amber-600 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-2xl font-bold text-amber-600">
                        ₹{item.price}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg transition-all duration-300">
                        Add to Pre-Order
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MenuShowcase;
