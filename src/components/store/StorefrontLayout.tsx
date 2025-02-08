import React, { useState } from 'react';
import { Search, ShoppingCart, Globe, UserCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartPanel from './CartPanel';

interface StorefrontLayoutProps {
  children: React.ReactNode;
}

export default function StorefrontLayout({ children }: StorefrontLayoutProps) {
  const [language, setLanguage] = useState<'en' | 'fr' | 'ar'>('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [showFloatingButton, setShowFloatingButton] = useState(true);
  
  // Disable body scroll when cart is open
  React.useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      setShowFloatingButton(false);
    } else {
      document.body.style.overflow = '';
      setShowFloatingButton(cartCount > 0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Listen for cart open events
  React.useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener('openCart', handleOpenCart);
    return () => window.removeEventListener('openCart', handleOpenCart);
  }, []);

  return (
    <div className="bg-gray-50">
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
          <div className="flex items-center justify-between h-20 px-4">
            <div className="flex items-center space-x-2">
              <a href="/store">
                <img 
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=128&h=32&q=80" 
                  alt="961 Merch" 
                  className="h-8" 
                />
                <span className="text-lg font-medium">Merch</span>
              </a>
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
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 hover:bg-white/10 rounded-full"
                >
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

      {/* Main Content */}
      {children}

      {/* Floating Cart Button */}
      {showFloatingButton && cartCount > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-black text-white rounded-full shadow-lg hover:bg-black/90 transition-colors flex items-center justify-center group"
        >
          <div className="relative">
            <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
            <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-white text-[#FF0000] text-xs font-bold rounded-full">
              {cartCount}
            </span>
          </div>
        </button>
      )}

      {/* Cart Panel */}
      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}