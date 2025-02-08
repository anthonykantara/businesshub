import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Clock, ChevronLeft, ChevronRight, Star, Globe, UserCircle, Bell } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  isNew?: boolean;
  isPreorder?: boolean;
  isSoldOut?: boolean;
}

interface Category {
  id: string;
  name: string;
  image: string;
}

const BANNERS = [
  {
    id: '1',
    title: 'Independence Day Drop',
    link: '/store/collections/independence-day',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&h=400&q=80',
  },
  {
    id: '2',
    title: 'Summer Collection',
    link: '/store/collections/summer',
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=800&h=400&q=80',
  },
  {
    id: '3',
    title: 'New Arrivals',
    link: '/store/collections/new-arrivals',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&h=400&q=80',
  }
];

const NEW_PRODUCTS: Product[] = [
  {
    id: '1',
    title: '961 Classic Snapback',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&h=400&q=80',
    price: 19.99,
    originalPrice: 25.00,
    rating: 4.8,
    ratingCount: 102,
    isNew: true
  },
  {
    id: '2',
    title: '961 Heritage Tee',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&h=400&q=80',
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.9,
    ratingCount: 89,
    isNew: true
  },
  {
    id: '3',
    title: '961 Premium Hoodie',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&h=400&q=80',
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.7,
    ratingCount: 156,
    isNew: true
  },
  {
    id: '4',
    title: '961 Varsity Jacket',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=300&h=400&q=80',
    price: 89.99,
    originalPrice: 99.99,
    rating: 4.9,
    ratingCount: 67,
    isNew: true,
    isSoldOut: true
  }
];

const POPULAR_PRODUCTS: Product[] = [
  {
    id: '5',
    title: '961 Vintage Cap',
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=300&h=400&q=80',
    price: 29.99,
    rating: 4.9,
    ratingCount: 234
  },
  {
    id: '6',
    title: '961 Winter Beanie',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=300&h=400&q=80',
    price: 19.99,
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
  },
  {
    id: '8',
    title: '961 Crossbody Bag',
    image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=300&h=400&q=80',
    price: 39.99,
    rating: 4.6,
    ratingCount: 92
  }
];

const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Clothes',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=300&h=300&q=80'
  },
  {
    id: '2',
    name: 'Bags',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&h=300&q=80'
  },
  {
    id: '3',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&h=300&q=80'
  }
];

export default function StorefrontPage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [notificationActive, setNotificationActive] = useState(true);
  const [language, setLanguage] = useState<'en' | 'fr' | 'ar'>('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const { addToCart, getCartCount } = useCart();
  const cartCount = getCartCount();

  useEffect(() => {
    // Auto-advance banner every 5 seconds
    const timer = setInterval(nextBanner, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  const handleAddToCart = (productId: string) => {
    const product = [...NEW_PRODUCTS, ...POPULAR_PRODUCTS].find(p => p.id === productId);
    if (product && !product.isSoldOut) {
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price
      });
      // Open cart panel
      window.dispatchEvent(new CustomEvent('openCart'));
    }
  };

  const handleProductClick = (productId: string) => {
    window.location.href = `/store/products/${productId}`;
  };

  return (
    <div className="bg-gray-50">
      <main className="px-4 py-1 space-y-0.5">
        {/* Banner Slider */}
        <div className="relative rounded-sm overflow-hidden aspect-[2.5/1]">
          {BANNERS.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentBanner ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1)), url(${banner.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div>
                  <h2 className="text-6xl font-bold text-white mb-8 whitespace-nowrap">{banner.title}</h2>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = banner.link;
                    }}
                    className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {BANNERS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentBanner ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Best Sellers & New Arrivals */}
        <div className="grid grid-cols-2 gap-0.5">
          <a href="/store/bestsellers" className="relative aspect-[16/9] rounded-sm overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&h=400&q=80"
              alt="Best Sellers"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h2 className="text-4xl font-bold text-white tracking-wide">BESTSELLERS</h2>
            </div>
          </a>
          <a href="/store/new-arrivals" className="relative aspect-[16/9] rounded-sm overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&h=400&q=80"
              alt="New Arrivals"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h2 className="text-4xl font-bold text-white tracking-wide">NEW ARRIVALS</h2>
            </div>
          </a>
        </div>

        {/* New Arrivals */}
        <section className="mt-36">
          <h2 className="text-6xl font-black text-gray-900 mb-8">New</h2>
          <div className="grid grid-cols-4 gap-6">
            {NEW_PRODUCTS.map((product) => (
              <div 
                key={product.id} 
                onClick={() => handleProductClick(product.id)}
                className="bg-white rounded-2xl p-2 relative group cursor-pointer"
              >
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {product.isNew && (
                  <>
                  <span className="absolute top-5 left-5 px-2 py-1 bg-black text-white text-xs font-medium rounded">
                    New
                  </span>
                  <span className="absolute top-5 right-5 px-2 py-1 bg-white text-gray-700 text-xs font-medium rounded-full shadow-sm">
                    {Math.round(product.price * 20)} pts
                  </span>
                  </>
                )}
                <div className="space-y-2">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center text-[#FF0000] scale-110">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                          className={i < Math.floor(product.rating) ? 'text-[#FF0000]' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-500">({product.ratingCount})</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
                  <div className="flex items-baseline space-x-2">
                    <div className="space-y-1">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-base text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-[#FF0000]">961 Deals:</span>
                        <div className="relative group">
                          <span className="text-sm font-bold text-[#FF0000]">${(product.price * 0.9).toFixed(2)}</span>
                          <div className="absolute bottom-full left-0 mb-2 w-60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <div className="bg-white text-gray-700 text-xs p-2 rounded-lg shadow-lg border border-gray-200">
                              Save ${(product.price * 0.1).toFixed(2)} by becoming a 961 Deals member - available at checkout
                            </div>
                            <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className={`w-full py-2 font-medium rounded-lg transition-colors ${
                      product.isSoldOut
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-[#FF0000] text-white hover:bg-[#FF0000]/90'
                    }`}
                    disabled={product.isSoldOut}
                  >
                    {product.isPreorder ? 'Preorder' : 'Add to Cart'}
                  </button>
                  {product.isSoldOut && (
                    <div className="flex space-x-2 mt-2">
                      <button
                        className="w-[85%] py-2 bg-gray-100 text-gray-400 font-medium rounded-lg cursor-not-allowed"
                        disabled
                      >
                        Sold Out
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setNotificationActive(!notificationActive);
                        }}
                        className={`w-[25%] py-2 font-medium rounded-lg transition-colors ${
                          notificationActive
                            ? 'bg-[#FF0000] text-white'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <Bell size={16} className="mx-auto fill-current" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Products */}
        <section className="mt-36">
          <h2 className="text-6xl font-black text-gray-900 mb-8">Popular</h2>
          <div className="grid grid-cols-4 gap-6">
            {POPULAR_PRODUCTS.map((product) => (
              <div 
                key={product.id} 
                onClick={() => handleProductClick(product.id)}
                className="bg-white rounded-2xl p-2 relative group cursor-pointer"
              >
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="absolute top-5 left-5 px-2 py-1 bg-white text-gray-700 text-xs font-medium rounded-full shadow-sm flex items-center space-x-1">
                  <span>🔥</span>
                  <span>Popular</span>
                </span>
                <span className="absolute top-5 right-5 px-2 py-1 bg-white text-gray-700 text-xs font-medium rounded-full shadow-sm">
                  {Math.round(product.price * 20)} pts
                </span>
                <div className="space-y-2">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center text-[#FF0000] scale-110">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                          className={i < Math.floor(product.rating) ? 'text-[#FF0000]' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-500">({product.ratingCount})</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
                  <div className="flex items-baseline space-x-2">
                    <div className="space-y-1">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-base text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-[#FF0000]">961 Deals:</span>
                        <div className="relative group">
                          <span className="text-sm font-bold text-[#FF0000]">${(product.price * 0.9).toFixed(2)}</span>
                          <div className="absolute bottom-full left-0 mb-2 w-60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <div className="bg-white text-gray-700 text-xs p-2 rounded-lg shadow-lg border border-gray-200">
                              Save ${(product.price * 0.1).toFixed(2)} by becoming a 961 Deals member - available at checkout
                            </div>
                            <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className={`w-full py-2 font-medium rounded-lg transition-colors ${
                      product.isSoldOut
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-[#FF0000] text-white hover:bg-[#FF0000]/90'
                    }`}
                    disabled={product.isSoldOut}
                  >
                    {product.isPreorder ? 'Preorder' : 'Add to Cart'}
                  </button>
                  {product.isSoldOut && (
                    <div className="flex space-x-2 mt-2">
                      <button
                        className="w-[85%] py-2 bg-gray-100 text-gray-400 font-medium rounded-lg cursor-not-allowed"
                        disabled
                      >
                        Sold Out
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setNotificationActive(!notificationActive);
                        }}
                        className={`w-[25%] py-2 font-medium rounded-lg transition-colors ${
                          notificationActive
                            ? 'bg-[#FF0000] text-white'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <Bell size={16} className="mx-auto fill-current" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mt-36 mb-36">
          <h2 className="text-6xl font-black text-gray-900 mb-8">Categories</h2>
          <div className="grid grid-cols-4 gap-6">
            {CATEGORIES.map((category) => (
              <div
                onClick={() => window.location.href = `/store/categories/${category.name.toLowerCase()}`}
                key={category.id}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <button 
          onClick={() => {/* Handle cart open */}}
          className="fixed bottom-8 right-8 w-16 h-16 bg-black text-white rounded-full shadow-lg hover:bg-black/90 transition-colors flex items-center justify-center group"
        >
          <div className="relative">
            <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
            <span className="absolute -top-2 -right-2 bg-[#FF0000] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </div>
        </button>
      )}
    </div>
  );
}