import { useState } from 'react';
import { Search, Calendar, Download } from 'lucide-react';
import type { Invoice } from '../WalletPage';

const SAMPLE_INVOICES: Invoice[] = [
  {
    id: '1',
    number: 'INV-2024-001',
    amount: 1500.00,
    issueDate: '2024-03-15',
    dueDate: '2024-04-15',
    status: 'paid',
    poNumber: 'PO-2024-001',
    billedTo: 'Coffee House LLC',
    items: [
      {
        description: 'Marketing Campaign - March 2024',
        quantity: 1,
        unitPrice: 1500.00
      }
    ]
  },
  {
    id: '2',
    number: 'INV-2024-002',
    amount: 2500.00,
    issueDate: '2024-03-10',
    dueDate: '2024-04-10',
    status: 'unpaid',
    poNumber: 'PO-2024-002',
    billedTo: 'Urban Wear Inc',
    items: [
      {
        description: 'Social Media Management - Q1',
        quantity: 1,
        unitPrice: 2500.00
      }
    ]
  }
];

interface InvoiceListProps {
  onInvoiceClick: (invoice: Invoice) => void;
}

export default function InvoiceList({ onInvoiceClick }: InvoiceListProps) {
  const [invoices] = useState<Invoice[]>(SAMPLE_INVOICES);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.billedTo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = true; // Implement date filtering if needed
    return matchesSearch && matchesDate;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-gray-200 space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="w-36">
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
              />
            </div>
            <div className="w-36">
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
              />
            </div>
          </div>

          <button className="px-4 py-2 text-sm font-medium text-[#FF0000] hover:bg-[#FF0000]/5 rounded-lg transition-colors flex items-center space-x-2">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issue Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredInvoices.map((invoice) => (
              <tr
                key={invoice.id}
                onClick={() => onInvoiceClick(invoice)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {invoice.number}
                    </div>
                    <div className="text-sm text-gray-500">
                      {invoice.billedTo}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    ${invoice.amount.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(invoice.issueDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(invoice.dueDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                    invoice.status === 'unpaid' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}