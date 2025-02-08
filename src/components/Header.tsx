import React, { useState } from 'react';
import { Menu, Bell, UserCircle, LogOut } from 'lucide-react';
import BusinessSwitcher from './BusinessSwitcher';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-black z-50">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center">
          <div className="flex items-center ml-4">
            <img src="/961-logo.png" alt="961" className="h-8" />
            <span className="ml-2 text-lg text-white">Business Hub</span>
            <div className="ml-4 h-8 border-l border-white/10" />
            <div className="ml-4">
              <BusinessSwitcher />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-white/10 rounded-full">
            <Bell size={20} className="text-white/80" />
          </button>
          <div className="relative">
            <button 
              className="p-2 hover:bg-white/10 rounded-full"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <UserCircle size={24} className="text-white/80" />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-lg py-1 border border-white/10">
                <button 
                  className="flex items-center w-full px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                  onClick={() => {
                    // Handle logout
                    window.location.pathname = '/business';
                    setShowDropdown(false);
                  }}
                >
                  <LogOut size={16} className="mr-2 text-white/60" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}