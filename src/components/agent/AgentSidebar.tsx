import React from 'react';
import { LayoutDashboard, DollarSign, Clock, Settings, Building2 } from 'lucide-react';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  id: string;
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Settings, label: 'Settings', id: 'settings' }
];

interface AgentSidebarProps {
  activeView: string;
  onViewChange: (view: 'dashboard' | 'settings') => void;
  onBack: () => void;
}

export default function AgentSidebar({ activeView, onViewChange, onBack }: AgentSidebarProps) {
  return (
    <div className="w-72 bg-white border-r border-gray-200">
      <nav className="p-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as 'dashboard' | 'settings')}
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

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onBack}
          className="w-full flex items-center justify-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Building2 size={20} />
          <span className="font-medium">Business Hub</span>
        </button>
      </div>
    </div>
  );
}