import React from 'react';
import { LayoutDashboard, ShoppingBag, BarChart3, Tag, Settings, ChevronDown, Building2, Shirt, AlertTriangle, Clock, FileText, Users, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import OrdersPage from './store/OrdersPage';
import AnalyticsOverviewPage from './analytics/AnalyticsOverviewPage';
import LiveViewPage from './analytics/LiveViewPage';
import CustomersPage from './CustomersPage';
import ReviewsPage from './ReviewsPage';
import SettingsPage from './store/SettingsPage';
import OrderDetailsPage from './store/OrderDetailsPage';
import ProductsPage from './store/ProductsPage';
import CreateCollectionPage from './store/CreateCollectionPage';
import DiscountsPage from './DiscountsPage';
import PurchaseOrdersPage from './store/PurchaseOrdersPage';
import InventoryPage from './store/InventoryPage';
import CollectionsPage from './store/CollectionsPage';
import { SAMPLE_ORDERS } from './store/OrdersPage';

interface Metric {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

interface Alert {
  type: 'stock' | 'order';
  message: string;
  time: string;
}

const BRANDS = [
  {
    id: '1',
    name: 'Coffee House',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=64&h=64&q=80'
  },
  {
    id: '2',
    name: 'Urban Wear',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=64&h=64&q=80'
  },
  {
    id: '3',
    name: 'Tech Gadgets',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=64&h=64&q=80'
  }
];

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: ShoppingBag, label: 'Orders', id: 'orders' },
  {
    icon: Shirt,
    label: 'Products',
    id: 'products',
    subItems: [
      { label: 'Inventory', id: 'inventory' },
      { label: 'Purchase Orders', id: 'purchase-orders' },
      { label: 'Collections', id: 'collections' },
      { label: 'Reviews', id: 'reviews' }
    ]
  },
  {
    icon: Users,
    label: 'Customers',
    id: 'customers'
  },
  {
    icon: BarChart3,
    label: 'Analytics',
    id: 'analytics',
    subItems: [
      { label: 'Live View', id: 'live-view' }
    ]
  },
  { icon: Tag, label: 'Discounts', id: 'discounts' },
  { icon: Settings, label: 'Settings', id: 'settings' },
  { 
    icon: Globe, 
    label: 'Storefront', 
    id: 'storefront',
    onClick: () => window.location.href = '/store'
  }
];

const TIME_PERIODS = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 Days', value: 'week' },
  { label: 'Last 30 Days', value: 'month' },
  { label: 'Last 90 Days', value: 'quarter' }
];

const SAMPLE_ALERTS: Alert[] = [
  { type: 'stock', message: 'Black T-Shirt (M) is running low on stock (2 remaining)', time: '5 minutes ago' },
  { type: 'stock', message: 'Red Hoodie (L) is out of stock', time: '1 hour ago' },
  { type: 'order', message: '3 orders pending fulfillment', time: '2 hours ago' }
];

interface StorePageProps {
  onBack: () => void;
}

export default function StorePage({ onBack }: StorePageProps) {
  const [selectedBrand, setSelectedBrand] = React.useState(BRANDS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [expandedMenuItem, setExpandedMenuItem] = useState<string | null>(null);
  const [activeView, setActiveView] = React.useState('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: 'Total Sales', value: '$1,234.56', change: 12.3, changeLabel: 'vs. previous period' },
    { label: 'Orders', value: '25', change: -5.2, changeLabel: 'vs. previous period' },
    { label: 'Sessions', value: '1,234', change: 8.7, changeLabel: 'vs. previous period' },
    { label: 'Conversion Rate', value: '2.5%', change: 0.5, changeLabel: 'vs. previous period' }
  ]);

  useEffect(() => {
    // In a real app, this would fetch data based on the selected period
    console.log('Fetching data for period:', selectedPeriod);
  }, [selectedPeriod]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={selectedBrand.image}
                  alt={selectedBrand.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">{selectedBrand.name}</p>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {BRANDS.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => {
                      setSelectedBrand(brand);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{brand.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4">
          {MENU_ITEMS.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.subItems) {
                    setExpandedMenuItem(expandedMenuItem === item.id ? null : item.id);
                    if (item.id === 'products') {
                      setActiveView('products');
                    }
                  } else if (item.onClick) {
                    item.onClick();
                  } else {
                    setActiveView(item.id);
                  }
                }}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-1 transition-colors ${
                  activeView === item.id
                    ? 'bg-[#FF0000]/5 text-[#FF0000]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </div>
              </button>
              {item.subItems && expandedMenuItem === item.id && (
                <div className="ml-8 space-y-1 mt-1">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => {
                        setActiveView(subItem.id);
                      }}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        activeView === subItem.id
                          ? 'bg-[#FF0000]/5 text-[#FF0000]'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span className="text-sm">{subItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
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

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6">
          {selectedOrderId ? (
            <div className="h-full">
              <OrderDetailsPage
                order={SAMPLE_ORDERS.find(o => o.id === selectedOrderId)!}
                onBack={() => setSelectedOrderId(null)}
                onFulfill={() => {
                  // Handle fulfillment
                  setSelectedOrderId(null);
                }}
              />
            </div>
          ) : activeView === 'dashboard' && (
            <div className="space-y-6">
              {/* Time Period Filter */}
              <div className="flex justify-end">
                <div className="inline-flex bg-white rounded-lg shadow-sm">
                  {TIME_PERIODS.map((period) => (
                    <button
                      key={period.value}
                      onClick={() => setSelectedPeriod(period.value)}
                      className={`px-4 py-2 text-sm font-medium first:rounded-l-lg last:rounded-r-lg ${
                        selectedPeriod === period.value
                          ? 'bg-[#FF0000] text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      } ${
                        selectedPeriod !== period.value &&
                        'border-l border-gray-200'
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="bg-white rounded-xl p-6 shadow-sm"
                  >
                    <p className="text-sm font-medium text-gray-600">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {metric.value}
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span
                        className={`text-sm font-medium ${
                          metric.change > 0
                            ? 'text-green-600'
                            : metric.change < 0
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`}
                      >
                        {metric.change > 0 ? '+' : ''}
                        {metric.change}%
                      </span>
                      <span className="text-sm text-gray-500">
                        {metric.changeLabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Alerts */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Alerts & Notifications
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {SAMPLE_ALERTS.map((alert, index) => (
                    <div
                      key={index}
                      className="p-6 flex items-start space-x-4"
                    >
                      <div className={`rounded-full p-2 ${
                        alert.type === 'stock'
                          ? 'bg-red-100'
                          : 'bg-yellow-100'
                      }`}>
                        {alert.type === 'stock' ? (
                          <AlertTriangle
                            size={20}
                            className="text-red-600"
                          />
                        ) : (
                          <Clock
                            size={20}
                            className="text-yellow-600"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {alert.message}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {alert.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeView === 'orders' && !selectedOrderId && (
            <OrdersPage onOrderSelect={setSelectedOrderId} />
          )}
          {activeView === 'products' && <ProductsPage />}
          {activeView === 'purchase-orders' && (
            <PurchaseOrdersPage />
          )}
          {activeView === 'inventory' && (
            <InventoryPage />
          )}
          {activeView === 'collections' && !showCreateCollection && (
            <CollectionsPage onCreateClick={() => setShowCreateCollection(true)} />
          )}
          {activeView === 'collections' && showCreateCollection && (
            <CreateCollectionPage onBack={() => setShowCreateCollection(false)} />
          )}
          {activeView === 'live-view' && (
            <LiveViewPage />
          )}
          {activeView === 'analytics' && (
            <AnalyticsOverviewPage />
          )}
          {activeView === 'customers' && (
            <CustomersPage />
          )}
          {activeView === 'reviews' && (
            <ReviewsPage />
          )}
          {activeView === 'discounts' && (
            <DiscountsPage />
          )}
          {activeView === 'settings' && (
            <SettingsPage />
          )}
        </div>
      </div>
    </div>
  );
}