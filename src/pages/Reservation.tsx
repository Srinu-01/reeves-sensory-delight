
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, Users, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/AuthModal';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Reservation = () => {
  const { currentUser } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 1
  });
  const [showPayment, setShowPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const bookingData = {
        ...formData,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        status: 'pending',
        createdAt: new Date(),
        totalAmount: formData.guests * 100 // ₹100 per person booking fee
      };

      await addDoc(collection(db, 'bookings'), bookingData);
      setShowPayment(true);
      toast.success('Booking request submitted! Please complete payment to confirm.');
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateUPILink = () => {
    const amount = formData.guests * 100;
    const upiId = '9849834102@ybl';
    const name = 'Reeves Restaurant';
    const note = `Booking: ${formData.name}, ${formData.guests} guests, ${formData.date} ${formData.time}`;
    
    return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
  };

  if (showPayment) {
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
              <Card className="border-amber-200/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-slate-800 flex items-center justify-center gap-2">
                    <CreditCard className="w-6 h-6 text-amber-600" />
                    Complete Your Reservation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <p className="text-lg mb-2">Booking Amount: <span className="font-bold text-amber-600">₹{formData.guests * 100}</span></p>
                    <p className="text-sm text-gray-600">Advance booking fee: ₹100 per person</p>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4 text-center">Pay with UPI</h3>
                    <div className="flex flex-col items-center space-y-4">
                      <Button
                        onClick={() => window.open(generateUPILink(), '_blank')}
                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-3"
                      >
                        Pay Now with UPI
                      </Button>
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Or scan QR code:</p>
                        <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                          <p className="text-gray-500">QR Code will appear here</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-4">After payment, please upload screenshot for confirmation:</p>
                    <Button variant="outline" className="w-full">
                      Upload Payment Screenshot
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
      
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-r from-slate-900 via-slate-800 to-amber-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div
          className="relative z-10 text-center text-white px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Reserve Your Table</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Secure your perfect dining experience
          </p>
        </motion.div>
      </section>

      {/* Reservation Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="border-amber-200/50">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-slate-800 text-center">
                  Book Your Table
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="border-amber-200 focus:border-amber-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                        className="border-amber-200 focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="border-amber-200 focus:border-amber-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time" className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Time
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                        required
                        className="border-amber-200 focus:border-amber-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="guests" className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Guests
                      </Label>
                      <Input
                        id="guests"
                        type="number"
                        min="1"
                        max="12"
                        value={formData.guests}
                        onChange={(e) => setFormData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                        required
                        className="border-amber-200 focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Booking Policy:</strong> ₹100 advance payment required per person. 
                      This amount will be adjusted against your final bill.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 text-lg"
                  >
                    {isLoading ? 'Processing...' : `Reserve Table - ₹${formData.guests * 100}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Reservation;
