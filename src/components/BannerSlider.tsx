import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: "Boost Your Sales",
    description: "New partnership opportunities await you",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&h=320&q=80"
  },
  {
    id: 2,
    title: "Grow Your Business",
    description: "Unlock powerful tools and insights",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=320&q=80"
  },
  {
    id: 3,
    title: "Connect & Expand",
    description: "Build meaningful business relationships",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&h=320&q=80"
  }
];

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 8000);
    
    return () => clearInterval(timer);
  }, []);
  
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  
  return (
    <div className="relative w-full max-w-[1200px] h-[320px] mx-auto overflow-hidden rounded-2xl shadow-2xl">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-all duration-600 transform ${
            index === currentSlide 
              ? 'opacity-100 translate-x-0' 
              : index < currentSlide 
                ? 'opacity-0 -translate-x-full' 
                : 'opacity-0 translate-x-full'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${banner.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-5xl font-bold mb-4 transform transition-all duration-500 translate-y-0 opacity-100">
              {banner.title}
            </h2>
            <p className="text-lg mb-6 transform transition-all duration-500 delay-100">
              {banner.description}
            </p>
            <button className="bg-gradient-to-r from-[#FF0000] to-[#FF4444] px-8 py-3 rounded-lg text-sm font-medium hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              Explore Now 
              <span className="inline-block transform transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      ))}
      
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-all duration-200 hover:scale-110"
      >
        <ChevronRight size={24} />
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 transform ${
              index === currentSlide 
                ? 'bg-white scale-150' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}