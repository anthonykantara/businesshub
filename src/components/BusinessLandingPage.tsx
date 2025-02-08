import React, { useState } from 'react';
import { ArrowRight, Globe } from 'lucide-react';
import AuthDialog from './auth/AuthDialog';

export default function BusinessLandingPage() {
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
            <a href="/agent" className="text-sm text-white/60 hover:text-white transition-colors">Become an Agent</a>
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
                Welcome to 
                <div className="flex items-center gap-2 text-[#FF0000]">
                  <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=64&h=64&q=80" alt="961" className="h-20 w-20 rounded-full" />
                  <span>Business Hub</span>
                </div>
              </h1>
              <p className="text-2xl text-white/80 mb-10 max-w-xl leading-relaxed">
                Reach the right audience, expand online, and tap into the creator economy - all in one place. We connect you with all the tools, creators, and digital solutions you need to help your business grow in Lebanon and beyond.
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
                      src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80" 
                      alt="Young people collaborating on laptop"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="space-y-4 -translate-y-8">
                  <div className="aspect-[9/16] rounded-2xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                      alt="Young team working on laptop and camera"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="aspect-[9/16] rounded-2xl overflow-hidden translate-x-8">
                    <img 
                      src="https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?auto=format&fit=crop&w=800&q=80" 
                      alt="Lebanese young group working together"
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

      {/* How it Works Section */}
      <div className="py-24 bg-black relative">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl font-bold mb-24 text-center">How it works</h2>
          
          <div className="grid grid-cols-2 gap-24">
            <div className="space-y-16">
              {[
                {
                  number: '1',
                  title: 'Register',
                  description: 'Register your company on 961 Business Hub.',
                  color: 'text-[#FF0000] font-medium'
                },
                {
                  number: '2',
                  title: 'Add Your Brand',
                  description: 'Add your brand to your Business Hub.',
                  color: 'text-[#FF0000] font-medium'
                },
                {
                  number: '3',
                  title: 'Use Our Tools & Services',
                  description: 'Use all the tools and services available to you.',
                  color: 'text-[#FF0000] font-medium'
                },
                {
                  number: '4',
                  title: 'Grow',
                  description: 'Track and measure performance metrics and see how well your business grows on 961.',
                  color: 'text-[#FF0000] font-medium'
                }
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className={`text-6xl font-bold ${step.color}`}>
                    {step.number}.
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-3 text-[#FF0000]">
                      {step.title}
                    </h3>
                    <p className="text-white/70 text-xl leading-relaxed font-semibold">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-[#FF0000]/10 rounded-3xl overflow-hidden">
                <div className="absolute inset-4">
                  <div className="bg-white rounded-2xl w-full h-full shadow-xl">
                    <div className="p-4">
                      <div className="bg-gray-100 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-200" />
                            <div className="h-4 w-24 bg-gray-200 rounded" />
                          </div>
                          <div className="h-4 w-16 bg-gray-200 rounded" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 w-full bg-gray-200 rounded" />
                          <div className="h-3 w-3/4 bg-gray-200 rounded" />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="h-8 w-24 bg-[#FF0000] rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

      {/* FAQ Section */}
      <div className="py-24 bg-black relative">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl font-bold mb-24 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'What does 961 Business Hub offer?',
                answer: 'We offer a comprehensive suite of digital solutions including marketing tools, content creation tools, advertising tools, creator partnerships, e-commerce integration, and business analytics. Our platform helps Lebanese businesses expand their online presence and reach new audiences effectively.'
              },
              {
                question: 'How do I get started with 961 Business Hub?',
                answer: 'Getting started is simple. Register your business using your 961 username, complete your profile, and start using our tools and services.'
              },
              {
                question: 'Can I manage multiple brands under one account?',
                answer: 'Yes! Our platform supports multi-brand management. You can create and manage multiple brand profiles under a single business account, making it easy to organize and track performance across your entire portfolio.'
              },
              {
                question: 'Can I add team members to our Business Hub?',
                answer: 'Yes, you can invite team members easily by adding their 961 username. You can also assign specific roles and permissions for the entire business or just specific brands.'
              },
              {
                question: 'How can I have my agency manage my business?',
                answer: 'Once you set up your Business Hub, you will be able to link it your agency to give them access to manage your business. They need to be certified agency with 961.'
              }
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-300"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="text-xl font-semibold pr-8">{faq.question}</h3>
                  <div className="flex-shrink-0 ml-2 text-[#FF0000] transition-transform duration-300 group-open:rotate-45">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-white/70 text-lg leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
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