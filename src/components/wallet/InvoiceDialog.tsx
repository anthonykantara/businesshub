import { useState, useCallback } from 'react';
import { X, Download, FileText } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';
import type { Invoice } from '../WalletPage';

interface InvoiceDialogProps {
  invoice: Invoice;
  onClose: () => void;
}

export default function InvoiceDialog({ invoice, onClose }: InvoiceDialogProps) {
  const [editingPoNumber, setEditingPoNumber] = useState(false);
  const [poNumber, setPoNumber] = useState(invoice.poNumber || '');

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const dialogRef = useClickOutside(handleClose);

  const handleSavePoNumber = () => {
    // In a real app, this would update the invoice in the backend
    setEditingPoNumber(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div ref={dialogRef} className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <FileText size={24} className="text-[#FF0000]" />
              <h3 className="text-xl font-bold text-gray-900">Invoice Details</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Header Information */}
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-medium text-gray-900">{invoice.number}</h4>
                <p className="text-sm text-gray-500">Billed to: {invoice.billedTo}</p>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                invoice.status === 'unpaid' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
              </span>
            </div>

            {/* Dates and Amount */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Issue Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(invoice.issueDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(invoice.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="text-sm font-medium text-gray-900">
                  ${invoice.amount.toFixed(2)}
                </p>
              </div>
            </div>

            {/* PO Number */}
            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">PO Number</p>
                {!editingPoNumber && (
                  <button
                    onClick={() => setEditingPoNumber(true)}
                    className="text-sm text-[#FF0000] hover:text-[#FF0000]/80"
                  >
                    Edit
                  </button>
                )}
              </div>
              {editingPoNumber ? (
                <div className="mt-1 flex items-center space-x-2">
                  <input
                    type="text"
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                    className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    placeholder="Enter PO number"
                  />
                  <button
                    onClick={handleSavePoNumber}
                    className="px-3 py-1 text-sm bg-[#FF0000] text-white rounded-lg hover:bg-[#FF0000]/90"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingPoNumber(false);
                      setPoNumber(invoice.poNumber || '');
                    }}
                    className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {poNumber || 'Not specified'}
                </p>
              )}
            </div>

            {/* Items */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Items</h4>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoice.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.description}</td>
                        <td className="px-4 py-2 text-sm text-gray-900 text-right">{item.quantity}</td>
                        <td className="px-4 py-2 text-sm text-gray-900 text-right">${item.unitPrice.toFixed(2)}</td>
                        <td className="px-4 py-2 text-sm text-gray-900 text-right">${(item.quantity * item.unitPrice).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-4 py-2 text-sm font-medium text-gray-900 text-right">Total</td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">${invoice.amount.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            className="flex items-center px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
          >
            <Download size={16} className="mr-2" />
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
}