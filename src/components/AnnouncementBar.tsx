import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  return (
    <div className="w-full bg-gradient-to-r from-[#FF0000]/5 to-[#FF0000]/10 border-b border-[#FF0000]/10">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center py-3 group cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-[#FF0000]/10 flex items-center justify-center">
              <span role="img" aria-label="celebration" className="text-xl">🎉</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">New Feature Available!</h3>
              <p className="text-sm text-gray-700">
                Explore enhanced analytics with our latest update
              </p>
            </div>
          </div>
          <ArrowRight size={16} className="ml-4 text-[#FF0000] transform transition-transform group-hover:translate-x-1" />
        </div>
        <button
          onClick={() => setIsVisible(false)} 
          className="p-2 hover:bg-[#FF0000]/10 rounded-full transition-all duration-200"
        >
          <X size={14} className="text-[#FF0000]" />
        </button>
      </div>
    </div>
  );
}