import React, { useState } from 'react';
import { Search, Filter, Download, ChevronDown, Eye, Clock, Package, Truck, AlertCircle, X, Check, Printer, QrCode } from 'lucide-react';
import OrderDetailsPage from './OrderDetailsPage';

interface Order {
  id: string;
  date: string;
  customer: {
    name: string;
    username: string;
    phone: string;
    email: string;
    address: {
      street: string;
      city: string;
      country: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
  };
  total: number;
  paymentStatus: 'pending' | 'paid';
  status: 'preorder' | 'pending' | 'scheduled' | 'delivered';
  items: number;
  destination: string;
  fulfillmentStatus: 'fulfilled' | 'unfulfilled';
  deliveryMethod: string;
  orderItems: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
}

export const SAMPLE_ORDERS: Order[] = [
  {
    id: '#1493',
    date: '2024-03-09T20:04:00',
    customer: {
      name: 'Elie Saliba',
      username: 'eliesaliba',
      phone: '+961 3 123 456',
      email: 'elie.saliba@example.com',
      address: {
        street: '123 Pine Street',
        city: 'Byblos',
        country: 'LB',
        coordinates: {
          lat: 34.1232,
          lng: 35.6512
        }
      }
    },
    total: 34.00,
    paymentStatus: 'pending',
    status: 'preorder',
    items: 2,
    destination: 'Byblos, LB',
    fulfillmentStatus: 'unfulfilled',
    deliveryMethod: 'Standard Delivery',
    orderItems: [
      { 
        name: 'Coffee Beans - Dark Roast',
        quantity: 1,
        price: 19.00,
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=100&h=100&q=80'
      },
      { 
        name: 'Coffee Mug',
        quantity: 1,
        price: 15.00,
        image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=100&h=100&q=80'
      }
    ]
  },
  {
    id: '#1492',
    date: '2024-03-09T15:36:00',
    customer: {
      name: 'Rita Kadi',
      username: 'ritakadi',
      phone: '+961 3 234 567',
      email: 'rita.kadi@example.com',
      address: {
        street: '456 Cedar Avenue',
        city: 'Fanar',
        country: 'LB',
        coordinates: {
          lat: 33.8842,
          lng: 35.5642
        }
      }
    },
    total: 22.99,
    paymentStatus: 'pending',
    status: 'pending',
    items: 1,
    destination: 'Fanar, LB',
    fulfillmentStatus: 'unfulfilled',
    deliveryMethod: 'Express Delivery',
    orderItems: [
      { name: 'Coffee Beans - Light Roast', quantity: 1, price: 22.99 }
    ]
  },
  {
    id: '#1491',
    date: '2024-03-09T14:22:00',
    customer: {
      name: 'Marwan Khoury',
      username: 'marwankhoury',
      phone: '+961 3 345 678',
      email: 'marwan.khoury@example.com',
      address: {
        street: '789 Oak Road',
        city: 'Jounieh',
        country: 'LB',
        coordinates: {
          lat: 33.9812,
          lng: 35.6182
        }
      }
    },
    total: 89.99,
    paymentStatus: 'paid',
    status: 'scheduled',
    items: 3,
    destination: 'Jounieh, LB'
  },
  {
    id: '#1490',
    date: '2024-03-09T12:15:00',
    customer: {
      name: 'Sarah Nassar',
      username: 'sarahnassar',
      phone: '+961 3 456 789',
      email: 'sarah.nassar@example.com',
      address: {
        street: '321 Maple Lane',
        city: 'Beirut',
        country: 'LB',
        coordinates: {
          lat: 33.8938,
          lng: 35.5018
        }
      }
    },
    total: 45.50,
    paymentStatus: 'paid',
    status: 'delivered',
    items: 2,
    destination: 'Beirut, LB'
  },
  {
    id: '#1489',
    date: '2024-03-09T10:45:00',
    customer: {
      name: 'Karim Hadad',
      username: 'karimhadad',
      phone: '+961 3 567 890',
      email: 'karim.hadad@example.com',
      address: {
        street: '654 Palm Street',
        city: 'Tripoli',
        country: 'LB',
        coordinates: {
          lat: 34.4332,
          lng: 35.8492
        }
      }
    },
    total: 129.99,
    paymentStatus: 'paid',
    status: 'preorder',
    items: 4,
    destination: 'Tripoli, LB'
  }
];

const ORDER_STATUSES = [
  { label: 'All', value: 'all' },
  { label: 'Preorder', value: 'preorder' },
  { label: 'Pending', value: 'pending' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Delivered', value: 'delivered' }
];

const PAYMENT_STATUSES = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' }
];

interface OrdersPageProps {
  onOrderSelect: (orderId: string) => void;
}

export default function OrdersPage({ onOrderSelect }: OrdersPageProps) {
  const [orders] = useState<Order[]>(SAMPLE_ORDERS);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState('all');
  const [showLebanonOnly, setShowLebanonOnly] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).replace(',', ' at');
  };

  // Stats for the current period
  const stats = {
    orders: orders.length,
    itemsOrdered: orders.reduce((sum, order) => sum + order.items, 0),
    returns: 0,
    ordersDelivered: orders.filter(o => o.status === 'delivered').length,
    fulfillmentTime: '0'
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.destination.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesPayment = selectedPayment === 'all' || order.paymentStatus === selectedPayment;
    const matchesLebanon = !showLebanonOnly || order.destination.endsWith(', LB');
    
    return matchesSearch && matchesStatus && matchesPayment && matchesLebanon;
  });

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleFulfillOrders = () => {
    const ordersToPrint = orders.filter(order => selectedOrders.includes(order.id));
    
    ordersToPrint.forEach(order => {
      // Print Invoice
      const invoiceWindow = window.open('', '_blank');
      if (invoiceWindow) {
        invoiceWindow.document.write(`
          <html>
            <head>
              <title>Invoice - ${order.id}</title>
              <style>
                body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; }
                .header { text-align: center; margin-bottom: 40px; }
                .order-info { margin-bottom: 30px; }
                .items { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                .items th, .items td { padding: 10px; text-align: left; border-bottom: 1px solid #eee; }
                .total { text-align: right; }
                @media print {
                  body { padding: 0; }
                  button { display: none; }
                }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Invoice</h1>
                <p>Order ${order.id}</p>
              </div>
              <div class="order-info">
                <p><strong>Customer:</strong> ${order.customer}</p>
                <p><strong>Date:</strong> ${formatDate(order.date)}</p>
                <p><strong>Shipping Address:</strong> ${order.destination}</p>
              </div>
              <table class="items">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${order.orderItems.map(item => `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.quantity}</td>
                      <td>$${item.price.toFixed(2)}</td>
                      <td>$${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              <div class="total">
                <p><strong>Total: $${order.total.toFixed(2)}</strong></p>
              </div>
              <button onclick="window.print()">Print Invoice</button>
            </body>
          </html>
        `);
      }

      // Print Shipping Label
      const labelWindow = window.open('', '_blank');
      if (labelWindow) {
        labelWindow.document.write(`
          <html>
            <head>
              <title>Shipping Label - ${order.id}</title>
              <style>
                body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; }
                .label { border: 2px solid #000; padding: 20px; max-width: 400px; margin: 0 auto; }
                .qr-placeholder { border: 1px solid #000; width: 100px; height: 100px; margin: 20px auto; display: flex; align-items: center; justify-content: center; }
                .order-id { font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0; }
                .customer { margin: 20px 0; }
                @media print {
                  body { padding: 0; }
                  button { display: none; }
                }
              </style>
            </head>
            <body>
              <div class="label">
                <div class="qr-placeholder">
                  <div style="text-align: center;">
                    <div style="font-size: 24px;"><QrCode /></div>
                    QR Code
                  </div>
                </div>
                <div class="order-id">${order.id}</div>
                <div class="customer">
                  <strong>Deliver to:</strong><br>
                  ${order.customer}<br>
                  ${order.destination}
                </div>
                <div style="text-align: center; font-size: 12px;">
                  Scan QR code in driver app for delivery details
                </div>
              </div>
              <button onclick="window.print()">Print Label</button>
            </body>
          </html>
        `);
      }
    });

    setSelectedOrders([]);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Orders</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{stats.orders}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Items ordered</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{stats.itemsOrdered}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Returns</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">US${stats.returns}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Orders fulfilled</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{stats.ordersFulfilled}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Orders delivered</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{stats.ordersDelivered}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Order to fulfillment time</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{stats.fulfillmentTime}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-sm">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                disabled={selectedOrders.length === 0}
                onClick={handleFulfillOrders}
                className="px-4 py-2 bg-[#FF0000] text-white text-base font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                Fulfill Orders
              </button>
              <div className="relative w-64">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative inline-block">
                <button
                  onClick={() => {
                    setShowStatusDropdown(!showStatusDropdown);
                    setShowPaymentDropdown(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF0000] inline-flex items-center"
                >
                  <Filter size={16} className="mr-2" />
                  Status
                  <ChevronDown size={16} className="ml-2" />
                </button>
                {showStatusDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    {ORDER_STATUSES.map((status) => (
                      <button
                        key={status.value}
                        onClick={() => {
                          setSelectedStatus(status.value);
                          setShowStatusDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          selectedStatus === status.value
                            ? 'bg-[#FF0000]/5 text-[#FF0000]'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative inline-block">
                <button
                  onClick={() => {
                    setShowPaymentDropdown(!showPaymentDropdown);
                    setShowStatusDropdown(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF0000] inline-flex items-center"
                >
                  <Filter size={16} className="mr-2" />
                  Payment
                  <ChevronDown size={16} className="ml-2" />
                </button>
                {showPaymentDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    {PAYMENT_STATUSES.map((status) => (
                      <button
                        key={status.value}
                        onClick={() => {
                          setSelectedPayment(status.value);
                          setShowPaymentDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          selectedPayment === status.value
                            ? 'bg-[#FF0000]/5 text-[#FF0000]'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setShowLebanonOnly(!showLebanonOnly)}
                className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                  showLebanonOnly
                    ? 'bg-[#FF0000]/5 text-[#FF0000] border-[#FF0000]'
                    : 'text-gray-700 bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                Lebanon Only
              </button>
              <button className="p-2 text-gray-400 hover:text-[#FF0000] rounded-lg transition-colors">
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-y border-gray-200">
              <tr>
                <th className="pl-6 pr-3 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-300 text-[#FF0000] focus:ring-[#FF0000]"
                      checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destination
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr 
                  key={order.id}
                  className="hover:bg-gray-50"
                >
                  <td className="pl-6 pr-3 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-gray-300 text-[#FF0000] focus:ring-[#FF0000]"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                    <button
                      onClick={() => {
                        onOrderSelect(order.id);
                      }}
                      className="text-gray-900 hover:text-gray-700 hover:underline"
                    >
                      {order.id}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">
                    {order.customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-base font-medium ${
                      order.paymentStatus === 'paid'
                        ? 'text-gray-500'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-base font-medium ${
                      order.status === 'delivered' ? 'text-gray-500' :
                      order.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                    {order.items} {order.items === 1 ? 'item' : 'items'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                    {order.destination}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}