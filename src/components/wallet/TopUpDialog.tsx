import { useState, useCallback } from 'react';
import { X, MapPin, Wallet, Search, Crosshair, ArrowLeft, Building2 } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';

interface TopUpDialogProps {
  onClose: () => void;
  onTopUp: (amount: number) => void;
}

export default function TopUpDialog({ onClose, onTopUp }: TopUpDialogProps) {
  const [amount, setAmount] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'agent' | 'pickup' | null>(null);
  const [businessAddress, setBusinessAddress] = useState('123 Business Street, City, State 12345');
  const [amountError, setAmountError] = useState(false);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, '');
    const numAmount = parseInt(numericValue) || 0;
    setAmountError(numAmount < 5);
    
    if (numericValue === '') {
      setAmount('');
      setAmountError(false);
    } else {
      setAmount(numAmount.toString());
    }
  };

  const handleSubmit = () => {
    const numAmount = parseFloat(amount) || 0;
    if (numAmount >= 5 && selectedMethod === 'pickup') {
      setShowLocationPicker(true);
    }
  };

  const handleRequestPickup = () => {
    const numAmount = parseFloat(amount) || 0;
    if (numAmount > 0) {
      onTopUp(numAmount);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Top Up with Cash</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <div className="space-y-1">
              <input
                type="text"
                placeholder="$0"
                value={amount ? `$${amount}` : ''}
                onChange={handleAmountChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-1 ${
                  amountError 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-[#FF0000] focus:ring-[#FF0000]'
                }`}
              />
              <p className={`text-xs ${amountError ? 'text-red-500' : 'text-gray-500'}`}>
                Minimum: $5
              </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Collection Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setShowMap(true)}
                  className={`flex items-center justify-center p-4 border rounded-lg space-x-2 transition-colors ${
                    selectedMethod === 'agent'
                      ? 'border-[#FF0000] bg-[#FF0000]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <MapPin size={20} className="text-gray-600" />
                  <span className="text-gray-700">Find Agent</span>
                </button>
                <button
                  onClick={() => setSelectedMethod('pickup')}
                  className={`flex items-center justify-center p-4 border rounded-lg space-x-2 transition-colors ${
                    selectedMethod === 'pickup'
                      ? 'border-[#FF0000] bg-[#FF0000]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Wallet size={20} className="text-gray-600" />
                  <span className="text-gray-700">Request Pickup</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <div className="flex justify-end w-full">
            <button
              onClick={handleSubmit}
              disabled={!amount || parseFloat(amount) < 5 || selectedMethod !== 'pickup'}
              className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Agent Map Dialog */}
      {showMap && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-xl w-full max-w-3xl mx-4">
            <div className="p-6" onClick={() => setSelectedMethod('agent')}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setShowMap(false);
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <h3 className="text-xl font-bold text-gray-900">Find Nearby Agent</h3>
                </div>
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
                      <p className="text-sm text-gray-400">Would integrate with Google Maps or similar service</p>
                    </div>
                  </div>
                </div>

                {/* Agent List */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Nearby Agents</h4>
                  <div className="space-y-3">
                    {[
                      { id: 1, fee: 'Free', distance: 0.1 },
                      { id: 2, fee: '$1.00', distance: 0.2 },
                      { id: 3, fee: '$2.00', distance: 0.3 }
                    ].map((agent) => (
                      <div key={agent.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <h5 className="font-medium text-gray-900">Agent Location #{agent.id}</h5>
                            <p className="text-sm text-gray-500">123 Business Street, City</p>
                            <p className="text-sm text-gray-500">Open until 6:00 PM</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">Top Up Fee: {agent.fee}</p>
                          </div>
                          <div className="text-sm text-gray-500">{agent.distance} miles away</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location Picker Dialog */}
      {showLocationPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowLocationPicker(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <h3 className="text-xl font-bold text-gray-900">Select Pickup Location</h3>
                </div>
              </div>

              <div className="space-y-6">
                {/* Business Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Address
                  </label>
                  <div className="flex items-center space-x-2">
                    <Building2 size={20} className="text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    />
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="relative w-full h-[300px] bg-gray-100 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200/50 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={48} className="mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-500">Map integration placeholder</p>
                      <p className="text-sm text-gray-400">Click to pin your exact location</p>
                    </div>
                  </div>
                </div>

                {/* Amount Display */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Top Up Amount:</span>
                    <span className="text-sm font-medium text-gray-900">${amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pickup Fee:</span>
                    <span className="text-sm font-medium text-gray-900">$5</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Total Amount:</span>
                      <span className="text-sm font-medium text-gray-900">${parseInt(amount) + 5}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 italic">
                    Exact amount required as the pickup driver doesn't carry change
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleRequestPickup}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
              >
                Request Pickup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}