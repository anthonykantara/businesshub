import React from 'react';
import { useState } from 'react';
import { ArrowLeft, Package, Truck, Clock, AlertCircle, MapPin, Phone, Mail, Building2, CreditCard, Receipt, Download, Printer, Paperclip, Check, Pencil, X, Plus, Search, ChevronDown, Star, QrCode, Home, Briefcase } from 'lucide-react';
import type { Order } from './OrdersPage';

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Free for orders over $20 in Lebanon or $100 international',
    price: 3.50,
    estimatedDays: '3-5'
  },
  {
    id: 'priority',
    name: 'Priority',
    description: '+$14.99 to standard rate if international',
    price: 4.99,
    estimatedDays: '1-2'
  }
];

const DELIVERY_LOCATIONS = [
  { id: 'home', name: 'Home', icon: Home },
  { id: 'office', name: 'Office', icon: Briefcase }
];
interface FulfillmentDialogProps {
  order: Order;
  onClose: () => void;
  onFulfill: () => void;
}

const FulfillmentDialog: React.FC<FulfillmentDialogProps> = ({ order, onClose, onFulfill }) => {
  const [selectedDocuments, setSelectedDocuments] = useState<Array<'packing_slip' | 'shipping_label'>>(['packing_slip', 'shipping_label']);

  const handlePrintPackingSlip = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
            <html>
              <head>
                <title>Packing Slip - ${order.id}</title>
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
                  <h1>Packing Slip</h1>
                  <p>Order ${order.id}</p>
                </div>
                <div class="order-info">
                  <p><strong>Customer:</strong> ${order.customer.name}</p>
                  <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                  <p><strong>Shipping Address:</strong> ${order.destination}</p>
                </div>
                <table class="items">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${order.orderItems.map(item => `
                      <tr>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
                <button onclick="window.print()">Print Packing Slip</button>
              </body>
            </html>
      `);
    }
  };

  const handlePrintShippingLabel = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
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
                      <div style="font-size: 24px;">QR</div>
                      QR Code
                    </div>
                  </div>
                  <div class="order-id">${order.id}</div>
                  <div class="customer">
                    <strong>Deliver to:</strong><br>
                    ${order.customer.name}<br>
                    ${order.customer.address.street}<br>
                    ${order.customer.address.city}, ${order.customer.address.country}
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
  };

  const handleFulfill = () => {
    onFulfill();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Fulfill Order</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">Select the documents you want to print:</p>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Receipt size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Packing Slip</p>
                    <p className="text-xs text-gray-500">Print item list for packing</p>
                  </div>
                </div>
                <button
                  onClick={handlePrintPackingSlip}
                  className="px-3 py-1.5 text-sm font-medium text-[#FF0000] hover:bg-[#FF0000]/5 rounded-lg transition-colors"
                >
                  Print
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <QrCode size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Shipping Label</p>
                    <p className="text-xs text-gray-500">Print shipping label with QR code</p>
                  </div>
                </div>
                <button
                  onClick={handlePrintShippingLabel}
                  className="px-3 py-1.5 text-sm font-medium text-[#FF0000] hover:bg-[#FF0000]/5 rounded-lg transition-colors"
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={handleFulfill}
            className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Mark as Fulfilled
          </button>
        </div>
      </div>
    </div>
  );
};

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  variants?: {
    id: string;
    name: string;
    price?: number;
  }[];
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Coffee Beans - Dark Roast',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=100&h=100&q=80',
    price: 19.00,
    variants: [
      { id: '1-1', name: '250g' },
      { id: '1-2', name: '500g', price: 35.00 },
      { id: '1-3', name: '1kg', price: 65.00 }
    ]
  },
  {
    id: '2',
    name: 'Coffee Mug',
    image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=100&h=100&q=80',
    price: 15.00,
    variants: [
      { id: '2-1', name: 'Black' },
      { id: '2-2', name: 'White' }
    ]
  },
  {
    id: '3',
    name: 'Coffee Filter',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=100&h=100&q=80',
    price: 12.00
  }
];

interface Staff {
  id: string;
  name: string;
  initials: string;
}

const STAFF_MEMBERS: Staff[] = [
  { id: '1', name: 'John Smith', initials: 'JS' },
  { id: '2', name: 'Alice Kim', initials: 'AK' },
  { id: '3', name: 'Mike Ross', initials: 'MR' }
];

interface OrderDetailsPageProps {
  order: Order;
  onBack: () => void;
  onFulfill: (orderId: string) => void;
}

export default function OrderDetailsPage({ order, onBack, onFulfill }: OrderDetailsPageProps) {
  const [showFulfillDialog, setShowFulfillDialog] = useState(false);
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(DELIVERY_OPTIONS[0]);
  const [selectedLocation, setSelectedLocation] = useState(DELIVERY_LOCATIONS[0]);
  const [comment, setComment] = useState('');
  const [showStaffDropdown, setShowStaffDropdown] = useState(false);
  const [showEditItems, setShowEditItems] = useState(false);
  const [editedItems, setEditedItems] = useState(order.orderItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [staffMentions, setStaffMentions] = useState<Staff[]>([]);

  const getRiskStats = () => {
    // In a real app, these would come from the API
    return {
      changedOrders: 1,
      deliveryIssues: 0,
      fakeOrders: 0,
      rejectedOrders: 0,
      canceledOrders: 0,
      exchanges: 0,
      returns: 0,
      numberOfOrders: 5
    };
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity >= 0) {
      setEditedItems(prev => prev.map((item, i) => 
        i === index ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleAddProduct = () => {
    if (selectedProduct) {
      const variant = selectedProduct.variants?.find(v => v.id === selectedVariant);
      const price = variant?.price || selectedProduct.price;
      
      setEditedItems(prev => [...prev, {
        name: `${selectedProduct.name}${variant ? ` - ${variant.name}` : ''}`,
        quantity: 1,
        price,
        image: selectedProduct.image
      }]);
      
      setSelectedProduct(null);
      setSelectedVariant(null);
    }
  };

  const handleRemoveItem = (index: number) => {
    setEditedItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveChanges = () => {
    // Update order items and total
    const newTotal = editedItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    order.orderItems = editedItems;
    order.total = newTotal;
    setShowEditItems(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setComment(value);
    
    // Get cursor position and text before cursor
    const cursorPos = e.target.selectionStart || 0;
    const textBeforeCursor = value.slice(0, cursorPos);
    
    // Show staff dropdown when typing @ and some text after it
    const lastAtSymbol = textBeforeCursor.lastIndexOf('@');
    if (lastAtSymbol !== -1 && lastAtSymbol === textBeforeCursor.length - 1) {
      setShowStaffDropdown(true);
    } else if (lastAtSymbol !== -1) {
      const query = textBeforeCursor.slice(lastAtSymbol + 1).toLowerCase();
      const filteredStaff = STAFF_MEMBERS.filter(staff => 
        staff.name.toLowerCase().includes(query)
      );
      if (filteredStaff.length > 0) {
        setShowStaffDropdown(true);
      } else {
        setShowStaffDropdown(false);
      }
    } else {
      setShowStaffDropdown(false);
    }
  };

  const handleStaffSelect = (staff: Staff) => {
    setStaffMentions(prev => [...prev, staff]);
    setComment(prev => prev.slice(0, -1) + `@${staff.name} `);
    setShowStaffDropdown(false);
  };

  const handlePostComment = () => {
    if (comment.trim() || selectedFile) {
      // In a real app, this would make an API call to save the comment
      console.log('Posting comment:', {
        text: comment,
        file: selectedFile,
        mentions: staffMentions
      });
      
      // Reset form
      setComment('');
      setSelectedFile(null);
      setStaffMentions([]);
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getOrderRisk = () => {
    const stats = getRiskStats();

    if (stats.numberOfOrders === 0) {
      return { level: 'no_info', score: 0 };
    }

    // Weight factors for each issue type (higher = more severe)
    const weights = {
      changed: 1,      // Lowest impact
      exchange: 2,     // Minor impact
      returns: 3,      // Moderate impact
      delivery: 4,     // Significant impact
      rejected: 5,     // High impact
      fake: 5,         // High impact
      canceled: 5      // High impact
    };

    // Calculate weighted risk score
    const riskScore = 
      stats.changedOrders * weights.changed +
      stats.exchanges * weights.exchange +
      stats.returns * weights.returns +
      stats.deliveryIssues * weights.delivery +
      stats.rejectedOrders * weights.rejected +
      stats.fakeOrders * weights.fake +
      stats.canceledOrders * weights.canceled;

    if (stats.numberOfOrders > 0 && riskScore === 0) {
      return { level: 'low', score: 0 };
    }

    // Calculate risk level based on weighted score per order
    const scorePerOrder = riskScore / stats.numberOfOrders;

    if (scorePerOrder <= 1) {
      return { level: 'low', score: scorePerOrder };
    } else if (scorePerOrder <= 3) {
      return { level: 'medium', score: scorePerOrder };
    } else {
      return { level: 'high', score: scorePerOrder };
    }
  };

  const getRiskColor = (risk: 'none' | 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'no_info':
        return 'bg-gray-100 text-gray-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
    }
  };

  const orderRisk = getOrderRisk();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-500" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Order {order.id}</h1>
                <p className="text-sm text-gray-500 mt-1">{formatDate(order.date)}</p>
              </div>
              <div className="ml-3 flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.paymentStatus === 'paid' ? 'Paid' : 'Payment Pending'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {order.fulfillmentStatus === 'unfulfilled' && (
                <button
                  onClick={() => setShowFulfillDialog(true)}
                  className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors flex items-center space-x-2"
                >
                  Fulfill Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Order */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-base font-medium text-gray-900">Order</h2>
                <button
                  onClick={() => setShowEditItems(true)}
                  className="p-2 text-gray-400 hover:text-[#FF0000] rounded-lg transition-colors"
                >
                  <Pencil size={16} />
                </button>
              </div>
              {/* Items */}
              <div className="divide-y divide-gray-200">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="p-6 flex items-center">
                    <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(item.quantity * item.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              {/* Delivery Info */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-900">Delivery</h3>
                  <button
                    onClick={() => {
                      setShowDeliveryDialog(true);
                    }}
                    className="p-2 text-gray-400 hover:text-[#FF0000] rounded-lg transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Truck size={16} className="mr-2 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-900">{order.deliveryMethod}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin size={16} className="mr-2 text-gray-400 flex-shrink-0" />
                    <div className="flex items-center space-x-2">
                      <span>Home</span>
                      <span>•</span>
                      <span>{order.destination}</span>
                      <button 
                        onClick={() => {
                          window.open(`https://www.google.com/maps?q=${order.customer.address.coordinates.lat},${order.customer.address.coordinates.lng}`, '_blank');
                        }}
                        className="text-[#FF0000] hover:text-[#FF0000]/80 font-medium ml-2"
                      >
                        View on Map
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-base font-medium text-gray-900">Payment</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal ({order.orderItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span className="text-gray-900">${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Discount</span>
                    <span className="text-gray-900">-$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-gray-900">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${order.total.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 flex justify-between text-sm font-medium border-t border-gray-200">
                    <span className="text-gray-500">Paid</span>
                    <span className={`${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-gray-900'}`}>
                      ${order.paymentStatus === 'paid' ? order.total.toFixed(2) : '0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-900">Balance</span>
                    <span className={`${order.paymentStatus === 'paid' ? 'text-gray-900' : 'text-red-600'}`}>
                      ${order.paymentStatus === 'paid' ? '0.00' : order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-base font-medium text-gray-900">Timeline</h2>
                <div className="mt-2 relative">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={handleCommentChange}
                      className="w-full pl-4 pr-20 py-2 border border-gray-200 rounded-lg focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                      <label className="cursor-pointer p-2 hover:text-gray-900 transition-colors">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <div className="text-gray-400 hover:text-gray-600">
                          {selectedFile ? (
                            <span className="text-sm text-gray-600">{selectedFile.name}</span>
                          ) : (
                            <Paperclip size={16} />
                          )}
                        </div>
                      </label>
                      <button
                        onClick={handlePostComment}
                        disabled={!comment.trim() && !selectedFile}
                        className="px-3 py-1 text-gray-600 text-sm font-medium hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                  {showStaffDropdown && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      {STAFF_MEMBERS.map(staff => (
                        <button
                          key={staff.id}
                          onClick={() => handleStaffSelect(staff)}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">{staff.initials}</span>
                          </div>
                          <span className="text-gray-900">{staff.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
                  <div className="space-y-8">
                    {/* Staff Comment */}
                    <div className="relative flex items-center space-x-4">
                      <div className="flex-shrink-0 w-16">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">JS</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">John Smith</p>
                          <span className="text-xs text-gray-500">Staff</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Customer requested express delivery</p>
                        <p className="text-xs text-gray-500 mt-1">March 9, 2024 at 8:15 PM</p>
                      </div>
                    </div>

                    {/* System Events */}
                    <div className="relative flex items-center space-x-4">
                      <div className="flex-shrink-0 w-16">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Clock size={16} className="text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Order placed</p>
                        <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                      </div>
                    </div>

                    {/* Staff Comment */}
                    <div className="relative flex items-center space-x-4">
                      <div className="flex-shrink-0 w-16">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">AK</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">Alice Kim</p>
                          <span className="text-xs text-gray-500">Staff</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Verified customer's delivery address</p>
                        <p className="text-xs text-gray-500 mt-1">March 9, 2024 at 8:10 PM</p>
                      </div>
                    </div>

                    {order.paymentStatus === 'paid' && (
                      <div className="relative flex items-center space-x-4">
                        <div className="flex-shrink-0 w-16">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <CreditCard size={16} className="text-green-600" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Payment received</p>
                          <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                        </div>
                      </div>
                    )}

                    {/* Staff Comment */}
                    <div className="relative flex items-center space-x-4">
                      <div className="flex-shrink-0 w-16">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">MR</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">Mike Ross</p>
                          <span className="text-xs text-gray-500">Staff</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Started order preparation</p>
                        <p className="text-xs text-gray-500 mt-1">March 9, 2024 at 8:05 PM</p>
                      </div>
                    </div>

                    {order.fulfillmentStatus === 'unfulfilled' ? (
                      <div className="relative flex items-center space-x-4">
                        <div className="flex-shrink-0 w-16">
                          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Package size={16} className="text-yellow-600" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Awaiting fulfillment</p>
                          <p className="text-sm text-gray-500">Order needs to be prepared for shipping</p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative flex items-center space-x-4">
                        <div className="flex-shrink-0 w-16">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <Package size={16} className="text-green-600" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Order fulfilled</p>
                          <p className="text-sm text-gray-500">Order has been prepared for delivery</p>
                        </div>
                      </div>
                    )}

                    {order.status === 'scheduled' && (
                      <div className="relative flex items-center space-x-4">
                        <div className="flex-shrink-0 w-16">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Truck size={16} className="text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Scheduled for delivery</p>
                          <p className="text-sm text-gray-500">Estimated delivery: Tomorrow, 2:00 PM - 6:00 PM</p>
                        </div>
                      </div>
                    )}

                    {order.status === 'delivered' && (
                      <div className="relative flex items-center space-x-4">
                        <div className="flex-shrink-0 w-16">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <Check size={16} className="text-green-600" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Delivered</p>
                          <p className="text-sm text-gray-500">Order has been delivered successfully</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-base font-medium text-gray-900">Customer</h2>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-900">{order.customer.name}</h3>
                <p className="text-sm text-gray-500 -mt-1">@{order.customer.username}</p>
                <div className="space-y-4 pt-2">
                  <div className="flex items-start text-sm text-gray-500">
                    <Mail size={16} className="mr-2 text-gray-400 flex-shrink-0" />
                    {order.customer.email}
                  </div>
                  <div className="flex items-start text-sm text-gray-500">
                    <Phone size={16} className="mr-2 text-gray-400 flex-shrink-0" />
                    {order.customer.phone}
                  </div>
                  <div className="flex items-start text-sm text-gray-500">
                    <MapPin size={16} className="mr-2 text-gray-400 flex-shrink-0" />
                    <div>
                      <p>{order.customer.address.street}</p>
                      <p>{order.customer.address.city}, {order.customer.address.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star size={16} className="mr-2 text-gray-400" />
                    961 Deals Member: No
                  </div>
                </div>
              </div>
            </div>

            {/* Conversion Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-base font-medium text-gray-900">Conversion Summary</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">First order date</span>
                    <span className="text-gray-900">
                      {new Date('2024-03-09').toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Number of visits</span>
                    <span className="text-gray-900">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Number of orders</span>
                    <span className="text-gray-900">3</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-4">
                    <span className="text-gray-500">Total spend</span>
                    <span className="text-gray-900 font-medium">$245.50</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Risk */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <h2 className="text-base font-medium text-gray-900">Risk</h2>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(orderRisk.level)}`}>
                    {orderRisk.level.charAt(0).toUpperCase() + orderRisk.level.slice(1)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Number of Orders:</span>
                    <span className="text-gray-900">{getRiskStats().numberOfOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Changed:</span>
                    <span className="text-gray-900">{getRiskStats().changedOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Delivery Issues:</span>
                    <span className="text-gray-900">{getRiskStats().deliveryIssues}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fake:</span>
                    <span className="text-gray-900">{getRiskStats().fakeOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rejected at delivery:</span>
                    <span className="text-gray-900">{getRiskStats().rejectedOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Canceled:</span>
                    <span className="text-gray-900">{getRiskStats().canceledOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Exchanges:</span>
                    <span className="text-gray-900">{getRiskStats().exchanges}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Returns:</span>
                    <span className="text-gray-900">{getRiskStats().returns}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Edit Items Dialog */}
      {showEditItems && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Edit Order Items</h3>
                <button
                  onClick={() => setShowEditItems(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Current Items */}
              <div className="space-y-4 mb-6">
                <h4 className="text-sm font-medium text-gray-700">Current Items</h4>
                <div className="divide-y divide-gray-200">
                  {editedItems.map((item, index) => (
                    <div key={index} className="py-4 flex items-center">
                      <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(index, item.quantity - 1)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 text-center border border-gray-200 rounded-lg"
                          />
                          <button
                            onClick={() => handleQuantityChange(index, item.quantity + 1)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Product */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">Add Product</h4>
                {!selectedProduct ? (
                  <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    />
                    {searchQuery.length > 0 && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        {SAMPLE_PRODUCTS.filter(p => 
                          p.name.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map(product => (
                          <button
                            key={product.id}
                            onClick={() => {
                              setSelectedProduct(product);
                              setSelectedVariant(null);
                              setSearchQuery('');
                            }}
                            className="w-full flex items-center p-3 hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-12 h-12 rounded-lg overflow-hidden mr-3 border border-gray-200">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 text-left">
                              <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                              <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-lg overflow-hidden mr-3 border border-gray-200">
                          <img
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{selectedProduct.name}</h3>
                          <p className="text-sm text-gray-500">${selectedProduct.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedProduct(null);
                          setSelectedVariant(null);
                        }}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>

                {selectedProduct?.variants && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Select Variant</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProduct.variants.map(variant => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant.id)}
                          className={`px-4 py-2 text-sm border rounded-lg transition-colors ${
                            selectedVariant === variant.id
                              ? 'border-[#FF0000] bg-[#FF0000]/5 text-[#FF0000]'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {variant.name}
                          {variant.price && ` - $${variant.price.toFixed(2)}`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                  </div>
                )}

                {selectedProduct && (
                  <button
                    onClick={handleAddProduct}
                    disabled={selectedProduct.variants && !selectedVariant}
                    className="w-full flex items-center justify-center px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} className="mr-2" />
                    Add to Order
                  </button>
                )}
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm">
                <span className="text-gray-500">Total:</span>
                <span className="ml-2 font-medium text-gray-900">
                  ${editedItems.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}
                </span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowEditItems(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fulfillment Dialog */}
      {showFulfillDialog && (
        <FulfillmentDialog
          order={order}
          onClose={() => setShowFulfillDialog(false)}
          onFulfill={() => {
            onFulfill(order.id);
            setShowFulfillDialog(false);
          }}
        />
      )}

      {/* Delivery Dialog */}
      {showDeliveryDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Delivery Options</h3>
                <button
                  onClick={() => setShowDeliveryDialog(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Delivery Method */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">Delivery Method</h4>
                  <div className="space-y-3">
                    {DELIVERY_OPTIONS.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedDeliveryOption.id === option.id
                            ? 'border-[#FF0000] bg-[#FF0000]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="delivery_option"
                          checked={selectedDeliveryOption.id === option.id}
                          onChange={() => setSelectedDeliveryOption(option)}
                          className="sr-only"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{option.name}</p>
                            <p className="text-sm font-medium text-gray-900">
                              ${option.price.toFixed(2)}
                              {option.id === 'standard' && (
                                <span className="text-xs text-gray-500 ml-1">(Free over $20)</span>
                              )}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                        </div>
                        <div className={`ml-4 w-5 h-5 rounded-full border flex items-center justify-center ${
                          selectedDeliveryOption.id === option.id
                            ? 'border-[#FF0000] bg-[#FF0000]'
                            : 'border-gray-300'
                        }`}>
                          {selectedDeliveryOption.id === option.id && (
                            <Check size={12} className="text-white" />
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Delivery Location */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">Delivery Location</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {DELIVERY_LOCATIONS.map((location) => {
                      const Icon = location.icon;
                      return (
                        <label
                          key={location.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedLocation.id === location.id
                              ? 'border-[#FF0000] bg-[#FF0000]/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="delivery_location"
                            checked={selectedLocation.id === location.id}
                            onChange={() => setSelectedLocation(location)}
                            className="sr-only"
                          />
                          <Icon size={16} className="mr-2 text-gray-500" />
                          <span className="text-sm font-medium text-gray-900">{location.name}</span>
                          <div className={`ml-auto w-5 h-5 rounded-full border flex items-center justify-center ${
                            selectedLocation.id === location.id
                              ? 'border-[#FF0000] bg-[#FF0000]'
                              : 'border-gray-300'
                          }`}>
                            {selectedLocation.id === location.id && (
                              <Check size={12} className="text-white" />
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowDeliveryDialog(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In a real app, this would update the order's delivery details
                  setShowDeliveryDialog(false);
                }}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}