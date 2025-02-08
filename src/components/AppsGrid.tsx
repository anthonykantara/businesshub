import React, { useState } from 'react';
import { Megaphone, Video, Star, Store, ShoppingBag, Store as Marketplace, Plus, X, Phone, MapPin, FileText, Upload, Save } from 'lucide-react';

interface App {
  id: number;
  name: string;
  icon: React.ElementType;
  comingSoon?: boolean;
}

interface AppSection {
  title: string;
  apps: App[];
}

interface Brand {
  id: number;
  name: string;
  image: string;
  phone?: string;
  address?: string;
  mofNumber?: string;
  vatNumber?: string;
  registrationDoc?: string;
}

const brands: Brand[] = [
  {
    id: 1,
    name: "Coffee House",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=64&h=64&q=80"
  },
  {
    id: 2,
    name: "Urban Wear",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=64&h=64&q=80"
  },
  {
    id: 3,
    name: "Tech Gadgets",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=64&h=64&q=80"
  }
];

const BrandCard: React.FC<Brand> = React.memo(({ name, image }) => (
  <div className="group flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 cursor-pointer min-w-fit">
    <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white">
      <img 
        src={image} 
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
      />
    </div>
    <h3 className="text-sm font-medium text-gray-900 mt-2">
      {name}
    </h3>
  </div>
));

BrandCard.displayName = 'BrandCard';

const AddBrandCard: React.FC = React.memo(() => {
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [newBrand, setNewBrand] = useState<Partial<Brand>>({});
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [registrationDoc, setRegistrationDoc] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRegistrationUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRegistrationDoc(file);
    }
  };

  const handleCreateBrand = () => {
    // In a real app, this would make an API call
    const brand: Brand = {
      id: brands.length + 1,
      name: newBrand.name || '',
      image: previewUrl || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=64&h=64&q=80',
      phone: newBrand.phone,
      address: newBrand.address,
      mofNumber: newBrand.mofNumber,
      vatNumber: newBrand.vatNumber,
      registrationDoc: registrationDoc?.name
    };
    
    brands.push(brand);
    setShowAddBrand(false);
    setNewBrand({});
    setProfilePic(null);
    setRegistrationDoc(null);
    setPreviewUrl('');
  };

  return (
    <>
      <button
        onClick={() => setShowAddBrand(true)}
        className="group flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 min-w-fit"
      >
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center group-hover:border-[#FF0000] group-hover:bg-[#FF0000]/5">
          <Plus size={24} className="text-gray-400 group-hover:text-[#FF0000]" />
        </div>
        <span className="text-sm font-medium text-gray-500 group-hover:text-[#FF0000] mt-2">
          Add Brand
        </span>
      </button>

      {/* Add Brand Dialog */}
      {showAddBrand && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Create Brand</h3>
                <button
                  onClick={() => setShowAddBrand(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className={`w-32 h-32 rounded-full overflow-hidden border-2 ${
                      previewUrl ? 'border-[#FF0000]' : 'border-dashed border-gray-300'
                    }`}>
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                          <Plus size={32} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <label className="absolute inset-0 cursor-pointer rounded-full hover:bg-black/10 transition-colors flex items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Upload brand logo</p>
                </div>

                {/* Brand Name */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Store size={16} className="mr-2" />
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={newBrand.name || ''}
                    onChange={(e) => setNewBrand(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="Enter brand name"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Phone size={16} className="mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newBrand.phone || ''}
                    onChange={(e) => setNewBrand(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <MapPin size={16} className="mr-2" />
                    Address
                  </label>
                  <textarea
                    value={newBrand.address || ''}
                    onChange={(e) => setNewBrand(prev => ({ ...prev, address: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] resize-none"
                    placeholder="Enter brand address"
                  />
                </div>

                {/* MOF Number */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <FileText size={16} className="mr-2" />
                    MOF Number
                  </label>
                  <input
                    type="text"
                    value={newBrand.mofNumber || ''}
                    onChange={(e) => setNewBrand(prev => ({ ...prev, mofNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="Enter MOF number"
                  />
                </div>

                {/* VAT Number */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <FileText size={16} className="mr-2" />
                    VAT Number
                  </label>
                  <input
                    type="text"
                    value={newBrand.vatNumber || ''}
                    onChange={(e) => setNewBrand(prev => ({ ...prev, vatNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="Enter VAT number"
                  />
                </div>

                {/* Company Registration */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <FileText size={16} className="mr-2" />
                    Company Registration
                  </label>
                  <div className="flex items-center space-x-4">
                    {registrationDoc ? (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <FileText size={16} />
                        <span>{registrationDoc.name}</span>
                        <button
                          onClick={() => setRegistrationDoc(null)}
                          className="text-[#FF0000] hover:text-[#FF0000]/80"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <Upload size={16} className="mr-2 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Upload Document</span>
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={handleRegistrationUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Accepted formats: PDF, PNG, JPG
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddBrand(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBrand}
                disabled={!newBrand.name}
                className="flex items-center px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} className="mr-2" />
                Create Brand
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

AddBrandCard.displayName = 'AddBrandCard';

interface AppCardProps extends App {
  onClick?: () => void;
}

const AppCard: React.FC<AppCardProps> = React.memo(({ name, icon: Icon, comingSoon, onClick }) => (
  <div 
    onClick={onClick}
    className={`group flex flex-col items-center p-3 bg-white rounded-xl hover:bg-gray-50 transition-all duration-200 ${onClick ? 'cursor-pointer' : ''}`}
  >
    <div className="w-10 h-10 mb-2 rounded-full bg-[#FF0000]/5 flex items-center justify-center group-hover:bg-[#FF0000]/10 transition-colors duration-200">
      <Icon size={24} className="text-[#FF0000]" />
    </div>
    <div className="relative flex flex-col items-center">
      <h3 className="text-lg font-medium text-gray-900 text-center">
        {name}
      </h3>
      {comingSoon && (
        <span className="mt-1 bg-[#FF0000]/10 text-[#FF0000] text-xs px-2 py-0.5 rounded-full">
          Coming Soon
        </span>
      )}
    </div>
  </div>
));

AppCard.displayName = 'AppCard';

interface AppSectionGridProps {
  section: AppSection;
  onStoreClick?: () => void;
  onAgentClick?: () => void;
}

const AppSectionGrid: React.FC<AppSectionGridProps> = React.memo(({ section, onStoreClick, onAgentClick }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl">
      {section.apps.map((app) => (
        <AppCard 
          key={app.id} 
          {...app}
          onClick={app.name === 'Store' ? onStoreClick : app.name === 'Agent' ? onAgentClick : undefined}
        />
      ))}
    </div>
  </div>
));

AppSectionGrid.displayName = 'AppSectionGrid';

const appSections: AppSection[] = [
  {
    title: "Content",
    apps: [
      {
        id: 2,
        name: "Creator Hub",
        icon: Video
      }
    ]
  },
  {
    title: "Marketing & Advertising",
    apps: [
      {
        id: 1,
        name: "Advertise",
        icon: Megaphone
      },
      {
        id: 8,
        name: "Creator Marketplace",
        icon: Marketplace,
        comingSoon: true
      }
    ]
  },
  {
    title: "Sales",
    apps: [
      {
        id: 3,
        name: "Deals",
        icon: Star
      },
      {
        id: 4,
        name: "Agent",
        icon: Store
      },
      {
        id: 7,
        name: "Store",
        icon: ShoppingBag,
      }
    ]
  }
];

interface AppsGridProps {
  onStoreClick?: () => void;
  onAgentClick?: () => void;
}

const AppsGrid: React.FC<AppsGridProps> = ({ onStoreClick, onAgentClick }) => (
  <div className="space-y-12">
    {appSections.map((section) => (
      <AppSectionGrid 
        key={section.title} 
        section={section}
        onStoreClick={onStoreClick}
        onAgentClick={onAgentClick}
      />
    ))}
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Your Brands</h2>
      </div>
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {brands.map((brand) => (
          <BrandCard key={brand.id} {...brand} />
        ))}
        <AddBrandCard />
      </div>
    </div>
  </div>
);

export default React.memo(AppsGrid);