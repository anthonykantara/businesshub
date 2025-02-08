import React, { useState, useEffect } from 'react';
import { Star, Send, Bell, ChevronDown, ChevronRight, ShoppingCart, Truck, Shield, Plus, Minus, Check, X, UserCircle, Search, Globe } from 'lucide-react';

interface ProductImage {
  url: string;
  alt: string;
}

interface ProductVariant {
  id: string;
  name: string;
  color?: string;
  size?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  images?: string[];
  verified: boolean;
}

interface RelatedProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  ratingCount: number;
}

interface PeopleAlsoBought {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
}

const PEOPLE_ALSO_BOUGHT: PeopleAlsoBought[] = [
  {
    id: '5',
    title: '961 Vintage Cap',
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=300&h=400&q=80',
    price: 29.99,
    originalPrice: 34.99,
    rating: 4.9,
    ratingCount: 234
  },
  {
    id: '6',
    title: '961 Winter Beanie',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=300&h=400&q=80',
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.8,
    ratingCount: 178
  },
  {
    id: '7',
    title: '961 Travel Backpack',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&h=400&q=80',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.7,
    ratingCount: 145
  }
];

const PRODUCT_IMAGES: ProductImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&h=1000&q=80',
    alt: '961 Classic Snapback - Front View'
  },
  {
    url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&h=1000&q=80',
    alt: '961 Classic Snapback - Side View'
  },
  {
    url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&h=1000&q=80',
    alt: '961 Classic Snapback - Back View'
  },
  {
    url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&h=1000&q=80',
    alt: '961 Classic Snapback - Detail View'
  }
];

const PRODUCT_VARIANTS: ProductVariant[] = [
  { id: '1', name: 'Black', color: '#000000', size: 'S', price: 29.99, compareAtPrice: 39.99, stock: 10 },
  { id: '2', name: 'Black', color: '#000000', size: 'M', price: 29.99, compareAtPrice: 39.99, stock: 5 },
  { id: '3', name: 'Black', color: '#000000', size: 'L', price: 29.99, compareAtPrice: 39.99, stock: 0 },
  { id: '4', name: 'Navy', color: '#000080', size: 'S', price: 29.99, compareAtPrice: 39.99, stock: 8 },
  { id: '5', name: 'Navy', color: '#000080', size: 'M', price: 29.99, compareAtPrice: 39.99, stock: 12 },
  { id: '6', name: 'Navy', color: '#000080', size: 'L', price: 29.99, compareAtPrice: 39.99, stock: 3 }
];

const PRODUCT_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Sarah',
    rating: 5,
    date: '2024-03-15',
    title: 'Perfect fit and great quality!',
    content: 'I absolutely love this snapback! The quality is outstanding and it fits perfectly. The design is exactly as pictured and the materials feel very durable.',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=200&h=200&q=80'
    ],
    verified: true
  },
  {
    id: '2',
    author: 'Mike',
    rating: 4,
    date: '2024-03-14',
    title: 'Good quality but runs slightly large',
    content: 'The quality is great and I love the design, but it runs slightly larger than expected. Still a great purchase overall!',
    verified: true
  }
];

const RELATED_PRODUCTS: RelatedProduct[] = [
  {
    id: '1',
    title: '961 Heritage Tee',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&h=400&q=80',
    price: 24.99,
    rating: 4.8,
    ratingCount: 156
  },
  {
    id: '2',
    title: '961 Premium Hoodie',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&h=400&q=80',
    price: 49.99,
    rating: 4.9,
    ratingCount: 89
  },
  {
    id: '3',
    title: '961 Varsity Jacket',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=300&h=400&q=80',
    price: 89.99,
    rating: 4.7,
    ratingCount: 234
  },
  {
    id: '4',
    title: '961 Vintage Cap',
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=300&h=400&q=80',
    price: 29.99,
    rating: 4.6,
    ratingCount: 178
  }
];

export default function ProductDetailPage() {
  const [cartCount, setCartCount] = useState(0);
  const [language, setLanguage] = useState<'en' | 'fr' | 'ar'>('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(PRODUCT_VARIANTS[0].name);
  const [selectedSize, setSelectedSize] = useState<string>(PRODUCT_VARIANTS[0].size);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [notificationActive, setNotificationActive] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [selectedReviewImage, setSelectedReviewImage] = useState<string | null>(null);

  const selectedVariant = PRODUCT_VARIANTS.find(
    v => v.name === selectedColor && v.size === selectedSize
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && (!selectedVariant || newQuantity <= selectedVariant.stock)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // In a real app, this would add the product to the cart
    console.log('Adding to cart:', {
      variant: selectedVariant,
      quantity
    });
  };

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const text = "Check out this awesome product!";

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          // Show success message
        } catch (err) {
          // Show error message
        }
        break;
    }
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Upper Header */}
      <div className="bg-black border-b border-white/10">
        <div className="px-12 h-10 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a href="https://news.961.co" className="text-sm text-white/60 hover:text-white transition-colors">News</a>
            <a href="https://deals.961.co" className="text-sm text-white/60 hover:text-white transition-colors">Deals</a>
            <a href="https://merch.961.co" className="text-sm text-white/60 hover:text-white transition-colors">Merch</a>
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://creator.961.co" className="text-sm text-white/60 hover:text-white transition-colors">For Creators</a>
            <a href="https://publisher.961.co" className="text-sm text-white/60 hover:text-white transition-colors">For Publishers</a>
            <a href="https://business.961.co" className="text-sm text-white/60 hover:text-white transition-colors">For Business</a>
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Globe size={14} />
                <span>
                  {language === 'en' ? 'English' :
                   language === 'fr' ? 'Français' :
                   'العربية'}
                </span>
              </button>
              
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-black border border-white/10 rounded-lg shadow-xl z-50">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors ${
                        language === 'en' ? 'text-white' : 'text-white/60'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('fr');
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors ${
                        language === 'fr' ? 'text-white' : 'text-white/60'
                      }`}
                    >
                      Français
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('ar');
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors ${
                        language === 'ar' ? 'text-white' : 'text-white/60'
                      }`}
                    >
                      العربية
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center h-20 px-4">
            <div className="flex items-center mr-8">
              <img src="/961-logo.png" alt="961" className="h-8" />
            </div>
            <div className="flex-1 max-w-xl px-4">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-1.5 text-sm bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-white/10 rounded-full">
                <UserCircle size={24} />
              </button>
              <div className="relative">
                <button className="p-2 hover:bg-white/10 rounded-full">
                  <ShoppingCart size={24} />
                </button>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-[#FF0000] text-white text-xs font-medium rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Free Shipping Progress */}
      <div className="bg-gradient-to-r from-[#FF0000]/5 to-[#FF0000]/2 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-4">
          {cartCount > 0 ? (
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center space-x-3">
                <span className="text-gray-900 font-medium">
                  You're only <span className="font-bold text-[#FF0000]">$3.50</span> away from free delivery
                </span>
                <span className="text-lg">🛵</span>
              </div>
              <div className="max-w-lg mx-auto">
                <div className="flex justify-end mb-1">
                  <span className="text-sm text-gray-500">$46.50 / $50.00</span>
                </div>
                <div className="h-1.5 bg-white/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full w-[93%] bg-gradient-to-r from-[#FF0000] to-[#FF4444] rounded-full"
                    style={{
                      transition: 'width 1s ease-in-out'
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3">
                <span className="text-gray-900 font-medium">
                  Free delivery on all orders over <span className="font-bold text-[#FF0000]">$20</span>
                </span>
                <span className="text-lg">🛵</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 pt-12 grid grid-cols-2 gap-12">
        {/* Left Column - Images */}
        <div className="space-y-4">
          <div 
            className="aspect-[4/5] rounded-2xl overflow-hidden relative cursor-zoom-in"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={PRODUCT_IMAGES[selectedImage].url}
              alt={PRODUCT_IMAGES[selectedImage].alt}
              className={`w-full h-full object-cover transition-transform duration-200 ${
                isZoomed ? 'scale-150' : ''
              }`}
              style={isZoomed ? {
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
              } : undefined}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {PRODUCT_IMAGES.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-[#FF0000]' : ''
                }`}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">961 Classic Snapback</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="flex items-center text-[#FF0000]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < 4 ? 'currentColor' : 'none'}
                      className={i < 4 ? 'text-[#FF0000]' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">(128 reviews)</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Send size={20} className="text-gray-600" />
                  </button>
                  {showShareMenu && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 p-4">
                      <div className="text-center mb-4">
                        <h3 className="text-base font-medium text-gray-900">Share this product</h3>
                        <p className="text-sm text-gray-500 mt-1">Choose how you want to share</p>
                      </div>
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        <div
                          onClick={() => handleShare('twitter')}
                          className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center mb-1 group-hover:bg-[#1DA1F2]/20">
                            <svg className="w-5 h-5 text-[#1DA1F2]" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                          </div>
                          <span className="text-xs text-gray-600">Twitter</span>
                        </div>
                        <div
                          onClick={() => handleShare('facebook')}
                          className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#1877F2]/10 flex items-center justify-center mb-1 group-hover:bg-[#1877F2]/20">
                            <svg className="w-5 h-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </div>
                          <span className="text-xs text-gray-600">Facebook</span>
                        </div>
                        <div
                          onClick={() => handleShare('whatsapp')}
                          className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-1 group-hover:bg-[#25D366]/20">
                            <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                          </div>
                          <span className="text-xs text-gray-600">WhatsApp</span>
                        </div>
                        <div
                          onClick={() => handleShare('copy')}
                          className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1 group-hover:bg-gray-200">
                            <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                            </svg>
                          </div>
                          <span className="text-xs text-gray-600">Copy Link</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={() => setShowShareMenu(false)}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-gray-900">
                ${selectedVariant?.price.toFixed(2)}
              </span>
              {selectedVariant?.compareAtPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${selectedVariant.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-medium text-[#FF0000]">961 Deals:</span>
              <div className="relative group">
                <span className="text-base font-bold text-[#FF0000]">
                  ${(selectedVariant?.price * 0.9).toFixed(2)}
                </span>
                <div className="absolute bottom-full left-0 mb-2 w-60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-white text-gray-700 text-xs p-2 rounded-lg shadow-lg border border-gray-200">
                    Save ${(selectedVariant?.price * 0.1).toFixed(2)} by becoming a 961 Deals member - available at checkout
                  </div>
                  <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Color</span>
              <span className="text-sm text-gray-500">{selectedColor}</span>
            </div>
            <div className="flex space-x-2">
              {Array.from(new Set(PRODUCT_VARIANTS.map(v => v.name))).map(color => {
                const variant = PRODUCT_VARIANTS.find(v => v.name === color);
                return (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedColor === color
                        ? 'ring-2 ring-[#FF0000] ring-offset-2'
                        : 'ring-1 ring-gray-200'
                    }`}
                    style={{ backgroundColor: variant?.color }}
                  >
                    {selectedColor === color && (
                      <Check size={16} className="text-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Size</span>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="text-sm text-[#FF0000] hover:text-[#FF0000]/80"
              >
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Array.from(new Set(PRODUCT_VARIANTS.filter(v => v.name === selectedColor).map(v => v.size))).map(size => {
                const variant = PRODUCT_VARIANTS.find(v => v.name === selectedColor && v.size === size);
                const isOutOfStock = variant?.stock === 0;
                return (
                  <button
                    key={size}
                    onClick={() => !isOutOfStock && setSelectedSize(size!)}
                    disabled={isOutOfStock}
                    className={`py-3 text-sm font-medium rounded-lg ${
                      isOutOfStock
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : selectedSize === size
                        ? 'bg-[#FF0000] text-white'
                        : 'bg-white border border-gray-200 text-gray-900 hover:border-[#FF0000]'
                    }`}
                  >
                    {size}
                    {isOutOfStock && ' - Sold Out'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-4">
            <span className="text-sm font-medium text-gray-900">Quantity</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-50 disabled:opacity-50"
                >
                  <Minus size={20} className="text-gray-600" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={selectedVariant?.stock === quantity}
                  className="p-2 hover:bg-gray-50 disabled:opacity-50"
                >
                  <Plus size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-4">
            {selectedVariant?.stock === 0 ? (
              <div className="flex space-x-2">
                <button
                  className="flex-1 py-3 bg-gray-100 text-gray-400 font-medium rounded-lg cursor-not-allowed"
                  disabled
                >
                  Sold Out
                </button>
                <button
                  onClick={() => setNotificationActive(!notificationActive)}
                  className={`px-4 py-3 font-medium rounded-lg transition-colors ${
                    notificationActive
                      ? 'bg-[#FF0000] text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Bell size={20} className="fill-current" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-[#FF0000] text-white font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
            )}
          </div>

          {/* People Also Bought - Vertical */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-900">People Also Bought</h3>
            <div className="space-y-3">
              {PEOPLE_ALSO_BOUGHT.map((product) => (
                <div key={product.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{product.title}</h4>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-sm font-bold text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                      <span className="text-sm font-medium text-[#FF0000]">961 Deals: ${(product.price * 0.9).toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="px-3 py-1.5 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tagged Videos */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">As Seen In</h3>
              <button className="text-sm text-[#FF0000] hover:text-[#FF0000]/80">View More</button>
            </div>
            <div className="flex -mx-2 overflow-x-auto pb-4 scrollbar-hide">
              {[
                {
                  id: '1',
                  thumbnail: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=480&h=853&q=80',
                  views: '12.5K',
                  duration: '0:32',
                  creator: {
                    name: 'Sarah Styles',
                    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80'
                  }
                },
                {
                  id: '2',
                  thumbnail: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=480&h=853&q=80',
                  views: '8.2K',
                  duration: '0:45',
                  creator: {
                    name: 'Mike Fashion',
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=64&h=64&q=80'
                  }
                },
                {
                  id: '3',
                  thumbnail: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=480&h=853&q=80',
                  views: '15.7K',
                  duration: '0:28',
                  creator: {
                    name: 'Style Guide',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80'
                  }
                }
              ].map((video) => (
                <div key={video.id} className="px-2 w-40 flex-shrink-0">
                  <div className="relative aspect-[9/16] rounded-xl overflow-hidden group">
                    <img
                      src={video.thumbnail}
                      alt={`Video by ${video.creator.name}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-white">
                          <img
                            src={video.creator.avatar}
                            alt={video.creator.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-white line-clamp-1">
                            {video.creator.name}
                          </p>
                          <p className="text-xs text-white/80">
                            {video.views} views
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/50 rounded text-xs text-white">
                      {video.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {PEOPLE_ALSO_BOUGHT.map((product) => (
                <div key={product.id} className="flex items-center space-x-4"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="max-w-7xl mx-auto px-4 mt-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 leading-relaxed mb-6">
            The 961 Classic Snapback is the perfect blend of style and comfort. Featuring our iconic logo embroidered on the front, this hat is made from premium materials that ensure durability and a comfortable fit. The adjustable snapback closure allows for a custom fit, while the flat brim adds a modern touch to this timeless design. Made with a premium cotton-polyester blend, embroidered 961 logo, adjustable snapback closure, flat brim design, breathable eyelets, and one size fits most.
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 mt-24 pt-16 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Reviews</h2>
        <div className="space-y-8">
          {/* Review Summary */}
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center space-x-4">
              <div className="text-5xl font-bold text-gray-900">4.8</div>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < 4 ? 'currentColor' : 'none'}
                    className={i < 4 ? 'text-[#FF0000]' : 'text-gray-300'}
                  />
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-500">Based on 128 reviews</div>
          </div>

          {/* Reviews List */}
          <div className="space-y-8">
                    {PRODUCT_REVIEWS.map((review) => (
                      <div key={review.id} className="space-y-4 border-b border-gray-200 pb-8">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-[#FF0000]/5 flex items-center justify-center flex-shrink-0">
                              <span className="text-[#FF0000] font-medium text-lg">
                                {review.author.charAt(0)}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <div className="font-medium text-gray-900">{review.author}</div>
                              <div className="flex items-center space-x-4">
                              <div className="flex items-center text-[#FF0000]">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    fill={i < review.rating ? 'currentColor' : 'none'}
                                    className={i < review.rating ? 'text-[#FF0000]' : 'text-gray-300'}
                                  />
                                ))}
                              </div>
                              {review.verified && (
                                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded">
                                  Verified Purchase
                                </span>
                              )}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </div>
                        </div>
                        <h4 className="text-base font-medium text-gray-900">{review.title}</h4>
                        <p className="text-gray-600">{review.content}</p>
                        {review.images && review.images.length > 0 && (
                          <div className="flex space-x-2">
                            {review.images.map((image, index) => (
                              <button
                                key={index}
                                onClick={() => setSelectedReviewImage(image)}
                                className="w-20 h-20 rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                              >
                                <img
                                  src={image}
                                  alt={`Review image ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        )}
                 ```
                      </div>
                    ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 mt-24 pt-16 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
        <div className="grid grid-cols-4 gap-6">
          {RELATED_PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl p-2 relative group">
              <div className="aspect-[4/5] rounded-xl overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2 p-2">
                <div className="flex items-center space-x-1">
                  <div className="flex items-center text-[#FF0000]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                        className={i < Math.floor(product.rating) ? 'text-[#FF0000]' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.ratingCount})</span>
                </div>
                <h3 className="text-base font-medium text-gray-900">{product.title}</h3>
                <div className="space-y-1">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-[#FF0000]">961 Deals:</span>
                    <span className="text-sm font-bold text-[#FF0000]">${(product.price * 0.9).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Feed */}
      <div className="max-w-7xl mx-auto px-4 mt-24 mb-24 pt-16 border-t border-gray-200">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">As seen in</h2>
          <button className="text-sm text-[#FF0000] hover:text-[#FF0000]/80">View More</button>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {[
            {
              id: '1',
              thumbnail: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=480&h=853&q=80',
              views: '12.5K',
              duration: '0:32',
              likes: '2.3K',
              creator: {
                name: 'Sarah Styles',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80',
                username: '@sarahstyles'
              }
            },
            {
              id: '2',
              thumbnail: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=480&h=853&q=80',
              views: '8.2K',
              duration: '0:45',
              likes: '1.8K',
              creator: {
                name: 'Mike Fashion',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=64&h=64&q=80',
                username: '@mikefashion'
              }
            },
            {
              id: '3',
              thumbnail: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=480&h=853&q=80',
              views: '15.7K',
              duration: '0:28',
              likes: '3.1K',
              creator: {
                name: 'Style Guide',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80',
                username: '@styleguide'
              }
            },
            {
              id: '4',
              thumbnail: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=480&h=853&q=80',
              views: '9.9K',
              duration: '0:38',
              likes: '2.7K',
              creator: {
                name: 'Fashion Tips',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=64&h=64&q=80',
                username: '@fashiontips'
              }
            }
          ].map((video) => (
            <div key={video.id} className="group cursor-pointer">
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden mb-3">
                <img
                  src={video.thumbnail}
                  alt={`Video by ${video.creator.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 rounded text-xs text-white">
                  {video.duration}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white">
                        <img
                          src={video.creator.avatar}
                          alt={video.creator.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white line-clamp-1">
                          {video.creator.username}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-white text-xs">
                      <span>{video.views} views</span>
                      <span>•</span>
                      <span>{video.likes} likes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-6 mt-8">
          {[
            {
              id: '5',
              thumbnail: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=480&h=853&q=80',
              views: '7.8K',
              duration: '0:41',
              likes: '1.5K',
              creator: {
                name: 'Urban Style',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=64&h=64&q=80',
                username: '@urbanstyle'
              }
            },
            {
              id: '6',
              thumbnail: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=480&h=853&q=80',
              views: '6.4K',
              duration: '0:35',
              likes: '1.2K',
              creator: {
                name: 'Street Fashion',
                avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=64&h=64&q=80',
                username: '@streetfashion'
              }
            },
            {
              id: '7',
              thumbnail: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=480&h=853&q=80',
              views: '5.9K',
              duration: '0:29',
              likes: '980',
              creator: {
                name: 'Fashion Week',
                avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=64&h=64&q=80',
                username: '@fashionweek'
              }
            },
            {
              id: '8',
              thumbnail: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=480&h=853&q=80',
              views: '4.7K',
              duration: '0:33',
              likes: '850',
              creator: {
                name: 'Style Daily',
                avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=64&h=64&q=80',
                username: '@styledaily'
              }
            }
          ].map((video) => (
            <div key={video.id} className="group cursor-pointer">
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden mb-3">
                <img
                  src={video.thumbnail}
                  alt={`Video by ${video.creator.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 rounded text-xs text-white">
                  {video.duration}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white">
                        <img
                          src={video.creator.avatar}
                          alt={video.creator.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white line-clamp-1">
                          {video.creator.username}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-white text-xs">
                      <span>{video.views} views</span>
                      <span>•</span>
                      <span>{video.likes} likes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-8 py-3 bg-gray-100 text-gray-600 font-medium rounded-xl hover:bg-gray-200 transition-colors">
          Load More
        </button>
      </div>

      {/* Review Image Preview Modal */}
      {selectedReviewImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button
            onClick={() => setSelectedReviewImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>
          <img
            src={selectedReviewImage}
            alt="Review image preview"
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Size Guide</h3>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Size</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Circumference (inches)</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Recommended Head Size</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900">S</td>
                        <td className="px-4 py-2 text-sm text-gray-600">21.5 - 22</td>
                        <td className="px-4 py-2 text-sm text-gray-600">Small</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900">M</td>
                        <td className="px-4 py-2 text-sm text-gray-600">22 - 23</td>
                        <td className="px-4 py-2 text-sm text-gray-600">Medium</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900">L</td>
                        <td className="px-4 py-2 text-sm text-gray-600">23 - 24</td>
                        <td className="px-4 py-2 text-sm text-gray-600">Large</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">How to Measure</h4>
                  <p className="text-sm text-gray-600">
                    To find your perfect fit, measure the circumference of your head about 1/2 inch above your eyebrows and ears. Use this measurement to reference the size chart above.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowSizeGuide(false)}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Add to Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-900">${selectedVariant?.price.toFixed(2)}</div>
            {selectedVariant?.compareAtPrice && (
              <div className="text-sm text-gray-500 line-through">
                ${selectedVariant.compareAtPrice.toFixed(2)}
              </div>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant || selectedVariant.stock === 0}
            className="px-6 py-3 bg-[#FF0000] text-white font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <ShoppingCart size={20} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}