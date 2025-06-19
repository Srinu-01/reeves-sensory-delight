
import React, { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import MenuShowcase from '@/components/MenuShowcase';
import SignatureDishes from '@/components/SignatureDishes';
import LiveStatus from '@/components/LiveStatus';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import BookingSection from '@/components/BookingSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Philosophy />
      <MenuShowcase />
      <SignatureDishes />
      <LiveStatus />
      <Gallery />
      <Testimonials />
      <BookingSection />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
