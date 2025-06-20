
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Users, MapPin, Star, LogOut } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const [user] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    joinDate: '2024-01-15'
  });

  const [bookings] = useState([
    {
      id: 'RV123456',
      date: '2025-06-20',
      time: '19:00',
      guests: 4,
      status: 'confirmed',
      table: 'Premium Table 12'
    },
    {
      id: 'RV123455',
      date: '2025-05-15',
      time: '20:00',
      guests: 2,
      status: 'completed',
      table: 'Intimate Table 6'
    }
  ]);

  const [preOrders] = useState([
    {
      id: 'PO789012',
      date: '2025-06-18',
      items: [
        { name: 'Royal Hyderabadi Biryani', quantity: 2, price: 589 },
        { name: 'Butter Chicken Supreme', quantity: 1, price: 345 }
      ],
      total: 1523,
      status: 'preparing'
    },
    {
      id: 'PO789011',
      date: '2025-06-10',
      items: [
        { name: 'Coastal Fish Curry', quantity: 1, price: 425 }
      ],
      total: 425,
      status: 'completed'
    }
  ]);

  const [suggestions] = useState([
    {
      id: '1',
      name: 'Tandoori Platter Supreme',
      description: 'Based on your love for biryani',
      price: 695,
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2086&auto=format&fit=crop'
    },
    {
      id: '2',
      name: 'Gongura Mutton',
      description: 'Recommended for curry lovers',
      price: 465,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2081&auto=format&fit=crop'
    }
  ]);

  const handleLogout = () => {
    toast.success('Logged out successfully!');
    // Redirect logic would go here
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24">
      <div className="container mx-auto px-4 py-16">
        {/* Profile Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-2xl font-serif mx-auto mb-6">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h1 className="text-4xl font-serif text-slate-800 mb-2">{user.name}</h1>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <Badge variant="outline" className="mb-4">
            Member since {new Date(user.joinDate).toLocaleDateString()}
          </Badge>
          <div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Tabs defaultValue="bookings" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              <TabsTrigger value="orders">Pre-Orders</TabsTrigger>
              <TabsTrigger value="suggestions">Suggested for You</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="mt-8">
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="border-amber-200/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-serif text-slate-800 mb-2">
                            Booking #{booking.id}
                          </h3>
                          <div className="flex items-center space-x-4 text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(booking.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {booking.time}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {booking.guests} guests
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {booking.table}
                            </div>
                          </div>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="orders" className="mt-8">
              <div className="space-y-6">
                {preOrders.map((order) => (
                  <Card key={order.id} className="border-amber-200/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-serif text-slate-800">
                          Order #{order.id}
                        </CardTitle>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600">
                        Ordered on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-slate-700">
                              {item.name} × {item.quantity}
                            </span>
                            <span className="font-semibold text-amber-600">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-4 flex justify-between items-center">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-xl font-bold text-amber-600">₹{order.total}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="suggestions" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {suggestions.map((item) => (
                  <Card key={item.id} className="border-amber-200/50 overflow-hidden">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-amber-500 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Recommended
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-serif text-slate-800 mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-amber-600">₹{item.price}</span>
                        <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                          Try This
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
