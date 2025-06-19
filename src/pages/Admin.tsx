
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { doc, setDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const Admin = () => {
  const { currentUser, login, logout, isAdmin } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [bookings, setBookings] = useState<any[]>([]);
  const [preOrders, setPreOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUser && isAdmin) {
      loadAdminData();
    }
  }, [currentUser, isAdmin]);

  const loadAdminData = async () => {
    try {
      setIsLoading(true);
      
      // Load bookings
      const bookingsQuery = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const bookingsSnapshot = await getDocs(bookingsQuery);
      const bookingsData = bookingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsData);

      // Load pre-orders
      const preOrdersQuery = query(collection(db, 'preorders'), orderBy('createdAt', 'desc'));
      const preOrdersSnapshot = await getDocs(preOrdersQuery);
      const preOrdersData = preOrdersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPreOrders(preOrdersData);
      
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginForm.email, loginForm.password);
      
      // Create admin credentials document if this is the first login
      if (loginForm.email === 'admin@reeves.com') {
        await setDoc(doc(db, 'admin_credentials', loginForm.email), {
          email: loginForm.email,
          uid: currentUser?.uid,
          isAdmin: true,
          createdAt: new Date()
        });
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  if (!currentUser || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-md"
        >
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-serif text-white mb-2">
                Reeves Admin
              </CardTitle>
              <p className="text-amber-200">Secure Dashboard Access</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    placeholder="admin@reeves.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    placeholder="Enter password"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Access Dashboard
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif text-slate-800">Reeves Admin Dashboard</h1>
              <p className="text-gray-600">Manage your restaurant operations</p>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Menu className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pre-Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{preOrders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-amber-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Available Tables</p>
                  <p className="text-2xl font-bold text-gray-900">6</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Revenue Today</p>
                  <p className="text-2xl font-bold text-gray-900">₹45,670</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="preorders">Pre-Orders</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p>Loading bookings...</p>
                ) : bookings.length === 0 ? (
                  <p className="text-gray-500">No bookings yet</p>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{booking.name}</p>
                          <p className="text-sm text-gray-600">
                            {booking.guestCount} guests • {booking.date} at {booking.time}
                          </p>
                          <p className="text-xs text-gray-500">Phone: {booking.phone}</p>
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
                {isLoading ? (
                  <p>Loading pre-orders...</p>
                ) : preOrders.length === 0 ? (
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

          <TabsContent value="menu">
            <Card>
              <CardHeader>
                <CardTitle>Menu Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Menu className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Menu management coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Analytics dashboard coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Restaurant Name</Label>
                      <Input defaultValue="Reeves Restaurant" />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input defaultValue="Kakinada" />
                    </div>
                  </div>
                  
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
