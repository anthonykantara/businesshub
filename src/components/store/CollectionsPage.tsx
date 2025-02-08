import React, { useState } from 'react';
import { Plus, ArrowRight } from 'lucide-react';

interface Collection {
  id: string;
  title: string;
  image: string;
  description: string;
  productsCount: number;
  featured?: boolean;
}

interface CollectionsPageProps {
  onCreateClick: () => void;
}

const SAMPLE_COLLECTIONS: Collection[] = [
  {
    id: '1',
    title: 'Independence Day Drop',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&h=400&q=80',
    description: 'Celebrate independence with our exclusive collection',
    productsCount: 12,
    featured: true
  },
  {
    id: '2',
    title: 'Summer Collection',
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=800&h=400&q=80',
    description: 'Stay cool with our summer essentials',
    productsCount: 8,
    featured: true
  },
  {
    id: '3',
    title: 'Limited Edition',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&h=400&q=80',
    description: 'Special and limited time offerings',
    productsCount: 4
  },
  {
    id: '4',
    title: 'Accessories',
    image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=800&h=400&q=80',
    description: 'Complete your look with our accessories',
    productsCount: 15
  }
];

export default function CollectionsPage({ onCreateClick }: CollectionsPageProps) {
  const [collections] = useState<Collection[]>(SAMPLE_COLLECTIONS);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Collections</h1>
        <button
          onClick={onCreateClick}
          className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Create Collection</span>
        </button>
      </div>

      {/* Featured Collections */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Featured Collections</h2>
        <div className="grid grid-cols-2 gap-6">
          {collections.filter(c => c.featured).map((collection) => (
            <div
              key={collection.id}
              className="group cursor-pointer"
              onClick={() => window.location.href = `/store/collections/${collection.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="relative aspect-[2/1] rounded-xl overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{collection.title}</h3>
                    <p className="text-white/80">{collection.description}</p>
                  </div>
                  <div className="flex items-center text-white group-hover:translate-x-2 transition-transform">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Collections */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">All Collections</h2>
        <div className="grid grid-cols-3 gap-6">
          {collections.filter(c => !c.featured).map((collection) => (
            <div
              key={collection.id}
              className="group cursor-pointer"
              onClick={() => window.location.href = `/store/collections/${collection.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#FF0000] transition-colors">
                {collection.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{collection.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}