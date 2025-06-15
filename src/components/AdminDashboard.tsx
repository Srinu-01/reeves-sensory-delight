
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  Settings, 
  Menu, 
  BarChart3, 
  Bell,
  Lock,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Trash2,
  Phone,
  MessageSquare,
  Upload,
  Eye,
  Star
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { 
  doc, 
  setDoc, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  onSnapshot 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface MenuItem {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
  featured: boolean;
}

interface Booking {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  createdAt: any;
}

interface Feedback {
  id?: string;
  name: string;
  email: string;
  rating: number;
  message: string;
  createdAt: any;
}

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [preOrders, setPreOrders] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Form states
  const [menuForm, setMenuForm] = useState<MenuItem>({
    name: '',
    description: '',
    price: 0,
    category: 'appetizer',
    image: '',
    available: true,
    featured: false
  });
  
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [upiSettings, setUpiSettings] = useState({
    upiId: '9849834102@ybl',
    merchantName: 'Reeves Restaurant',
    enabled: true
  });

  useEffect(() => {
    loadAdminData();
    setupRealtimeListeners();
  }, []);

  const loadAdminData = async () => {
    try {
      setIsLoading(true);
      
      // Load all collections
      const [bookingsData, preOrdersData, menuData, feedbackData] = await Promise.all([
        getDocs(query(collection(db, 'bookings'), orderBy('createdAt', 'desc'))),
        getDocs(query(collection(db, 'preorders'), orderBy('createdAt', 'desc'))),
        getDocs(collection(db, 'menu_items')),
        getDocs(query(collection(db, 'feedback'), orderBy('createdAt', 'desc')))
      ]);

      setBookings(bookingsData.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking)));
      setPreOrders(preOrdersData.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setMenuItems(menuData.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem)));
      setFeedback(feedbackData.docs.map(doc => ({ id: doc.id, ...doc.data() } as Feedback)));
      
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeListeners = () => {
    // Real-time bookings listener
    const bookingsUnsubscribe = onSnapshot(
      query(collection(db, 'bookings'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        const bookingsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
        setBookings(bookingsData);
      }
    );

    return () => {
      bookingsUnsubscribe();
    };
  };

  // Menu CRUD operations
  const handleAddMenuItem = async () => {
    try {
      if (!menuForm.name || !menuForm.description || menuForm.price <= 0) {
        toast.error('Please fill all required fields');
        return;
      }

      await addDoc(collection(db, 'menu_items'), {
        ...menuForm,
        createdAt: new Date()
      });
      
      setMenuForm({
        name: '',
        description: '',
        price: 0,
        category: 'appetizer',
        image: '',
        available: true,
        featured: false
      });
      
      toast.success('Menu item added successfully!');
      loadAdminData();
    } catch (error) {
      console.error('Error adding menu item:', error);
      toast.error('Failed to add menu item');
    }
  };

  const handleUpdateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    try {
      await updateDoc(doc(db, 'menu_items', id), updates);
      toast.success('Menu item updated successfully!');
      loadAdminData();
    } catch (error) {
      console.error('Error updating menu item:', error);
      toast.error('Failed to update menu item');
    }
  };

  const handleDeleteMenuItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'menu_items', id));
      toast.success('Menu item deleted successfully!');
      loadAdminData();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      toast.error('Failed to delete menu item');
    }
  };

  // Booking operations
  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status });
      toast.success(`Booking ${status} successfully!`);
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking');
    }
  };

  const sendWhatsAppMessage = (phone: string, name: string, status: string) => {
    const messages = {
      confirmed: `Hi ${name}! Your table reservation at Reeves Restaurant has been confirmed. We look forward to serving you!`,
      cancelled: `Hi ${name}, unfortunately we had to cancel your reservation at Reeves Restaurant. Please contact us for rescheduling.`
    };
    
    const message = messages[status as keyof typeof messages] || `Hi ${name}, your booking status has been updated.`;
    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Stats calculations
  const stats = {
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    totalPreOrders: preOrders.length,
    totalMenuItems: menuItems.length,
    totalFeedback: feedback.length,
    avgRating: feedback.length > 0 ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1) : '0'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif text-slate-800">Reeves Admin Dashboard</h1>
              <p className="text-gray-600">Complete restaurant management system</p>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Lock className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                    <p className="text-xs text-green-600">{stats.confirmedBookings} confirmed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Menu className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Menu Items</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalMenuItems}</p>
                    <p className="text-xs text-blue-600">{menuItems.filter(m => m.available).length} available</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
                    <p className="text-xs text-purple-600">{stats.totalFeedback} reviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pre-Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalPreOrders}</p>
                    <p className="text-xs text-amber-600">This month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="preorders">Pre-Orders</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p>Loading bookings...</p>
                ) : bookings.length === 0 ? (
                  <p className="text-gray-500">No bookings yet</p>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="font-medium">{booking.name}</p>
                              <p className="text-sm text-gray-600">
                                {booking.guests} guests • {booking.date} at {booking.time}
                              </p>
                              <p className="text-xs text-gray-500">Phone: {booking.phone}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                            className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {booking.status === 'confirmed' ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <XCircle className="w-3 h-3 mr-1" />
                            )}
                            {booking.status || 'pending'}
                          </Badge>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                              disabled={booking.status === 'confirmed'}
                            >
                              <CheckCircle className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            >
                              <XCircle className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => sendWhatsAppMessage(booking.phone, booking.name, booking.status)}
                            >
                              <MessageSquare className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(`tel:+91${booking.phone}`)}
                            >
                              <Phone className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu">
            <div className="space-y-6">
              {/* Add Menu Item Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add New Menu Item
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Item Name</Label>
                      <Input
                        value={menuForm.name}
                        onChange={(e) => setMenuForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter item name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Price (₹)</Label>
                      <Input
                        type="number"
                        value={menuForm.price}
                        onChange={(e) => setMenuForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <select
                        value={menuForm.category}
                        onChange={(e) => setMenuForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="appetizer">Appetizer</option>
                        <option value="main">Main Course</option>
                        <option value="biryani">Biryani</option>
                        <option value="dessert">Dessert</option>
                        <option value="beverage">Beverage</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Image URL</Label>
                      <Input
                        value={menuForm.image}
                        onChange={(e) => setMenuForm(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={menuForm.description}
                        onChange={(e) => setMenuForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe the dish..."
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={menuForm.available}
                          onChange={(e) => setMenuForm(prev => ({ ...prev, available: e.target.checked }))}
                        />
                        <span>Available</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={menuForm.featured}
                          onChange={(e) => setMenuForm(prev => ({ ...prev, featured: e.target.checked }))}
                        />
                        <span>Featured</span>
                      </label>
                    </div>
                  </div>
                  <Button onClick={handleAddMenuItem} className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Menu Item
                  </Button>
                </CardContent>
              </Card>

              {/* Menu Items List */}
              <Card>
                <CardHeader>
                  <CardTitle>Menu Items ({menuItems.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {menuItems.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 space-y-3">
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-32 object-cover rounded"
                          />
                        )}
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-bold text-amber-600">₹{item.price}</span>
                            <div className="flex items-center gap-1">
                              {item.featured && <Badge variant="secondary">Featured</Badge>}
                              <Badge variant={item.available ? 'default' : 'secondary'}>
                                {item.available ? 'Available' : 'Unavailable'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateMenuItem(item.id!, { available: !item.available })}
                          >
                            {item.available ? <Eye className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingItem(item.id!)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteMenuItem(item.id!)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Customer Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                {feedback.length === 0 ? (
                  <p className="text-gray-500">No feedback yet</p>
                ) : (
                  <div className="space-y-4">
                    {feedback.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{item.name}</h4>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">({item.rating}/5)</span>
                            </div>
                            <p className="text-gray-600 mb-2">{item.message}</p>
                            <p className="text-xs text-gray-500">{item.email}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preorders">
            <Card>
              <CardHeader>
                <CardTitle>Pre-Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {preOrders.length === 0 ? (
                  <p className="text-gray-500">No pre-orders yet</p>
                ) : (
                  <div className="space-y-4">
                    {preOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-sm text-gray-600">
                            Total: ₹{order.total} • Items: {order.items?.length || 0}
                          </p>
                          <p className="text-xs text-gray-500">Phone: {order.phone}</p>
                        </div>
                        <Badge variant="secondary">{order.status || 'pending'}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>UPI Payment Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>UPI ID</Label>
                      <Input
                        value={upiSettings.upiId}
                        onChange={(e) => setUpiSettings(prev => ({ ...prev, upiId: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Merchant Name</Label>
                      <Input
                        value={upiSettings.merchantName}
                        onChange={(e) => setUpiSettings(prev => ({ ...prev, merchantName: e.target.value }))}
                      />
                    </div>
                  </div>
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Restaurant Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Restaurant Name</Label>
                      <Input defaultValue="Reeves Restaurant" />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input defaultValue="Kakinada" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input defaultValue="+91 98498 34102" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input defaultValue="info@reeves.com" />
                    </div>
                  </div>
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Update Information
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
