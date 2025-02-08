import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Save } from 'lucide-react';

interface CreateAmountOffOrderPageProps {
  onBack: () => void;
}

export default function CreateAmountOffOrderPage({ onBack }: CreateAmountOffOrderPageProps) {
  const [discountCode, setDiscountCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState('');
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

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log({
      code: discountCode,
      type: discountType,
      value: discountValue,
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
                    placeholder="e.g. SUMMER2024"
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

          {/* Discount Value */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Discount Value
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-1 max-w-[200px]">
                      <select
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value as 'percentage' | 'fixed')}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] appearance-none pr-8"
                      >
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed amount</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative flex-1 max-w-[150px]">
                      <input
                        type="number"
                        min="0"
                        step={discountType === 'percentage' ? '1' : '0.01'}
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                        placeholder="0"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        {discountType === 'percentage' ? '%' : '$'}
                      </div>
                    </div>
                  </div>
                </div>
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
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded text-[#FF0000] focus:ring-[#FF0000]"
                  />
                  <span className="ml-2 text-sm text-gray-900">Shipping discounts</span>
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
                disabled={!discountCode || !discountValue}
                className="flex items-center px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} className="mr-2" />
                Save Discount
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}