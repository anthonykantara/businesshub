import React, { useState } from 'react';
import { LayoutDashboard, Settings, Users, Wallet, Globe, Store } from 'lucide-react';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  id: string;
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Wallet, label: 'Wallet', id: 'wallet' },
  { icon: Users, label: 'Users', id: 'users' },
  { icon: Settings, label: 'Settings', id: 'settings' }
];

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <div className="w-72 bg-white border-r border-gray-200">
      <nav className="p-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center px-4 py-3 rounded-lg mb-2 transition-colors duration-200 ${
              activeView === item.id
                ? 'bg-[#FF0000]/5 text-[#FF0000]'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <item.icon size={22} className="mr-4" />
            <span className="flex-1 text-base font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}