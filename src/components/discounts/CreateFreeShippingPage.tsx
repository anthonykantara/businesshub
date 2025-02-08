import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Save, Check, X } from 'lucide-react';

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'AU', name: 'Australia' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'BR', name: 'Brazil' },
  { code: 'IN', name: 'India' },
  { code: 'RU', name: 'Russia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'MX', name: 'Mexico' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SG', name: 'Singapore' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'TH', name: 'Thailand' }
];

interface CreateFreeShippingPageProps {
  onBack: () => void;
}

export default function CreateFreeShippingPage({ onBack }: CreateFreeShippingPageProps) {
  const [discountCode, setDiscountCode] = useState('');
  const [countries, setCountries] = useState<'all' | 'selected'>('selected');
  const [searchCountries, setSearchCountries] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [showCountryBrowser, setShowCountryBrowser] = useState(false);
  const [excludeOverAmount, setExcludeOverAmount] = useState(false);
  const [excludeAmount, setExcludeAmount] = useState('');
  const [minimumRequirement, setMinimumRequirement] = useState<'none' | 'amount' | 'quantity'>('none');
  const [minimumAmount, setMinimumAmount] = useState('');
  const [minimumQuantity, setMinimumQuantity] = useState('');
  const [usageLimit, setUsageLimit] = useState(false);
  const [totalUsageLimit, setTotalUsageLimit] = useState('');
  const [perCustomerLimit, setPerCustomerLimit] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [hasEndDate, setHasEndDate] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(searchCountries.toLowerCase()) ||
    country.code.toLowerCase().includes(searchCountries.toLowerCase())
  );

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log({
      code: discountCode,
      countries,
      selectedCountries,
      excludeOverAmount,
      excludeAmount,
      minimumRequirement,
      minimumAmount,
      minimumQuantity,
      usageLimit,
      totalUsageLimit,
      perCustomerLimit,
      startDate,
      startTime,
      endDate: hasEndDate ? endDate : null,
      endTime: hasEndDate ? endTime : null
    });
    onBack();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              onClick={onBack} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <ArrowLeft size={32} className="text-gray-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Create discount</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full px-6 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Discount Code */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="e.g. FREESHIP2024"
                  />
                  <button
                    onClick={() => {
                      const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
                      setDiscountCode(randomCode);
                    }}
                    className="px-4 py-2 text-sm font-medium text-[#FF0000] hover:bg-[#FF0000]/5 rounded-lg transition-colors"
                  >
                    Generate Code
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Countries */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-medium text-gray-900">Countries</h2>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={countries === 'all'}
                    onChange={() => setCountries('all')}
                    className="text-[#FF0000] focus:ring-[#FF0000]"
                  />
                  <span className="ml-2 text-sm text-gray-900">All countries</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={countries === 'selected'}
                    onChange={() => setCountries('selected')}
                    className="text-[#FF0000] focus:ring-[#FF0000]"
                  />
                  <span className="ml-2 text-sm text-gray-900">Selected countries</span>
                </label>
                {countries === 'selected' && (
                  <div className="ml-6 space-y-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={searchCountries}
                        onChange={(e) => setSearchCountries(e.target.value)}
                        placeholder="Search countries"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      />
                      <button
                        onClick={() => setShowCountryBrowser(true)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        Browse
                      </button>
                    </div>
                    {selectedCountries.length > 0 && (
                      <div className="space-y-2">
                        {selectedCountries.map(code => {
                          const country = COUNTRIES.find(c => c.code === code);
                          return country && (
                            <div key={code} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                              <span className="text-sm text-gray-900">{country.name}</span>
                              <button
                                onClick={() => setSelectedCountries(prev => prev.filter(c => c !== code))}
                                className="text-gray-400 hover:text-[#FF0000] p-1 rounded-lg hover:bg-[#FF0000]/5 transition-colors"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={excludeOverAmount}
                          onChange={(e) => setExcludeOverAmount(e.target.checked)}
                          className="rounded text-[#FF0000] focus:ring-[#FF0000]"
                        />
                        <span className="ml-2 text-sm text-gray-900">Exclude shipping rates over a certain amount</span>
                      </label>
                      {excludeOverAmount && (
                        <div className="ml-6">
                          <div className="relative w-32">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={excludeAmount}
                              onChange={(e) => setExcludeAmount(e.target.value)}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                            />
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                              <span className="text-gray-500">$</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Minimum Requirements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-medium text-gray-900">Minimum requirements</h2>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={minimumRequirement === 'none'}
                    onChange={() => setMinimumRequirement('none')}
                    className="text-[#FF0000] focus:ring-[#FF0000]"
                  />
                  <span className="ml-2 text-sm text-gray-900">No minimum requirements</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={minimumRequirement === 'amount'}
                    onChange={() => setMinimumRequirement('amount')}
                    className="text-[#FF0000] focus:ring-[#FF0000]"
                  />
                  <span className="ml-2 text-sm text-gray-900">Minimum purchase amount ($)</span>
                </label>
                {minimumRequirement === 'amount' && (
                  <div className="ml-6 mt-2">
                    <div className="relative w-32">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={minimumAmount}
                        onChange={(e) => setMinimumAmount(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      />
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                    </div>
                  </div>
                )}
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={minimumRequirement === 'quantity'}
                    onChange={() => setMinimumRequirement('quantity')}
                    className="text-[#FF0000] focus:ring-[#FF0000]"
                  />
                  <span className="ml-2 text-sm text-gray-900">Minimum quantity of items</span>
                </label>
                {minimumRequirement === 'quantity' && (
                  <div className="ml-6 mt-2">
                    <input
                      type="number"
                      min="1"
                      value={minimumQuantity}
                      onChange={(e) => setMinimumQuantity(e.target.value)}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Usage Limits */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-medium text-gray-900">Usage limits</h2>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={usageLimit}
                    onChange={(e) => setUsageLimit(e.target.checked)}
                    className="rounded text-[#FF0000] focus:ring-[#FF0000]"
                  />
                  <span className="ml-2 text-sm text-gray-900">Limit number of times this discount can be used in total</span>
                </label>
                {usageLimit && (
                  <div className="ml-6">
                    <input
                      type="number"
                      min="1"
                      value={totalUsageLimit}
                      onChange={(e) => setTotalUsageLimit(e.target.value)}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      placeholder="No limit"
                    />
                  </div>
                )}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={perCustomerLimit !== ''}
                    onChange={(e) => setPerCustomerLimit(e.target.checked ? '1' : '')}
                    className="rounded text-[#FF0000] focus:ring-[#FF0000]"
                  />
                  <span className="ml-2 text-sm text-gray-900">Limit to one use per customer</span>
                </label>
              </div>
            </div>
          </div>

          {/* Combinations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-medium text-gray-900">Combinations</h2>
              <p className="text-sm text-gray-600">This product discount can be combined with:</p>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded text-[#FF0000] focus:ring-[#FF0000]"
                  />
                  <span className="ml-2 text-sm text-gray-900">Product discounts</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded text-[#FF0000] focus:ring-[#FF0000]"
                  />
                  <span className="ml-2 text-sm text-gray-900">Order discounts</span>
                </label>
              </div>
            </div>
          </div>

          {/* Active Dates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-medium text-gray-900">Active dates</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start time
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    />
                  </div>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={hasEndDate}
                    onChange={(e) => setHasEndDate(e.target.checked)}
                    className="rounded text-[#FF0000] focus:ring-[#FF0000]"
                  />
                  <span className="ml-2 text-sm text-gray-900">Set end date</span>
                </label>
                {hasEndDate && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End date
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End time
                      </label>
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 flex items-center justify-end space-x-3">
              <button
                onClick={onBack}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                disabled={!discountCode}
                className="flex items-center px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} className="mr-2" />
                Save Discount
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Country Browser Dialog */}
      {showCountryBrowser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Select Countries</h3>
                <button
                  onClick={() => setShowCountryBrowser(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchCountries}
                  onChange={(e) => setSearchCountries(e.target.value)}
                  className="w-full px-4 py-2.5 text-base border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                />
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  {filteredCountries.map((country) => (
                    <label
                      key={country.code}
                      className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-[#FF0000]/5 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCountries.includes(country.code)}
                        onChange={() => {
                          setSelectedCountries(prev =>
                            prev.includes(country.code)
                              ? prev.filter(c => c !== country.code)
                              : [...prev, country.code]
                          );
                        }}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${
                        selectedCountries.includes(country.code)
                          ? 'border-[#FF0000] bg-[#FF0000]'
                          : 'border-gray-300'
                      }`}>
                        {selectedCountries.includes(country.code) && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                      <span className="text-sm text-gray-900">{country.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCountryBrowser(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCountryBrowser(false)}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
              >
                Add Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}