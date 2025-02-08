import React, { useState } from 'react';
import { ArrowLeft, Plus, Check, Search, Calendar, Clock, X } from 'lucide-react';
import type { Product } from './ProductsPage';

interface CreateCollectionPageProps {
  onBack: () => void;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Arabica Dark Roast Coffee Beans',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&h=300&q=80',
    status: 'active',
    inventory: { total: 250, variants: 3 },
    preorders: 0,
    category: 'Coffee',
    type: 'Beans',
    price: { min: 19.99, max: 24.99 }
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
  }
];

export default function CreateCollectionPage({ onBack }: CreateCollectionPageProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [publishType, setPublishType] = useState<'now' | 'schedule'>('now');
  const [showProductSearch, setShowProductSearch] = useState(false);

  const filteredProducts = SAMPLE_PRODUCTS.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    // In a real app, this would make an API call
    const schedule = scheduleDate && scheduleTime 
      ? new Date(`${scheduleDate}T${scheduleTime}`)
      : null;

    console.log({
      title,
      description,
      image: selectedImage,
      seo: {
        title: seoTitle,
        description: seoDescription
      },
      products: selectedProducts,
      schedule
    });

    onBack();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <ArrowLeft size={32} className="text-gray-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Create collection</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full px-6 py-8 space-y-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="col-span-2">
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Title Section */}
              <div className="p-6 space-y-4">
                <div className="space-y-4">
                  <div>
            {/* Title */}
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-colors"
                      placeholder="e.g. Summer collection, Under $100, Staff picks"
                    />
                  </div>

            {/* Collection Description */}
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Description</label>
                    <div className="border border-gray-300 rounded-lg focus-within:border-[#FF0000] focus-within:ring-1 focus-within:ring-[#FF0000] transition-colors">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border-0 focus:ring-0 rounded-lg resize-none"
                        placeholder="Add a description..."
                      />
                    </div>
                  </div>
                </div>
              </div>
              </div>

            {/* Products */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Products</h2>
                  <span className="text-sm text-gray-500">{selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''}</span>
                </div>
                <button
                  onClick={() => setShowProductSearch(true)}
                  className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors"
                >
                  <Plus size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-600">Add Products</span>
                </button>
              {selectedProducts.length === 0 ? (
                <div className="text-center py-12 border border-gray-200 rounded-lg">
                  <p className="text-gray-500">There are no products in this collection.</p>
                  <p className="text-sm text-gray-400">Click above to add products.</p>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                  {SAMPLE_PRODUCTS.filter(p => selectedProducts.includes(p.id)).map((product) => (
                    <div key={product.id} className="flex items-center p-4">
                      <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{product.title}</h4>
                      </div>
                      <button
                        onClick={() => setSelectedProducts(prev => prev.filter(id => id !== product.id))}
                        className="ml-auto text-gray-400 hover:text-[#FF0000] p-1 rounded-lg hover:bg-[#FF0000]/5 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
                </div>
                </div>

            {/* SEO */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Search Engine Listing</h2>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="Enter SEO title"
                  />
                </div>
                <div>
                  <textarea
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] resize-none"
                    placeholder="Enter SEO description"
                  />
                </div>
              </div>
                </div>
                </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-1 space-y-6">
            {/* Publishing */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-medium text-gray-900">Publishing</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="publishType"
                      value="now"
                      checked={publishType === 'now'}
                      onChange={() => setPublishType('now')}
                      className="text-[#FF0000] focus:ring-[#FF0000] transition-colors"
                    />
                    <div className="flex-1">
                      <span className="text-base font-medium text-gray-900">Publish now</span>
                      <p className="text-sm text-gray-500">Collection will be published immediately</p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="publishType"
                      value="schedule"
                      checked={publishType === 'schedule'}
                      onChange={() => setPublishType('schedule')}
                      className="text-[#FF0000] focus:ring-[#FF0000] transition-colors"
                    />
                    <div className="flex-1">
                      <span className="text-base font-medium text-gray-900">Schedule for later</span>
                      <p className="text-sm text-gray-500">Choose when to publish this collection</p>
                    </div>
                  </label>
                </div>
                
                {publishType === 'schedule' && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fadeIn mt-4">
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Calendar size={16} className="mr-2" />
                        Publication Date
                      </label>
                      <input
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      />
                    </div>
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Clock size={16} className="mr-2" />
                        Publication Time
                      </label>
                      <input
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      />
                    </div>
                  </div>
                )}
              </div>
              </div>
            </div>

            {/* Collection Image */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 space-y-4">
              <div 
                className={`aspect-[16/9] rounded-lg border-2 border-dashed overflow-hidden relative bg-white transition-all duration-200 ${
                  selectedImage 
                    ? 'border-[#FF0000] border-solid' 
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add('border-[#FF0000]', 'bg-[#FF0000]/5');
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  if (!selectedImage) {
                    e.currentTarget.classList.remove('border-[#FF0000]', 'bg-[#FF0000]/5');
                  }
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith('image/')) {
                    const url = URL.createObjectURL(file);
                    setSelectedImage(url);
                  }
                }}
              >
                {selectedImage ? (
                  <div className="relative group">
                    <img
                      src={selectedImage}
                      alt="Collection preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedImage('');
                        }}
                        className="px-4 py-2 bg-white text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Change Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 mb-4 rounded-full bg-[#FF0000]/5 flex items-center justify-center">
                      <Plus size={24} className="text-[#FF0000]" />
                    </div>
                    <div className="text-center">
                      <button className="px-4 py-2 text-sm font-medium text-[#FF0000] hover:bg-[#FF0000]/5 rounded-lg transition-colors">
                        Add image
                      </button>
                      <p className="text-sm text-gray-500 mt-2">
                        or drag and drop an image
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Recommended: 1200 x 675 pixels
                      </p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setSelectedImage(url);
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            </div>

            {/* CTA Button */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4">
              <button
                onClick={() => handleCreate()}
                disabled={!title || !selectedImage}
                className="w-full px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <span>{publishType === 'schedule' ? 'Schedule' : 'Create'}</span>
              </button>
              </div>
            </div>
          </div>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-base border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {filteredProducts.map((p) => (
                  <label
                    key={p.id}
                    className="flex items-center p-4 border border-gray-200 rounded-lg transition-all cursor-pointer hover:bg-[#FF0000]/5"
                  >
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(p.id)}
                      onChange={() => {
                        setSelectedProducts(prev =>
                          prev.includes(p.id)
                            ? prev.filter(id => id !== p.id)
                            : [...prev, p.id]
                        );
                      }}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${
                      selectedProducts.includes(p.id)
                        ? 'border-[#FF0000] bg-[#FF0000]'
                        : 'border-gray-300'
                    }`}>
                      {selectedProducts.includes(p.id) && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                    <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">{p.title}</h4>
                      <p className="text-sm text-gray-500">
                        {p.inventory.total} in stock
                      </p>
                    </div>
                  </label>
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
    </div>
  );
}