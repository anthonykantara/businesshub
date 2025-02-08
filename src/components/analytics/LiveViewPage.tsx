import { useState, useEffect } from 'react';
import { Clock, MapPin, Eye, EyeOff } from 'lucide-react';

interface Visitor {
  id: string;
  location: string;
  page: string;
  device: string;
  timestamp: Date;
  action: 'purchase';
  amount: number;
  firstName: string;
}

interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  type: 'order' | 'visitor';
  timestamp: Date;
}

const CITY_COORDINATES: { [key: string]: [number, number] } = {
  'Beirut': [33.8938, 35.5018],
  'Dubai': [25.2048, 55.2708],
  'Riyadh': [24.7136, 46.6753],
  'Kuwait City': [29.3759, 47.9774],
  'Doha': [25.2867, 51.5333],
  'Abu Dhabi': [24.4539, 54.3773],
  'Cairo': [30.0444, 31.2357],
  'Amman': [31.9454, 35.9284],
  'Muscat': [23.5859, 58.4059],
  'Manama': [26.2285, 50.5860]
};

const SAMPLE_VISITORS: Visitor[] = [
  {
    id: '1',
    location: 'Amman',
    page: '/checkout/success',
    device: 'desktop',
    timestamp: new Date(),
    action: 'purchase',
    amount: 157.98,
    firstName: 'Ahmad'
  },
  {
    id: '2',
    location: 'Kuwait City',
    page: '/checkout/success',
    device: 'mobile',
    timestamp: new Date(Date.now() - 30000),
    action: 'purchase',
    amount: 89.99,
    firstName: 'Mohammed'
  },
  {
    id: '3',
    location: 'Beirut',
    page: '/checkout/success',
    device: 'mobile',
    timestamp: new Date(Date.now() - 60000),
    action: 'purchase',
    amount: 124.99,
    firstName: 'Sarah'
  }
];

export default function LiveViewPage() {
  const [visitors, setVisitors] = useState<Visitor[]>(SAMPLE_VISITORS);
  const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
  const [statsBlurred, setStatsBlurred] = useState(false);
  const [stats, setStats] = useState({
    activeVisitors: 24,
    totalSales: 2749.99,
    totalViews: 842,
    totalOrders: 35,
    topLocations: [
      { location: 'Dubai, UAE', sessions: 156 },
      { location: 'Riyadh, Saudi Arabia', sessions: 142 },
      { location: 'Beirut, Lebanon', sessions: 128 },
      { location: 'Kuwait City, Kuwait', sessions: 98 },
      { location: 'Doha, Qatar', sessions: 87 },
      { location: 'Abu Dhabi, UAE', sessions: 76 },
      { location: 'Cairo, Egypt', sessions: 65 }
    ],
    topProducts: [
      { name: 'Arabica Dark Roast Coffee Beans', value: 3119.44 },
      { name: 'Premium Coffee Filters', value: 1229.77 },
      { name: 'Limited Edition Coffee Mug', value: 2224.11 },
      { name: 'Pour Over Coffee Maker', value: 2679.33 },
      { name: 'Coffee Storage Container', value: 1619.46 },
      { name: 'Digital Coffee Scale', value: 1919.52 },
      { name: 'Professional Coffee Grinder', value: 3779.58 }
    ],
    customerBehavior: {
      activeCarts: 28,
      checkingOut: 12,
      purchased: 35
    }
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Add new map points
      if (Math.random() > 0.5) {
        const city = Object.keys(CITY_COORDINATES)[Math.floor(Math.random() * Object.keys(CITY_COORDINATES).length)];
        const [lat, lng] = CITY_COORDINATES[city];
        const jitter = (Math.random() - 0.5) * 2; // Add some random movement
        const newPoint: MapPoint = {
          id: Math.random().toString(36).substr(2, 9),
          lat: lat + jitter,
          lng: lng + jitter,
          type: Math.random() > 0.3 ? 'visitor' : 'order',
          timestamp: new Date()
        };
        setMapPoints(prev => [...prev.slice(-50), newPoint]); // Keep last 50 points
      }

      // Randomly update stats
      setStats(prev => ({
        ...prev,
        activeVisitors: prev.activeVisitors + Math.floor(Math.random() * 3) - 1,
        totalSales: prev.totalSales + (Math.random() * 100 - 50),
        totalOrders: prev.totalOrders + (Math.random() > 0.8 ? 1 : 0),
        totalViews: prev.totalViews + Math.floor(Math.random() * 3),
        customerBehavior: {
          activeCarts: prev.customerBehavior.activeCarts + Math.floor(Math.random() * 3) - 1,
          checkingOut: prev.customerBehavior.checkingOut + Math.floor(Math.random() * 2) - 1,
          purchased: prev.customerBehavior.purchased + (Math.random() > 0.8 ? 1 : 0)
        }
      }));

      // Add new visitor
      if (Math.random() > 0.7) {
        const newVisitor: Visitor = {
          id: Math.random().toString(36).substr(2, 9),
          location: [
            'Beirut', 'Dubai', 'Riyadh', 'Kuwait City',
            'Doha', 'Abu Dhabi', 'Cairo', 'Amman',
            'Muscat', 'Manama'
          ][Math.floor(Math.random() * 10)],
          page: '/checkout/success',
          device: ['desktop', 'mobile'][Math.floor(Math.random() * 2)],
          timestamp: new Date(),
          action: 'purchase',
          amount: Math.round(Math.random() * 200 * 100) / 100,
          firstName: [
            'Ahmad', 'Mohammed', 'Sarah', 'Ali', 'Fatima',
            'Hassan', 'Layla', 'Omar', 'Zara', 'Khalid'
          ][Math.floor(Math.random() * 10)]
        };

        setVisitors(prev => [newVisitor, ...prev.slice(0, 19)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="grid grid-cols-4 gap-6 relative">
      {/* Interactive Map Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
        {/* World Map Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 grid grid-cols-12 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white/10" />
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border-b border-white/10" />
            ))}
          </div>
        </div>

        {/* Activity Points */}
        {mapPoints.map((point) => {
          // Convert lat/lng to relative position
          const x = ((point.lng + 180) / 360) * 100;
          const y = ((90 - point.lat) / 180) * 100;
          
          return (
            <div
              key={point.id}
              className={`absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 ${
                point.type === 'order' ? 'bg-red-500' : 'bg-blue-500'
              } rounded-full opacity-75`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
            >
              {/* Ripple Effect */}
              <div className={`absolute inset-0 rounded-full animate-ping ${
                point.type === 'order' ? 'bg-red-500' : 'bg-blue-500'
              } opacity-75`} />
              
              {/* Fade Out Animation */}
              <div className={`absolute inset-0 rounded-full ${
                point.type === 'order' ? 'bg-red-500' : 'bg-blue-500'
              } animate-fade-out`} />
            </div>
          );
        })}
      </div>

      {/* Left Column - Stats */}
      <div className={`space-y-6 col-span-1 w-80 relative z-10 transition-all duration-300 ${
        statsBlurred ? 'blur-sm pointer-events-none' : ''
      }`}>
        {/* Legend and View Toggle */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-xs text-white/90">Visitors</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-xs text-white/90">Orders</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setStatsBlurred(!statsBlurred)}
            className={`p-2 rounded-lg transition-colors hover:bg-white/5 ${
              statsBlurred ? 'text-white/50' : 'text-white'
            }`}
          >
            {statsBlurred ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-xs font-medium text-gray-500">Active Visitors</h3>
            <p className="text-lg font-medium text-gray-900 mt-1">{stats.activeVisitors}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-xs font-medium text-gray-500">Total Sales</h3>
            <p className="text-lg font-medium text-gray-900 mt-1">${stats.totalSales.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-xs font-medium text-gray-500">Total Views</h3>
            <p className="text-lg font-medium text-gray-900 mt-1">{stats.totalViews}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-xs font-medium text-gray-500">Total Orders</h3>
            <p className="text-lg font-medium text-gray-900 mt-1">{stats.totalOrders}</p>
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Top Locations</h3>
            <span className="text-xs font-medium text-gray-500">Views</span>
          </div>
          <div className="space-y-2">
            {stats.topLocations.map((location, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{location.location}</span>
                <span className="text-sm font-medium text-gray-900">{location.sessions}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Top Products</h3>
          <div className="space-y-2">
            {stats.topProducts.map((product, index) => (
              <div key={index} className="space-y-1">
                <div className="text-sm text-gray-600">{product.name}</div>
                <div className="text-sm">
                  <span className="font-medium text-gray-900">${product.value.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Behavior */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Customer Behavior (15 min)</h3>
          <div className="flex items-center justify-between space-x-12 relative">
            {/* Active Carts */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00A0DC]/20 to-[#00A0DC]/30 flex items-center justify-center relative group transition-all duration-300 hover:from-[#00A0DC]/30 hover:to-[#00A0DC]/40">
                <div className="absolute inset-0 rounded-full bg-[#00A0DC]/5 animate-ping" />
                <div className="absolute inset-1 rounded-full bg-white/50" />
                <div className="relative z-10 text-[#00A0DC] text-2xl font-bold">
                  {stats.customerBehavior.activeCarts}
                </div>
              </div>
              <span className="text-sm text-gray-600">Active carts</span>
            </div>
            
            {/* Checking Out */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#9B51E0]/20 to-[#9B51E0]/30 flex items-center justify-center relative group transition-all duration-300 hover:from-[#9B51E0]/30 hover:to-[#9B51E0]/40">
                <div className="absolute inset-0 rounded-full bg-[#9B51E0]/5 animate-ping" />
                <div className="absolute inset-1 rounded-full bg-white/50" />
                <div className="relative z-10 text-[#9B51E0] text-2xl font-bold">
                  {stats.customerBehavior.checkingOut}
                </div>
              </div>
              <span className="text-sm text-gray-600">Checking out</span>
            </div>
            
            {/* Purchased */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2F80ED]/20 to-[#2F80ED]/30 flex items-center justify-center relative group transition-all duration-300 hover:from-[#2F80ED]/30 hover:to-[#2F80ED]/40">
                <div className="absolute inset-0 rounded-full bg-[#2F80ED]/5 animate-ping" />
                <div className="absolute inset-1 rounded-full bg-white/50" />
                <div className="relative z-10 text-[#2F80ED] text-2xl font-bold">
                  {stats.customerBehavior.purchased}
                </div>
              </div>
              <span className="text-sm text-gray-600">Purchased</span>
            </div>
            
            {/* Connecting Lines */}
            <div className="absolute top-10 left-20 right-20 h-0.5">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00A0DC]/20 via-[#9B51E0]/20 to-[#2F80ED]/20 rounded-full" />
              <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-[#00A0DC]/10 via-[#9B51E0]/10 to-[#2F80ED]/10 animate-pulse rounded-full" />
            </div>
          </div>
        </div>

        {/* Live Feed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-sm font-medium text-gray-900">Live Sales</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {visitors.slice(0, 5).map((visitor) => (
              <div key={visitor.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-900">
                        {visitor.firstName} from {visitor.location}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ${visitor.amount.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      ${visitor.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}