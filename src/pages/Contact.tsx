
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        timestamp: new Date(),
        status: 'unread'
      });

      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours.",
        duration: 5000,
      });

      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      detail: "+91 98498 34102",
      action: "tel:+919849834102"
    },
    {
      icon: Mail,
      title: "Email Us",
      detail: "hello@reeveskakinada.com",
      action: "mailto:hello@reeveskakinada.com"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      detail: "Chat with us",
      action: "https://wa.me/919849834102"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      detail: "MG Road, Kakinada, Andhra Pradesh 533001",
      action: "https://maps.google.com"
    },
    {
      icon: Clock,
      title: "Hours",
      detail: "Mon-Sun: 11:00 AM - 11:00 PM",
      action: null
    }
  ];

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
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Contact Us</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            We'd love to hear from you
          </p>
        </motion.div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-3xl font-serif text-slate-800 mb-6">Get In Touch</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Whether you're planning a special celebration, have dietary requirements, 
                  or simply want to share your experience with us, we're here to listen.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="p-3 rounded-full bg-amber-100 text-amber-600 group-hover:bg-amber-200 transition-colors duration-300">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">{item.title}</h4>
                      {item.action ? (
                        <a
                          href={item.action}
                          className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
                          target={item.action.startsWith('http') ? '_blank' : undefined}
                          rel={item.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {item.detail}
                        </a>
                      ) : (
                        <p className="text-gray-600">{item.detail}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map Placeholder */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-amber-200/50">
                  <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                      <p className="text-slate-700 font-medium">Interactive Map</p>
                      <p className="text-gray-600 text-sm">MG Road, Kakinada</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-amber-200/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-slate-800">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-700 font-medium">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="border-amber-200 focus:border-amber-500 focus:ring-amber-500/20"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-700 font-medium">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="border-amber-200 focus:border-amber-500 focus:ring-amber-500/20"
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="border-amber-200 focus:border-amber-500 focus:ring-amber-500/20"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-slate-700 font-medium">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="border-amber-200 focus:border-amber-500 focus:ring-amber-500/20 min-h-32"
                        placeholder="Tell us how we can help you..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 text-lg font-medium"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                      ) : (
                        <Send className="w-5 h-5 mr-2" />
                      )}
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
