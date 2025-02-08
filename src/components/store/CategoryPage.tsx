import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Check, X, ArrowLeft, ArrowRight, Star, Bell } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  isNew?: boolean;
  isPreorder?: boolean;
  isSoldOut?: boolean;
  brand: string;
  colors: string[];
  sizes: string[];
}

interface CategoryPageProps {
  category: string;
  onBack?: () => void;
  products?: Product[]; // Add optional products prop
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    title: '961 Classic Snapback',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&h=400&q=80',
    price: 19.99,
    originalPrice: 25.00,
    rating: 4.8,
    ratingCount: 102,
    isNew: true,
    brand: '961',
    colors: ['Black', 'Navy', 'Red'],
    sizes: ['S', 'M', 'L']
  },
  {
    id: '2',
    title: '961 Heritage Tee',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&h=400&q=80',
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.9,
    ratingCount: 89,
    isNew: true,
    brand: '961',
    colors: ['White', 'Black', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '3',
    title: '961 Premium Hoodie',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&h=400&q=80',
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.7,
    ratingCount: 156,
    brand: '961',
    colors: ['Black', 'Gray', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '4',
    title: '961 Varsity Jacket',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=300&h=400&q=80',
    price: 89.99,
    originalPrice: 99.99,
    rating: 4.9,
    ratingCount: 67,
    isSoldOut: true,
    brand: '961',
    colors: ['Black', 'Navy'],
    sizes: ['S', 'M', 'L']
  },
  {
    id: '5',
    title: '961 Vintage Cap',
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=300&h=400&q=80',
    price: 29.99,
    rating: 4.9,
    ratingCount: 234,
    brand: '961',
    colors: ['Black', 'Navy', 'Olive'],
    sizes: ['One Size']
  },
  {
    id: '6',
    title: '961 Winter Beanie',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=300&h=400&q=80',
    price: 19.99,
    rating: 4.8,
    ratingCount: 178,
    brand: '961',
    colors: ['Black', 'Gray', 'Navy'],
    sizes: ['One Size']
  },
  {
    id: '7',
    title: '961 Travel Backpack',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&h=400&q=80',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.7,
    ratingCount: 145,
    brand: '961',
    colors: ['Black', 'Gray'],
    sizes: ['One Size']
  },
  {
    id: '8',
    title: '961 Crossbody Bag',
    image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=300&h=400&q=80',
    price: 39.99,
    rating: 4.6,
    ratingCount: 92,
    brand: '961',
    colors: ['Black', 'Brown'],
    sizes: ['One Size']
  }
];

const SORT_OPTIONS = [
  { label: 'Popular', value: 'popular' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating', value: 'rating' }
];

export default function CategoryPage({ category, onBack, products: initialProducts }: CategoryPageProps) {
  const [products] = useState<Product[]>(initialProducts || SAMPLE_PRODUCTS);
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationActive, setNotificationActive] = useState<{ [key: string]: boolean }>({});
  const productsPerPage = 8;

  // Get unique colors and sizes from all products
  const allColors = Array.from(new Set(products.flatMap(p => p.colors)));
  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesColors = selectedColors.length === 0 || selectedColors.some(color => product.colors.includes(color));
    const matchesSizes = selectedSizes.length === 0 || selectedSizes.some(size => product.sizes.includes(size));
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesColors && matchesSizes && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.ratingCount - a.ratingCount;
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.ratingCount - a.ratingCount; // Default to popular sort
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleProductClick = (productId: string) => {
    window.location.href = `/store/products/${productId}`;
  };

  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    const product = products.find(p => p.id === productId);
    if (product && !product.isSoldOut) {
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price
      });
      // Open cart panel
      window.dispatchEvent(new CustomEvent('openCart'));
    }
  };

  const handleNotificationToggle = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setNotificationActive(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const clearFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange([0, 200]);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {onBack && (
                <button
                  onClick={onBack}
                  className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft size={20} className="text-gray-600" />
                </button>
              )}
              <h1 className="text-2xl font-bold text-gray-900 capitalize">{category}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="space-y-6">
              {/* Search */}
              <div>
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Math.max(0, parseInt(e.target.value) || 0), priceRange[1]])}
                      className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Math.max(priceRange[0], parseInt(e.target.value) || 0)])}
                      className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Colors</h3>
                <div className="space-y-2">
                  {allColors.map((color) => (
                    <label
                      key={color}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedColors([...selectedColors, color]);
                          } else {
                            setSelectedColors(selectedColors.filter(c => c !== color));
                          }
                        }}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                        selectedColors.includes(color)
                          ? 'border-[#FF0000] bg-[#FF0000]'
                          : 'border-gray-300'
                      }`}>
                        {selectedColors.includes(color) && <Check size={12} className="text-white" />}
                      </div>
                      <span className="text-sm text-gray-700">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Sizes</h3>
                <div className="grid grid-cols-3 gap-2">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        if (selectedSizes.includes(size)) {
                          setSelectedSizes(selectedSizes.filter(s => s !== size));
                        } else {
                          setSelectedSizes([...selectedSizes, size]);
                        }
                      }}
                      className={`px-3 py-2 text-sm font-medium rounded-lg ${
                        selectedSizes.includes(size)
                          ? 'bg-[#FF0000] text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-[#FF0000]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedColors.length > 0 || selectedSizes.length > 0 || priceRange[0] > 0 || priceRange[1] < 200) && (
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 text-sm font-medium text-[#FF0000] hover:bg-[#FF0000]/5 rounded-lg transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-500">
                {filteredProducts.length} products
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowSortOptions(!showSortOptions)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-[#FF0000] focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] bg-white"
                >
                  <span className="text-sm text-gray-700">
                    Sort by: {SORT_OPTIONS.find(opt => opt.value === sortBy)?.label}
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>

                {showSortOptions && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortOptions(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          sortBy === option.value
                            ? 'bg-[#FF0000]/5 text-[#FF0000]'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="bg-white rounded-2xl p-2 relative group cursor-pointer"
                >
                  <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {product.isNew && (
                    <span className="absolute top-5 left-5 px-2 py-1 bg-black text-white text-xs font-medium rounded">
                      New
                    </span>
                  )}
                  <span className="absolute top-5 right-5 px-2 py-1 bg-white text-gray-700 text-xs font-medium rounded-full shadow-sm">
                    {Math.round(product.price * 20)} pts
                  </span>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center text-[#FF0000] scale-110">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                            className={i < Math.floor(product.rating) ? 'text-[#FF0000]' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-500">({product.ratingCount})</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
                    <div className="flex items-baseline space-x-2">
                      <div className="space-y-1">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-xl font-bold text-gray-900">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-base text-gray-500 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-[#FF0000]">961 Deals:</span>
                          <div className="relative group">
                            <span className="text-sm font-bold text-[#FF0000]">${(product.price * 0.9).toFixed(2)}</span>
                            <div className="absolute bottom-full left-0 mb-2 w-60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              <div className="bg-white text-gray-700 text-xs p-2 rounded-lg shadow-lg border border-gray-200">
                                Save ${(product.price * 0.1).toFixed(2)} by becoming a 961 Deals member - available at checkout
                              </div>
                              <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleAddToCart(e, product.id)}
                      className={`w-full py-2 font-medium rounded-lg transition-colors ${
                        product.isSoldOut
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-[#FF0000] text-white hover:bg-[#FF0000]/90'
                      }`}
                      disabled={product.isSoldOut}
                    >
                      {product.isPreorder ? 'Preorder' : 'Add to Cart'}
                    </button>
                    {product.isSoldOut && (
                      <div className="flex space-x-2 mt-2">
                        <button
                          className="w-[85%] py-2 bg-gray-100 text-gray-400 font-medium rounded-lg cursor-not-allowed"
                          disabled
                        >
                          Sold Out
                        </button>
                        <button
                          onClick={(e) => handleNotificationToggle(e, product.id)}
                          className={`w-[25%] py-2 font-medium rounded-lg transition-colors ${
                            notificationActive[product.id]
                              ? 'bg-[#FF0000] text-white'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          <Bell size={16} className="mx-auto fill-current" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-[#FF0000] disabled:opacity-50 disabled:hover:text-gray-400"
                >
                  <ArrowLeft size={20} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-full text-sm font-medium ${
                      currentPage === page
                        ? 'bg-[#FF0000] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-[#FF0000] disabled:opacity-50 disabled:hover:text-gray-400"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}