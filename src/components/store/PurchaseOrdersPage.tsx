import React, { useState } from 'react';
import { Search, Filter, Plus, ChevronDown, Check, Building2, Calendar, FileText, X } from 'lucide-react';
import CreatePurchaseOrderForm from './CreatePurchaseOrderForm';

interface PurchaseOrder {
  id: string;
  number: string;
  date: string;
  supplier: {
    name: string;
    image: string;
  };
  status: 'draft' | 'pending' | 'arrived';
  total: number;
  items: number;
  expectedDate: string;
  orderItems: Array<{
    id: string;
    name: string;
    quantity: number;
    receivedQuantity?: number;
    price: number;
  }>;
}

const SAMPLE_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: '1',
    number: 'PO-2024-001',
    date: '2024-03-15',
    supplier: {
      name: 'Coffee Bean Suppliers Ltd',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=64&h=64&q=80'
    },
    status: 'pending',
    total: 2500.00,
    items: 3,
    expectedDate: '2024-03-25',
    orderItems: [
      { id: '1', name: 'Arabica Dark Roast Beans', quantity: 100, price: 15.00 },
      { id: '2', name: 'Robusta Beans', quantity: 50, price: 12.00 },
      { id: '3', name: 'Colombian Beans', quantity: 75, price: 14.00 }
    ]
  },
  {
    id: '2',
    number: 'PO-2024-002',
    date: '2024-03-14',
    supplier: {
      name: 'Premium Packaging Co',
      image: 'https://images.unsplash.com/photo-1530982011887-3cc11cc85693?auto=format&fit=crop&w=64&h=64&q=80'
    },
    status: 'draft',
    total: 1200.00,
    items: 2,
    expectedDate: '2024-03-28',
    orderItems: [
      { id: '4', name: 'Coffee Bags (250g)', quantity: 1000, price: 0.80 },
      { id: '5', name: 'Coffee Bags (500g)', quantity: 500, price: 1.00 }
    ]
  },
  {
    id: '3',
    number: 'PO-2024-003',
    date: '2024-03-13',
    supplier: {
      name: 'Global Coffee Equipment',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=64&h=64&q=80'
    },
    status: 'arrived',
    total: 5000.00,
    items: 4,
    expectedDate: '2024-03-30',
    orderItems: [
      { id: '6', name: 'Coffee Grinder', quantity: 5, price: 400.00, receivedQuantity: 5 },
      { id: '7', name: 'Espresso Machine', quantity: 2, price: 1200.00, receivedQuantity: 2 },
      { id: '8', name: 'Coffee Scale', quantity: 10, price: 80.00, receivedQuantity: 10 },
      { id: '9', name: 'Pour Over Kit', quantity: 8, price: 75.00, receivedQuantity: 8 }
    ]
  }
];

const STATUSES = ['draft', 'pending', 'arrived'] as const;

export default function PurchaseOrdersPage() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(SAMPLE_PURCHASE_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [showArrivalModal, setShowArrivalModal] = useState(false);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [receivedQuantities, setReceivedQuantities] = useState<{ [key: string]: number }>({});
  const [showCreatePO, setShowCreatePO] = useState(false);

  const filteredPOs = purchaseOrders.filter(po => {
    const matchesSearch = 
      po.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      po.supplier.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(po.status);
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: PurchaseOrder['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-purple-100 text-purple-800';
      case 'arrived':
        return 'bg-green-100 text-green-800';
    }
  };

  const handleConfirmArrival = (po: PurchaseOrder) => {
    setSelectedPO(po);
    setReceivedQuantities(
      po.orderItems.reduce((acc, item) => ({
        ...acc,
        [item.id]: item.quantity
      }), {})
    );
    setShowArrivalModal(true);
  };

  const handleSaveArrival = () => {
    if (!selectedPO) return;

    setPurchaseOrders(purchaseOrders.map(po => {
      if (po.id === selectedPO.id) {
        return {
          ...po,
          status: 'arrived' as const,
          orderItems: po.orderItems.map(item => ({
            ...item,
            receivedQuantity: receivedQuantities[item.id]
          }))
        };
      }
      return po;
    }));

    setShowArrivalModal(false);
    setSelectedPO(null);
  };
  const handleCreatePO = (data: any) => {
    // In a real app, this would make an API call
    console.log('Creating PO:', data);
    setShowCreatePO(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Purchase Orders</h1>
        <button 
          onClick={() => setShowCreatePO(true)}
          className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Create PO</span>
        </button>
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
                  placeholder="Search purchase orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-base border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <button
                onClick={() => setShowStatusFilter(!showStatusFilter)}
                className="px-4 py-2.5 text-base border border-gray-200 rounded-lg hover:border-[#FF0000] focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] bg-white flex items-center space-x-2"
              >
                <Filter size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">Status</span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>

              {showStatusFilter && (
                <div className="absolute z-10 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="p-2">
                    {STATUSES.map((status) => (
                      <label
                        key={status}
                        className="flex items-center px-2 py-1 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStatuses.includes(status)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStatuses([...selectedStatuses, status]);
                            } else {
                              setSelectedStatuses(selectedStatuses.filter(s => s !== status));
                            }
                          }}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          selectedStatuses.includes(status)
                            ? 'border-[#FF0000] bg-[#FF0000]'
                            : 'border-gray-300'
                        }`}>
                          {selectedStatuses.includes(status) && (
                            <Check size={12} className="text-white" />
                          )}
                        </div>
                        <span className="ml-2 text-base text-gray-900 capitalize">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Purchase Orders Table */}
        <div className="border-t border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purchase Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expected Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPOs.map((po) => (
                <tr key={po.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <FileText size={20} className="text-gray-400" />
                      <span className="text-base font-medium text-gray-900">{po.number}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-base text-gray-900">
                      {new Date(po.date).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <img
                          src={po.supplier.image}
                          alt={po.supplier.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-base text-gray-900">{po.supplier.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded text-sm font-medium ${getStatusColor(po.status)}`}>
                      {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                    </span>
                    {po.status === 'pending' && (
                      <button
                        onClick={() => handleConfirmArrival(po)}
                        className="ml-2 text-sm text-[#FF0000] hover:text-[#FF0000]/80"
                      >
                        Confirm Arrival
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-base text-gray-900">{po.items} items</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-base text-gray-900">
                      {new Date(po.expectedDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-base font-medium text-gray-900">
                      ${po.total.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Arrival Confirmation Modal */}
      {showArrivalModal && selectedPO && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Confirm Arrival - {selectedPO.number}</h3>
                <button
                  onClick={() => setShowArrivalModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Confirm the received quantities for each item. Adjust if different from ordered quantity.
                </p>

                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Ordered</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Received</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedPO.orderItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-900">{item.name}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-sm text-gray-900">{item.quantity}</span>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={receivedQuantities[item.id]}
                            onChange={(e) => {
                              const value = Math.max(0, parseInt(e.target.value) || 0);
                              setReceivedQuantities({
                                ...receivedQuantities,
                                [item.id]: value
                              });
                            }}
                            className="w-24 px-2 py-1 text-center border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowArrivalModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveArrival}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
              >
                Confirm Arrival
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create PO Form */}
      {showCreatePO && (
        <CreatePurchaseOrderForm
          onClose={() => setShowCreatePO(false)}
          onSubmit={handleCreatePO}
        />
      )}
    </div>
  );
}