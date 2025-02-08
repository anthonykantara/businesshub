import React, { useState } from 'react';
import { Building2, Phone, MapPin, Clock, X, Save, Search, Crosshair, ChevronDown, DollarSign, Check } from 'lucide-react';

interface BusinessHours {
  [key: string]: {
    open: string;
    close: string;
    closed: boolean;
  };
}

interface Brand {
  id: string;
  name: string;
  image: string;
  fee: number;
  lastFeeChange: string;
  phone?: string;
  address?: string;
  enrolled?: boolean;
}

const BRANDS: Brand[] = [
  {
    id: '1',
    name: 'Coffee House',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=64&h=64&q=80',
    phone: '+961 3 123 456',
    address: '123 Coffee Street, Beirut',
    fee: 2,
    lastFeeChange: '2024-02-15',
    enrolled: true
  },
  {
    id: '2',
    name: 'Urban Wear',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=64&h=64&q=80',
    fee: 1,
    lastFeeChange: '2024-03-01',
    enrolled: false
  },
  {
    id: '3',
    name: 'Tech Gadgets',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=64&h=64&q=80',
    fee: 0.5,
    lastFeeChange: '2024-03-10',
    enrolled: false
  }
];

export default function AgentSettingsPage() {
  const [selectedBrand, setSelectedBrand] = useState<Brand>(BRANDS[0]);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [businessName, setBusinessName] = useState('Coffee House');
  const [phone, setPhone] = useState('+961 3 123 456');
  const [address, setAddress] = useState('123 Business Street, City');
  const [showMap, setShowMap] = useState(false);
  const [hours, setHours] = useState<BusinessHours>({
    monday: { open: '09:00', close: '17:00', closed: false },
    tuesday: { open: '09:00', close: '17:00', closed: false },
    wednesday: { open: '09:00', close: '17:00', closed: false },
    thursday: { open: '09:00', close: '17:00', closed: false },
    friday: { open: '09:00', close: '17:00', closed: false },
    saturday: { open: '09:00', close: '17:00', closed: false },
    sunday: { open: '09:00', close: '17:00', closed: true }
  });

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log({
      businessName,
      phone,
      address,
      hours
    });
  };

  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand);
    setBusinessName(brand.name);
    setPhone(brand.phone || '');
    setAddress(brand.address || '');
    setShowBrandDropdown(false);
  };

  return (
    <div className="py-8 px-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
          >
            <span>{selectedBrand.enrolled ? 'Save Changes' : 'Enroll Brand'}</span>
          </button>
        </div>

        {/* Brand Selector */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="relative">
              <button
                onClick={() => setShowBrandDropdown(!showBrandDropdown)}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-[#FF0000] focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] bg-white"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={selectedBrand.image}
                      alt={selectedBrand.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {selectedBrand.enrolled && <span className="ml-2 text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Enrolled</span>}
                  <span className="ml-3 text-base font-medium text-gray-900">{selectedBrand.name}</span>
                </div>
                <ChevronDown size={20} className="text-gray-400" />
              </button>

              {showBrandDropdown && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  {BRANDS.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => brand.enrolled && handleBrandSelect(brand)}
                      disabled={!brand.enrolled}
                      className="w-full flex items-center p-3 hover:bg-gray-50"
                    >
                      <div className={`w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ${
                        !brand.enrolled && 'opacity-50'
                      }`}>
                        <img src={brand.image} alt={brand.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="ml-3 flex items-center">
                        <span className={`text-base font-medium ${brand.enrolled ? 'text-gray-900' : 'text-gray-400'}`}>
                          {brand.name}
                        </span>
                        {brand.enrolled ? (
                          <span className="ml-2 text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Enrolled</span>
                        ) : (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBrandSelect(brand);
                            }}
                            className="ml-2 px-3 py-1 text-xs font-medium text-[#FF0000] hover:bg-[#FF0000]/5 rounded-full transition-colors"
                          >
                            Enroll Now
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top Up Fee */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Top Up Fee</h2>
                <p className="text-sm text-gray-500 mt-1">Set how much customers pay for top-ups at your location</p>
              </div>
              {new Date(selectedBrand.lastFeeChange).getTime() + (30 * 24 * 60 * 60 * 1000) > new Date().getTime() && (
                <div className="px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Next change available: {new Date(new Date(selectedBrand.lastFeeChange).getTime() + (30 * 24 * 60 * 60 * 1000)).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between space-x-4">
              {['free', '0.50', '1', '2'].map((feeOption) => (
                <label
                  key={feeOption}
                  className={`flex-1 relative flex flex-col items-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedBrand.fee === (feeOption === 'free' ? 0 : parseFloat(feeOption))
                      ? 'border-[#FF0000] bg-[#FF0000]/5 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="fee"
                    value={feeOption}
                    checked={selectedBrand.fee === (feeOption === 'free' ? 0 : parseFloat(feeOption))}
                    onChange={() => {
                      const lastChange = new Date(selectedBrand.lastFeeChange);
                      const now = new Date();
                      const monthsSinceChange = (now.getFullYear() - lastChange.getFullYear()) * 12 + 
                        now.getMonth() - lastChange.getMonth();
                      
                      if (monthsSinceChange >= 1) {
                        setSelectedBrand({
                          ...selectedBrand,
                          fee: feeOption === 'free' ? 0 : parseFloat(feeOption),
                          lastFeeChange: new Date().toISOString().split('T')[0]
                        });
                      }
                    }}
                    className="sr-only"
                    disabled={
                      new Date(selectedBrand.lastFeeChange).getTime() + (30 * 24 * 60 * 60 * 1000) > new Date().getTime()
                    }
                  />
                  <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedBrand.fee === (feeOption === 'free' ? 0 : parseFloat(feeOption))
                      ? 'border-[#FF0000] bg-[#FF0000]'
                      : 'border-gray-300'
                  }`}>
                    {selectedBrand.fee === (feeOption === 'free' ? 0 : parseFloat(feeOption)) && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {feeOption === 'free' ? 'Free' : `$${parseFloat(feeOption).toFixed(2)}`}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Business Information</h2>
            
            <div className="space-y-4">
              {/* Business Name */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Building2 size={16} className="mr-2" />
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Phone size={16} className="mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                />
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={16} className="mr-2" />
                  Address
                </label>
                <div className="space-y-3">
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] resize-none"
                  />
                  <button
                    onClick={() => setShowMap(true)}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors"
                  >
                    <MapPin size={16} className="text-gray-400 mr-2" />
                    <span className="text-gray-600">Update location on map</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Business Hours</h2>
              <button
                onClick={() => {
                  // Copy Monday's hours to all days except Sunday
                  const mondayHours = hours.monday;
                  setHours(prev => {
                    const newHours = { ...prev };
                    Object.keys(newHours).forEach(day => {
                      if (day !== 'sunday') {
                        newHours[day] = { ...mondayHours };
                      }
                    });
                    return newHours;
                  });
                }}
                className="text-sm text-[#FF0000] hover:bg-[#FF0000]/5 px-3 py-1.5 rounded-lg transition-colors"
              >
                Copy Monday to all
              </button>
            </div>

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
                        [day]: { ...prev[day], closed: !e.target.checked }
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
                          [day]: { ...prev[day], open: e.target.value }
                        }))}
                        className="px-3 py-1.5 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="time"
                        value={time.close}
                        onChange={(e) => setHours(prev => ({
                          ...prev,
                          [day]: { ...prev[day], close: e.target.value }
                        }))}
                        className="px-3 py-1.5 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Update Location</h3>
                <button
                  onClick={() => setShowMap(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
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
  );
}