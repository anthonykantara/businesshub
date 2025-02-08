import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Check, X, Mail, Phone, MapPin, Building2, Calendar, ArrowUpRight, ArrowDownRight, Users, DollarSign, ShoppingBag, Star } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalSpent: number;
  totalOrders: number;
  lastOrder: string;
}

const SAMPLE_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Ahmad Khoury',
    email: 'ahmad.khoury@example.com',
    phone: '+961 3 123 456',
    location: 'Beirut, Lebanon',
    totalSpent: 1234.56,
    totalOrders: 12,
    lastOrder: '2024-03-15'
  },
  {
    id: '2',
    name: 'Sarah Nassar',
    email: 'sarah.nassar@example.com',
    phone: '+961 3 234 567',
    location: 'Tripoli, Lebanon',
    totalSpent: 856.78,
    totalOrders: 8,
    lastOrder: '2024-03-14'
  },
  {
    id: '3',
    name: 'Karim Hadad',
    email: 'karim.hadad@example.com',
    phone: '+961 3 345 678',
    location: 'Jounieh, Lebanon',
    totalSpent: 2345.67,
    totalOrders: 18,
    lastOrder: '2024-03-13'
  }
];

const METRICS = [
  {
    label: 'Total Customers',
    value: '1,234',
    change: 12.3,
    icon: Users,
    color: 'emerald'
  },
  {
    label: 'Average Order Value',
    value: '$123.45',
    change: -5.2,
    icon: DollarSign,
    color: 'blue'
  },
  {
    label: 'Orders per Customer',
    value: '3.5',
    change: 8.7,
    icon: ShoppingBag,
    color: 'purple'
  },
  {
    label: 'Customer Satisfaction',
    value: '4.8/5',
    change: 0.5,
    icon: Star,
    color: 'orange'
  }
];

type SortField = 'totalSpent' | 'totalOrders';
type SortDirection = 'asc' | 'desc';

export default function CustomersPage() {
  const [customers] = useState<Customer[]>(SAMPLE_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [sortField, setSortField] = useState<SortField>('totalSpent');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    
    if (sortField === 'totalSpent') {
      return (a.totalSpent - b.totalSpent) * multiplier;
    }
    
    // sortField === 'totalOrders'
    return (a.totalOrders - b.totalOrders) * multiplier;
  });

  return (
    <div className="py-8 px-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-6">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-lg bg-${metric.color}-100 flex items-center justify-center`}>
                  <metric.icon size={24} className={`text-${metric.color}-600`} />
                </div>
                <div className={`px-2.5 py-1.5 rounded-full text-sm font-medium ${
                  metric.change > 0
                    ? 'bg-green-100 text-green-800'
                    : metric.change < 0
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="flex items-center space-x-1">
                    {metric.change > 0 ? (
                      <ArrowUpRight size={14} />
                    ) : metric.change < 0 ? (
                      <ArrowDownRight size={14} />
                    ) : null}
                    <span>{Math.abs(metric.change)}%</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
                <p className="mt-2 text-3xl font-bold text-gray-900">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200">
          <div className="p-4 space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px]">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                  />
                </div>
              </div>

              <div className="flex space-x-2">
              </div>
            </div>
          </div>

          {/* Customers Table */}
          <div className="border-t border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th 
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                    onClick={() => handleSort('totalSpent')}
                  >
                    <div className="flex items-center justify-end space-x-1">
                      <span>Total Spent</span>
                      <div className="relative w-4 h-4">
                        {sortField === 'totalSpent' ? (
                          sortDirection === 'desc' ? (
                            <ChevronDown size={16} className="text-[#FF0000]" />
                          ) : (
                            <ChevronUp size={16} className="text-[#FF0000]" />
                          )
                        ) : (
                          <ChevronDown size={16} className="text-gray-400 opacity-0 group-hover:opacity-100" />
                        )}
                      </div>
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                    onClick={() => handleSort('totalOrders')}
                  >
                    <div className="flex items-center justify-end space-x-1">
                      <span>Orders</span>
                      <div className="relative w-4 h-4">
                        {sortField === 'totalOrders' ? (
                          sortDirection === 'desc' ? (
                            <ChevronDown size={16} className="text-[#FF0000]" />
                          ) : (
                            <ChevronUp size={16} className="text-[#FF0000]" />
                          )
                        ) : (
                          <ChevronDown size={16} className="text-gray-400 opacity-0 group-hover:opacity-100" />
                        )}
                      </div>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Order
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    onClick={() => setSelectedCustomer(customer)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900">
                            {customer.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail size={14} className="mr-1.5" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone size={14} className="mr-1.5" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin size={14} className="mr-1.5" />
                        {customer.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-medium text-gray-900">
                        ${customer.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-gray-900">{customer.totalOrders}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1.5" />
                        {new Date(customer.lastOrder).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Customer Details</h3>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Name</h4>
                    <p className="text-base text-gray-900">{selectedCustomer.name}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedCustomer.location}</span>
                    </div>
                  </div>
                </div>

                {/* Order History */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Order History</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500">Total Spent</div>
                      <div className="mt-1 text-lg font-medium text-gray-900">
                        ${selectedCustomer.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500">Total Orders</div>
                      <div className="mt-1 text-lg font-medium text-gray-900">
                        {selectedCustomer.totalOrders}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500">Last Order</div>
                      <div className="mt-1 text-lg font-medium text-gray-900">
                        {new Date(selectedCustomer.lastOrder).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}