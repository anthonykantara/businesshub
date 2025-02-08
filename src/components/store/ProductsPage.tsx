import React, { useState } from 'react';
import { Search, Filter, Plus, ChevronDown, Check, X, Tag, Box, Package, Archive, Eye } from 'lucide-react';
import CreateProductPage from './CreateProductPage';

interface Product {
  id: string;
  title: string;
  image: string;
  status: 'active' | 'draft' | 'preorder' | 'sold-out';
  inventory: {
    total: number;
    variants: number;
  };
  preorders: number;
  category: string;
  type: string;
  price: number | { min: number; max: number };
  waitingCount?: number;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Arabica Dark Roast Coffee Beans',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&h=300&q=80',
    status: 'sold-out',
    inventory: { total: 250, variants: 3 },
    preorders: 0,
    category: 'Coffee',
    type: 'Beans',
    price: { min: 19.99, max: 24.99 },
    waitingCount: 15
  },
  {
    id: '2',
    title: 'Limited Edition Coffee Mug',
    image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=300&h=300&q=80',
    status: 'preorder',
    inventory: { total: 0, variants: 2 },
    preorders: 45,
    category: 'Accessories',
    type: 'Drinkware',
    price: { min: 24.99, max: 29.99 }
  },
  {
    id: '3',
    title: 'Pour Over Coffee Maker',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&h=300&q=80',
    status: 'active',
    inventory: { total: 75, variants: 1 },
    preorders: 0,
    category: 'Equipment',
    type: 'Brewing',
    price: 39.99
  },
  {
    id: '4',
    title: 'Espresso Blend Coffee Beans',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=300&h=300&q=80',
    status: 'draft',
    inventory: { total: 100, variants: 2 },
    preorders: 0,
    category: 'Coffee',
    type: 'Beans',
    price: { min: 21.99, max: 26.99 }
  },
  {
    id: '5',
    title: 'Coffee Bean Grinder',
    image: 'https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?auto=format&fit=crop&w=300&h=300&q=80',
    status: 'sold-out',
    inventory: { total: 30, variants: 1 },
    preorders: 0,
    category: 'Equipment',
    type: 'Grinding',
    price: 89.99,
    waitingCount: 8
  },
  {
    id: '6',
    title: 'Cold Brew Coffee Kit',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=300&h=300&q=80',
    status: 'preorder',
    inventory: { total: 0, variants: 1 },
    preorders: 28,
    category: 'Equipment',
    type: 'Brewing',
    price: 49.99
  },
  {
    id: '7',
    title: 'Coffee Storage Container',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&h=300&q=80',
    status: 'active',
    inventory: { total: 120, variants: 2 },
    preorders: 0,
    category: 'Accessories',
    type: 'Storage',
    price: { min: 29.99, max: 34.99 }
  },
  {
    id: '8',
    title: 'Single Origin Ethiopian Beans',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=300&h=300&q=80',
    status: 'active',
    inventory: { total: 180, variants: 3 },
    preorders: 0,
    category: 'Coffee',
    type: 'Beans',
    price: { min: 24.99, max: 29.99 }
  },
  {
    id: '9',
    title: 'Coffee Scale with Timer',
    image: 'https://images.unsplash.com/photo-1517705600644-3f94ca21e39e?auto=format&fit=crop&w=300&h=300&q=80',
    status: 'draft',
    inventory: { total: 50, variants: 1 },
    preorders: 0,
    category: 'Equipment',
    type: 'Accessories',
    price: 59.99
  },
  {
    id: '10',
    title: 'Coffee Tasting Set',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&h=300&q=80',
    status: 'active',
    inventory: { total: 25, variants: 1 },
    preorders: 0,
    category: 'Accessories',
    type: 'Tasting',
    price: 79.99
  }
];

const CATEGORIES = Array.from(new Set(SAMPLE_PRODUCTS.map(p => p.category)));
const TYPES = Array.from(new Set(SAMPLE_PRODUCTS.map(p => p.type)));
const STATUSES = ['active', 'draft', 'preorder', 'sold-out'] as const;

export default function ProductsPage() {
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(product.status);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
    return matchesSearch && matchesStatus && matchesCategory && matchesType;
  });

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'preorder':
        return 'bg-blue-100 text-blue-800';
      case 'sold-out':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    showCreateProduct ? (
      <CreateProductPage onBack={() => setShowCreateProduct(false)} />
    ) : (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        </div>
        <button 
          onClick={() => setShowCreateProduct(true)}
          className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Product</span>
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
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-base border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              {/* Status Filter */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowStatusFilter(!showStatusFilter);
                    setShowCategoryFilter(false);
                    setShowTypeFilter(false);
                  }}
                  className="px-4 py-2.5 text-base border border-gray-200 rounded-lg hover:border-[#FF0000] focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] bg-white flex items-center space-x-2"
                >
                  <Tag size={16} className="text-gray-500" />
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

              {/* Category Filter */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowCategoryFilter(!showCategoryFilter);
                    setShowStatusFilter(false);
                    setShowTypeFilter(false);
                  }}
                  className="px-4 py-2.5 text-base border border-gray-200 rounded-lg hover:border-[#FF0000] focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] bg-white flex items-center space-x-2"
                >
                  <Archive size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-700">Category</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>

                {showCategoryFilter && (
                  <div className="absolute z-10 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                    <div className="p-2">
                      {CATEGORIES.map((category) => (
                        <label
                          key={category}
                          className="flex items-center px-2 py-1 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories([...selectedCategories, category]);
                              } else {
                                setSelectedCategories(selectedCategories.filter(c => c !== category));
                              }
                            }}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                            selectedCategories.includes(category)
                              ? 'border-[#FF0000] bg-[#FF0000]'
                              : 'border-gray-300'
                          }`}>
                            {selectedCategories.includes(category) && (
                              <Check size={12} className="text-white" />
                            )}
                          </div>
                          <span className="ml-2 text-base text-gray-900">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Type Filter */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowTypeFilter(!showTypeFilter);
                    setShowStatusFilter(false);
                    setShowCategoryFilter(false);
                  }}
                  className="px-4 py-2.5 text-base border border-gray-200 rounded-lg hover:border-[#FF0000] focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] bg-white flex items-center space-x-2"
                >
                  <Box size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-700">Type</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>

                {showTypeFilter && (
                  <div className="absolute z-10 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                    <div className="p-2">
                      {TYPES.map((type) => (
                        <label
                          key={type}
                          className="flex items-center px-2 py-1 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(type)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedTypes([...selectedTypes, type]);
                              } else {
                                setSelectedTypes(selectedTypes.filter(t => t !== type));
                              }
                            }}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                            selectedTypes.includes(type)
                              ? 'border-[#FF0000] bg-[#FF0000]'
                              : 'border-gray-300'
                          }`}>
                            {selectedTypes.includes(type) && (
                              <Check size={12} className="text-white" />
                            )}
                          </div>
                          <span className="ml-2 text-base text-gray-900">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Clear Filters */}
              {(selectedStatuses.length > 0 || selectedCategories.length > 0 || selectedTypes.length > 0) && (
                <button
                  onClick={() => {
                    setSelectedStatuses([]);
                    setSelectedCategories([]);
                    setSelectedTypes([]);
                  }}
                  className="px-4 py-2.5 text-base font-medium text-[#FF0000] hover:bg-[#FF0000]/5 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <X size={16} />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="border-t border-gray-200 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Inventory
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 flex-shrink-0 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-base font-medium text-gray-900">{product.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded text-sm font-medium ${getStatusColor(product.status)}`}>
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                    {product.status === 'sold-out' && product.waitingCount > 0 && (
                      <span className="ml-2 text-sm text-gray-500">
                        {product.waitingCount} Waiting
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-base text-gray-900">
                    {product.status === 'sold-out' ? (
                      <span className="text-red-600">Out of stock</span>
                    ) : (
                      `${product.inventory.total} in stock`
                    )}
                  </div>
                  <div className="text-base text-gray-500">{product.inventory.variants} variants</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-base text-gray-900">{product.category}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-base text-gray-900">{product.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="text-base font-medium text-gray-900">
                    {typeof product.price === 'number' 
                      ? `$${product.price.toFixed(2)}`
                      : `$${product.price.min.toFixed(2)} - $${product.price.max.toFixed(2)}`
                    }
                  </span>
                  <button
                    onClick={() => window.open(`/products/${product.id}`, '_blank')}
                    className="ml-4 p-2 text-gray-400 hover:text-[#FF0000] rounded-lg transition-colors inline-flex items-center"
                    title="View Product"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    )
  );
}