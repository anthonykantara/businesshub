import React, { useState } from 'react';
import { Upload, X, Save, Plus, DollarSign, Pencil, GripVertical, Image } from 'lucide-react';

interface Banner {
  id: string;
  image: string;
  title: string;
  description: string;
  link: string;
  order: number;
}

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  isDefault?: boolean;
}

interface SettingsPageProps {}

export default function SettingsPage({}: SettingsPageProps) {
  const [onlineStoreLogo, setOnlineStoreLogo] = useState<string>('');
  const [appLogo, setAppLogo] = useState<string>('');
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&h=320&q=80',
      title: 'Boost Your Sales',
      description: 'New partnership opportunities await you',
      link: '/partnerships',
      order: 0
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=320&q=80',
      title: 'Grow Your Business',
      description: 'Unlock powerful tools and insights',
      link: '/tools',
      order: 1
    }
  ]);
  const [showAddBanner, setShowAddBanner] = useState(false);
  const [newBanner, setNewBanner] = useState<Partial<Banner>>({});
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [showEditBanner, setShowEditBanner] = useState(false);
  const [draggedBanner, setDraggedBanner] = useState<Banner | null>(null);
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([
    {
      id: '1',
      name: 'Standard Delivery',
      description: 'Regular delivery service',
      price: 5.00,
      estimatedDays: '3-5',
      isDefault: true
    },
    {
      id: '2',
      name: 'Priority Delivery',
      description: 'Express delivery service',
      price: 15.00,
      estimatedDays: '1-2'
    }
  ]);
  const [showAddDelivery, setShowAddDelivery] = useState(false);
  const [newDelivery, setNewDelivery] = useState<Partial<DeliveryOption>>({});
  const [editingDelivery, setEditingDelivery] = useState<DeliveryOption | null>(null);
  const [showEditDelivery, setShowEditDelivery] = useState(false);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'store' | 'app') => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'store') {
        setOnlineStoreLogo(url);
      } else {
        setAppLogo(url);
      }
    }
  };

  const handleAddDeliveryOption = () => {
    if (!newDelivery.name || !newDelivery.price) return;

    const newOption: DeliveryOption = {
      id: (deliveryOptions.length + 1).toString(),
      name: newDelivery.name,
      description: newDelivery.description || '',
      price: newDelivery.price,
      estimatedDays: newDelivery.estimatedDays || ''
    };

    setDeliveryOptions([...deliveryOptions, newOption]);
    setNewDelivery({});
    setShowAddDelivery(false);
  };

  const handleEditDeliveryOption = () => {
    if (!editingDelivery || !editingDelivery.name || !editingDelivery.price) return;

    setDeliveryOptions(prev => prev.map(option => 
      option.id === editingDelivery.id ? editingDelivery : option
    ));
    setEditingDelivery(null);
    setShowEditDelivery(false);
  };

  const handleRemoveDeliveryOption = (id: string) => {
    setDeliveryOptions(prev => prev.filter(option => option.id !== id));
  };

  const handleBannerImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'new' | 'edit') => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'new') {
        setNewBanner(prev => ({ ...prev, image: url }));
      } else {
        setEditingBanner(prev => prev ? { ...prev, image: url } : null);
      }
    }
  };

  const handleAddBanner = () => {
    if (!newBanner.image || !newBanner.title) return;

    const banner: Banner = {
      id: (banners.length + 1).toString(),
      image: newBanner.image,
      title: newBanner.title,
      description: newBanner.description || '',
      link: newBanner.link || '',
      order: banners.length
    };

    setBanners([...banners, banner]);
    setNewBanner({});
    setShowAddBanner(false);
  };

  const handleEditBanner = () => {
    if (!editingBanner || !editingBanner.image || !editingBanner.title) return;

    setBanners(prev => prev.map(banner => 
      banner.id === editingBanner.id ? editingBanner : banner
    ));
    setEditingBanner(null);
    setShowEditBanner(false);
  };

  const handleRemoveBanner = (id: string) => {
    setBanners(prev => {
      const filtered = prev.filter(banner => banner.id !== id);
      return filtered.map((banner, index) => ({ ...banner, order: index }));
    });
  };

  const handleDragStart = (banner: Banner) => {
    setDraggedBanner(banner);
  };

  const handleDragOver = (e: React.DragEvent, targetBanner: Banner) => {
    e.preventDefault();
    if (!draggedBanner || draggedBanner.id === targetBanner.id) return;

    setBanners(prev => {
      const newBanners = [...prev];
      const draggedIndex = newBanners.findIndex(b => b.id === draggedBanner.id);
      const targetIndex = newBanners.findIndex(b => b.id === targetBanner.id);
      
      // Swap orders
      const temp = newBanners[draggedIndex].order;
      newBanners[draggedIndex].order = newBanners[targetIndex].order;
      newBanners[targetIndex].order = temp;
      
      // Sort by order
      return newBanners.sort((a, b) => a.order - b.order);
    });
  };

  const handleDragEnd = () => {
    setDraggedBanner(null);
  };

  const handleSetDefaultDelivery = (id: string) => {
    setDeliveryOptions(prev => prev.map(option => ({
      ...option,
      isDefault: option.id === id
    })));
  };

  return (
    <div className="py-8 px-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
          <button className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors flex items-center space-x-2">
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>

        {/* Logo Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Logo Settings</h2>
            
            <div className="grid grid-cols-2 gap-8">
              {/* Online Store Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Online Store Logo
                </label>
                <p className="text-sm text-gray-500 mb-4">
                  Recommended: 400 x 100px
                </p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-all relative">
                  {onlineStoreLogo ? (
                    <div className="relative group">
                      <img
                        src={onlineStoreLogo}
                        alt="Store logo"
                        className="max-h-[100px] mx-auto"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => setOnlineStoreLogo('')}
                          className="px-4 py-2 bg-white text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          Change Logo
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mx-auto w-12 h-12 rounded-full bg-[#FF0000]/5 flex items-center justify-center mb-4">
                        <Upload size={24} className="text-[#FF0000]" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">Add store logo</p>
                      <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(e, 'store')}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* App Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  App Logo
                </label>
                <p className="text-sm text-gray-500 mb-4">
                  Recommended: 512 x 512px
                </p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-all relative">
                  {appLogo ? (
                    <div className="relative group">
                      <img
                        src={appLogo}
                        alt="App logo"
                        className="max-h-[100px] mx-auto"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => setAppLogo('')}
                          className="px-4 py-2 bg-white text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          Change Logo
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mx-auto w-12 h-12 rounded-full bg-[#FF0000]/5 flex items-center justify-center mb-4">
                        <Upload size={24} className="text-[#FF0000]" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">Add app logo</p>
                      <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(e, 'app')}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Homepage Banners */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Homepage Banners</h2>
              <button
                onClick={() => setShowAddBanner(true)}
                className="px-4 py-2 text-sm font-medium text-[#FF0000] hover:bg-[#FF0000]/5 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Banner</span>
              </button>
            </div>

            <div className="space-y-4">
              {banners.map((banner) => (
                <div
                  key={banner.id}
                  draggable
                  onDragStart={() => handleDragStart(banner)}
                  onDragOver={(e) => handleDragOver(e, banner)}
                  onDragEnd={handleDragEnd}
                  className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:border-[#FF0000] transition-colors cursor-move group"
                >
                  <div className="flex items-center self-stretch text-gray-400 group-hover:text-[#FF0000]">
                    <GripVertical size={20} />
                  </div>
                  <div className="w-48 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-gray-900">{banner.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{banner.description}</p>
                    {banner.link && (
                      <p className="text-sm text-[#FF0000] mt-2">{banner.link}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingBanner(banner);
                        setShowEditBanner(true);
                      }}
                      className="p-2 text-gray-400 hover:text-[#FF0000] rounded-lg transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleRemoveBanner(banner.id)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery Options */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Delivery Options</h2>
              <button
                onClick={() => setShowAddDelivery(true)}
                className="px-4 py-2 text-sm font-medium text-[#FF0000] hover:bg-[#FF0000]/5 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Option</span>
              </button>
            </div>

            <div className="space-y-4">
              {deliveryOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-medium text-gray-900">{option.name}</h3>
                      {option.isDefault && (
                        <span className="px-2 py-0.5 text-xs font-medium text-[#FF0000] bg-[#FF0000]/5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="text-sm text-gray-600">
                        ${option.price.toFixed(2)}
                      </div>
                      {option.estimatedDays && (
                        <div className="text-sm text-gray-600">
                          {option.estimatedDays} business days
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!option.isDefault && (
                      <button
                        onClick={() => handleSetDefaultDelivery(option.id)}
                        className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Set as Default
                    </button>
                    )}
                    <button
                      onClick={() => {
                        setEditingDelivery(option);
                        setShowEditDelivery(true);
                      }}
                      className="p-2 text-gray-400 hover:text-[#FF0000] rounded-lg transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleRemoveDeliveryOption(option.id)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Delivery Option Modal */}
      {showAddDelivery && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Add Delivery Option</h3>
                <button
                  onClick={() => setShowAddDelivery(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newDelivery.name || ''}
                    onChange={(e) => setNewDelivery({ ...newDelivery, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="e.g., Express Delivery"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newDelivery.description || ''}
                    onChange={(e) => setNewDelivery({ ...newDelivery, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="Brief description of the delivery option"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={newDelivery.price || ''}
                      onChange={(e) => setNewDelivery({ ...newDelivery, price: parseFloat(e.target.value) })}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Days
                  </label>
                  <input
                    type="text"
                    value={newDelivery.estimatedDays || ''}
                    onChange={(e) => setNewDelivery({ ...newDelivery, estimatedDays: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="e.g., 2-3"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddDelivery(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDeliveryOption}
                disabled={!newDelivery.name || !newDelivery.price}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Option
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Delivery Option Modal */}
      {showEditDelivery && editingDelivery && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Edit Delivery Option</h3>
                <button
                  onClick={() => {
                    setShowEditDelivery(false);
                    setEditingDelivery(null);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editingDelivery.name}
                    onChange={(e) => setEditingDelivery({ ...editingDelivery, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="e.g., Express Delivery"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={editingDelivery.description}
                    onChange={(e) => setEditingDelivery({ ...editingDelivery, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="Brief description of the delivery option"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={editingDelivery.price}
                      onChange={(e) => setEditingDelivery({ ...editingDelivery, price: parseFloat(e.target.value) })}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Days
                  </label>
                  <input
                    type="text"
                    value={editingDelivery.estimatedDays}
                    onChange={(e) => setEditingDelivery({ ...editingDelivery, estimatedDays: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="e.g., 2-3"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowEditDelivery(false);
                  setEditingDelivery(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditDeliveryOption}
                disabled={!editingDelivery.name || !editingDelivery.price}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Banner Modal */}
      {showAddBanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Add Banner</h3>
                <button
                  onClick={() => setShowAddBanner(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Banner Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banner Image
                  </label>
                  <p className="text-sm text-gray-500 mb-4">
                    Recommended: 1200 x 320px
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-all relative">
                    {newBanner.image ? (
                      <div className="relative group">
                        <img
                          src={newBanner.image}
                          alt="Banner preview"
                          className="max-h-[160px] mx-auto rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <button 
                            onClick={() => setNewBanner(prev => ({ ...prev, image: '' }))}
                            className="px-4 py-2 bg-white text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            Change Image
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="mx-auto w-12 h-12 rounded-full bg-[#FF0000]/5 flex items-center justify-center mb-4">
                          <Image size={24} className="text-[#FF0000]" />
                        </div>
                        <p className="text-sm font-medium text-gray-900">Add banner image</p>
                        <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleBannerImageUpload(e, 'new')}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Banner Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newBanner.title || ''}
                      onChange={(e) => setNewBanner(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      placeholder="Enter banner title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={newBanner.description || ''}
                      onChange={(e) => setNewBanner(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      placeholder="Enter banner description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link
                    </label>
                    <input
                      type="text"
                      value={newBanner.link || ''}
                      onChange={(e) => setNewBanner(prev => ({ ...prev, link: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      placeholder="Enter banner link"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddBanner(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBanner}
                disabled={!newBanner.image || !newBanner.title}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Banner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Banner Modal */}
      {showEditBanner && editingBanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Edit Banner</h3>
                <button
                  onClick={() => {
                    setShowEditBanner(false);
                    setEditingBanner(null);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Banner Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banner Image
                  </label>
                  <p className="text-sm text-gray-500 mb-4">
                    Recommended: 1200 x 320px
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-all relative">
                    <div className="relative group">
                      <img
                        src={editingBanner.image}
                        alt="Banner preview"
                        className="max-h-[160px] mx-auto rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                        <button 
                          onClick={() => setEditingBanner(prev => prev ? { ...prev, image: '' } : null)}
                          className="px-4 py-2 bg-white text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          Change Image
                        </button>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleBannerImageUpload(e, 'edit')}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Banner Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editingBanner.title}
                      onChange={(e) => setEditingBanner(prev => prev ? { ...prev, title: e.target.value } : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      placeholder="Enter banner title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={editingBanner.description}
                      onChange={(e) => setEditingBanner(prev => prev ? { ...prev, description: e.target.value } : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      placeholder="Enter banner description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link
                    </label>
                    <input
                      type="text"
                      value={editingBanner.link}
                      onChange={(e) => setEditingBanner(prev => prev ? { ...prev, link: e.target.value } : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                      placeholder="Enter banner link"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowEditBanner(false);
                  setEditingBanner(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditBanner}
                disabled={!editingBanner.image || !editingBanner.title}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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