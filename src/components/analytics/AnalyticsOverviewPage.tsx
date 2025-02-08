import React, { useState } from 'react';
import { Calendar, ArrowUp, ArrowDown, ArrowRight, DollarSign, ShoppingBag, Users, Percent, ChevronDown, RefreshCw } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ElementType;
  color: string;
}

interface TopProduct {
  name: string;
  sales: number;
  orders: number;
  conversion: number;
}

interface TopCollection {
  name: string;
  revenue: number;
  orders: number;
  image: string;
}

const TIME_PERIODS = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' }
];

const DATE_RANGES = [
  { label: 'Last 7 days', value: 'last-7-days' },
  { label: 'Last 30 days', value: 'last-30-days' },
  { label: 'Last 90 days', value: 'last-90-days' },
  { label: 'Last 365 days', value: 'last-365-days' },
  { label: 'Last month', value: 'last-month' },
  { label: 'Last 12 months', value: 'last-12-months' },
  { label: 'Last year', value: 'last-year' },
  { label: 'Week to date', value: 'week-to-date' },
  { label: 'Month to date', value: 'month-to-date' },
  { label: 'Quarter to date', value: 'quarter-to-date' },
  { label: 'Year to date', value: 'year-to-date' }
];

const QUARTERS = [
  { label: '4th Quarter (2024)', value: 'q4-2024' },
  { label: '3rd Quarter (2024)', value: 'q3-2024' },
  { label: '2nd Quarter (2024)', value: 'q2-2024' },
  { label: '1st Quarter (2024)', value: 'q1-2024' }
];

const BFCM = [
  { label: 'BFCM (2024)', value: 'bfcm-2024' },
  { label: 'BFCM (2023)', value: 'bfcm-2023' },
  { label: 'BFCM (2022)', value: 'bfcm-2022' },
  { label: 'BFCM (2021)', value: 'bfcm-2021' }
];

const METRICS: Metric[] = [
  {
    label: 'Total Sales',
    value: '$12,345.67',
    change: 12.3,
    changeLabel: '',
    icon: DollarSign,
    color: 'emerald'
  },
  {
    label: 'Orders Fulfilled',
    value: '245/256',
    change: -5.2,
    changeLabel: '',
    icon: ShoppingBag,
    color: 'blue'
  },
  {
    label: 'Returning Customer Rate',
    value: '68%',
    change: 8.7,
    changeLabel: '',
    icon: RefreshCw,
    color: 'purple'
  },
  {
    label: 'Conversion Rate',
    value: '2.5%',
    change: 0.5,
    changeLabel: '',
    icon: Percent,
    color: 'orange'
  }
];

const SALES_METRICS = [
  {
    label: 'Total Sales Over Time',
    data: [12345, 13456, 14567, 15678, 16789, 17890, 18901],
    change: 12.3
  },
  {
    label: 'Total Sales by Product',
    data: [
      { name: 'Product A', value: 5678 },
      { name: 'Product B', value: 4567 },
      { name: 'Product C', value: 3456 }
    ]
  },
  {
    label: 'Average Order Value Over Time',
    data: [45.67, 46.78, 47.89, 48.90, 49.01, 50.12, 51.23],
    change: 5.6
  }
];

const VIEWS_METRICS = [
  {
    label: 'Views Over Time',
    data: [1234, 2345, 3456, 4567, 5678, 6789, 7890],
    change: 15.4
  },
  {
    label: 'Views by Device Type',
    data: [
      { name: 'Desktop', value: 45 },
      { name: 'Mobile', value: 40 },
      { name: 'Tablet', value: 15 }
    ]
  },
  {
    label: 'Views by Location',
    data: [
      { name: 'United States', value: 35 },
      { name: 'United Kingdom', value: 25 },
      { name: 'Canada', value: 20 },
      { name: 'Others', value: 20 }
    ]
  }
];

const CONVERSION_METRICS = [
  {
    label: 'Conversion Rate Over Time',
    data: [2.1, 2.3, 2.5, 2.7, 2.9, 3.1, 3.3],
    change: 8.2
  },
  {
    label: 'Conversion Rate Breakdown',
    data: [
      { stage: 'View', rate: 100 },
      { stage: 'Added to Cart', rate: 25 },
      { stage: 'Reached Checkout', rate: 15 },
      { stage: 'Completed Order', rate: 8 }
    ]
  }
];

const TOP_PRODUCTS: TopProduct[] = [
  {
    name: 'Arabica Dark Roast Coffee Beans',
    sales: 3119.44,
    orders: 156,
    conversion: 4.2
  },
  {
    name: 'Premium Coffee Filters',
    sales: 1229.77,
    orders: 142,
    conversion: 3.8
  },
  {
    name: 'Limited Edition Coffee Mug',
    sales: 2224.11,
    orders: 128,
    conversion: 3.5
  },
  {
    name: 'Pour Over Coffee Maker',
    sales: 2679.33,
    orders: 98,
    conversion: 3.2
  },
  {
    name: 'Coffee Storage Container',
    sales: 1619.46,
    orders: 87,
    conversion: 2.9
  }
];

const TOP_COLLECTIONS: TopCollection[] = [
  {
    name: 'Coffee Essentials',
    revenue: 12445.67,
    orders: 256,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&h=300&q=80'
  },
  {
    name: 'Brewing Equipment',
    revenue: 8234.56,
    orders: 178,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&h=300&q=80'
  },
  {
    name: 'Limited Edition',
    revenue: 6789.12,
    orders: 145,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&h=300&q=80'
  }
];

export default function AnalyticsOverviewPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [compareToPrevious, setCompareToPrevious] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowDateFilter(!showDateFilter)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Calendar size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {TIME_PERIODS.find(p => p.value === selectedPeriod)?.label || 
                 DATE_RANGES.find(p => p.value === selectedPeriod)?.label ||
                 QUARTERS.find(p => p.value === selectedPeriod)?.label ||
                 BFCM.find(p => p.value === selectedPeriod)?.label}
              </span>
              <ChevronDown size={16} className="text-gray-500" />
            </button>

            {showDateFilter && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-2 space-y-1">
                  {/* Quick Select */}
                  {TIME_PERIODS.map((period) => (
                    <button
                      key={period.value}
                      onClick={() => {
                        setSelectedPeriod(period.value);
                        setShowDateFilter(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                        selectedPeriod === period.value
                          ? 'bg-[#FF0000]/5 text-[#FF0000]'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}

                  {/* Date Ranges */}
                  <div className="pt-2 mt-2 border-t border-gray-200">
                    {DATE_RANGES.map((period) => (
                      <button
                        key={period.value}
                        onClick={() => {
                          setSelectedPeriod(period.value);
                          setShowDateFilter(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                          selectedPeriod === period.value
                            ? 'bg-[#FF0000]/5 text-[#FF0000]'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>

                  {/* Quarters */}
                  <div className="pt-2 mt-2 border-t border-gray-200">
                    {QUARTERS.map((period) => (
                      <button
                        key={period.value}
                        onClick={() => {
                          setSelectedPeriod(period.value);
                          setShowDateFilter(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                          selectedPeriod === period.value
                            ? 'bg-[#FF0000]/5 text-[#FF0000]'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>

                  {/* BFCM */}
                  <div className="pt-2 mt-2 border-t border-gray-200">
                    {BFCM.map((period) => (
                      <button
                        key={period.value}
                        onClick={() => {
                          setSelectedPeriod(period.value);
                          setShowDateFilter(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                          selectedPeriod === period.value
                            ? 'bg-[#FF0000]/5 text-[#FF0000]'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <label
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <input
              type="checkbox"
              checked={compareToPrevious}
              onChange={(e) => setCompareToPrevious(e.target.checked)}
              className="rounded border-gray-300 text-[#FF0000] focus:ring-[#FF0000]"
            />
            <span className="text-sm font-medium text-gray-700">
              Compare to Previous Period
            </span>
          </label>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        {METRICS.map((metric) => (
          <div
            key={metric.label}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-lg bg-${metric.color}-100 flex items-center justify-center`}>
                <metric.icon size={24} className={`text-${metric.color}-600`} />
              </div>
              <div className={`px-2.5 py-1.5 rounded-full text-sm font-medium ${
                metric.change > 0
                  ? 'bg-green-100 text-green-800'
                  : metric.change < 0
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <div className="flex items-center space-x-1">
                  {metric.change > 0 ? (
                    <ArrowUp size={14} />
                  ) : metric.change < 0 ? (
                    <ArrowDown size={14} />
                  ) : null}
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">{metric.value}</p>
              <p className="mt-2 text-sm text-gray-500">{metric.changeLabel}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Metrics */}
      <div className="space-y-6">
        {SALES_METRICS.map((metric) => (
          <div key={metric.label} className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">{metric.label}</h3>
              {metric.change !== undefined && (
                <div className="mt-2 flex items-center text-sm">
                  <span className={`${
                    metric.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
              )}
              <div className="mt-4 h-64 bg-gray-50 rounded-lg">
                {/* Placeholder for chart */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Chart Placeholder
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Views Metrics */}
      <div className="space-y-6">
        {VIEWS_METRICS.map((metric) => (
          <div key={metric.label} className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">{metric.label}</h3>
              {metric.change !== undefined && (
                <div className="mt-2 flex items-center text-sm">
                  <span className={`${
                    metric.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
              )}
              <div className="mt-4 h-64 bg-gray-50 rounded-lg">
                {/* Placeholder for chart */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Chart Placeholder
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Conversion Metrics */}
      <div className="space-y-6">
        {CONVERSION_METRICS.map((metric) => (
          <div key={metric.label} className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">{metric.label}</h3>
              {metric.change !== undefined && (
                <div className="mt-2 flex items-center text-sm">
                  <span className={`${
                    metric.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
              )}
              <div className="mt-4 h-64 bg-gray-50 rounded-lg">
                {/* Placeholder for chart */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Chart Placeholder
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {TOP_PRODUCTS.map((product) => (
                <tr key={product.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium text-gray-900">${product.sales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm text-gray-900">{product.orders}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm text-gray-900">{product.conversion}%</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Collections */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Top Collections</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Collection
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
          {TOP_COLLECTIONS.map((collection) => (
            <tr
              key={collection.name}
              className="hover:bg-gray-50"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{collection.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="text-sm font-medium text-gray-900">${collection.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="text-sm text-gray-900">{collection.orders}</div>
              </td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}