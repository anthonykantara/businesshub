import React from 'react';
import CategoryPage from './CategoryPage';

interface CollectionPageProps {
  collection: string;
  onBack?: () => void;
}

// Collection-specific products
const COLLECTION_PRODUCTS = {
  'independence-day': [
    {
      id: '1',
      title: '961 Independence Day Tee',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&h=400&q=80',
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.9,
      ratingCount: 45,
      isNew: true,
      colors: ['White', 'Navy', 'Red'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: '2',
      title: '961 Flag Collection Cap',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&h=400&q=80',
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.8,
      ratingCount: 32,
      isNew: true,
      colors: ['Red', 'White'],
      sizes: ['One Size']
    },
    {
      id: '3',
      title: '961 Limited Edition Hoodie',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&h=400&q=80',
      price: 59.99,
      originalPrice: 69.99,
      rating: 4.7,
      ratingCount: 28,
      colors: ['Navy', 'Red'],
      sizes: ['S', 'M', 'L', 'XL']
    }
  ],
  'summer': [
    {
      id: '4',
      title: '961 Summer Tank Top',
      image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=300&h=400&q=80',
      price: 19.99,
      originalPrice: 24.99,
      rating: 4.6,
      ratingCount: 56,
      isNew: true,
      colors: ['White', 'Blue', 'Pink'],
      sizes: ['S', 'M', 'L']
    },
    {
      id: '5',
      title: '961 Beach Tote',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&h=400&q=80',
      price: 34.99,
      rating: 4.8,
      ratingCount: 41,
      colors: ['Natural', 'Blue'],
      sizes: ['One Size']
    }
  ]
};

const COLLECTION_TITLES: { [key: string]: string } = {
  'independence-day': 'Independence Day Drop',
  'summer': 'Summer Collection',
  'new-arrivals': 'New Arrivals'
};

export default function CollectionPage({ collection, onBack }: CollectionPageProps) {
  // Get the formatted title from the collection slug
  const title = COLLECTION_TITLES[collection] || collection.split('-').map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // If it's a special collection with dedicated products, pass those to CategoryPage
  const products = COLLECTION_PRODUCTS[collection as keyof typeof COLLECTION_PRODUCTS];

  return (
    <CategoryPage 
      category={title} 
      onBack={onBack}
      products={products} // Pass collection-specific products
    />
  );
}