import React, { useState } from 'react';
import { ArrowLeft, DollarSign, Users, Store, Smartphone, Building2, MapPin, Phone, Mail, Check, ChevronDown, Crosshair, Search, Clock } from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  image: string;
  phone?: string;
  address?: string;
  registrationNumber?: string;
  vatNumber?: string;
}

const BRANDS: Brand[] = [
  {
    id: '1',
    name: 'Coffee House',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=64&h=64&q=80',
    phone: '+961 3 123 456',
    address: '123 Coffee Street, Beirut'
  },
  {
    id: '2',
    name: 'Urban Wear',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=64&h=64&q=80'
  },
  {
    id: '3',
    name: 'Tech Gadgets',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=64&h=64&q=80'
  }
];

interface AgentEnrollmentPageProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function AgentEnrollmentPage({ onBack, onComplete }: AgentEnrollmentPageProps) {
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    address: '',
    coordinates: {
      lat: 0,
      lng: 0
    }
  });

  const [showMap, setShowMap] = useState(false);
  const [step, setStep] = useState<'info' | 'fee' | 'hours'>('info');
  const [fee, setFee] = useState<'free' | '0.50' | '1' | '2'>('free');
  const [hours, setHours] = useState({
    monday: { open: '09:00', close: '17:00', closed: false },
    tuesday: { open: '09:00', close: '17:00', closed: false },
    wednesday: { open: '09:00', close: '17:00', closed: false },
    thursday: { open: '09:00', close: '17:00', closed: false },
    friday: { open: '09:00', close: '17:00', closed: false },
    saturday: { open: '09:00', close: '17:00', closed: false },
    sunday: { open: '09:00', close: '17:00', closed: true }
  });

  // When a brand is selected, pre-fill the form with available data
  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand);
    setShowBrandDropdown(false);
    setFormData(prev => ({
      ...prev,
      phone: brand.phone || prev.phone,
      address: brand.address || prev.address
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'info') {
      setStep('fee');
      return;
    }
    if (step === 'fee') {
      setStep('hours');
      return;    }
    
    // Update brand info if new data was provided
    if (selectedBrand) {
      const updatedBrand = {
        ...selectedBrand,
        phone: formData.phone || selectedBrand.phone,
        address: formData.address || selectedBrand.address,
        registrationNumber: formData.registrationNumber || selectedBrand.registrationNumber,
        vatNumber: formData.vatNumber || selectedBrand.vatNumber
      };
      // In a real app, this would update the brand info in the business hub
      console.log('Updated brand info:', updatedBrand);
    }
    
    // Submit agent application
    console.log('Agent application:', {
      brand: selectedBrand,
      ...formData,
      fee,
      hours
    });
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <h1 className="ml-4 text-xl font-bold text-gray-900">Become an Agent</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Benefits */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Join 961's Agent Network
              </h2>
              <p className="text-xl text-gray-600">
                Become an authorized 961 agent. Let customers top up their 961 wallets at your location while you earn additional revenue and foot traffic.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Commission */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#FF0000] transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-[#FF0000]/5 flex items-center justify-center mb-4 group-hover:bg-[#FF0000]/10 transition-colors">
                  <DollarSign size={24} className="text-[#FF0000]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Earn Commission
                </h3>
                <p className="text-gray-600">
                  Earn up to $2 per top-up, creating a new revenue stream. Set your own rate.
                </p>
              </div>

              {/* New Customers */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#FF0000] transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-[#FF0000]/5 flex items-center justify-center mb-4 group-hover:bg-[#FF0000]/10 transition-colors">
                  <Users size={24} className="text-[#FF0000]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Attract Customers
                </h3>
                <p className="text-gray-600">
                  Top-up services attract new customers and increase foot traffic to upsell other products.
                </p>
              </div>

              {/* Zero Fees */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#FF0000] transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-[#FF0000]/5 flex items-center justify-center mb-4 group-hover:bg-[#FF0000]/10 transition-colors">
                  <Store size={24} className="text-[#FF0000]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Zero Setup Fees
                </h3>
                <p className="text-gray-600">
                  No extra hardware or training needed - quick and simple to start.
                </p>
              </div>

              {/* Brand Visibility */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#FF0000] transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-[#FF0000]/5 flex items-center justify-center mb-4 group-hover:bg-[#FF0000]/10 transition-colors">
                  <Smartphone size={24} className="text-[#FF0000]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Brand Visibility
                </h3>
                <p className="text-gray-600">
                  Featured as official top-up locations in our app and website, driving more awareness.
                </p>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <Check size={20} className="text-[#FF0000] mr-2 flex-shrink-0" />
                  Valid business registration
                </li>
                <li className="flex items-center text-gray-600">
                  <Check size={20} className="text-[#FF0000] mr-2 flex-shrink-0" />
                  Physical store location
                </li>
                <li className="flex items-center text-gray-600">
                  <Check size={20} className="text-[#FF0000] mr-2 flex-shrink-0" />
                  Smartphone or computer with internet access
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Application Form */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 relative">
                {step !== 'info' && (
                  <button
                    type="button"
                    onClick={() => setStep(step === 'hours' ? 'fee' : 'info')}
                    className="absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft size={20} className="text-gray-500" />
                  </button>
                )}
                <h2 className="text-xl font-bold text-gray-900 mb-6">Agent Application</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 'info' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Store size={16} className="inline mr-2" />
                        Select Brand
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowBrandDropdown(!showBrandDropdown)}
                          className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] bg-white"
                        >
                          {selectedBrand ? (
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                <img
                                  src={selectedBrand.image}
                                  alt={selectedBrand.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-gray-900">{selectedBrand.name}</span>
                            </div>
                          ) : (
                            <span className="text-gray-500">Select a brand</span>
                          )}
                          <ChevronDown size={20} className="text-gray-400" />
                        </button>

                        {showBrandDropdown && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                            <div className="py-1">
                              {BRANDS.map((brand) => (
                                <button
                                  key={brand.id}
                                  type="button"
                                  onClick={() => handleBrandSelect(brand)}
                                  className="w-full px-4 py-2 flex items-center hover:bg-gray-50"
                                >
                                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                    <img
                                      src={brand.image}
                                      alt={brand.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <span className="text-gray-900">{brand.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Phone size={16} className="inline mr-2" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Mail size={16} className="inline mr-2" />
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <MapPin size={16} className="inline mr-2" />
                        Store Address
                      </label>
                      <div className="space-y-3">
                        <textarea
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          rows={3}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] resize-none ${
                            selectedBrand?.address ? 'bg-gray-50' : ''
                          }`}
                          placeholder={selectedBrand?.address || ''}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowMap(true)}
                          className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors"
                        >
                          <MapPin size={16} className="text-gray-400 mr-2" />
                          <span className="text-gray-600">Pin exact location on map</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  )}

                  {step === 'fee' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-gray-900">Select Top-Up Fee</h3>
                      <p className="text-sm text-gray-600">
                        We let you choose how much you want to earn from each top-up. No fees will bring the most people to your store.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { value: 'free', label: 'Free' },
                          { value: '0.50', label: '$0.50' },
                          { value: '1', label: '$1.00' },
                          { value: '2', label: '$2.00' }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex flex-col p-4 border rounded-xl cursor-pointer transition-all ${
                              fee === option.value
                                ? 'border-[#FF0000] bg-[#FF0000]/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="fee"
                              value={option.value}
                              checked={fee === option.value}
                              onChange={() => setFee(option.value as typeof fee)}
                              className="sr-only"
                            />
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-lg font-medium text-gray-900">{option.label}</span>
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                fee === option.value
                                  ? 'border-[#FF0000] bg-[#FF0000]'
                                  : 'border-gray-300'
                              }`}>
                                {fee === option.value && <Check size={12} className="text-white" />}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 'hours' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
                      <div className="space-y-4">
                        {Object.entries(hours).map(([day, time]) => (
                          <div key={day} className="flex items-center space-x-4">
                            <div className="w-28">
                              <span className="text-sm font-medium text-gray-900 capitalize">
                                {day}
                              </span>
                            </div>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={!time.closed}
                                onChange={(e) => setHours(prev => ({
                                  ...prev,
                                  [day]: { ...prev[day as keyof typeof hours], closed: !e.target.checked }
                                }))}
                                className="w-4 h-4 rounded border-gray-300 text-[#FF0000] focus:ring-[#FF0000]"
                              />
                              <span className="ml-2 text-sm text-gray-600">Open</span>
                            </label>
                            {!time.closed && (
                              <div className="flex items-center space-x-2 flex-1">
                                <input
                                  type="time"
                                  value={time.open}
                                  onChange={(e) => setHours(prev => ({
                                    ...prev,
                                    [day]: { ...prev[day as keyof typeof hours], open: e.target.value }
                                  }))}
                                  className="px-3 py-1.5 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                                />
                                <span className="text-gray-500">to</span>
                                <input
                                  type="time"
                                  value={time.close}
                                  onChange={(e) => setHours(prev => ({
                                    ...prev,
                                    [day]: { ...prev[day as keyof typeof hours], close: e.target.value }
                                  }))}
                                  className="px-3 py-1.5 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={!selectedBrand}
                    className="w-full px-6 py-3 bg-[#FF0000] text-white text-base font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
                  >
                    {step === 'hours' ? 'Get Started' : 'Next'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Map Dialog */}
        {showMap && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl mx-4">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setShowMap(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <h3 className="text-xl font-bold text-gray-900">Pin Store Location</h3>
                  <div className="w-5" /> {/* Spacer to maintain centering */}
                </div>

                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="flex space-x-2">
                    <div className="flex-1 relative">
                      <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search location..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      />
                    </div>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                      <Crosshair size={20} />
                      <span>My Location</span>
                    </button>
                  </div>

                  {/* Map Placeholder */}
                  <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gray-200/50 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin size={48} className="mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-500">Map integration placeholder</p>
                        <p className="text-sm text-gray-400">Click to pin your exact location</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setShowMap(false)}
                  className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
                >
                  Confirm Location
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}