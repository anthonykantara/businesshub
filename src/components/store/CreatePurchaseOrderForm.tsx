import React, { useState } from 'react';
import { X, Plus, Search, MapPin, Building2, User, Phone, Globe, Truck, Calendar, FileText, Check, ArrowLeft } from 'lucide-react';

interface Supplier {
  id: string;
  username?: string;
  name: string;
  contactPerson?: string;
  phone?: string;
  city: string;
  country: string;
  image: string;
}

interface Product {
  id: string;
  title: string;
  image: string;
  variants: ProductVariant[];
}

interface ProductVariant {
  id: string;
  sku: string;
  attributes: {
    [key: string]: string;
  };
}

interface Location {
  id: string;
  name: string;
  city: string;
  country: string;
}

const SAMPLE_SUPPLIERS: Supplier[] = [
  {
    id: '1',
    username: 'lebanesebeanco',
    name: 'Lebanese Bean Co.',
    contactPerson: 'Hassan Khoury',
    phone: '+961 3 123 456',
    city: 'Beirut',
    country: 'LB',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=64&h=64&q=80'
  },
  {
    id: '2',
    username: 'packagingpro',
    name: 'Packaging Pro SARL',
    contactPerson: 'Rania Saad',
    phone: '+961 3 234 567',
    city: 'Tripoli',
    country: 'LB',
    image: 'https://images.unsplash.com/photo-1530982011887-3cc11cc85693?auto=format&fit=crop&w=64&h=64&q=80'
  },
  {
    id: '3',
    username: 'equipmentplus',
    name: 'Equipment Plus',
    contactPerson: 'Karim Nassar',
    phone: '+961 3 345 678',
    city: 'Jounieh',
    country: 'LB',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=64&h=64&q=80'
  }
];

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Premium Arabica Beans',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&h=300&q=80',
    variants: [
      {
        id: '1',
        sku: 'ARB-LB-250',
        attributes: { origin: 'Lebanon', size: '250g', roast: 'Light' }
      },
      {
        id: '2',
        sku: 'ARB-LB-500',
        attributes: { origin: 'Lebanon', size: '500g', roast: 'Light' }
      },
      {
        id: '3',
        sku: 'ARB-ETH-250',
        attributes: { origin: 'Ethiopia', size: '250g', roast: 'Medium' }
      },
      {
        id: '4',
        sku: 'ARB-ETH-500',
        attributes: { origin: 'Ethiopia', size: '500g', roast: 'Medium' }
      }
    ]
  },
  {
    id: '2',
    title: 'Eco-Friendly Coffee Bags',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=300&h=300&q=80',
    variants: [
      {
        id: '5',
        sku: 'BAG-KRF-250',
        attributes: { material: 'Kraft', size: '250g', type: 'Stand-up' }
      },
      {
        id: '6',
        sku: 'BAG-KRF-500',
        attributes: { material: 'Kraft', size: '500g', type: 'Stand-up' }
      },
      {
        id: '7',
        sku: 'BAG-BIO-250',
        attributes: { material: 'Biodegradable', size: '250g', type: 'Flat Bottom' }
      }
    ]
  },
  {
    id: '3',
    title: 'Ceramic Coffee Mugs',
    image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=300&h=300&q=80',
    variants: [
      {
        id: '8',
        sku: 'MUG-CER-BLK',
        attributes: { material: 'Ceramic', color: 'Black', size: '12oz' }
      },
      {
        id: '9',
        sku: 'MUG-CER-WHT',
        attributes: { material: 'Ceramic', color: 'White', size: '12oz' }
      }
    ]
  },
  {
    id: '4',
    title: 'Commercial Coffee Grinder',
    image: 'https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?auto=format&fit=crop&w=300&h=300&q=80',
    variants: [
      {
        id: '10',
        sku: 'GRD-COM-BLK',
        attributes: { type: 'Commercial', color: 'Black', power: '1200W' }
      },
      {
        id: '11',
        sku: 'GRD-COM-SLV',
        attributes: { type: 'Commercial', color: 'Silver', power: '1200W' }
      }
    ]
  },
  {
    id: '5',
    title: 'Coffee Filter Papers',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&h=300&q=80',
    variants: [
      {
        id: '12',
        sku: 'FLT-PAP-100',
        attributes: { type: 'Paper', size: '#2', count: '100pcs' }
      },
      {
        id: '13',
        sku: 'FLT-PAP-250',
        attributes: { type: 'Paper', size: '#2', count: '250pcs' }
      }
    ]
  }
];

const SAMPLE_LOCATIONS: Location[] = [
  {
    id: '1',
    name: 'Beirut Central Warehouse',
    city: 'Beirut',
    country: 'LB'
  },
  {
    id: '2',
    name: 'Jounieh Distribution Center',
    city: 'Jounieh',
    country: 'LB'
  },
  {
    id: '3',
    name: 'Tripoli Warehouse',
    city: 'Tripoli',
    country: 'LB'
  }
];

interface CreatePurchaseOrderFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CreatePurchaseOrderForm({ onClose, onSubmit }: CreatePurchaseOrderFormProps) {
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [step, setStep] = useState<'supplier' | 'location' | 'details'>('supplier');
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({});
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  const [showPoError, setShowPoError] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Array<{
    productId: string;
    productTitle: string;
    productImage: string;
    variantId: string;
    sku: string;
    variantInfo: string;
    quantity: number;
    cost: number;
    tax: number;
  }>>([]);
  const [productSearchQuery, setProductSearchQuery] = useState<string>('');
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [poNumber, setPoNumber] = useState('');
  const [estimatedArrival, setEstimatedArrival] = useState('');
  const [shippingCarrier, setShippingCarrier] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const filteredSuppliers = SAMPLE_SUPPLIERS.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLocations = SAMPLE_LOCATIONS.filter(location =>
    location.name.toLowerCase().includes(locationSearchQuery.toLowerCase()) ||
    location.city.toLowerCase().includes(locationSearchQuery.toLowerCase()) ||
    location.country.toLowerCase().includes(locationSearchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    setSelectedProducts([
      ...selectedProducts,
      {
        productId: '',
        productTitle: '',
        productImage: '',
        variantId: '',
        sku: '',
        quantity: 1,
        cost: 0,
        tax: 0
      }
    ]);
  };

  const handleProductSelect = (index: number, productId: string) => {
    const product = SAMPLE_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    handleProductChange(index, 'productId', productId);
    handleProductChange(index, 'productTitle', product.title);
    handleProductChange(index, 'productImage', product.image);
    handleProductChange(index, 'variantId', '');
    handleProductChange(index, 'variantInfo', '');
    handleProductChange(index, 'sku', '');
  };

  const handleVariantSelect = (index: number, variantId: string) => {
    const selectedProduct = selectedProducts[index];
    if (!selectedProduct) return;
    
    const product = SAMPLE_PRODUCTS.find(p => p.id === selectedProduct.productId);
    const variant = product?.variants.find(v => v.id === variantId);
    if (!variant) return;

    handleProductChange(index, 'variantId', variantId);
    handleProductChange(index, 'variantInfo', Object.entries(variant.attributes).map(([key, value]) => `${value}`).join(' · '));
    handleProductChange(index, 'sku', variant.sku);
  };

  const isProductSelected = (productId: string) => {
    return selectedProducts.some(p => p.productId === productId);
  };

  const isVariantSelected = (variantId: string) => {
    return selectedProducts.some(p => p.variantId === variantId);
  };


  const filteredProducts = SAMPLE_PRODUCTS.filter(product =>
    product.title.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
    product.variants.some(v => v.sku.toLowerCase().includes(productSearchQuery.toLowerCase()))
  );

  const handleRemoveProduct = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const handleProductChange = (index: number, field: string, value: any) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value
    };
    setSelectedProducts(updatedProducts);
  };

  const calculateSubtotal = () => {
    return selectedProducts.reduce((sum, product) => {
      const quantity = product.quantity || 0;
      const cost = product.cost || 0;
      const tax = product.tax || 0;
      const subtotal = quantity * cost;
      const taxAmount = (subtotal * tax) / 100;
      return sum + subtotal + taxAmount;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + (shippingCost || 0);
  };

  const handleSubmit = () => {
    const data = {
      supplier: selectedSupplier,
      location: selectedLocation,
      products: selectedProducts,
      poNumber,
      shippingCost,
      estimatedArrival,
      shippingCarrier,
      trackingNumber,
      total: calculateTotal()
    };
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 my-8 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              {step !== 'supplier' && (
                <button
                  onClick={() => setStep(step === 'details' ? 'location' : 'supplier')}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft size={20} className="text-gray-500" />
                </button>
              )}
              <h3 className="text-xl font-bold text-gray-900">Create Purchase Order</h3>
            </div>
            <button
              onClick={() => setShowCloseConfirm(true)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">

          {step === 'supplier' ? (
            <div className="space-y-6">
              {/* PO Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PO Number
                  <span className="text-[#FF0000]">*</span>
                </label>
                <input
                  type="text"
                  value={poNumber}
                  onChange={(e) => setPoNumber(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-1 ${
                    showPoError && !poNumber ? 'border-[#FF0000] focus:border-[#FF0000] focus:ring-[#FF0000]' : 'border-gray-300 focus:border-[#FF0000] focus:ring-[#FF0000]'
                  }`}
                  placeholder="Enter PO number"
                  required
                />
                {showPoError && !poNumber && (
                  <p className="mt-1 text-sm text-[#FF0000]">PO number is required</p>
                )}
              </div>

              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search suppliers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-base border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSuppliers.map((supplier) => (
                  <button
                    key={supplier.id}
                    onClick={() => {
                      setSelectedSupplier(supplier);
                    }}
                    className={`flex items-center p-4 border rounded-lg hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors ${
                      selectedSupplier?.id === supplier.id
                        ? 'border-[#FF0000] bg-[#FF0000]/5'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={supplier.image}
                        alt={supplier.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 text-left">
                      <h4 className="text-base font-medium text-gray-900">{supplier.name}</h4>
                      {supplier.username && (
                        <p className="text-sm text-gray-500">@{supplier.username}</p>
                      )}
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <MapPin size={14} className="mr-1" />
                        {supplier.city}, {supplier.country}
                      </div>
                    </div>
                  </button>
                ))}

                <button
                  onClick={() => setShowAddSupplier(true)}
                  className="flex items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors"
                >
                  <Plus size={20} className="text-gray-400 mr-2" />
                  <span className="text-gray-600">Add New Supplier</span>
                </button>
              </div>
            </div>
          ) : step === 'location' ? (
            <div className="space-y-6">
              {/* Location Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Delivery Location
                </label>
                <div className="mb-4">
                  <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search locations..."
                      value={locationSearchQuery}
                      onChange={(e) => setLocationSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-base border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredLocations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => {
                        setSelectedLocation(location);
                      }}
                      className={`flex items-center p-4 border rounded-lg transition-colors ${
                        selectedLocation?.id === location.id
                          ? 'border-[#FF0000] bg-[#FF0000]/5'
                          : 'border-gray-200 hover:border-[#FF0000] hover:bg-[#FF0000]/5'
                      }`}
                    >
                      <Building2 size={20} className="text-gray-400 mr-3" />
                      <div className="text-left">
                        <h4 className="text-base font-medium text-gray-900">{location.name}</h4>
                        <p className="text-sm text-gray-500">
                          {location.city}, {location.country}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Supplier and PO Number Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedSupplier && (
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={selectedSupplier.image}
                        alt={selectedSupplier.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">{selectedSupplier.name}</h4>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <MapPin size={14} className="mr-1" />
                        {selectedSupplier.city}, {selectedSupplier.country}
                      </div>
                    </div>
                    <button
                      onClick={() => setStep('supplier')}
                      className="ml-auto text-sm text-[#FF0000] hover:text-[#FF0000]/80"
                    >
                      Change
                    </button>
                  </div>
                )}
                <div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Building2 size={20} className="text-gray-400 mr-3" />
                    <div>
                      <h4 className="text-base font-medium text-gray-900">{selectedLocation?.name}</h4>
                      <p className="text-sm text-gray-500">
                        {selectedLocation?.city}, {selectedLocation?.country}
                      </p>
                    </div>
                    <button
                      onClick={() => setStep('location')}
                      className="ml-auto text-sm text-[#FF0000] hover:text-[#FF0000]/80"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Items
                </label>
                <div className="space-y-6">
                  {/* Browse Products Button */}
                  <button
                    onClick={() => setShowProductSearch(true)}
                    className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors"
                  >
                    <Plus size={16} className="text-gray-400 mr-2" />
                    <span className="text-gray-600">Browse Products</span>
                  </button>

                  {/* Products Table */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                            Products
                          </th>
                          <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                            Quantity
                          </th>
                          <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                            Cost
                          </th>
                          <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                            Tax
                          </th>
                          <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                            Total
                          </th>
                          <th className="w-10 px-6 py-3"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedProducts.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-8 text-center">
                              <div className="text-gray-500">No products added yet</div>
                              <div className="text-sm text-gray-400 mt-1">
                                Search above to add products to your order
                              </div>
                            </td>
                          </tr>
                        ) : (
                          selectedProducts.map((product, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-4 min-w-[300px]">
                                <div className="flex items-center space-x-3">
                                  <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                      src={product.productImage}
                                      alt={product.productTitle}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0 space-y-1">
                                    <div className="text-base font-medium text-gray-900 line-clamp-1">
                                      {product.productTitle}
                                    </div>
                                    <div className="text-sm text-gray-500 line-clamp-1">
                                      {product.variantInfo || 'No variant selected'}
                                    </div>
                                    <div className="text-sm text-gray-400 font-mono">
                                      {product.sku || 'No SKU'}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <input
                                  type="number"
                                  min="1"
                                  value={product.quantity || ''}
                                  onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value) || 0)}
                                  className="w-20 px-3 py-1.5 text-sm text-center border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                                />
                              </td>
                              <td className="px-6 py-4">
                                <div className="relative">
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={product.cost || ''}
                                    onChange={(e) => handleProductChange(index, 'cost', parseFloat(e.target.value) || 0)}
                                    className="w-24 pl-6 pr-2 py-1.5 text-sm text-right border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                                  />
                                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="relative">
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={product.tax || ''}
                                    onChange={(e) => handleProductChange(index, 'tax', parseFloat(e.target.value) || 0)}
                                    className="w-20 pl-2 pr-6 py-1.5 text-sm text-right border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                                  />
                                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                  ${((product.quantity || 0) * (product.cost || 0) * (1 + (product.tax || 0) / 100)).toFixed(2)}
                                </span>
                                <button
                                  onClick={() => handleRemoveProduct(index)}
                                  className="text-gray-400 hover:text-[#FF0000] ml-4"
                                >
                                  <X size={16} />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                      {selectedProducts.length > 0 && (
                        <tfoot className="bg-gray-50 border-t border-gray-200">
                          <tr>
                            <td colSpan={7} className="px-6 py-3 text-sm text-gray-500">
                              {selectedProducts.length} variant{selectedProducts.length !== 1 ? 's' : ''} on purchase order
                            </td>
                          </tr>
                        </tfoot>
                      )}
                    </table>
                  </div>
                </div>
              </div>

              {/* Shipping Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Carrier
                  </label>
                  <input
                    type="text"
                    value={shippingCarrier}
                    onChange={(e) => setShippingCarrier(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Arrival
                  </label>
                  <input
                    type="date"
                    value={estimatedArrival}
                    onChange={(e) => setEstimatedArrival(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tracking Number
                  </label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Cost
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={shippingCost}
                      onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    />
                  </div>
                </div>
              </div>

              {/* Cost Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-base font-medium text-gray-900 mb-4">Cost Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping Cost</span>
                    <span className="text-gray-900">${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between text-base font-medium">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          {step === 'supplier' ? (
            <button
              onClick={() => {
                if (!poNumber) {
                  setShowPoError(true);
                  return;
                }
                if (selectedSupplier) {
                  setStep('location');
                }
              }}
              disabled={!selectedSupplier}
              className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          ) : step === 'location' ? (
            <button
              onClick={() => {
                if (selectedLocation) {
                  setStep('details');
                }
              }}
              disabled={!selectedLocation}
              className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!selectedSupplier || !selectedLocation || selectedProducts.length === 0}
              className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Purchase Order
            </button>
          )}
        </div>
      </div>

      {/* Product Search Dialog */}
      {showProductSearch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Add Products</h3>
                <button
                  onClick={() => setShowProductSearch(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={productSearchQuery}
                  onChange={(e) => setProductSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-base border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="p-3 bg-gray-50 border-b border-gray-200 flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h4 className="text-base font-medium text-gray-900">{p.title}</h4>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {p.variants.map((variant) => (
                        <label
                          key={variant.id}
                          className={`flex items-center px-4 py-3 transition-all relative ${
                            isVariantSelected(variant.id)
                              ? 'opacity-50 cursor-not-allowed bg-gray-50'
                              : 'cursor-pointer hover:bg-[#FF0000]/5'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isVariantSelected(variant.id)}
                            onChange={() => {
                              if (isVariantSelected(variant.id)) return;
                              if (!isVariantSelected(variant.id)) {
                                const index = selectedProducts.length;
                                handleAddProduct();
                                handleProductSelect(index, p.id);
                                handleVariantSelect(index, variant.id);
                              }
                            }}
                            disabled={isVariantSelected(variant.id)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${
                            isVariantSelected(variant.id)
                              ? 'border-[#FF0000] bg-[#FF0000]'
                              : 'border-gray-300'
                          }`}>
                            {isVariantSelected(variant.id) && (
                              <Check size={14} className="text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0 flex items-center">
                            <span className="text-sm text-gray-900">
                              {Object.values(variant.attributes).join(' · ')}
                            </span>
                            <span className="mx-3 text-gray-300">|</span>
                            <span className="text-sm text-gray-500">
                              {variant.sku}
                            </span>
                            <span className="ml-auto text-sm font-medium text-gray-900">
                              100 in stock
                            </span>
                            {isVariantSelected(variant.id) && (
                              <span className="ml-3 text-sm font-medium text-[#FF0000]">
                                Added
                              </span>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No products found matching your search</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''} selected
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowProductSearch(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowProductSearch(false)}
                    className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
                  >
                    Add Selected
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Supplier Modal */}
      {showAddSupplier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Add New Supplier</h3>
                <button
                  onClick={() => setShowAddSupplier(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username (Optional)
                  </label>
                  <input
                    type="text"
                    value={newSupplier.username || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, username: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="supplier_username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={newSupplier.name || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="Supplier Company Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={newSupplier.contactPerson || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="Contact Person Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newSupplier.phone || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="+961 3 123 456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={newSupplier.city || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={newSupplier.country || ''}
                    onChange={(e) => setNewSupplier({ ...newSupplier, country: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddSupplier(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In a real app, this would make an API call
                  const supplier: Supplier = {
                    id: (SAMPLE_SUPPLIERS.length + 1).toString(),
                    ...newSupplier as Supplier,
                    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=64&h=64&q=80'
                  };
                  setSelectedSupplier(supplier);
                  setShowAddSupplier(false);
                }}
                disabled={!newSupplier.name || !newSupplier.city || !newSupplier.country}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Supplier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Close Confirmation Dialog */}
      {showCloseConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70]">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Discard Changes?</h3>
              <p className="text-gray-600">
                Are you sure you want to close? All unsaved changes will be lost.
              </p>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCloseConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
                