import React, { useState, useEffect } from 'react';
import { Search, DollarSign, Users, ArrowUp, ArrowDown, ChevronDown, ChevronLeft, ChevronRight, X, Check, ArrowLeft, Crosshair, MapPin, AlertCircle, Settings } from 'lucide-react';

const BRANDS = [
  {
    id: '1',
    name: 'Coffee House',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=64&h=64&q=80',
    fee: 2,
    lastFeeChange: '2024-02-15'
  },
  {
    id: '2',
    name: 'Urban Wear',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=64&h=64&q=80',
    fee: 1,
    lastFeeChange: '2024-03-01'
  },
  {
    id: '3',
    name: 'Tech Gadgets',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=64&h=64&q=80',
    fee: 0.5,
    lastFeeChange: '2024-03-10'
  }
];

interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
}

interface Transaction {
  id: string;
  date: string;
  type: 'top_up' | 'settlement';
  userId: string;
  username: string;
  amount: number;
  fee: number;
  status: 'completed' | 'pending' | 'failed';
}

const SAMPLE_USERS: User[] = [
  {
    id: '1',
    username: 'ahmad.k',
    fullName: 'Ahmad Khoury',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=64&h=64&q=80'
  },
  {
    id: '2',
    username: 'sarah.n',
    fullName: 'Sarah Nassar',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80'
  }
];

const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    date: '2024-03-15T14:30:00',
    type: 'top_up',
    userId: '1',
    username: 'ahmad.k',
    amount: 100,
    fee: 2,
    status: 'completed'
  },
  {
    id: '2',
    date: '2024-03-15T13:15:00',
    type: 'top_up',
    userId: '2',
    username: 'sarah.n',
    amount: 50,
    fee: 1,
    status: 'completed'
  }
];

export default function AgentDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [amount, setAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSettlementOptions, setShowSettlementOptions] = useState(false);
  const [showPickupRequest, setShowPickupRequest] = useState(false);
  const [showWhishTransfer, setShowWhishTransfer] = useState(false);
  const [showAgentMap, setShowAgentMap] = useState(false);
  const [showFeeSettings, setShowFeeSettings] = useState(false);
  const [selectedBrandForFee, setSelectedBrandForFee] = useState<(typeof BRANDS)[0] | null>(null);
  const [newFee, setNewFee] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState<Transaction[]>(SAMPLE_TRANSACTIONS);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({
    totalTopUps: 0,
    totalEarnings: 0,
    unsettledBalance: 0
  });

  // Update stats when transactions change
  useEffect(() => {
    const newStats = transactions.reduce((acc, transaction) => {
      if (transaction.status === 'completed') {
        if (transaction.type === 'top_up') {
          acc.totalTopUps++;
          acc.totalEarnings += transaction.fee;
          acc.unsettledBalance += transaction.fee;
        } else if (transaction.type === 'settlement') {
          acc.unsettledBalance -= transaction.amount;
        }
      }
      return acc;
    }, {
      totalTopUps: 0,
      totalEarnings: 0,
      unsettledBalance: 0
    });

    setStats(newStats);
  }, [transactions]);

  // Calculate settlement deadline
  const getSettlementDeadline = () => {
    const now = new Date();
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    lastDayOfMonth.setHours(17, 0, 0, 0); // 5 PM
    
    // If today is after the last business day of the month, show next month
    if (now > lastDayOfMonth) {
      lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
    }
    
    return lastDayOfMonth;
  };

  const getSettlementUrgency = () => {
    const deadline = getSettlementDeadline();
    const now = new Date();
    const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDeadline <= 2) return 'high';
    if (daysUntilDeadline <= 5) return 'medium';
    return 'low';
  };

  const canChangeFee = (lastChangeDate: string) => {
    const lastChange = new Date(lastChangeDate);
    const now = new Date();
    const monthsSinceChange = (now.getFullYear() - lastChange.getFullYear()) * 12 + 
      now.getMonth() - lastChange.getMonth();
    return monthsSinceChange >= 1;
  };

  const handleFeeChange = () => {
    if (!selectedBrandForFee || !newFee) return;
    
    // Update brand's fee
    const updatedBrands = BRANDS.map(brand => 
      brand.id === selectedBrandForFee.id 
        ? { 
            ...brand, 
            fee: parseFloat(newFee),
            lastFeeChange: new Date().toISOString().split('T')[0]
          }
        : brand
    );
    
    // In a real app, this would be an API call
    console.log('Updated brands:', updatedBrands);
    
    setShowFeeSettings(false);
    setSelectedBrandForFee(null);
    setNewFee('');
  };

  // Filter users based on search query
  useEffect(() => {
    const filtered = SAMPLE_USERS.filter(user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setShowUserDropdown(false);
  };

  const handleTopUp = () => {
    if (!selectedUser || !amount) return;

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    // Calculate fee based on amount
    const fee = 2; // This would be based on agent's fee settings

    const newTransaction: Transaction = {
      id: (transactions.length + 1).toString(),
      date: new Date().toISOString(),
      type: 'top_up',
      userId: selectedUser.id,
      username: selectedUser.username,
      amount: numAmount,
      fee,
      status: 'completed'
    };

    setTransactions([newTransaction, ...transactions]);
    setSelectedUser(null);
    setAmount('');
    setShowConfirmation(false);
  };

  const itemsPerPage = 20;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  return (
    <div className="py-8 px-8">
      <div className="space-y-6">
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Users size={24} className="text-green-600" />
              </div>
              <div className="px-2.5 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <div className="flex items-center space-x-1">
                  <ArrowUp size={14} />
                  <span>12%</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">Total Top Ups</h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.totalTopUps}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <DollarSign size={24} className="text-blue-600" />
              </div>
              <div className="px-2.5 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <div className="flex items-center space-x-1">
                  <ArrowUp size={14} />
                  <span>8.7%</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">Total Earnings</h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">${stats.totalEarnings.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <DollarSign size={24} className="text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">Unsettled Balance</h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">${stats.unsettledBalance.toFixed(2)}</p>
              
              {/* Settlement Deadline */}
              {stats.unsettledBalance > 0 && (
                <div className={`mt-2 p-2 rounded-lg ${
                  getSettlementUrgency() === 'high' ? 'bg-red-100 text-red-800' :
                  getSettlementUrgency() === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  <div className="flex items-center space-x-2">
                    <AlertCircle size={16} />
                    <span className="text-sm font-medium">
                      Settle by {getSettlementDeadline().toLocaleDateString()} at 5 PM
                    </span>
                  </div>
                </div>
              )}
              
              <button
                disabled={stats.unsettledBalance <= 0}
                onClick={() => setShowSettlementOptions(true)}
                className="mt-4 px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Settle Balance
              </button>
              <button
                onClick={() => setShowFeeSettings(true)}
                className="mt-2 px-4 py-2 w-full text-[#FF0000] hover:bg-[#FF0000]/5 text-sm font-medium rounded-lg transition-colors flex items-center justify-center"
              >
                <Settings size={16} className="mr-2" />
                Manage Fees
              </button>
            </div>
          </div>
        </div>

        {/* Top Up Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Top Up</h2>
            <div className="grid grid-cols-2 gap-6">
              {/* User Search */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by username..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowUserDropdown(true);
                    }}
                    onFocus={() => setShowUserDropdown(true)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                  />
                  <ChevronDown 
                    size={20} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                  />
                </div>

                {showUserDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => handleUserSelect(user)}
                          className="w-full px-4 py-2 flex items-center hover:bg-gray-50"
                        >
                          <img
                            src={user.avatar}
                            alt={user.fullName}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div className="text-left">
                            <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                            <div className="text-sm text-gray-500">@{user.username}</div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No users found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Selected User Display */}
            {selectedUser && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.fullName}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{selectedUser.fullName}</div>
                    <div className="text-sm text-gray-500">@{selectedUser.username}</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {/* Top Up Button */}
            <div className="mt-6">
              <button
                onClick={() => setShowConfirmation(true)}
                disabled={!selectedUser || !amount || parseFloat(amount) <= 0}
                className="w-full px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Top Up
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Transaction History</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-y border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Brand
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.slice(0, 5).map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(transaction.date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.type === 'top_up'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {transaction.type === 'top_up' ? 'Top Up' : 'Settlement'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={selectedBrand.image}
                            alt={selectedBrand.name}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <span className="text-sm text-gray-900">{selectedBrand.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        @{transaction.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                        ${transaction.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                        ${transaction.fee.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Settings Modal */}
      {showFeeSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Manage Top-up Fees</h3>
              
              <div className="space-y-4">
                {BRANDS.map((brand) => (
                  <div key={brand.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                          <div className="text-sm text-gray-500">Current fee: ${brand.fee.toFixed(2)}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedBrandForFee(brand);
                          setNewFee(brand.fee.toString());
                        }}
                        disabled={!canChangeFee(brand.lastFeeChange)}
                        className="px-3 py-1.5 text-sm text-[#FF0000] hover:bg-[#FF0000]/5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Change
                      </button>
                    </div>
                    {!canChangeFee(brand.lastFeeChange) && (
                      <p className="mt-2 text-xs text-gray-500">
                        Fee can be changed once per month. Last changed: {new Date(brand.lastFeeChange).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => {
                  setShowFeeSettings(false);
                  setSelectedBrandForFee(null);
                  setNewFee('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Fee Modal */}
      {selectedBrandForFee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Change Top-up Fee</h3>
              <p className="text-gray-600 mb-6">Set a new fee for {selectedBrandForFee.name}</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Fee Amount
                  </label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      min="0"
                      max="2"
                      step="0.5"
                      value={newFee}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value >= 0 && value <= 2) {
                          setNewFee(e.target.value);
                        }
                      }}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      placeholder="0.00"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Maximum fee: $2.00
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setSelectedBrandForFee(null);
                  setNewFee('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFeeChange}
                disabled={!newFee || parseFloat(newFee) < 0 || parseFloat(newFee) > 2}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && selectedUser && amount && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Top Up</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Top Up Amount</span>
                  <span className="text-base font-medium text-gray-900">${parseFloat(amount).toFixed(2)}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Top Up Fee</span>
                  <span className="text-base font-medium text-gray-900">$2.00</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-[#FF0000]/5 rounded-lg">
                  <span className="text-base font-medium text-gray-900">Total to Collect</span>
                  <span className="text-xl font-bold text-[#FF0000]">${(parseFloat(amount) + 2).toFixed(2)}</span>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.fullName}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{selectedUser.fullName}</div>
                    <div className="text-sm text-gray-500">@{selectedUser.username}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleTopUp}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
              >
                Confirm Top Up
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settlement Options Modal */}
      {showSettlementOptions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Settlement Options</h3>
              
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setShowSettlementOptions(false);
                    setShowPickupRequest(true);
                  }}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors"
                >
                  <div>
                    <div className="text-base font-medium text-gray-900">Cash Pickup</div>
                    <div className="text-sm text-gray-500">$5 fee</div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>

                <button
                  onClick={() => {
                    setShowSettlementOptions(false);
                    setShowAgentMap(true);
                  }}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors"
                >
                  <div>
                    <div className="text-base font-medium text-gray-900">At Another Agent</div>
                    <div className="text-sm text-gray-500">Find nearby agents</div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>

                <button
                  disabled
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg opacity-50 cursor-not-allowed"
                >
                  <div>
                    <div className="text-base font-medium text-gray-900">Office Drop Off</div>
                    <div className="text-sm text-gray-500">Free (Coming Soon)</div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>

                <button
                  onClick={() => {
                    setShowSettlementOptions(false);
                    setShowWhishTransfer(true);
                  }}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors"
                >
                  <div>
                    <div className="text-base font-medium text-gray-900">Whish</div>
                    <div className="text-sm text-gray-500">Instant transfer</div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowSettlementOptions(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cash Pickup Request Modal */}
      {showPickupRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cash Pickup Request</h3>
              <p className="text-gray-600 mb-6">Request a pickup and we'll come to your location for just $5</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Office
                  </label>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-900">Main Business Office</div>
                    <div className="text-sm text-gray-500 mt-1">123 Business Street, City</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Brands to Include
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Save on pickup fees by combining multiple brands in one pickup
                  </p>
                  <div className="space-y-2">
                    {BRANDS.map((brand) => (
                      <label
                        key={brand.id}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedBrands.includes(brand.id)
                            ? 'border-[#FF0000] bg-[#FF0000]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedBrands([...selectedBrands, brand.id]);
                            } else {
                              setSelectedBrands(selectedBrands.filter(id => id !== brand.id));
                            }
                          }}
                          className="sr-only"
                        />
                        <div className="flex items-center flex-1">
                          <img
                            src={brand.image}
                            alt={brand.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="ml-3 text-sm font-medium text-gray-900">{brand.name}</span>
                        </div>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                          selectedBrands.includes(brand.id)
                            ? 'border-[#FF0000] bg-[#FF0000]'
                            : 'border-gray-300'
                        }`}>
                          {selectedBrands.includes(brand.id) && <Check size={12} className="text-white" />}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowPickupRequest(false);
                  setSelectedBrands([]);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowPickupRequest(false);
                  setSelectedBrands([]);
                  // Handle pickup request
                }}
                disabled={selectedBrands.length === 0}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Pickup Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Whish Transfer Modal */}
      {showWhishTransfer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Settle Through Whish</h3>
              
              <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <p className="text-lg font-medium text-gray-900 mb-2 text-left">
                  Send ${stats.unsettledBalance.toFixed(2)} to
                </p>
                <p className="text-2xl font-bold text-gray-900 mb-4 text-left">76169619</p>
                <p className="text-sm text-gray-500 italic text-left">
                  This number is only for transfers, not calls or messages
                </p>
                <p className="mt-4 text-sm text-gray-500 italic text-left">
                  Note: Your balance will be updated after we confirm the transfer
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowWhishTransfer(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowWhishTransfer(false);
                  // Handle transfer confirmation
                }}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
              >
                Click Here When Transfer Sent
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Agent Map Modal */}
      {showAgentMap && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowAgentMap(false)}
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
                      { id: 1, name: 'Abou Ali Cell Shop', distance: 0.2, fee: '$0', status: 'Open Now' },
                      { id: 2, name: 'Em Ali Cell Shop', distance: 0.3, fee: '$0', status: 'Open Now' }
                    ].map((agent) => (
                      <div key={agent.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <h5 className="font-medium text-gray-900">{agent.name}</h5>
                            <p className="text-sm text-gray-500">Top up fee: {agent.fee}</p>
                            <div className="flex items-center mt-2">
                              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                                {agent.status}
                              </span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">{agent.distance}km away</div>
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
    </div>
  );
}