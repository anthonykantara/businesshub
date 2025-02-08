import { useState } from 'react';
import { Search, Calendar, Building2, Download, ArrowUpRight, ArrowDownRight, RefreshCw, ChevronDown } from 'lucide-react';
import type { Transaction } from '../WalletPage';

const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'payment',
    amount: 150.00,
    date: '2024-03-15',
    description: 'Marketing Campaign Payment',
    status: 'completed',
    brandId: '1',
    brandName: 'Coffee House',
    paymentMethod: 'Visa •••• 4242'
  },
  {
    id: '2',
    type: 'topup',
    amount: 500.00,
    date: '2024-03-14',
    description: 'Wallet Top Up',
    status: 'completed',
    paymentMethod: 'Cash'
  },
  {
    id: '3',
    type: 'refund',
    amount: 25.00,
    date: '2024-03-13',
    description: 'Refund - Campaign Adjustment',
    status: 'completed',
    brandId: '2',
    brandName: 'Urban Wear'
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

export default function TransactionList() {
  const [transactions] = useState<Transaction[]>(SAMPLE_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrands.length === 0 || (transaction.brandId && selectedBrands.includes(transaction.brandId));
    const matchesDate = true; // Implement date filtering if needed
    return matchesSearch && matchesBrand && matchesDate;
  });

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'payment':
        return <ArrowUpRight className="text-red-500" />;
      case 'topup':
        return <ArrowDownRight className="text-green-500" />;
      case 'refund':
        return <RefreshCw className="text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-gray-200 space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
              />
            </div>
          </div>
          
          <div className="w-48">
            <div className="relative group">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded-lg hover:border-[#FF0000] focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] bg-white"
              >
                <span className="text-sm text-gray-900">
                  {selectedBrands.length === 0 
                    ? 'All Brands' 
                    : selectedBrands.length === 1
                      ? BRANDS.find(b => b.id === selectedBrands[0])?.name
                      : `${selectedBrands.length} Brands Selected`
                  }
                </span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setSelectedBrands([]);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                        selectedBrands.length === 0 ? 'text-[#FF0000] font-medium' : ''
                      }`}
                    >
                      All Brands
                    </button>
                    {BRANDS.map(brand => (
                      <button
                        key={brand.id}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedBrands(prev => {
                            if (prev.includes(brand.id)) {
                              return prev.filter(id => id !== brand.id);
                            }
                            return [...prev, brand.id];
                          });
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-3"
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          selectedBrands.includes(brand.id)
                            ? 'border-[#FF0000] bg-[#FF0000]'
                            : 'border-gray-300'
                        }`}>
                          {selectedBrands.includes(brand.id) && (
                            <Check size={12} className="text-white" />
                          )}
                        </div>
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
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

          <div className="flex space-x-2">
            <div className="w-36">
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
              />
            </div>
            <div className="w-36">
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
              />
            </div>
          </div>

          <button className="px-4 py-2 text-sm font-medium text-[#FF0000] hover:bg-[#FF0000]/5 rounded-lg transition-colors flex items-center space-x-2">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.description}
                      </div>
                      {transaction.paymentMethod && (
                        <div className="text-sm text-gray-500">
                          {transaction.paymentMethod}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-medium ${
                    transaction.type === 'payment' ? 'text-red-600' : 
                    transaction.type === 'topup' ? 'text-green-600' : 
                    'text-blue-600'
                  }`}>
                    {transaction.type === 'payment' ? '-' : '+'}
                    ${transaction.amount.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {transaction.brandName ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img
                          src={BRANDS.find(b => b.id === transaction.brandId)?.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-gray-900">{transaction.brandName}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}