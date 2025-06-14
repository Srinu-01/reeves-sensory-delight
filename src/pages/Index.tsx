
import React, { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import SignatureDishes from '@/components/SignatureDishes';
import LiveStatus from '@/components/LiveStatus';
import BookingSection from '@/components/BookingSection';

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
      <Hero />
      <Philosophy />
      <SignatureDishes />
      <LiveStatus />
      <BookingSection />
    </div>
  );
};

export default Index;
