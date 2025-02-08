import { useState } from 'react';
import { CreditCard, Wallet, Receipt, Plus } from 'lucide-react';
import CardManager from './wallet/CardManager';
import TopUpDialog from './wallet/TopUpDialog';
import TransactionList from './wallet/TransactionList';
import InvoiceList from './wallet/InvoiceList';
import InvoiceDialog from './wallet/InvoiceDialog';

type TabType = 'payment-methods' | 'transactions' | 'invoices';

interface TabButtonProps {
  active: boolean;
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ active, icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-3 transition-all relative ${
      active
        ? 'text-[#FF0000]'
        : 'text-gray-600 hover:text-gray-900'
    }`}
  >
    <Icon size={20} className="mr-2" />
    <span className="font-medium">{label}</span>
    {active && (
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF0000]" />
    )}
  </button>
);

export interface CardType {
  id: string;
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
  brandId?: string;
}

export interface Transaction {
  id: string;
  type: 'payment' | 'topup' | 'refund';
  amount: number;
  date: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  brandId?: string;
  brandName?: string;
  paymentMethod?: string;
}

export interface Invoice {
  id: string;
  number: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
  poNumber?: string;
  billedTo: string;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
}

export default function WalletPage() {
  const [balance, setBalance] = useState(1250.00);
  const [showTopUp, setShowTopUp] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('transactions');
  
  return (
    <div className="py-8 px-8">
      <div className="space-y-8">
        {/* Header with Balance */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-gray-600 font-medium">Balance:</span>
            <span className="text-2xl font-bold text-gray-900">
              ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div>
            <button
              onClick={() => setShowTopUp(true)}
              className="px-4 py-2 bg-[#FF0000] text-white rounded-lg font-medium hover:bg-[#FF0000]/90 transition-colors flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Top Up</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4 border-b border-gray-200 px-2">
            <TabButton
              active={activeTab === 'transactions'}
              icon={Wallet}
              label="Transactions"
              onClick={() => setActiveTab('transactions')}
            />
            <TabButton
              active={activeTab === 'invoices'}
              icon={Receipt}
              label="Invoices"
              onClick={() => setActiveTab('invoices')}
            />
            <TabButton
              active={activeTab === 'payment-methods'}
              icon={CreditCard}
              label="Payment Methods"
              onClick={() => setActiveTab('payment-methods')}
            />
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'payment-methods' && <CardManager />}
            {activeTab === 'transactions' && <TransactionList />}
            {activeTab === 'invoices' && <InvoiceList onInvoiceClick={setSelectedInvoice} />}
          </div>
        </div>
      </div>

      {/* Top Up Dialog */}
      {showTopUp && (
        <TopUpDialog onClose={() => setShowTopUp(false)} onTopUp={(amount) => {
          setBalance(prev => prev + amount);
          setShowTopUp(false);
        }} />
      )}

      {/* Invoice Dialog */}
      {selectedInvoice && (
        <InvoiceDialog
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
}