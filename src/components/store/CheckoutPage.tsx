import React, { useState } from 'react';
import { ArrowLeft, CreditCard, DollarSign, ChevronRight, ShoppingCart, Plus, X, MapPin, Wallet, Check, Package, Truck, Calendar, Send } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { items: cartItems } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'priority'>('standard');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber] = useState(`#${Math.floor(100000 + Math.random() * 900000)}`);
  const [estimatedDelivery] = useState(
    new Date(Date.now() + (deliveryMethod === 'priority' ? 5 : 7) * 24 * 60 * 60 * 1000)
      .toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  );
  const [items, setItems] = useState<Array<any>>(cartItems);
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'card' | 'cod'>('wallet');
  const [selectedCard, setSelectedCard] = useState<string>('1');
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    save: true
  });
  const [walletBalance] = useState(2500.00);
  const [savedCards] = useState([
    { id: '1', last4: '4242', brand: 'Visa', expMonth: 12, expYear: 2024 },
    { id: '2', last4: '8888', brand: 'Mastercard', expMonth: 3, expYear: 2025 }
  ]);

  // Initialize items from cart when component mounts
  React.useEffect(() => {
    const initialItems = cartItems.map(item => ({
      ...item,
      type: 'product'
    }));
    setItems(initialItems);
  }, [cartItems]);

  const cartCount = items.length;
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [has961Deals, setHas961Deals] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number | null>(0);
  const [customDonation, setCustomDonation] = useState('');
  const [showCustomDonation, setShowCustomDonation] = useState(false);

  // Sample saved addresses
  const [savedAddresses] = useState([
    {
      id: '1',
      name: 'Home',
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Home Street',
      apartment: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 (555) 123-4567'
    },
    {
      id: '2',
      name: 'Office',
      firstName: 'John',
      lastName: 'Doe',
      address: '456 Office Avenue',
      apartment: 'Suite 200',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      phone: '+1 (555) 987-6543'
    }
  ]);

  // Calculate subtotal for products only (excluding membership)
  const productSubtotal = items.reduce((sum, item) => {
    if (item.type === 'product') {
      const itemTotal = item.price * item.quantity;
      return sum + itemTotal;
    }
    return sum;
  }, 0);

  // Calculate 961 Deals discount (10% off products only, not membership or delivery)
  const dealsDiscount = has961Deals ? (productSubtotal * 0.1) : 0;

  // Add 961 Deals membership to cart
  const handleAdd961Deals = (isYearly: boolean) => {
    setHas961Deals(true);
    
    setItems(prev => {
      // Remove any existing membership
      const filteredItems = prev.filter(item => item.type !== 'membership');
      
      // Add new membership
      return [...filteredItems, {
        id: isYearly ? 'deals-yearly' : 'deals-monthly',
        title: `961 Deals ${isYearly ? 'Yearly' : 'Monthly'} Membership`,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=64&h=64&q=80',
        price: isYearly ? 49.99 : 4.99,
        quantity: 1,
        type: 'membership'
      }];
    });
  };

  // Calculate membership cost
  const membershipItem = items.find(item => item.type === 'membership');
  const membershipCost = membershipItem ? membershipItem.price : 0;

  const handleDonationSelect = (amount: number | null) => {
    setDonationAmount(amount);
    setShowCustomDonation(amount === null);
    if (amount !== null) {
      setCustomDonation('');
    }
  };

  const handleCustomDonationChange = (value: string) => {
    const numValue = parseFloat(value);
    if (value === '' || (numValue >= 1 && numValue <= 10000)) {
      setCustomDonation(value);
      setDonationAmount(value === '' ? null : numValue);
    }
  };

  // Calculate totals
  const subtotal = productSubtotal + membershipCost;
  const delivery = productSubtotal >= 20 ? 0 : 
    deliveryMethod === 'standard' ? 3.50 : 4.99;
  const total = subtotal + delivery - dealsDiscount + (donationAmount || 0);

  // Calculate points earned (20 points per dollar spent)
  const pointsEarned = Math.round(total * 20);

  const handleCompleteOrder = () => {
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="space-y-12">
            {/* Success Message */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#FF0000]/10 flex items-center justify-center mx-auto mb-8">
                <Check size={32} className="text-[#FF0000]" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Thank you for your order!
              </h1>
              <p className="text-lg text-gray-600">
                Order {orderNumber} has been placed successfully
              </p>
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="space-y-6">
                {/* Delivery Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-[#FF0000]/10 flex items-center justify-center">
                      <Package size={24} className="text-[#FF0000]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Order Status</h3>
                      <p className="text-gray-600">Processing your order</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      Processing
                    </span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-[#FF0000]/10 flex items-center justify-center">
                      <Truck size={24} className="text-[#FF0000]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Estimated Delivery</h3>
                      <p className="text-gray-600">{estimatedDelivery}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-[#FF0000]/10 flex items-center justify-center">
                      {paymentMethod === 'wallet' ? (
                        <Wallet size={24} className="text-[#FF0000]" />
                      ) : paymentMethod === 'card' ? (
                        <CreditCard size={24} className="text-[#FF0000]" />
                      ) : (
                        <DollarSign size={24} className="text-[#FF0000]" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
                      <p className="text-gray-600">
                        {paymentMethod === 'wallet' ? '961 Wallet' :
                         paymentMethod === 'card' ? `${savedCards.find(c => c.id === selectedCard)?.brand} ending in ${savedCards.find(c => c.id === selectedCard)?.last4}` :
                         'Cash on Delivery'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => window.location.href = '/store'}
                className="w-full sm:w-auto px-8 py-3 bg-[#FF0000] text-white font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  navigator.share?.({
                    title: '961 Order',
                    text: `Check out my order ${orderNumber} from 961!`,
                    url: window.location.href
                  }).catch(() => {});
                }}
                className="w-full sm:w-auto px-8 py-3 text-[#FF0000] font-medium rounded-lg hover:bg-[#FF0000]/5 transition-colors flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Share Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center space-x-2">
              <a href="/store" className="flex items-center space-x-2">
                <img 
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=128&h=32&q=80" 
                  alt="961 Merch" 
                  className="h-8" 
                />
                <span className="text-lg font-medium">Merch</span>
              </a>
            </div>
            <div className="relative">
              <button 
                onClick={() => window.history.back()}
                className="p-2 hover:bg-white/10 rounded-full"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-[#FF0000] text-white text-xs font-medium rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-[1600px] mx-auto px-4 py-8 grid grid-cols-[600px,600px] gap-24 flex-1">
        <div className="space-y-8">
          {/* Delivery */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery</h2>
            <div className="space-y-4">
              {/* Location */}
              <div>
                <div className="grid grid-cols-2 gap-4">
                  {savedAddresses.map((addr) => (
                    <button
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 text-left border rounded-lg transition-colors ${
                        selectedAddressId === addr.id
                          ? 'border-[#FF0000] bg-[#FF0000]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{addr.name}</span>
                        {selectedAddressId === addr.id && (
                          <span className="text-xs font-medium text-[#FF0000]">Selected</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {addr.firstName} {addr.lastName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {addr.address}
                        {addr.apartment && `, ${addr.apartment}`}
                      </div>
                      <div className="text-sm text-gray-600">
                        {addr.city}, {addr.state} {addr.zipCode}
                      </div>
                    </button>
                  ))}
                  
                  {/* Add New Address Button */}
                  <button
                    onClick={() => setShowAddAddress(true)}
                    className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors h-full flex flex-col items-center justify-center"
                  >
                    <Plus size={24} className="text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-600">Add New Address</span>
                  </button>
                </div>
              </div>

              {/* Method */}
              <div className="pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Method</h3>
                <div className="space-y-3">
                  <label
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                      deliveryMethod === 'standard'
                        ? 'border-[#FF0000] bg-[#FF0000]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'standard'}
                      onChange={() => setDeliveryMethod('standard')}
                      className="sr-only"
                    />
                    <div>
                      <div className="flex items-center">
                        <span className="text-base font-medium text-gray-900">Standard</span>
                        {productSubtotal >= 20 && (
                          <span className="ml-2 text-sm font-medium text-green-600">Free</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">5-7 business days</p>
                    </div>
                    <div className="text-right">
                      {productSubtotal >= 20 ? (
                        <span className="text-sm text-gray-500 line-through">$3.50</span>
                      ) : (
                        <span className="text-base font-medium text-gray-900">$3.50</span>
                      )}
                    </div>
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                      deliveryMethod === 'priority'
                        ? 'border-[#FF0000] bg-[#FF0000]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'priority'}
                      onChange={() => setDeliveryMethod('priority')}
                      className="sr-only"
                    />
                    <div>
                      <span className="text-base font-medium text-gray-900">Priority</span>
                      <p className="text-sm text-gray-500 mt-1">2-5 business days</p>
                    </div>
                    <span className="text-base font-medium text-gray-900">$4.99</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment</h2>
            <div className="space-y-4">
              {/* 961 Wallet Option */}
              <label
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === 'wallet'
                    ? 'border-[#FF0000] bg-[#FF0000]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'wallet'}
                  onChange={() => setPaymentMethod('wallet')}
                  className="sr-only"
                />
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=64&h=64&q=80"
                      alt="961"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-900">Wallet</div>
                    <div className="text-sm text-gray-500">Balance: ${walletBalance.toFixed(2)}</div>
                  </div>
                </div>
                {walletBalance < total && (
                  <span className="text-sm text-red-600">Insufficient balance</span>
                )}
              </label>

              {/* Credit Card Options */}
              <div className="space-y-2">
                {savedCards.map((card) => (
                  <label
                    key={card.id}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'card' && selectedCard === card.id
                        ? 'border-[#FF0000] bg-[#FF0000]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card' && selectedCard === card.id}
                      onChange={() => {
                        setPaymentMethod('card');
                        setSelectedCard(card.id);
                      }}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <CreditCard size={24} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="text-base font-medium text-gray-900">
                          {card.brand} •••• {card.last4}
                        </div>
                        <div className="text-sm text-gray-500">
                          Expires {card.expMonth}/{card.expYear}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}

                {/* Add New Card Button */}
                <button
                  onClick={() => setShowAddCard(true)}
                  className="w-full p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus size={20} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">Add New Card</span>
                </button>
              </div>

              {/* Cash on Delivery Option */}
              <label
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === 'cod'
                    ? 'border-[#FF0000] bg-[#FF0000]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="sr-only"
                />
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <DollarSign size={24} className="text-gray-600" />
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-900">Cash on Delivery</div>
                    <div className="text-sm text-gray-500">Pay when you receive your order</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Complete Order Button */}
          <button
            onClick={handleCompleteOrder}
            disabled={!selectedAddressId || (paymentMethod === 'wallet' && walletBalance < total)}
            className={`w-full py-4 rounded-lg font-medium transition-colors ${
              !selectedAddressId || (paymentMethod === 'wallet' && walletBalance < total)
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#FF0000] text-white hover:bg-[#FF0000]/90'
            }`}
          >
            Complete Order
          </button>
        </div>

        {/* Order Summary */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              {/* Subtotal */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery</span>
                <span className="font-medium text-gray-900">
                  {delivery === 0 ? 'Free' : `$${delivery.toFixed(2)}`}
                </span>
              </div>

              {/* 961 Deals Discount */}
              {dealsDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">961 Deals Discount</span>
                  <span className="font-medium text-green-600">-${dealsDiscount.toFixed(2)}</span>
                </div>
              )}

              {/* Donation */}
              {donationAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Donation</span>
                  <span className="font-medium text-gray-900">${donationAmount.toFixed(2)}</span>
                </div>
              )}

              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-base">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-medium text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Points */}
              <div className="bg-[#FF0000]/5 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Points earned</span>
                  <span className="text-sm font-medium text-[#FF0000]">{pointsEarned} pts</span>
                </div>
              </div>
            </div>
          </div>

          {/* 961 Deals Upsell */}
          {!has961Deals && productSubtotal >= 50 && (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Save ${(productSubtotal * 0.1).toFixed(2)} on this order!
                </h3>
                <p className="text-gray-600 mt-2">
                  Join 961 Deals now and we'll instantly apply your member discount
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleAdd961Deals(false)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors text-left"
                >
                  <div className="text-lg font-bold text-gray-900">$4.99/mo</div>
                  <p className="text-sm text-gray-600 mt-1">Monthly membership</p>
                </button>
                <button
                  onClick={() => handleAdd961Deals(true)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors text-left"
                >
                  <div className="text-lg font-bold text-gray-900">$49.99/yr</div>
                  <p className="text-sm text-gray-600 mt-1">Save 17% with annual plan</p>
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Members get exclusive deals across Lebanon 🇱🇧
              </p>
            </div>
          )}

          {/* Donation */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Make a Donation</h3>
            <p className="text-sm text-gray-600 mb-6">
              Help us support local communities across Lebanon
            </p>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <button
                onClick={() => handleDonationSelect(0)}
                className