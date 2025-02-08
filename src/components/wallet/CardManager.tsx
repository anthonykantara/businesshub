import { useState, useCallback } from 'react';
import { CreditCard, Plus, Building2, Check, X, Pencil, Trash2 } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';
import type { CardType } from '../WalletPage';

const SAMPLE_CARDS: CardType[] = [
  { id: '1', last4: '4242', brand: 'Visa', expMonth: 12, expYear: 2024 },
  { id: '2', last4: '8888', brand: 'Mastercard', expMonth: 3, expYear: 2025, brandId: '1' }
];

const BRANDS = [
  { id: '1', name: 'Coffee House' },
  { id: '2', name: 'Urban Wear' },
  { id: '3', name: 'Tech Gadgets' }
].map(brand => ({
  ...brand,
  image: `https://images.unsplash.com/photo-${
    brand.id === '1' ? '1509042239860-f550ce710b93' :
    brand.id === '2' ? '1523381210434-271e8be1f52b' :
    '1519389950473-47ba0277781c'
  }?auto=format&fit=crop&w=64&h=64&q=80`
}));

export default function CardManager() {
  const [cards, setCards] = useState<CardType[]>(SAMPLE_CARDS);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<CardType | null>(null);
  const [editingCard, setEditingCard] = useState<CardType | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<string>();
  const [cardName, setCardName] = useState('');
  
  const handleCloseAddCard = useCallback(() => {
    closeModal();
  }, []);

  const handleCloseDeleteConfirm = useCallback(() => {
    setShowDeleteConfirm(false);
    setCardToDelete(null);
  }, []);

  const addCardDialogRef = useClickOutside(handleCloseAddCard);
  const deleteConfirmDialogRef = useClickOutside(handleCloseDeleteConfirm);

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would integrate with a payment processor
    const newCard: CardType = {
      id: (cards.length + 1).toString(),
      last4: '1234',
      brand: 'Visa',
      expMonth: 12,
      expYear: 2025,
      brandId: selectedBrandId
    };
    setCards([...cards, newCard]);
    setShowAddCard(false);
  };

  const handleEditCard = (card: CardType) => {
    setEditingCard(card);
    setSelectedBrandId(card.brandId);
    setShowAddCard(true);
  };

  const handleDeleteClick = (card: CardType) => {
    setCardToDelete(card);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (cardToDelete) {
      setCards(cards.filter(c => c.id !== cardToDelete.id));
      setShowDeleteConfirm(false);
      setCardToDelete(null);
    }
  };

  const closeModal = () => {
    setShowAddCard(false);
    setEditingCard(null);
    setSelectedBrandId(undefined);
    setCardName('');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white p-6 rounded-xl border border-gray-200 relative"
          >
            <div className="flex items-center justify-between">
              <CreditCard className="text-gray-600" size={24} />
              <span className="text-sm font-medium text-gray-600">
                {card.brand}
              </span>
            </div>
            <div className="mt-4">
              <div className="text-lg font-medium">
                •••• •••• •••• {card.last4}
              </div>
              <div className="text-sm text-gray-500">
                Expires {card.expMonth.toString().padStart(2, '0')}/{card.expYear}
              </div>
            </div>
            {card.brandId && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Building2 size={16} />
                <span>{BRANDS.find(b => b.id === card.brandId)?.name}</span>
              </div>
            )}
            <div className="absolute bottom-6 right-6 flex items-center space-x-2">
              <button
                onClick={() => handleEditCard(card)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <Pencil size={16} className="text-gray-400 group-hover:text-[#FF0000]" />
              </button>
              <button
                onClick={() => handleDeleteClick(card)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <Trash2 size={16} className="text-gray-400 group-hover:text-[#FF0000]" />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={() => setShowAddCard(true)}
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors group"
        >
          <Plus size={24} className="text-gray-400 group-hover:text-[#FF0000] mb-2" />
          <span className="text-sm font-medium text-gray-600 group-hover:text-[#FF0000]">
            Add New Card
          </span>
        </button>
      </div>

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div ref={addCardDialogRef} className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingCard ? 'Edit Card' : 'Add New Card'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddCard} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign to Brand (Optional)
                  </label>
                  <div className="space-y-2">
                    {BRANDS.map((brand) => (
                      <label
                        key={brand.id}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedBrandId === brand.id
                            ? 'border-[#FF0000] bg-[#FF0000]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="brand"
                          value={brand.id}
                          checked={selectedBrandId === brand.id}
                          onChange={(e) => setSelectedBrandId(e.target.value)}
                          className="sr-only"
                        />
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <img 
                            src={brand.image} 
                            alt={brand.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{brand.name}</span>
                        <div className={`ml-auto w-5 h-5 rounded border flex items-center justify-center ${
                          selectedBrandId === brand.id
                            ? 'border-[#FF0000] bg-[#FF0000]'
                            : 'border-gray-300'
                        }`}>
                          {selectedBrandId === brand.id && <Check size={12} className="text-white" />}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCard}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
              >
                {editingCard ? 'Save Changes' : 'Add Card'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && cardToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div ref={deleteConfirmDialogRef} className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center space-x-3 text-gray-900">
                <Trash2 size={24} className="text-[#FF0000]" />
                <h2 className="text-xl font-bold">Remove Card</h2>
              </div>
              
              <p className="mt-4 text-gray-600">
                Are you sure you want to remove this card ending in <span className="font-medium text-gray-900">{cardToDelete.last4}</span>? This action cannot be undone.
              </p>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setCardToDelete(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}