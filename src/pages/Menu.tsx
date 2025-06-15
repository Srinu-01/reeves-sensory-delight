
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isVeg: boolean;
  isSpicy: boolean;
  rating: number;
  imageUrl?: string;
}

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<{[key: string]: number}>({});

  const categories = ['All', 'Appetizers', 'Main Course', 'Biryani', 'Desserts', 'Beverages'];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'menu_items'));
        const items: MenuItem[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as MenuItem);
        });
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        toast.error('Failed to load menu items');
        // Add some sample data for demo
        setMenuItems([
          {
            id: '1',
            name: 'Royal Hyderabadi Biryani',
            description: 'Fragrant basmati rice layered with tender mutton, slow-cooked with aromatic spices',
            price: 389,
            category: 'Biryani',
            isVeg: false,
            isSpicy: true,
            rating: 4.8
          },
          {
            id: '2',
            name: 'Butter Chicken Supreme',
            description: 'Succulent chicken pieces in a rich, creamy tomato-based curry',
            price: 295,
            category: 'Main Course',
            isVeg: false,
            isSpicy: false,
            rating: 4.7
          },
          {
            id: '3',
            name: 'Paneer Tikka Masala',
            description: 'Grilled cottage cheese in a rich and creamy tomato gravy',
            price: 245,
            category: 'Main Course',
            isVeg: true,
            isSpicy: true,
            rating: 4.6
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
    toast.success('Added to cart!');
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-r from-slate-900 via-slate-800 to-amber-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div
          className="relative z-10 text-center text-white px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Our Menu</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Discover our carefully crafted culinary creations
          </p>
        </motion.div>
      </section>

      {/* Menu Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Cart Summary */}
          {getTotalCartItems() > 0 && (
            <motion.div
              className="fixed bottom-6 right-6 z-50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                size="lg" 
                className="rounded-full shadow-lg"
                onClick={() => toast.info('Pre-order functionality coming soon!')}
              >
                Cart ({getTotalCartItems()})
              </Button>
            </motion.div>
          )}

          {/* Menu Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group overflow-hidden">
                  {/* Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center relative overflow-hidden">
                    <div className="text-center">
                      <div className="text-4xl mb-2">{item.isVeg ? '🥬' : '🍖'}</div>
                      <p className="text-slate-600 font-medium">{item.name}</p>
                    </div>
                    {item.isSpicy && (
                      <Badge className="absolute top-2 right-2 bg-red-500">🌶️ Spicy</Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-serif text-slate-800 group-hover:text-amber-600 transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm text-gray-600">{item.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-amber-600">
                        ₹{item.price}
                      </span>
                      <Button 
                        onClick={() => addToCart(item.id)}
                        size="sm"
                        className="rounded-full"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
