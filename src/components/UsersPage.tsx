import React, { useState } from 'react';
import { UserPlus, Search, Building2, Shield, X, Check, AlertCircle } from 'lucide-react';

type Role = 'Admin' | 'Staff' | 'Finance';

interface User {
  id: string;
  username: string;
  fullName: string;
  role: Role;
  brands: string[];
  status: 'active' | 'pending';
  dateAdded: string;
}

interface Brand {
  id: string;
  name: string;
}

const ROLES: { [key in Role]: { title: Role; description: string } } = {
  Admin: {
    title: 'Admin',
    description: 'Full control over all features and settings'
  },
  Staff: {
    title: 'Staff',
    description: 'All tasks except wallet management'
  },
  Finance: {
    title: 'Finance',
    description: 'Manage wallet and finances'
  }
};

const BRANDS: Brand[] = [
  { id: '1', name: 'Coffee House' },
  { id: '2', name: 'Urban Wear' },
  { id: '3', name: 'Tech Gadgets' }
];

// Simulated user data
const INITIAL_USERS: User[] = [
  {
    id: '1',
    username: 'john.doe',
    fullName: 'John Doe',
    role: 'Admin',
    brands: ['1', '2', '3'],
    status: 'active',
    dateAdded: '2024-03-15'
  },
  {
    id: '2',
    username: 'sarah.smith',
    fullName: 'Sarah Smith',
    role: 'Finance',
    brands: ['1'],
    status: 'active',
    dateAdded: '2024-03-14'
  }
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [userToRemove, setUserToRemove] = useState<User | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({
    username: '',
    role: 'Staff' as Role,
    brands: [] as string[]
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const handleEditUser = (user: User) => {
    setEditingUserId(user.id);
    setNewUser({
      username: user.username,
      role: user.role,
      brands: user.brands
    });
    setModalMode('edit');
  };

  const handleSaveEdit = () => {
    if (!editingUserId) return;

    if (newUser.brands.length === 0) {
      setError('Please select at least one brand');
      return;
    }

    setUsers(users.map(user => 
      user.id === editingUserId
        ? {
            ...user,
            role: newUser.role,
            brands: newUser.brands
          }
        : user
    ));

    closeModal();
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingUserId(null);
    setNewUser({ username: '', role: 'Staff', brands: [] });
    setError('');
  };

  const handleRemoveClick = (user: User) => {
    setUserToRemove(user);
    setShowRemoveConfirm(true);
  };

  const handleConfirmRemove = () => {
    if (userToRemove) {
      setUsers(users.filter(u => u.id !== userToRemove.id));
      setShowRemoveConfirm(false);
      setUserToRemove(null);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.username.trim()) {
      setError('Please enter a username');
      return;
    }

    if (newUser.brands.length === 0) {
      setError('Please select at least one brand');
      return;
    }

    // Simulate API call to fetch user details
    // In a real app, this would be an actual API call
    const mockFetchUserDetails = () => {
      return new Promise<{ fullName: string }>((resolve, reject) => {
        if (newUser.username.includes('.')) {
          resolve({ fullName: newUser.username.split('.').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ') });
        } else {
          reject(new Error('User not found'));
        }
      });
    };

    try {
      const userDetails = await mockFetchUserDetails();
      
      const newUserData: User = {
        id: (users.length + 1).toString(),
        username: newUser.username,
        fullName: userDetails.fullName,
        role: newUser.role,
        brands: newUser.brands,
        status: 'pending',
        dateAdded: new Date().toISOString().split('T')[0]
      };

      setUsers([...users, newUserData]);
      closeModal();
    } catch (err) {
      setError('User not found. Please check the username.');
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-8 px-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
          </div>
          <button
            onClick={() => setModalMode('add')}
            className="flex items-center px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
          >
            <UserPlus size={16} className="mr-2" />
            Add User
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brands
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Added
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-[#FF0000]/5 rounded-full flex items-center justify-center">
                        <span className="text-[#FF0000] font-medium text-lg">
                          {user.fullName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                        <div className="text-sm text-gray-500">{user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {user.brands.map((brandId) => {
                        const brand = BRANDS.find(b => b.id === brandId);
                        return brand ? (
                          <span
                            key={brand.id}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {brand.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.dateAdded}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          handleEditUser(user);
                        }}
                        className="text-gray-500 hover:text-[#FF0000] transition-colors"
                      >
                        Edit
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => {
                          handleRemoveClick(user);
                        }}
                        className="text-gray-500 hover:text-[#FF0000] transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {modalMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {modalMode === 'add' ? 'Add Team Member' : 'Edit Team Member'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-800">
                  <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {modalMode === 'add' ? 'Username' : 'Username (non-editable)'}
                  </label>
                  <input
                    type="text"
                    value={newUser.username}
                    onChange={(e) => modalMode === 'add' && setNewUser({ ...newUser, username: e.target.value })}
                    placeholder="e.g., john.doe"
                    className={`w-full px-3 py-2 border rounded-lg ${
                      modalMode === 'add'
                        ? 'border-gray-300 focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                    disabled={modalMode === 'edit'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <div className="space-y-2">
                    {Object.entries(ROLES).map(([role, { title, description }]) => (
                      <label
                        key={role}
                        className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${
                          newUser.role === role
                            ? 'border-[#FF0000] bg-[#FF0000]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={role}
                          checked={newUser.role === role}
                          onChange={(e) => setNewUser({ ...newUser, role: e.target.value as Role })}
                          className="sr-only"
                        />
                        <Shield size={20} className="mr-3 text-[#FF0000] flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{title}</p>
                          <p className="text-sm text-gray-500">{description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          newUser.role === role
                            ? 'border-[#FF0000] bg-[#FF0000]'
                            : 'border-gray-300'
                        }`}>
                          {newUser.role === role && <Check size={12} className="text-white" />}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign to Brands
                  </label>
                  <div className="space-y-2">
                    {BRANDS.map((brand) => (
                      <label
                        key={brand.id}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                          newUser.brands.includes(brand.id)
                            ? 'border-[#FF0000] bg-[#FF0000]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={newUser.brands.includes(brand.id)}
                          onChange={(e) => {
                            const updatedBrands = e.target.checked
                              ? [...newUser.brands, brand.id]
                              : newUser.brands.filter(id => id !== brand.id);
                            setNewUser({ ...newUser, brands: updatedBrands });
                          }}
                          className="sr-only"
                        />
                        <Building2 size={20} className="mr-3 text-[#FF0000]" />
                        <span className="text-sm font-medium text-gray-900">{brand.name}</span>
                        <div className={`ml-auto w-5 h-5 rounded border flex items-center justify-center ${
                          newUser.brands.includes(brand.id)
                            ? 'border-[#FF0000] bg-[#FF0000]'
                            : 'border-gray-300'
                        }`}>
                          {newUser.brands.includes(brand.id) && <Check size={12} className="text-white" />}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={modalMode === 'add' ? handleAddUser : handleSaveEdit}
                className="flex items-center px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors"
              >
                {modalMode === 'add' ? 'Add Team Member' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Confirmation Modal */}
      {showRemoveConfirm && userToRemove && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center space-x-3 text-gray-900">
                <AlertCircle size={24} className="text-[#FF0000]" />
                <h2 className="text-xl font-bold">Remove Team Member</h2>
              </div>
              
              <p className="mt-4 text-gray-600">
                Are you sure you want to remove <span className="font-medium text-gray-900">{userToRemove.fullName}</span> from the team? This action cannot be undone.
              </p>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRemoveConfirm(false);
                  setUserToRemove(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
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