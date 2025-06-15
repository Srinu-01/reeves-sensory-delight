
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat, Heart, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
  const philosophyPoints = [
    {
      icon: ChefHat,
      title: "TASTE",
      description: "Every dish is a symphony of flavors, crafted with passion and precision using the finest ingredients sourced from local farms and international markets."
    },
    {
      icon: Heart,
      title: "AMBIENCE",
      description: "Step into a world where luxury meets comfort, where every detail is meticulously designed to enchant your senses and create lasting memories."
    },
    {
      icon: Star,
      title: "EMOTION",
      description: "We don't just serve food; we create experiences that touch your heart and linger in your memory long after the last bite."
    }
  ];

  const stats = [
    { number: "15+", label: "Years of Excellence" },
    { number: "1000+", label: "Happy Guests Monthly" },
    { number: "50+", label: "Signature Dishes" },
    { number: "5★", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-r from-slate-900 via-slate-800 to-amber-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div
          className="relative z-10 text-center text-white px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-7xl font-serif mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            A journey of culinary excellence, where tradition meets innovation
          </p>
        </motion.div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mb-8">
                The Reeves Legacy
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Founded in the heart of Kakinada, Reeves began as a dream to create more than just a restaurant. 
                  We envisioned a sanctuary where culinary artistry meets heartfelt hospitality, where every meal 
                  becomes a celebration of life's precious moments.
                </p>
                <p>
                  Our journey started with a simple belief: that food has the power to bring people together, 
                  to create memories, and to touch souls. Over the years, we've cultivated relationships with 
                  local farmers, mastered traditional techniques, and embraced innovative cooking methods to 
                  deliver an unparalleled dining experience.
                </p>
                <p>
                  Today, Reeves stands as a testament to our commitment to excellence, where every dish tells a 
                  story and every visit creates a lasting impression. We invite you to be part of our continuing 
                  story of culinary passion and hospitality.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Users className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                  <p className="text-slate-700 font-medium text-lg">Restaurant Image</p>
                  <p className="text-gray-600">Coming Soon</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mb-6">Our Philosophy</h2>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Built on three fundamental pillars that define every aspect of your dining experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {philosophyPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full border-amber-200/50 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <point.icon className="w-12 h-12 text-amber-600 mx-auto" />
                    </div>
                    <h3 className="text-2xl font-serif text-slate-800 mb-4">{point.title}</h3>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600 leading-relaxed">{point.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mb-8">
              Experience Reeves Today
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join us for an unforgettable culinary journey. Reserve your table or explore our menu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-3">
                <Link to="/reservation">Reserve Table</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
                <Link to="/menu">Explore Menu</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
