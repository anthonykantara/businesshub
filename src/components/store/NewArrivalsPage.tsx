import React from 'react';
import { ArrowLeft } from 'lucide-react';
import CategoryPage from './CategoryPage';

interface NewArrivalsPageProps {
  onBack?: () => void;
}

export default function NewArrivalsPage({ onBack }: NewArrivalsPageProps) {
  return <CategoryPage category="New Arrivals" onBack={onBack} />;
}