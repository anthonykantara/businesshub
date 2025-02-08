import React, { useState } from 'react';
import { X, ArrowLeft, Building2, Phone, MapPin, FileText } from 'lucide-react';

interface AuthDialogProps {
  onClose: () => void;
  onComplete: () => void;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  hasBusinessHub: boolean;
}

type Step = 'auth' | 'business' | 'brand';

interface AuthForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

interface Business {
  name: string;
  phone: string;
  address: string;
}

interface Brand {
  name: string;
  phone: string;
  address: string;
}

export default function AuthDialog({ onClose, onComplete }: AuthDialogProps) {
  const [step, setStep] = useState<Step>('auth');
  const [isLogin, setIsLogin] = useState(true);
  const [authForm, setAuthForm] = useState<AuthForm>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  });
  const [business, setBusiness] = useState<Business>({
    name: '',
    phone: '',
    address: ''
  });
  const [brand, setBrand] = useState<Brand>({
    name: '',
    phone: '',
    address: ''
  });

  const handleLogin = () => {
    // In a real app, this would verify the QR code scan
    // and get the user data from the backend
    const mockUser: User = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      hasBusinessHub: Math.random() > 0.5 // Randomly simulate whether user has a business hub
    };

    if (mockUser.hasBusinessHub) {
      // User already has a business hub, redirect to dashboard
      onComplete();
    } else {
      // User needs to create a business hub
      setStep('business');
    }
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would authenticate with the backend
    setStep('business');
  };

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the business details
    setStep('brand');
  };

  const handleBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the brand details
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/5 to-transparent pointer-events-none" />
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            {step !== 'auth' && (
              <button
                onClick={() => setStep(step === 'brand' ? 'business' : 'auth')}
                className="p-2 hover:bg-[#FF0000]/5 rounded-lg transition-colors group"
              >
                <ArrowLeft size={20} className="text-gray-500 group-hover:text-[#FF0000] transition-colors" />
              </button>
            )}
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF0000] to-[#FF4444] bg-clip-text text-transparent">
              {step === 'auth' ? (isLogin ? 'Log in to 961' : 'Create 961 Account') :
               step === 'business' ? 'Business Information' :
               'Create Brand'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#FF0000]/5 rounded-lg transition-colors group"
            >
              <X size={20} className="text-gray-400 group-hover:text-[#FF0000] transition-colors" />
            </button>
          </div>

          {step === 'auth' && !isLogin && (
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={authForm.firstName}
                    onChange={(e) => setAuthForm({ ...authForm, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#FF0000] focus:ring-2 focus:ring-[#FF0000]/20 text-gray-900 shadow-sm transition-all duration-200"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={authForm.lastName}
                    onChange={(e) => setAuthForm({ ...authForm, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#FF0000] focus:ring-2 focus:ring-[#FF0000]/20 text-gray-900 shadow-sm transition-all duration-200"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={authForm.phone}
                  onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] text-gray-900"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] text-gray-900"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] text-gray-900"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="w-full text-sm text-[#FF0000] hover:text-[#FF0000]/80"
              >
                Already have an account? Log in
              </button>
            </form>
          )}

          {step === 'auth' && isLogin && (
            <div className="space-y-8 text-center">
              <p className="text-gray-600 text-lg">
                Log into the 961 app on your phone then scan this QR code
              </p>
              
              <div className="w-72 h-72 mx-auto bg-gradient-to-br from-[#FF0000]/5 to-transparent p-4 rounded-3xl flex items-center justify-center relative">
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-3xl" />
                <div className="w-56 h-56 bg-white rounded-2xl flex items-center justify-center shadow-xl relative">
                  <div className="text-sm text-gray-500">
                    <button
                      onClick={handleLogin}
                      className="px-6 py-3 bg-gradient-to-r from-[#FF0000] to-[#FF4444] text-white text-base font-medium rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Simulate QR Code Scan
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="w-full text-sm text-[#FF0000] hover:text-[#FF0000]/80 font-medium transition-colors"
              >
                Not yet a user? Register now
              </button>
            </div>
          )}

          {step === 'business' && (
            <form onSubmit={handleBusinessSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <div className="flex items-center">
                  <Building2 size={16} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    value={business.name}
                    onChange={(e) => setBusiness({ ...business, name: e.target.value })}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-[#FF0000] focus:ring-2 focus:ring-[#FF0000]/20 text-gray-900 shadow-sm transition-all duration-200"
                    placeholder="Enter business name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="flex items-center">
                  <Phone size={16} className="text-gray-400 mr-2" />
                  <input
                    type="tel"
                    value={business.phone}
                    onChange={(e) => setBusiness({ ...business, phone: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] text-gray-900"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="flex items-center">
                  <MapPin size={16} className="text-gray-400 mr-2" />
                  <textarea
                    value={business.address}
                    onChange={(e) => setBusiness({ ...business, address: e.target.value })}
                    rows={3}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] resize-none text-gray-900"
                    placeholder="Enter business address"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[#FF0000] to-[#FF4444] text-white text-base font-medium rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Continue
              </button>
            </form>
          )}

          {step === 'brand' && (
            <form onSubmit={handleBrandSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={brand.name}
                  onChange={(e) => setBrand({ ...brand, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] text-gray-900"
                  placeholder="Enter brand name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="flex items-center">
                  <Phone size={16} className="text-gray-400 mr-2" />
                  <input
                    type="tel"
                    value={brand.phone}
                    onChange={(e) => setBrand({ ...brand, phone: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] text-gray-900"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="flex items-center">
                  <MapPin size={16} className="text-gray-400 mr-2" />
                  <textarea
                    value={brand.address}
                    onChange={(e) => setBrand({ ...brand, address: e.target.value })}
                    rows={3}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] resize-none text-gray-900"
                    placeholder="Enter brand address"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[#FF0000] to-[#FF4444] text-white text-base font-medium rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Create Brand
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}