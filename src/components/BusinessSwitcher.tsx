import React, { useState } from 'react';
import { Building2, ChevronDown, Plus, Phone, MapPin, FileText, X, Save, Upload } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  mofNumber?: string;
  vatNumber?: string;
  registrationDoc?: string;
}

const INITIAL_BUSINESSES: Business[] = [
  { id: '1', name: 'Acme Corp' },
  { id: '2', name: 'Startup Inc' },
];

export default function BusinessSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [businesses, setBusinesses] = useState<Business[]>(INITIAL_BUSINESSES);
  const [selectedBusiness, setSelectedBusiness] = useState(businesses[0]);
  const [showCreateBusiness, setShowCreateBusiness] = useState(false);
  const [newBusiness, setNewBusiness] = useState<Partial<Business>>({});
  const [isEditing, setIsEditing] = useState(true);
  const [registrationDoc, setRegistrationDoc] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRegistrationDoc(file);
    }
  };

  const handleCreateBusiness = () => {
    // In a real app, this would make an API call
    const business: Business = {
      id: (businesses.length + 1).toString(),
      name: newBusiness.name || '',
      phone: newBusiness.phone,
      address: newBusiness.address,
      mofNumber: newBusiness.mofNumber,
      vatNumber: newBusiness.vatNumber,
      registrationDoc: registrationDoc?.name
    };
    
    setBusinesses(prev => [...prev, business]);
    setSelectedBusiness(business);
    setShowCreateBusiness(false);
    setNewBusiness({});
    setRegistrationDoc(null);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
      >
        <Building2 size={20} className="text-white/80" />
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-white">
            {selectedBusiness.name}
          </span>
        </div>
        <ChevronDown size={16} className="text-white/60" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-black/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/10 py-1 z-50">
          <div className="px-2 py-1.5">
            <p className="text-xs font-medium text-white/40 px-2 pb-1.5">
              Businesses
            </p>
            {businesses.map((business) => (
              <button
                key={business.id}
                onClick={() => {
                  setSelectedBusiness(business);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center px-2 py-1.5 rounded-md text-sm ${
                  selectedBusiness.id === business.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/80 hover:bg-white/5'
                }`}
              >
                <Building2 size={16} className="mr-2 text-white/60" />
                <div className="flex-1 text-left">
                  <p className="font-medium">
                    {business.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
          
          <div className="border-t border-white/10 mt-1 pt-1">
            <button
              onClick={() => setShowCreateBusiness(true)}
              className="w-full flex items-center px-4 py-2 text-sm text-white/80 hover:bg-white/5"
            >
              <Plus size={16} className="mr-2 text-white/60" />
              Add Business
            </button>
          </div>
        </div>
      )}

      {/* Create Business Dialog */}
      {showCreateBusiness && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Create Business</h3>
                <button
                  onClick={() => setShowCreateBusiness(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Business Name */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Building2 size={16} className="mr-2" />
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={newBusiness.name || ''}
                    onChange={(e) => setNewBusiness(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="Enter business name"
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
                    value={newBusiness.phone || ''}
                    onChange={(e) => setNewBusiness(prev => ({ ...prev, phone: e.target.value }))}
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
                    value={newBusiness.address || ''}
                    onChange={(e) => setNewBusiness(prev => ({ ...prev, address: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] resize-none"
                    placeholder="Enter business address"
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
                    value={newBusiness.mofNumber || ''}
                    onChange={(e) => setNewBusiness(prev => ({ ...prev, mofNumber: e.target.value }))}
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
                    value={newBusiness.vatNumber || ''}
                    onChange={(e) => setNewBusiness(prev => ({ ...prev, vatNumber: e.target.value }))}
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
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Accepted formats: PDF, DOC, DOCX
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateBusiness(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBusiness}
                disabled={!newBusiness.name}
                className="flex items-center px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} className="mr-2" />
                Create Business
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}