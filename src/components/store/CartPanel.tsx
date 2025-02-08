import React from 'react';
import { X, Plus, Minus, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const RECOMMENDED_PRODUCTS = [
  {
    id: 'rec1',
    title: '961 Premium Coffee Mug',
    image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=300&h=300&q=80',
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.8,
    ratingCount: 156
  },
  {
    id: 'rec2',
    title: 'Coffee Bean Grinder',
    image: 'https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?auto=format&fit=crop&w=300&h=300&q=80',
    price: 89.99,
    originalPrice: 99.99,
    rating: 4.9,
    ratingCount: 234
  },
  {
    id: 'rec3',
    title: 'Pour Over Kit',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&h=300&q=80',
    price: 34.99,
    originalPrice: 39.99,
    rating: 4.7,
    ratingCount: 189
  }
];

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartPanel({ isOpen, onClose }: CartPanelProps) {
  const { items, addToCart, removeFromCart, getCartTotal } = useCart();

  const handleIncreaseQuantity = (productId: string) => {
    const product = items.find(item => item.id === productId);
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price
      });
    }
  };

  const handleDecreaseQuantity = (productId: string) => {
    const product = items.find(item => item.id === productId);
    if (product && product.quantity === 1) {
      removeFromCart(productId);
    } else if (product) {
      // Decrease quantity by removing and re-adding with one less
      removeFromCart(productId);
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price
      });
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
      onClick={() => {
        onClose();
        // Show floating button after a slight delay to match the panel animation
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('showFloatingButton'));
        }, 300);
      }}
      />

      {/* Cart Panel */}
      <div className={`absolute top-0 right-0 w-[400px] h-full bg-white shadow-xl transform transition-transform duration-300 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`} style={{ width: '850px' }}>
        <div className="grid grid-cols-[300px_1fr] h-full">
          {/* Recommendations Column */}
          <div className="border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 text-center">For You</h3>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-57px)] no-scrollbar">
              {RECOMMENDED_PRODUCTS.slice(0, 10).map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="aspect-square rounded-lg overflow-hidden mb-2">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#FF0000] transition-colors">
                      {product.title}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</span>
                        <span className="text-sm font-medium text-[#FF0000]">${(product.price * 0.9).toFixed(2)}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            id: product.id,
                            title: product.title,
                            image: product.image,
                            price: product.price
                          });
                        }}
                        className="w-24 py-2 bg-black text-white text-xs font-medium rounded-lg hover:bg-black/90 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900 text-center">Your Cart</h2>
              </div>
              {items.length > 0 && (
                <>
                  {getCartTotal() >= 50 ? (
                    <div className="bg-green-50 text-green-800 p-3 rounded-lg text-center font-medium">
                      Congrats! You get free delivery! 🎉
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-[#FF0000]/5 to-[#FF0000]/2 rounded-lg p-3">
                      <div className="flex items-center justify-center space-x-3">
                        <span className="text-gray-900 font-medium">
                          You're only <span className="font-bold text-[#FF0000]">${(50 - getCartTotal()).toFixed(2)}</span> away from free delivery
                        </span>
                        <span className="text-lg">🛵</span>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-end mb-1">
                          <span className="text-xs text-gray-500">${getCartTotal().toFixed(2)} / $50.00</span>
                        </div>
                        <div className="h-1.5 bg-white/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#FF0000] to-[#FF4444] rounded-full"
                            style={{
                              width: `${Math.min((getCartTotal() / 50) * 100, 100)}%`,
                              transition: 'width 1s ease-in-out'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4">
                    <div 
                      className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                      onClick={() => {
                        window.location.href = `/store/products/${item.id}`;
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-sm font-medium text-gray-900 truncate cursor-pointer hover:text-[#FF0000] transition-colors"
                        onClick={() => {
                          window.location.href = `/store/products/${item.id}`;
                        }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => handleDecreaseQuantity(item.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Minus size={16} className="text-gray-500" />
                        </button>
                        <span className="text-sm font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncreaseQuantity(item.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Plus size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 group">
                      <span className="text-sm font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          {items.length > 0 && (
            <div className="mt-8">
              <div className="border-t border-gray-200 pt-8">
              <h3 className="text-base font-medium text-gray-900 mb-4">People also bought</h3>
              <div className="space-y-4">
                {RECOMMENDED_PRODUCTS.slice(0, 2).map((product) => (
                  <div key={product.id} className="flex space-x-4 group cursor-pointer">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#FF0000] transition-colors truncate">
                        {product.title}
                      </h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-medium text-gray-900">
                          ${product.price.toFixed(2)} <span className="text-[#FF0000] ml-2">${(product.price * 0.9).toFixed(2)}</span>
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart({
                              id: product.id,
                              title: product.title,
                              image: product.image,
                              price: product.price
                            });
                          }}
                          className="w-20 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </div>
          )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="space-y-4">
                {/* 961 Deals Upsell */}
                <div className="bg-gradient-to-r from-[#FF0000]/5 to-[#FF0000]/2 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 relative group">
                      <h4 className="text-base font-medium text-gray-900">961 Deals Membership</h4>
                      <span className="text-lg font-bold text-[#FF0000]">
                        - Save ${(getCartTotal() * 0.1).toFixed(2)}!
                      </span>
                      <div className="absolute top-full left-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-white text-gray-700 text-sm p-2 rounded-lg shadow-lg border border-gray-200">
                          961 Deals membership gives you access to exclusive deals across places in Lebanon
                        </div>
                        <div className="absolute -top-1 left-4 w-2 h-2 bg-white border-t border-l border-gray-200 transform -rotate-45"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        // Add monthly membership to cart
                        addToCart({
                          id: 'deals-monthly',
                          title: '961 Deals Monthly Membership',
                          image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=64&h=64&q=80',
                          price: 4.99
                        });
                      }}
                      className="flex-1 py-2 px-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors"
                    >
                      $4.99/mo
                    </button>
                    <button
                      onClick={() => {
                        // Add yearly membership to cart
                        addToCart({
                          id: 'deals-yearly',
                          title: '961 Deals Yearly Membership',
                          image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=64&h=64&q=80',
                          price: 49.99
                        });
                      }}
                      className="flex-1 py-2 px-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors relative group"
                    >
                      <span>$49.99/yr</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-base font-medium text-gray-900">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Points to be earned</span>
                  <span>{Math.round(getCartTotal() * 20)} pts</span>
                </div>
                <button
                  onClick={() => window.location.href = '/checkout'}
                  className="w-full py-4 px-4 bg-[#FF0000] text-white text-base font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}