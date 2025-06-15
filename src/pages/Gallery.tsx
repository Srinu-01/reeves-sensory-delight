
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop',
      category: 'restaurant',
      title: 'Elegant Dining Space'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2081&auto=format&fit=crop',
      category: 'food',
      title: 'Signature Pizza'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=2087&auto=format&fit=crop',
      category: 'food',
      title: 'Fresh Salad'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
      category: 'restaurant',
      title: 'Cozy Interior'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop',
      category: 'food',
      title: 'Gourmet Burger'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=2071&auto=format&fit=crop',
      category: 'restaurant',
      title: 'Bar Area'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=2065&auto=format&fit=crop',
      category: 'food',
      title: 'Pasta Special'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop',
      category: 'restaurant',
      title: 'Private Dining'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=2128&auto=format&fit=crop',
      category: 'food',
      title: 'Dessert Platter'
    }
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'restaurant', name: 'Restaurant' },
    { id: 'food', name: 'Food' }
  ];

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-r from-slate-900 via-slate-800 to-amber-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          className="relative z-10 text-center text-white px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Gallery</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            A visual journey through our culinary artistry
          </p>
        </motion.div>
      </section>

      {/* Gallery Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filter Buttons */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex gap-4 bg-gray-100 p-2 rounded-lg">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  variant={filter === category.id ? "default" : "ghost"}
                  className={`transition-all duration-300 ${
                    filter === category.id 
                      ? 'bg-amber-600 text-white' 
                      : 'text-gray-600 hover:text-amber-600'
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(image.src)}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-0 relative">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Eye className="w-8 h-8 mx-auto mb-2" />
                        <p className="font-medium">{image.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
          >
            <img
              src={selectedImage}
              alt="Gallery Image"
              className="w-full h-full object-contain rounded-lg"
            />
            <Button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2"
              size="sm"
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
