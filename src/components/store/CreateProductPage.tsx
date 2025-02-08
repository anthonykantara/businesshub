import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Calendar, Clock, X, Tag, Box, Package, Archive, Bold, Italic, List, Link, Image, Check, Search, Save, Star, Pencil, DollarSign, Globe, ChevronDown, RefreshCw } from 'lucide-react';

interface ProductImage {
  url: string;
  name: string;
  alt: string;
  isMain: boolean;
}

interface SEOData {
  title: string;
  description: string;
}

interface CountryPrice {
  country: string;
  price: number;
}

interface Collection {
  id: string;
  title: string;
  image: string;
  productsCount: number;
}

const SAMPLE_COLLECTIONS: Collection[] = [
  {
    id: '1',
    title: 'Coffee Essentials',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&h=300&q=80',
    productsCount: 12
  },
  {
    id: '2',
    title: 'Brewing Equipment',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&h=300&q=80',
    productsCount: 8
  },
  {
    id: '3',
    title: 'Limited Edition',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&h=300&q=80',
    productsCount: 4
  }
];

interface CreateProductPageProps {
  onBack: () => void;
}

const PRODUCT_CATEGORIES = {
  'Electronics & Gadgets': [
    'Mobile Devices',
    'Mobile Accessories',
    'Computers & Laptops',
    'Computer Accessories',
    'Gaming',
    'Audio & Video',
    'Cameras & Photography',
    'Wearable Technology',
    'Office Electronics'
  ],
  'Home & Kitchen': [
    'Kitchen Appliances',
    'Home Appliances',
    'Furniture',
    'Home Decor',
    'Storage & Organization',
    'Home Improvement',
    'Smart Home Devices'
  ],
  'Fashion & Apparel': [
    'Men\'s Clothing',
    'Women\'s Clothing',
    'Unisex Clothing',
    'Kids & Baby Clothes',
    'Footwear',
    'Accessories',
    'Jewelry'
  ],
  'Beauty & Personal Care': [
    'Skincare',
    'Haircare',
    'Makeup',
    'Fragrances',
    'Men\'s Grooming',
    'Hygiene & Personal Care'
  ],
  'Health & Wellness': [
    'Vitamins & Supplements',
    'Fitness Equipment',
    'Medical Supplies',
    'Mental Wellness',
    'Sexual Wellness'
  ],
  'Sports & Outdoor': [
    'Sports Equipment',
    'Gym & Training',
    'Outdoor Recreation',
    'Cycling'
  ],
  'Automotive & Tools': [
    'Car Accessories',
    'Motorcycle Gear',
    'Tools & DIY'
  ],
  'Office & School Supplies': [
    'Office Equipment',
    'Stationery',
    'School Supplies'
  ],
  'Baby & Kids': [
    'Baby Gear',
    'Toys & Games',
    'Educational Toys'
  ],
  'Groceries & Food': [
    'Fresh Produce',
    'Meat & Seafood',
    'Dairy & Eggs',
    'Pantry Essentials',
    'Beverages',
    'Snacks & Sweets'
  ],
  'Books & Media': [
    'Books',
    'Magazines & Newspapers',
    'Music & Movies'
  ],
  'Pet Supplies': [
    'Pet Food',
    'Pet Accessories',
    'Pet Health & Grooming'
  ],
  'Travel & Luggage': [
    'Luggage & Bags',
    'Travel Accessories'
  ],
  'Music & Instruments': [
    'Musical Instruments',
    'Music Accessories'
  ],
  'Industrial & Safety Equipment': [
    'Construction Materials',
    'Safety Gear'
  ]
};

const PRODUCT_TYPES: { [key: string]: { [key: string]: string[] } } = {
  'Electronics & Gadgets': {
    'Mobile Devices': ['Smartphones', 'Tablets', 'Feature Phones', 'E-Readers'],
    'Mobile Accessories': ['Cases', 'Screen Protectors', 'Chargers', 'Power Banks', 'Cables'],
    'Computers & Laptops': ['Laptops', 'Desktops', 'All-in-One PCs', 'Chromebooks', 'MacBooks'],
    'Computer Accessories': ['Keyboards', 'Mice', 'Monitors', 'Webcams', 'External Drives', 'USB Hubs'],
    'Gaming': ['Consoles', 'Controllers', 'Games', 'Gaming Accessories'],
    'Audio & Video': ['Headphones', 'Speakers', 'Microphones', 'Cameras', 'Projectors'],
    'Wearable Technology': ['Smartwatches', 'Fitness Trackers', 'Smart Glasses']
  },
  'Home & Kitchen': {
    'Kitchen Appliances': ['Blenders', 'Coffee Makers', 'Toasters', 'Microwaves', 'Refrigerators'],
    'Home Appliances': ['Vacuum Cleaners', 'Air Purifiers', 'Washing Machines', 'Dryers'],
    'Furniture': ['Sofas', 'Tables', 'Chairs', 'Beds', 'Storage Units'],
    'Home Decor': ['Lighting', 'Rugs', 'Curtains', 'Wall Art', 'Mirrors'],
    'Smart Home Devices': ['Smart Lights', 'Smart Thermostats', 'Security Cameras', 'Smart Speakers']
  }
};
export default function CreateProductPage({ onBack }: CreateProductPageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ar'>('en');
  const [translations, setTranslations] = useState<{
    en: { title: string; description: string };
    ar: { title: string; description: string };
  }>({
    en: { title: '', description: '' },
    ar: { title: '', description: '' }
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [productType, setProductType] = useState('');
  const [selectedImages, setSelectedImages] = useState<ProductImage[]>([]);
  const [showImageDetails, setShowImageDetails] = useState(false);
  const [editingImage, setEditingImage] = useState<{ index: number; image: ProductImage } | null>(null);
  const [status, setStatus] = useState<'active' | 'draft' | 'preorder' | 'sold-out'>('draft');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [showCollectionSearch, setShowCollectionSearch] = useState(false);
  const [collectionSearchQuery, setCollectionSearchQuery] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [publishType, setPublishType] = useState<'now' | 'schedule'>('now');
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [seo, setSeo] = useState<SEOData>({
    title: '',
    description: ''
  });
  const [price, setPrice] = useState<string>('');
  const [compareAtPrice, setCompareAtPrice] = useState<string>('');
  const [costPerItem, setCostPerItem] = useState<string>('');
  const [dealsPrice, setDealsPrice] = useState<string>('');
  const [showCostSection, setShowCostSection] = useState(false);
  const [countryPrices, setCountryPrices] = useState<CountryPrice[]>([]);
  const [showAddCountryPrice, setShowAddCountryPrice] = useState(false);
  const [newCountryPrice, setNewCountryPrice] = useState<CountryPrice>({ country: '', price: 0 });
  const [variants, setVariants] = useState<Array<{
    id: string;
    name: string;
    values: string[];
    prices: { [key: string]: number };
  }>>([]);

  const handleAddVariant = () => {
    setVariants(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      values: [],
      prices: {}
    }]);
  };

  const handleRemoveVariant = (id: string) => {
    setVariants(prev => prev.filter(v => v.id !== id));
  };

  const handleVariantChange = (id: string, field: 'name' | 'values', value: string) => {
    setVariants(prev => prev.map(v => {
      if (v.id === id) {
        if (field === 'values') {
          const newValues = value.split(',').map(v => v.trim()).filter(Boolean);
          const newPrices = { ...v.prices };
          newValues.forEach(val => {
            if (!newPrices[val]) {
              newPrices[val] = parseFloat(price) || 0;
            }
          });
          return { ...v, [field]: newValues, prices: newPrices };
        }
        return { ...v, [field]: value };
      }
      return v;
    }));
  };

  const handleVariantPriceChange = (variantId: string, value: string, price: string) => {
    setVariants(prev => prev.map(v => {
      if (v.id === variantId) {
        return {
          ...v,
          prices: { ...v.prices, [value]: parseFloat(price) || 0 }
        };
      }
      return v;
    }));
  };

  const handleCreate = () => {
    // In a real app, this would make an API call
    // Save current text before submitting
    const finalTranslations = {
      ...translations,
      [selectedLanguage]: {
        title: title,
        description: description
      }
    };

    const schedule = scheduleDate && scheduleTime 
      ? new Date(`${scheduleDate}T${scheduleTime}`)
      : null;

    console.log({
      translations: finalTranslations,
      images: selectedImages,
      status,
      productType,
      category,
      subcategory,
      collections: selectedCollections,
      schedule,
      seo
    });

    onBack();
  };

  const handleImageUpload = (file: File, isMain: boolean = false) => {
    const url = URL.createObjectURL(file);
    const newImage: ProductImage = {
      url,
      name: file.name,
      alt: '',
      isMain: isMain || selectedImages.length === 0 // First image is main by default
    };
    
    setSelectedImages(prev => {
      // If this is being set as main, update other images to not be main
      if (newImage.isMain) {
        return [...prev.map(img => ({ ...img, isMain: false })), newImage];
      }
      return [...prev, newImage];
    });
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => {
      const newImages = prev.filter((_, i) => i !== index);
      // If we removed the main image, make the first remaining image the main one
      if (prev[index]?.isMain && newImages.length > 0) {
        newImages[0].isMain = true;
      }
      return newImages;
    });
  };

  const handleSetMainImage = (index: number) => {
    setSelectedImages(prev => {
      const newImages = [...prev];
      // First, set all images to not be main
      newImages.forEach(img => img.isMain = false);
      // Set the selected image as main
      newImages[index].isMain = true;
      // Move the main image to the front
      const mainImage = newImages.splice(index, 1)[0];
      return [mainImage, ...newImages];
    });
  };

  const handleUpdateImageDetails = (image: ProductImage) => {
    if (editingImage === null) return;
    
    setSelectedImages(prev => 
      prev.map((img, i) => 
        i === editingImage.index ? image : img
      )
    );
    
    setEditingImage(null);
  };

  // Get available product types based on category and subcategory
  const getAvailableProductTypes = () => {
    if (!category || !subcategory) return [];
    return PRODUCT_TYPES[category]?.[subcategory] || [];
  };

  // Reset product type when category or subcategory changes
  useEffect(() => {
    setProductType('');
  }, [category, subcategory]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowDiscardConfirm(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <ArrowLeft size={32} className="text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Add product</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowDiscardConfirm(true)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Discard
            </button>
            <button
              onClick={handleCreate}
              disabled={!title || selectedImages.length === 0}
              className="flex items-center px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} className="mr-2" />
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full px-6 py-8 space-y-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="col-span-2">
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-lg font-medium text-gray-900 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-colors"
                      placeholder="e.g. Premium Coffee Beans, Ceramic Mug"
                    />
                  </div>

                  {/* Description with Toolbar */}
                  <div>
                    <label className="block text-lg font-medium text-gray-900 mb-2">
                      Description
                    </label>
                    <div className="border border-gray-300 rounded-lg focus-within:border-[#FF0000] focus-within:ring-1 focus-within:ring-[#FF0000]">
                      {/* Toolbar */}
                      <div className="flex items-center space-x-1 p-2 border-b border-gray-200">
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <Bold size={18} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <Italic size={18} className="text-gray-600" />
                        </button>
                        <div className="h-6 w-px bg-gray-200 mx-1" />
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <List size={18} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <Link size={18} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <Image size={18} className="text-gray-600" />
                        </button>
                      </div>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={8}
                        className="w-full px-4 py-3 text-base border-0 focus:ring-0 rounded-lg resize-none"
                        placeholder="Add a detailed description..."
                      />
                    </div>
                  </div>
                  
                  {/* Language Switcher */}
                  <div className="border-t border-gray-200 mt-6 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-medium text-gray-900">Translations</h3>
                      <button
                        onClick={() => {
                          const newLang = selectedLanguage === 'en' ? 'ar' : 'en';
                          setSelectedLanguage(newLang);
                          // Save current text before switching
                          setTranslations(prev => ({
                            ...prev,
                            [selectedLanguage]: {
                              title: title,
                              description: description
                            }
                          }));
                          // Load text for selected language
                          setTitle(translations[newLang]?.title || '');
                          setDescription(translations[newLang]?.description || '');
                        }}
                        className="px-3 py-1.5 text-sm font-medium text-[#FF0000] hover:bg-[#FF0000]/5 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <Globe size={16} />
                        <span>{selectedLanguage === 'en' ? 'العربية' : 'English'}</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Globe size={14} />
                      <span>Currently editing in {selectedLanguage === 'en' ? 'English' : 'Arabic'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Media */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 space-y-4">
                  <h2 className="text-lg font-medium text-gray-900">Media</h2>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-all"
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.add('border-[#FF0000]', 'bg-[#FF0000]/5');
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('border-[#FF0000]', 'bg-[#FF0000]/5');
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('border-[#FF0000]', 'bg-[#FF0000]/5');
                      const files = Array.from(e.dataTransfer.files);
                      files.forEach((file, index) => {
                        if (file.type.startsWith('image/')) {
                          handleImageUpload(file, index === 0 && selectedImages.length === 0);
                        }
                      });
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        files.forEach((file, index) => {
                          handleImageUpload(file, index === 0 && selectedImages.length === 0);
                        });
                      }}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="mx-auto w-12 h-12 rounded-full bg-[#FF0000]/5 flex items-center justify-center mb-4">
                        <Plus size={24} className="text-[#FF0000]" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">Add visuals</p>
                      <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
                      <p className="text-xs text-gray-400 mt-2">PNG, JPG up to 5MB</p>
                    </label>
                  </div>
                  
                  {selectedImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 mt-6">
                      {selectedImages.map((image, index) => (
                        <div key={index} className="relative group aspect-square">
                        <img
                          src={image.url}
                          alt={image.alt || `Product ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                          {image.isMain && (
                            <div className="absolute top-2 left-2 px-2 py-1 bg-[#FF0000] text-white text-xs font-medium rounded-full">
                              Main
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                setEditingImage({ index, image });
                                setShowImageDetails(true);
                              }}
                              className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                              title="Edit details"
                            >
                              <Pencil size={16} className="text-gray-900" />
                            </button>
                            <button
                              onClick={() => handleSetMainImage(index)}
                              className={`p-2 bg-white rounded-full hover:bg-gray-100 transition-colors ${
                                image.isMain ? 'text-[#FF0000]' : 'text-gray-900'
                              }`}
                              title={image.isMain ? 'Main image' : 'Set as main'}
                              disabled={image.isMain}
                            >
                              <Star size={16} />
                            </button>
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                              title="Remove"
                            >
                              <X size={16} className="text-gray-900" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="p-6 space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Pricing</h3>
                  
                  {/* Price Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price
                      </label>
                      <div className="space-y-2">
                        <div className="relative">
                          <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                            placeholder="0.00"
                          />
                        </div>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-[#FF0000] focus:ring-[#FF0000]"
                          />
                          <span className="text-sm text-gray-600">Charge Tax</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Compare-at Price
                      </label>
                      <div className="relative">
                        <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={compareAtPrice}
                          onChange={(e) => setCompareAtPrice(e.target.value)}
                          className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        961 Deals Price (based on Discount)
                      </label>
                      <div className="relative">
                        <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={dealsPrice || (price ? (parseFloat(price) * 0.9).toFixed(2) : '')}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            const currentPrice = parseFloat(price);
                            if (!currentPrice || value <= currentPrice) {
                              setDealsPrice(e.target.value);
                            }
                          }}
                          className="w-full pl-8 pr-10 py-2.5 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                          placeholder={price ? (parseFloat(price) * 0.9).toFixed(2) : '0.00'}
                        />
                        {dealsPrice && (
                          <button
                            onClick={() => setDealsPrice('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF0000] transition-colors z-10"
                            title="Reset to default"
                          >
                            <RefreshCw size={16} />
                          </button>
                        )}
                      </div>
                      {dealsPrice && parseFloat(dealsPrice) > parseFloat(price) && (
                        <p className="mt-1 text-xs text-red-500">
                          961 Deals Price cannot exceed the regular price
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Cost Section */}
                  <div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cost per item
                        </label>
                        <div className="relative">
                          <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={costPerItem}
                            onChange={(e) => setCostPerItem(e.target.value)}
                            className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                            placeholder="0.00"
                          />
                        </div>
                        <p className="text-xs text-gray-500 italic mt-1">
                          Customers won't see this
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Profit
                        </label>
                        <div className="relative bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                          <span className="font-medium text-gray-900">
                            ${price && costPerItem
                              ? (parseFloat(price) - parseFloat(costPerItem)).toFixed(2)
                              : '0.00'
                            }
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Margin
                        </label>
                        <div className="relative bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                          <span className="font-medium text-gray-900">
                            {price && costPerItem && parseFloat(price) > 0
                              ? (((parseFloat(price) - parseFloat(costPerItem)) / parseFloat(price)) * 100).toFixed(1)
                              : '0.0'
                            }%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 mt-6 pt-2">
                    </div>
                  </div>

                  {/* Country-Specific Pricing */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location-Specific Pricing
                    </label>
                    {countryPrices.length > 0 && (
                      <div className="space-y-2 mb-3">
                        {countryPrices.map((cp, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <Globe size={16} className="text-gray-400 mr-2" />
                              <span className="text-sm text-gray-900">{cp.country}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-medium text-gray-900">
                                ${cp.price.toFixed(2)}
                              </span>
                              <button
                                onClick={() => setCountryPrices(prev => prev.filter((_, i) => i !== index))}
                                className="text-gray-400 hover:text-[#FF0000]"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={() => setShowAddCountryPrice(true)}
                      className="w-full flex items-center justify-center px-4 py-2.5 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors"
                    >
                      <Plus size={16} className="text-gray-400 mr-2" />
                      <span className="text-gray-600">Add location-based pricing</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Variants */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="p-6 space-y-4">
                  <h2 className="text-lg font-medium text-gray-900">Variants</h2>
                  <div className="space-y-4">
                    {variants.map((variant) => (
                      <div key={variant.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 space-y-4">
                            <div>
                              <input
                                type="text"
                                value={variant.name}
                                onChange={(e) => handleVariantChange(variant.id, 'name', e.target.value)}
                                placeholder="Size, Color, etc."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                value={variant.values.join(', ')}
                                onChange={(e) => handleVariantChange(variant.id, 'values', e.target.value)}
                                placeholder="Small, Medium, Large"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveVariant(variant.id)}
                            className="ml-4 p-2 text-gray-400 hover:text-[#FF0000] rounded-lg hover:bg-[#FF0000]/5"
                          >
                            <X size={20} />
                          </button>
                        </div>

                        {variant.values.length > 0 && (
                          <div className="pt-4 border-t border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Pricing</h4>
                            <div className="space-y-3">
                              {variant.values.map((value) => (
                                <div key={value} className="flex items-center space-x-3">
                                  <span className="text-sm text-gray-600 min-w-[100px]">{value}</span>
                                  <div className="relative flex-1">
                                    <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      value={variant.prices[value] || ''}
                                      onChange={(e) => handleVariantPriceChange(variant.id, value, e.target.value)}
                                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                                      placeholder={price || '0.00'}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <button
                      onClick={handleAddVariant}
                      className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors"
                    >
                      <Plus size={16} className="text-gray-400 mr-2" />
                      <span className="text-gray-600">Add variant option</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="p-6 space-y-4">
                  <h2 className="text-lg font-medium text-gray-900">Shipping</h2>
                  <div className="space-y-4">
                    <div className="flex items-end gap-4">
                      <div className="w-32">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Weight
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                          placeholder="0.00"
                        />
                      </div>
                      <div className="w-32">
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                        >
                          <option value="kg">Kilograms (kg)</option>
                          <option value="g">Grams (g)</option>
                          <option value="lb">Pounds (lb)</option>
                          <option value="oz">Ounces (oz)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEO */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 space-y-4">
                  <h2 className="text-lg font-medium text-gray-900">Search Engine Listing</h2>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={seo.title}
                        onChange={(e) => setSeo(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                        placeholder="Enter SEO title"
                      />
                    </div>
                    <div>
                      <textarea
                        value={seo.description}
                        onChange={(e) => setSeo(prev => ({ ...prev, description: e.target.value }))}
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
            {/* Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Status</h3>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as typeof status)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="preorder">Preorder</option>
                  <option value="sold-out">Sold Out</option>
                </select>
              </div>
            </div>

            {/* Publishing */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Publishing</h3>
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
                        <p className="text-sm text-gray-500">Product will be published immediately</p>
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
                        <p className="text-sm text-gray-500">Choose when to publish this product</p>
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

            {/* Organization */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Organization</h3>
                <div className="space-y-4">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        setSubcategory('');
                      }}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    >
                      <option value="">Select Category</option>
                      {Object.keys(PRODUCT_CATEGORIES).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Subcategory */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subcategory
                    </label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      disabled={!category}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Subcategory</option>
                      {category && PRODUCT_CATEGORIES[category as keyof typeof PRODUCT_CATEGORIES].map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>

                  {/* Product Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Type
                    </label>
                    <select
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                      disabled={!subcategory}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] ${
                        !subcategory 
                          ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed' 
                          : 'border-gray-300 bg-white text-gray-900 cursor-pointer'
                      }`}
                    >
                      <option value="">{subcategory ? 'Select Type' : 'Select subcategory first'}</option>
                      {getAvailableProductTypes().map((type) => (
                        <option key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Collections */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Collections
                    </label>
                    {selectedCollections.length > 0 && (
                      <div className="mb-3 space-y-2">
                        {SAMPLE_COLLECTIONS.filter(c => selectedCollections.includes(c.id)).map((collection) => (
                          <div key={collection.id} className="flex items-center p-2 bg-gray-50 rounded-lg">
                            <div className="h-8 w-8 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={collection.image}
                                alt={collection.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="ml-2 text-sm text-gray-900">{collection.title}</span>
                            <button
                              onClick={() => setSelectedCollections(prev => prev.filter(id => id !== collection.id))}
                              className="ml-auto text-gray-400 hover:text-[#FF0000] p-1 rounded-lg hover:bg-[#FF0000]/5 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={() => setShowCollectionSearch(true)}
                      className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors"
                    >
                      <Plus size={16} className="text-gray-400 mr-2" />
                      <span className="text-gray-600">Add to collection</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}