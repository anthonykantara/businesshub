import React, { useState } from 'react';
import { Building2, Phone, MapPin, FileText, Upload, Save } from 'lucide-react';

interface BusinessSettings {
  name: string;
  phone: string;
  address: string;
  mofNumber: string;
  vatNumber: string;
  registrationDoc: string | null;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<BusinessSettings>({
    name: 'Acme Corp',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, Suite 100, San Francisco, CA 94107',
    mofNumber: '',
    vatNumber: '',
    registrationDoc: null
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);
  
  const handleSave = () => {
    setSettings(tempSettings);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setTempSettings(settings);
    setIsEditing(false);
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTempSettings(prev => ({
        ...prev,
        registrationDoc: file.name
      }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Business Name */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Building2 size={16} className="mr-2" />
                Business Name
              </label>
              <input
                type="text"
                value={tempSettings.name}
                disabled
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
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
                value={tempSettings.phone}
                onChange={(e) => setTempSettings(prev => ({ ...prev, phone: e.target.value }))}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg ${
                  isEditing 
                    ? 'border-gray-300 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MapPin size={16} className="mr-2" />
                Address
              </label>
              <textarea
                value={tempSettings.address}
                onChange={(e) => setTempSettings(prev => ({ ...prev, address: e.target.value }))}
                disabled={!isEditing}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg resize-none ${
                  isEditing 
                    ? 'border-gray-300 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]' 
                    : 'border-gray-200 bg-gray-50'
                }`}
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
                value={tempSettings.mofNumber}
                onChange={(e) => setTempSettings(prev => ({ ...prev, mofNumber: e.target.value }))}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg ${
                  isEditing 
                    ? 'border-gray-300 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]' 
                    : 'border-gray-200 bg-gray-50'
                }`}
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
                value={tempSettings.vatNumber}
                onChange={(e) => setTempSettings(prev => ({ ...prev, vatNumber: e.target.value }))}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg ${
                  isEditing 
                    ? 'border-gray-300 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            {/* Company Registration */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FileText size={16} className="mr-2" />
                Company Registration
              </label>
              <div className="flex items-center space-x-4">
                {tempSettings.registrationDoc ? (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FileText size={16} />
                    <span>{tempSettings.registrationDoc}</span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">No document uploaded</span>
                )}
                {isEditing && (
                  <label className="flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <Upload size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Upload</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
                >
                  <Save size={16} className="mr-2" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm font-medium text-[#FF0000] hover:bg-[#FF0000]/5 rounded-lg transition-colors"
              >
                Edit Information
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}