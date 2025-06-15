
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './AuthModal';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';

export const BookingForm = () => {
  const { currentUser } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guestCount: 2
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const bookingData = {
        ...formData,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        status: 'pending',
        createdAt: new Date(),
        bookingId: `RV${Date.now()}`
      };

      await addDoc(collection(db, 'bookings'), bookingData);
      toast.success('Booking request submitted successfully!');
      setShowPayment(true);
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateUPILink = () => {
    const amount = 100; // Booking fee
    const note = `Table for ${formData.guestCount} on ${formData.date} at ${formData.time}`;
    return `upi://pay?pa=9849834102@ybl&pn=Reeves Restaurant&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
  };

  if (showPayment) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif text-amber-600">Booking Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Complete your booking with a small advance payment</p>
            <div className="bg-amber-50 p-4 rounded-lg mb-4">
              <p className="font-semibold">Booking Details:</p>
              <p>{formData.name} - {formData.guestCount} guests</p>
              <p>{formData.date} at {formData.time}</p>
              <p className="text-amber-600 font-bold">Advance: ₹100</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.open(generateUPILink())}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Pay with UPI
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowPayment(false)}
            >
              Pay Later
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-center">Reserve Your Table</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <select
                id="guests"
                value={formData.guestCount}
                onChange={(e) => setFormData(prev => ({ ...prev, guestCount: parseInt(e.target.value) }))}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Reserve Table'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};
