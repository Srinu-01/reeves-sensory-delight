
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Upload, CreditCard, Clock, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/AuthModal';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isVeg?: boolean;
}

const PreOrder = () => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [step, setStep] = useState(1); // 1: Review, 2: Details, 3: Payment, 4: Success
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    phone: '',
    email: '',
    pickupTime: '',
    specialRequests: ''
  });

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('reeves-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    // Check if coming from checkout
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('checkout') === 'true' && savedCart) {
      const parsedCart = JSON.parse(savedCart);
      if (parsedCart.length > 0) {
        setStep(2);
      }
    }

    // Pre-fill user details if logged in
    if (currentUser) {
      loadUserDetails();
    }
  }, [currentUser]);

  const loadUserDetails = async () => {
    if (!currentUser?.uid) return;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setOrderDetails(prev => ({
          ...prev,
          name: userData.name || '',
          phone: userData.phone || '',
          email: userData.email || currentUser.email || ''
        }));
      }
    } catch (error) {
      console.error('Error loading user details:', error);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const generateOrderId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `RV${timestamp}${random}`;
  };

  const generateUPILink = () => {
    const amount = getTotalPrice();
    const upiId = '9849834102@ybl';
    const merchantName = 'Reeves Restaurant';
    const note = `Order ${orderId} - ${orderDetails.name} - Pickup: ${orderDetails.pickupTime}`;
    
    return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
  };

  const handleStepTwo = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      window.location.href = '/menu';
      return;
    }
    
    setStep(2);
  };

  const handleStepThree = () => {
    if (!orderDetails.name || !orderDetails.phone || !orderDetails.pickupTime) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
    setStep(3);
  };

  const handlePaymentSubmit = async (paymentScreenshot?: File) => {
    setIsLoading(true);
    
    try {
      // Save order to Firestore
      const orderData = {
        orderId,
        userId: currentUser?.uid,
        userEmail: currentUser?.email,
        customerName: orderDetails.name,
        phone: orderDetails.phone,
        pickupTime: orderDetails.pickupTime,
        specialRequests: orderDetails.specialRequests,
        items: cart,
        totalAmount: getTotalPrice(),
        status: 'pending',
        paymentStatus: paymentScreenshot ? 'screenshot_uploaded' : 'pending',
        createdAt: new Date(),
        // If screenshot is uploaded, you would upload to Cloudinary and store URL here
        // paymentScreenshotUrl: uploadedUrl
      };

      await addDoc(collection(db, 'preorders'), orderData);
      
      // Clear cart
      localStorage.removeItem('reeves-cart');
      setCart([]);
      
      setStep(4);
      toast.success('🎉 Pre-order placed successfully!');
      
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 1 || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-serif text-slate-800 mb-6">Pre-Order Your Feast</h1>
              {cart.length === 0 ? (
                <div>
                  <p className="text-gray-600 mb-8">Your cart is empty. Browse our menu to start your order.</p>
                  <Button
                    onClick={() => window.location.href = '/menu'}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                  >
                    Browse Menu
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-8">Review your order and proceed to checkout.</p>
                  <Button
                    onClick={handleStepTwo}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
        <Footer />
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-8">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h1 className="text-3xl font-serif text-slate-800 mb-4">Order Confirmed!</h1>
                  <p className="text-gray-600 mb-6">
                    Your pre-order <strong>#{orderId}</strong> has been placed successfully.
                  </p>
                  <div className="bg-white p-4 rounded-lg mb-6">
                    <p className="text-sm text-gray-600 mb-2">Pickup Time:</p>
                    <p className="font-semibold text-amber-600">{orderDetails.pickupTime}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => window.location.href = '/profile'}
                      variant="outline"
                    >
                      View Order Status
                    </Button>
                    <Button
                      onClick={() => window.location.href = '/menu'}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                    >
                      Order More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <div className={`w-16 h-0.5 ${step >= 3 ? 'bg-amber-600' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <div className={`w-16 h-0.5 ${step >= 4 ? 'bg-amber-600' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                  3
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center pb-4 border-b">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-bold text-amber-600">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-4 text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-amber-600">₹{getTotalPrice()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2: Order Details */}
              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Order Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={orderDetails.name}
                            onChange={(e) => setOrderDetails(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={orderDetails.phone}
                            onChange={(e) => setOrderDetails(prev => ({ ...prev, phone: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="pickupTime">Preferred Pickup Time *</Label>
                        <Input
                          id="pickupTime"
                          type="datetime-local"
                          value={orderDetails.pickupTime}
                          onChange={(e) => setOrderDetails(prev => ({ ...prev, pickupTime: e.target.value }))}
                          min={new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16)} // 1 hour from now
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="requests">Special Requests</Label>
                        <Textarea
                          id="requests"
                          value={orderDetails.specialRequests}
                          onChange={(e) => setOrderDetails(prev => ({ ...prev, specialRequests: e.target.value }))}
                          placeholder="Any special instructions..."
                        />
                      </div>
                      
                      <Button
                        onClick={handleStepThree}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                      >
                        Proceed to Payment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center">
                        <p className="text-lg mb-2">Total Amount: <span className="font-bold text-amber-600">₹{getTotalPrice()}</span></p>
                        <p className="text-sm text-gray-600">Order ID: {orderId}</p>
                      </div>

                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg">
                        <h3 className="font-semibold mb-4 text-center">Pay with UPI</h3>
                        <div className="flex flex-col items-center space-y-4">
                          <Button
                            onClick={() => window.open(generateUPILink(), '_blank')}
                            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 px-8 py-3"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Pay ₹{getTotalPrice()} with UPI
                          </Button>
                          
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-4">After payment, upload screenshot for confirmation:</p>
                            <Button 
                              variant="outline" 
                              onClick={() => handlePaymentSubmit()}
                              disabled={isLoading}
                              className="w-full"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              {isLoading ? 'Processing...' : 'Confirm Payment'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PreOrder;
