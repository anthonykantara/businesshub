import React, { useState } from 'react';
import { ArrowRight, Globe, DollarSign, Users, Store, Smartphone, Building2, MapPin, Phone, Mail, Check } from 'lucide-react';
import AuthDialog from './auth/AuthDialog';

export default function AgentLandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [language, setLanguage] = useState<'en' | 'fr' | 'ar'>('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const handleAuthComplete = () => {
    setShowAuth(false);
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
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
            <span className="text-sm text-white/60">Become an Agent</span>
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
      
      {/* Main Header */}
      <nav className="bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between h-16 px-12">
          <div className="flex items-center space-x-2">
            <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=64&h=64&q=80" alt="961" className="h-8 w-8 rounded-full" />
            <span className="text-xl">Business Hub</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowAuth(true)}
              className="px-6 py-3 text-base font-medium text-white/80 hover:text-white transition-colors"
            >
              Log in
            </button>
            <button 
              onClick={() => setShowAuth(true)}
              className="px-6 py-3 text-base font-medium bg-[#FF0000] text-white rounded-full hover:bg-[#FF0000]/90 transition-colors"
            >
              Sign up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="h-[95vh] relative overflow-hidden flex items-center">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <h1 className="text-8xl font-extrabold mb-8">
                Become a 961
                <div className="flex items-center gap-2">
                  <span className="text-white">Agent</span>
                </div>
              </h1>
              <p className="text-2xl text-white/80 mb-10 max-w-xl leading-relaxed">
                Join our growing network of trusted agents in Lebanon and get more traffic and revenue to your store by topping our users' wallets.
              </p>
              <button 
                onClick={() => setShowAuth(true)}
                className="px-16 py-5 bg-[#FF0000] text-white text-xl font-semibold rounded-full hover:bg-[#FF0000]/90 transition-colors w-64"
              >
                Get started
              </button>
            </div>
            <div className="relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 translate-y-12">
                  <div className="aspect-[9/16] rounded-2xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80" 
                      alt="Business owner using phone"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="space-y-4 -translate-y-8">
                  <div className="aspect-[9/16] rounded-2xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" 
                      alt="Store owner helping customer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="aspect-[9/16] rounded-2xl overflow-hidden translate-x-8">
                    <img 
                      src="https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=800&q=80" 
                      alt="Business transaction"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -inset-x-20 -inset-y-20 bg-gradient-to-r from-[#FF0000]/20 to-purple-500/20 rounded-full blur-3xl opacity-10 animate-pulse" />
              <div className="absolute -inset-x-20 -inset-y-20 bg-gradient-to-b from-[#FF0000]/10 to-blue-500/10 rounded-full blur-3xl opacity-10 animate-pulse delay-1000" />
            </div>
          </div>
        </div>

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black" />
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-black relative">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl font-bold mb-24 text-center">Why Become an Agent?</h2>
          
          <div className="grid grid-cols-4 gap-8">
            {[
              {
                icon: DollarSign,
                title: 'Earn Commission',
                description: 'Earn up to $2 per top-up transaction, creating a new revenue stream for your business.'
              },
              {
                icon: Users,
                title: 'Attract Customers',
                description: 'Bring new customers to your store who may purchase your other products and services.'
              },
              {
                icon: Store,
                title: 'Zero Setup Cost',
                description: 'No additional hardware or setup fees required. Use your existing smartphone or computer.'
              },
              {
                icon: Smartphone,
                title: 'Simple Process',
                description: 'Easy-to-use platform with real-time transaction tracking and automated settlements.'
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 rounded-xl bg-[#FF0000]/10 flex items-center justify-center mb-6">
                  <benefit.icon size={32} className="text-[#FF0000]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => setShowAuth(true)}
              className="px-16 py-5 bg-[#FF0000] text-white text-xl font-semibold rounded-full hover:bg-[#FF0000]/90 transition-colors mx-auto w-64"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Auth Dialog */}
      {showAuth && (
        <AuthDialog
          onClose={() => setShowAuth(false)}
          onComplete={handleAuthComplete}
        />
      )}
    </div>
  );
}