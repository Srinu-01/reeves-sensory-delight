
import Hero from "@/components/Hero";
import MenuShowcase from "@/components/MenuShowcase";
import SignatureDishes from "@/components/SignatureDishes";
import Philosophy from "@/components/Philosophy";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import BookingSection from "@/components/BookingSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import FeedbackSection from "@/components/FeedbackSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <MenuShowcase />
      <SignatureDishes />
      <Philosophy />
      <Gallery />
      <Testimonials />
      <BookingSection />
      <FeedbackSection />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
