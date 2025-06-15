
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star, MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const FeedbackSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'feedback'), {
        ...formData,
        rating,
        createdAt: new Date()
      });
      
      toast.success('Thank you for your feedback!');
      setFormData({ name: '', email: '', message: '' });
      setRating(5);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Feedback Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mb-4">
              Your Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              We value your feedback and strive to make every dining experience memorable.
              Share your thoughts with us.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 text-lg"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Share Your Feedback
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-center text-2xl font-serif">Share Your Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Rating */}
                  <div className="text-center">
                    <Label className="text-base font-medium mb-4 block">Rate your experience</Label>
                    <div className="flex justify-center gap-2 mb-4">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setRating(index + 1)}
                          className="transition-all duration-200 hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              index < rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{rating} out of 5 stars</p>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Feedback</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell us about your experience..."
                        rows={4}
                        required
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                    >
                      {isSubmitting ? (
                        <>Submitting...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default FeedbackSection;
