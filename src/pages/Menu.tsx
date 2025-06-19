
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Plus, Minus, ShoppingCart, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/AuthModal';
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
  available: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const Menu = () => {
  const { currentUser } = useAuth();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const categories = ['All', 'Appetizers', 'Main Course', 'Biryani', 'Curries', 'Desserts', 'Beverages'];

  useEffect(() => {
    fetchMenuItems();
    // Load cart from localStorage
    const savedCart = localStorage.getItem('reeves-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('reeves-cart', JSON.stringify(cart));
  }, [cart]);

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
      // Sample data for demo
      setMenuItems([
        {
          id: '1',
          name: 'Royal Hyderabadi Biryani',
          description: 'Fragrant basmati rice layered with tender mutton, slow-cooked with aromatic spices and saffron',
          price: 589,
          category: 'Biryani',
          isVeg: false,
          isSpicy: true,
          rating: 4.9,
          available: true,
          imageUrl: 'https://images.unsplash.com/photo-1563379091339-03246963d293?q=80&w=2070&auto=format&fit=crop'
        },
        {
          id: '2',
          name: 'Coastal Fish Curry',
          description: 'Fresh catch in coconut-based curry with traditional Andhra spices',
          price: 425,
          category: 'Curries',
          isVeg: false,
          isSpicy: true,
          rating: 4.8,
          available: true,
          imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2081&auto=format&fit=crop'
        },
        {
          id: '3',
          name: 'Butter Chicken Supreme',
          description: 'Tender chicken in rich, creamy tomato-based sauce',
          price: 345,
          category: 'Main Course',
          isVeg: false,
          isSpicy: false,
          rating: 4.7,
          available: true,
          imageUrl: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=2084&auto=format&fit=crop'
        },
        {
          id: '4',
          name: 'Paneer Makhani',
          description: 'Cottage cheese in rich, creamy tomato and cashew gravy',
          price: 295,
          category: 'Curries',
          isVeg: true,
          isSpicy: false,
          rating: 4.6,
          available: true,
          imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2127&auto=format&fit=crop'
        },
        {
          id: '5',
          name: 'Chicken 65',
          description: 'Spicy deep-fried chicken appetizer with curry leaves and green chilies',
          price: 225,
          category: 'Appetizers',
          isVeg: false,
          isSpicy: true,
          rating: 4.5,
          available: true
        },
        {
          id: '6',
          name: 'Gulab Jamun',
          description: 'Traditional milk dumplings in cardamom-flavored sugar syrup',
          price: 125,
          category: 'Desserts',
          isVeg: true,
          isSpicy: false,
          rating: 4.4,
          available: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
    toast.success(`${item.name} added to cart!`);
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.success('Item removed from cart');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    
    // Navigate to pre-order checkout
    window.location.href = '/preorder?checkout=true';
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
                className={`rounded-full transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg' 
                    : 'border-amber-300 text-amber-700 hover:bg-amber-50'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Floating Cart Button */}
          {getTotalItems() > 0 && (
            <motion.div
              className="fixed bottom-6 right-6 z-50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                size="lg" 
                className="rounded-full shadow-luxury bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 relative"
                onClick={() => setShowCart(true)}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart ({getTotalItems()})
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full min-w-6 h-6">
                  ₹{getTotalPrice()}
                </Badge>
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
                <Card className="h-full hover:shadow-luxury transition-all duration-500 group overflow-hidden border-amber-200/50">
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">{item.isVeg ? '🥬' : '🍖'}</div>
                          <p className="text-slate-600 font-medium">{item.name}</p>
                        </div>
                      </div>
                    )}
                    {item.isSpicy && (
                      <Badge className="absolute top-2 right-2 bg-red-500">🌶️ Spicy</Badge>
                    )}
                    {item.isVeg && (
                      <Badge className="absolute top-2 left-2 bg-green-500">🌱 Veg</Badge>
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
                        onClick={() => addToCart(item)}
                        disabled={!item.available}
                        size="sm"
                        className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
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

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setShowCart(false)}>
          <motion.div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-serif text-slate-800">Your Cart</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCart(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded flex items-center justify-center">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded" />
                          ) : (
                            <span className="text-2xl">{item.isVeg ? '🥬' : '🍖'}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-800">{item.name}</h4>
                          <p className="text-amber-600 font-bold">₹{item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-amber-600">₹{getTotalPrice()}</span>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 text-lg"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Menu;
