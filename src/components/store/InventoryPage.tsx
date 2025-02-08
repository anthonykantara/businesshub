import React, { useState } from 'react';
import { Search, Plus, MapPin, ChevronDown, ChevronRight, X, Check, Building2 } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
interface Product {
  id: string;
  title: string;
  image: string;
  variants: Variant[];
}

interface Variant {
  id: string;
  productId: string;
  image: string;
  sku: string;
  available: number;
  incoming: number;
  preorders: number;
  price: number;
  attributes: {
    [key: string]: string;
  };
}

const SAMPLE_LOCATIONS: Location[] = [
  {
    id: '1',
    name: 'Main Warehouse',
    city: 'Beirut',
    country: 'LB',
    coordinates: { lat: 33.8938, lng: 35.5018 }
  },
  {
    id: '2',
    name: 'Downtown Store',
    city: 'Jounieh',
    country: 'LB',
    coordinates: { lat: 33.9812, lng: 35.6182 }
  }
];

const SAMPLE_VARIANTS: Variant[] = [
  {
    id: '1',
    productId: '1',
    productTitle: 'Arabica Dark Roast Coffee Beans',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&h=300&q=80',
    sku: 'COFFEE-DARK-250G',
    available: 100,
    incoming: 25,
    preorders: 0,
    price: 19.99,
    attributes: {
      size: '250g',
      grind: 'Whole Bean'
    }
  },
  {
    id: '2',
    productId: '1',
    productTitle: 'Arabica Dark Roast Coffee Beans',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&h=300&q=80',
    sku: 'COFFEE-DARK-500G',
    available: 75,
    incoming: 50,
    preorders: 0,
    price: 24.99,
    attributes: {
      size: '500g',
      grind: 'Whole Bean'
    }
  },
  {
    id: '3',
    productId: '2',
    productTitle: 'Limited Edition Coffee Mug',
    image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=300&h=300&q=80',
    sku: 'MUG-LE-BLACK',
    available: 0,
    incoming: 100,
    preorders: 25,
    price: 24.99,
    attributes: {
      color: 'Black'
    }
  }
];
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Arabica Dark Roast Coffee Beans',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&h=300&q=80',
    variants: [
      {
        id: '1',
        productId: '1',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&h=300&q=80',
        sku: 'COFFEE-DARK-250G',
        available: 100,
        preorders: 0,
        price: 19.99,
        attributes: {
          size: '250g',
          grind: 'Whole Bean'
        }
      },
      {
        id: '2',
        productId: '1',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&h=300&q=80',
        sku: 'COFFEE-DARK-500G',
        available: 75,
        preorders: 0,
        price: 24.99,
        attributes: {
          size: '500g',
          grind: 'Whole Bean'
        }
      }
    ]
  },
  {
    id: '2',
    title: 'Limited Edition Coffee Mug',
    image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=300&h=300&q=80',
    variants: [
      {
        id: '3',
        productId: '2',
        image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=300&h=300&q=80',
        sku: 'MUG-LE-BLACK',
        available: 0,
        preorders: 25,
        price: 24.99,
        attributes: {
          color: 'Black'
        }
      }
    ]
  }
];

export default function InventoryPage() {
  const [locations, setLocations] = useState<Location[]>(SAMPLE_LOCATIONS);
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedProducts, setExpandedProducts] = useState<string[]>([]);
  const [newLocation, setNewLocation] = useState<Partial<Location>>({
    name: '',
    city: '',
    country: ''
  });

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.variants.some(variant => 
      variant.sku.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const toggleProduct = (productId: string) => {
    setExpandedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddLocation = () => {
    if (!newLocation.name || !newLocation.city || !newLocation.country) return;

    const location: Location = {
      id: (locations.length + 1).toString(),
      name: newLocation.name,
      city: newLocation.city,
      country: newLocation.country,
      coordinates: { lat: 0, lng: 0 } // Would be set by map selection in real app
    };

    setLocations([...locations, location]);
    setSelectedLocation(location);
    setNewLocation({ name: '', city: '', country: '' });
    setShowAddLocation(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
      </div>

      {/* Location Selector and Search */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-200">
        <div className="p-4 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="px-4 py-2.5 text-base border border-gray-200 rounded-lg hover:border-[#FF0000] focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] bg-white flex items-center space-x-2 min-w-[200px]"
              >
                <span className="text-gray-900">{selectedLocation.name}</span>
                <ChevronDown size={16} className="text-gray-500 ml-auto" />
              </button>

              {showLocationDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="p-2 space-y-1">
                    {locations.map((location) => (
                      <button
                        key={location.id}
                        onClick={() => {
                          setSelectedLocation(location);
                          setShowLocationDropdown(false);
                        }}
                        className={`w-full flex items-center px-3 py-2 rounded-lg ${
                          selectedLocation.id === location.id
                            ? 'bg-[#FF0000]/5 text-[#FF0000]'
                            : 'hover:bg-gray-50 text-gray-900'
                        }`}
                      >
                        <div className="flex-1 text-left">
                          <div className="font-medium">{location.name}</div>
                          <div className="text-sm text-gray-500">
                            {location.city}, {location.country}
                          </div>
                        </div>
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setShowAddLocation(true);
                        setShowLocationDropdown(false);
                      }}
                      className="w-full flex items-center px-3 py-2 text-[#FF0000] hover:bg-[#FF0000]/5 rounded-lg"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Location
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by product name or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-base border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Variants Table */}
        <div className="border-t border-gray-200">
          <table className="w-full">
            <tbody className="bg-white">
              {filteredProducts.map((product) => (
                <React.Fragment key={product.id}>
                  {/* Product Row */}
                  <tr 
                    className="bg-gray-50 border-t border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                    onClick={() => toggleProduct(product.id)}
                  >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button className="p-1 hover:bg-gray-200 rounded-lg">
                        {expandedProducts.includes(product.id) ? (
                          <ChevronDown size={20} className="text-gray-500" />
                        ) : (
                          <ChevronRight size={20} className="text-gray-500" />
                        )}
                      </button>
                      <div className="h-10 w-10 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-base font-medium text-gray-900">
                          {product.title}
                        </div>
                        <div className="text-sm text-gray-500 mt-0.5">
                          {product.variants.length} variant{product.variants.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td colSpan={4} className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500">
                        Total Available: {product.variants.reduce((sum, v) => sum + v.available, 0)} units
                      </div>
                      <div className="text-sm text-gray-500">
                        Total Preorders: {product.variants.reduce((sum, v) => sum + v.preorders, 0)}
                      </div>
                    </div>
                  </td>
                  </tr>

                  {/* Variant Rows */}
                  {expandedProducts.includes(product.id) && (
                    <>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <td className="px-6 py-3" colSpan={5}>
                          <div className="grid grid-cols-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                            <div className="col-span-2">Variant</div>
                            <div>SKU</div>
                            <div className="text-center">Stock</div>
                            <div className="text-center">Incoming</div>
                            <div className="text-center">Preorders</div>
                          </div>
                        </td>
                      </tr>
                      {product.variants.map((variant) => (
                        <tr key={variant.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4" colSpan={2}>
                            <div className="flex items-center space-x-3 pl-8">
                              <div className="h-10 w-10 flex-shrink-0 rounded-lg overflow-hidden">
                                <img
                                  src={variant.image}
                                  alt={product.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="text-base text-gray-900 flex flex-wrap gap-2">
                                  {Object.entries(variant.attributes).map(([key, value], index) => (
                                    <span key={key} className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-gray-800 text-sm">
                                      {key}: {value}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 align-middle">
                            {variant.sku}
                          </td>
                          <td className="px-6 py-4 text-center align-middle">
                            <span className={`text-base font-medium ${
                              variant.available === 0 ? 'text-red-600' : 'text-gray-900'
                            }`}>
                              {variant.available} units
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center align-middle">
                            {variant.incoming > 0 ? (
                              <span className="text-base text-blue-600">
                                +{variant.incoming}
                              </span>
                            ) : (
                              <span className="text-base text-gray-400">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center align-middle">
                            <span className="text-base text-gray-900">
                              {variant.preorders}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Location Modal */}
      {showAddLocation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Add Location</h3>
                <button
                  onClick={() => setShowAddLocation(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location Name
                  </label>
                  <input
                    type="text"
                    value={newLocation.name}
                    onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="e.g., Main Warehouse"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={newLocation.city}
                    onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="e.g., Beirut"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={newLocation.country}
                    onChange={(e) => setNewLocation({ ...newLocation, country: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="e.g., LB"
                  />
                </div>

                {/* Map Placeholder */}
                <div className="relative w-full h-[200px] bg-gray-100 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200/50 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={32} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">Click to set location on map</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddLocation(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLocation}
                disabled={!newLocation.name || !newLocation.city || !newLocation.country}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}