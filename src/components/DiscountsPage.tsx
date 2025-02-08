import React, { useState } from 'react';
import { Search, Percent, Plus, Tag, Box, Truck, ShoppingBag, X, Copy } from 'lucide-react';
import CreateAmountOffProductsPage from './discounts/CreateAmountOffProductsPage';
import CreateAmountOffOrderPage from './discounts/CreateAmountOffOrderPage';
import CreateFreeShippingPage from './discounts/CreateFreeShippingPage';

interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  status: 'Active' | 'Expired' | 'Scheduled';
  startDate: string;
  endDate: string;
  usageCount: number;
  usageLimit?: number;
  brands?: string[];
}

const SAMPLE_DISCOUNTS: Discount[] = [
  {
    id: '1',
    code: '15OFFJG',
    type: 'percentage',
    value: 20,
    status: 'Active',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    usageCount: 145,
    usageLimit: 200
  },
  {
    id: '2',
    code: 'NEWCUST10',
    type: 'fixed',
    value: 10,
    status: 'Active',
    startDate: '2024-03-15',
    endDate: '2024-04-15',
    usageCount: 50
  },
  {
    id: '3',
    code: 'HOLIDAY15',
    type: 'percentage',
    value: 15,
    status: 'Scheduled',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    usageCount: 0,
    usageLimit: 300
  }
];

const BRANDS = [
  {
    id: '1',
    name: 'Coffee House',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=64&h=64&q=80'
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

const DISCOUNT_TYPES = [
  {
    id: 'amount-off-products',
    title: 'Amount off products',
    icon: Tag,
    description: 'Apply a discount to specific products'
  },
  {
    id: 'amount-off-order',
    title: 'Amount off order',
    icon: Box,
    description: 'Apply a discount to the entire order'
  },
  {
    id: 'free-shipping',
    title: 'Free shipping',
    icon: Truck,
    description: 'Offer free shipping on orders'
  },
];

export default function DiscountsPage() {
  const [discounts] = useState<Discount[]>(SAMPLE_DISCOUNTS);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dealsDiscount, setDealsDiscount] = useState(10);
  const [showDiscountTypes, setShowDiscountTypes] = useState(false);
  const [selectedDiscountType, setSelectedDiscountType] = useState<string | null>(null);

  const filteredDiscounts = discounts.filter(discount =>
    discount.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Discount['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Expired':
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    selectedDiscountType === 'amount-off-products' ? (
      <CreateAmountOffProductsPage onBack={() => setSelectedDiscountType(null)} />
    ) : selectedDiscountType === 'amount-off-order' ? (
      <CreateAmountOffOrderPage onBack={() => setSelectedDiscountType(null)} />
    ) : selectedDiscountType === 'free-shipping' ? (
      <CreateFreeShippingPage onBack={() => setSelectedDiscountType(null)} />
    ) : (
    <div className="py-8 px-8">
      <div className="space-y-6">
        {/* 961 Deals Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">961 Deals</h2>
              <div className="flex items-center space-x-2">
                <div className="relative w-24">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={dealsDiscount}
                    onChange={(e) => setDealsDiscount(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-full pl-3 pr-7 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] text-right"
                  />
                  <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none">
                    <Percent size={14} className="text-gray-400" />
                  </div>
                </div>
                <span className="text-sm text-gray-500">Discount</span>
              </div>
            </div>
          </div>
        </div>

        {/* Discounts List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Discounts</h2>
              <button
                onClick={() => setShowDiscountTypes(true)}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Create Discount</span>
              </button>
            </div>

            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search discounts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-y border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usage
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDiscounts.map((discount) => (
                    <tr 
                      key={discount.id} 
                      onClick={() => {
                        setSelectedDiscount(discount);
                        setSelectedDiscountType('amount-off-products');
                      }}
                      className="hover:bg-gray-50 cursor-pointer group"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-lg font-medium text-gray-900 flex items-center">
                            <span>{discount.code}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(discount.code);
                              }}
                              className="ml-2 p-1 text-gray-400 hover:text-[#FF0000] rounded opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Copy code"
                            >
                              <Copy size={16} />
                            </button>
                          </div>
                          <div className="text-base font-medium text-gray-500">
                            {discount.type === 'percentage' 
                              ? `${discount.value}% off 3 products`
                              : `$${discount.value} off 3 products`
                            }
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${
                          getStatusColor(discount.status)
                        }`}>
                          {discount.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-lg text-gray-900">
                          {discount.usageCount}
                          {discount.usageLimit && (
                            <span className="text-lg text-gray-500">
                              {' '}/ {discount.usageLimit}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Discount Type Selection Dialog */}
      {showDiscountTypes && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Select Discount Type</h3>
                <button
                  onClick={() => setShowDiscountTypes(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3">
                {DISCOUNT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setShowDiscountTypes(false);
                      setSelectedDiscountType(type.id);
                    }}
                    className="flex items-center w-full p-4 border border-gray-200 rounded-lg hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#FF0000]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF0000]/10">
                      <type.icon size={20} className="text-[#FF0000]" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">{type.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    )
  );
}