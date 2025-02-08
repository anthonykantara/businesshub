import React from 'react';
import { ArrowLeft } from 'lucide-react';
import CategoryPage from './CategoryPage';

interface BestsellersPageProps {
  onBack?: () => void;
}

export default function BestsellersPage({ onBack }: BestsellersPageProps) {
  return <CategoryPage category="Bestsellers" onBack={onBack} />;
}