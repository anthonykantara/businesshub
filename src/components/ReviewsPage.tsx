import React, { useState } from 'react';
import { Search, Star, Filter, ChevronDown, Check, X, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  customerName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  status: 'pending' | 'approved' | 'hidden';
  response?: string;
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Arabica Dark Roast Coffee Beans',
    productImage: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&h=300&q=80',
    customerName: 'Ahmad Khoury',
    rating: 5,
    title: 'Best coffee beans I\'ve ever tried',
    content: 'The aroma is incredible and the taste is perfectly balanced. Will definitely buy again!',
    date: '2024-03-15',
    status: 'pending'
  },
  {
    id: '2',
    productId: '2',
    productName: 'Limited Edition Coffee Mug',
    productImage: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=300&h=300&q=80',
    customerName: 'Sarah Nassar',
    rating: 4,
    title: 'Beautiful design, good quality',
    content: 'Love the design and the quality is great. Only giving 4 stars because it\'s a bit smaller than expected.',
    date: '2024-03-14',
    status: 'approved',
    response: 'Thank you for your feedback! We\'re glad you like the design. The mug dimensions are listed in the product description to help with size expectations.'
  },
  {
    id: '3',
    productId: '3',
    productName: 'Pour Over Coffee Maker',
    productImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&h=300&q=80',
    customerName: 'Karim Hadad',
    rating: 2,
    title: 'Arrived damaged',
    content: 'Unfortunately, the product arrived with a crack. Waiting for customer service response.',
    date: '2024-03-13',
    status: 'hidden'
  }
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(SAMPLE_REVIEWS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'approved' | 'hidden'>('all');
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [response, setResponse] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Calculate top rated and most reviewed products
  const productStats = React.useMemo(() => {
    const stats = reviews.reduce((acc, review) => {
      if (!acc[review.productId]) {
        acc[review.productId] = {
          id: review.productId,
          name: review.productName,
          image: review.productImage,
          totalRating: 0,
          reviewCount: 0,
          ratings: []
        };
      }
      acc[review.productId].totalRating += review.rating;
      acc[review.productId].reviewCount += 1;
      acc[review.productId].ratings.push(review.rating);
      return acc;
    }, {} as Record<string, {
      id: string;
      name: string;
      image: string;
      totalRating: number;
      reviewCount: number;
      ratings: number[];
    }>);

    const products = Object.values(stats).map(product => ({
      ...product,
      averageRating: product.totalRating / product.reviewCount
    }));

    return {
      topRated: products.reduce((a, b) => 
        a.averageRating > b.averageRating ? a : b
      ),
      mostReviewed: products.reduce((a, b) => 
        a.reviewCount > b.reviewCount ? a : b
      )
    };
  }, [reviews]);

  // Auto-approve 5-star reviews when they are added
  React.useEffect(() => {
    setReviews(prev => prev.map(review => 
      review.status === 'pending' && review.rating === 5
        ? { ...review, status: 'approved' }
        : review
    ));
  }, []);

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || review.status === selectedStatus;
    const matchesRating = selectedRating === 'all' || review.rating === selectedRating;
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  const handleStatusChange = (review: Review, newStatus: Review['status']) => {
    setReviews(prev => prev.map(r => 
      r.id === review.id ? { ...r, status: newStatus } : r
    ));
  };

  const handleResponseSubmit = () => {
    if (!selectedReview || !response.trim()) return;

    const newStatus = isEditing ? selectedReview.status : 'approved';

    setReviews(prev => prev.map(r => 
      r.id === selectedReview.id ? { ...r, response, status: newStatus } : r
    ));
    setSelectedReview(null);
    setResponse('');
    setIsEditing(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'text-[#FF0000] fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="py-8 px-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        </div>
        
        {/* Top Products */}
        <div className="grid grid-cols-2 gap-6">
          {/* Top Rated Product */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Top Rated Product</h3>
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={productStats.topRated.image}
                  alt={productStats.topRated.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-medium text-gray-900 mb-1">
                  {productStats.topRated.name}
                </h4>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {renderStars(Math.round(productStats.topRated.averageRating))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {productStats.topRated.averageRating.toFixed(1)} average rating
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {productStats.topRated.reviewCount} reviews
                </p>
              </div>
            </div>
          </div>

          {/* Most Reviewed Product */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Most Reviewed Product</h3>
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={productStats.mostReviewed.image}
                  alt={productStats.mostReviewed.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-medium text-gray-900 mb-1">
                  {productStats.mostReviewed.name}
                </h4>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {renderStars(Math.round(productStats.mostReviewed.averageRating))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {productStats.mostReviewed.averageRating.toFixed(1)} average rating
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {productStats.mostReviewed.reviewCount} reviews
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200">
          <div className="p-4 space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px]">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                {/* Status Filter */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowStatusFilter(!showStatusFilter);
                      setShowRatingFilter(false);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF0000] inline-flex items-center"
                  >
                    <Filter size={16} className="mr-2" />
                    Status
                    <ChevronDown size={16} className="ml-2" />
                  </button>
                  {showStatusFilter && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      {[
                        { label: 'All', value: 'all' },
                        { label: 'Pending', value: 'pending' },
                        { label: 'Approved', value: 'approved' },
                        { label: 'Hidden', value: 'hidden' }
                      ].map((status) => (
                        <button
                          key={status.value}
                          onClick={() => {
                            setSelectedStatus(status.value as typeof selectedStatus);
                            setShowStatusFilter(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm ${
                            selectedStatus === status.value
                              ? 'bg-[#FF0000]/5 text-[#FF0000]'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {status.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Rating Filter */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowRatingFilter(!showRatingFilter);
                      setShowStatusFilter(false);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF0000] inline-flex items-center"
                  >
                    <Star size={16} className="mr-2" />
                    Rating
                    <ChevronDown size={16} className="ml-2" />
                  </button>
                  {showRatingFilter && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <button
                        onClick={() => {
                          setSelectedRating('all');
                          setShowRatingFilter(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          selectedRating === 'all'
                            ? 'bg-[#FF0000]/5 text-[#FF0000]'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        All Ratings
                      </button>
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => {
                            setSelectedRating(rating);
                            setShowRatingFilter(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm ${
                            selectedRating === rating
                              ? 'bg-[#FF0000]/5 text-[#FF0000]'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center space-x-1">
                            {renderStars(rating)}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="border-t border-gray-200">
            <div className="divide-y divide-gray-200">
              {filteredReviews.map((review) => (
                <div key={review.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={review.productImage}
                          alt={review.productName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-base font-medium text-gray-900">{review.productName}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            review.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : review.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center space-x-2">
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-500">
                            by {review.customerName}
                          </span>
                          <span className="text-sm text-gray-500">
                            • {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="mt-2 text-sm font-medium text-gray-900">
                          {review.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">
                          {review.content}
                        </p>
                        {review.response && (
                          <div className="mt-3 pl-4 border-l-2 border-gray-200">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium text-gray-900">Response: </span>
                              {review.response}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 flex items-center space-x-2">
                      {(review.status === 'pending' || review.status === 'hidden') && (
                        <>
                          <button
                            onClick={() => handleStatusChange(review, 'approved')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <Check size={16} />
                          </button>
                          {review.status === 'pending' && (
                          <button
                            onClick={() => handleStatusChange(review, 'hidden')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hide"
                          >
                            <X size={16} />
                          </button>
                          )}
                        </>
                      )}
                      {!review.response && (
                        <button
                          onClick={() => setSelectedReview(review)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Respond"
                        >
                          <MessageSquare size={16} />
                        </button>
                      )}
                      {review.response && (
                        <button
                          onClick={() => {
                            setSelectedReview(review);
                            setResponse(review.response || '');
                            setIsEditing(true);
                          }}
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                          title="Edit Response"
                        >
                          <MessageSquare size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Response Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {isEditing ? 'Edit Response' : 'Respond to Review'}
                </h3>
                <button
                  onClick={() => {
                    setSelectedReview(null);
                    setResponse('');
                    setIsEditing(false);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {renderStars(selectedReview.rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      by {selectedReview.customerName}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {selectedReview.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    {selectedReview.content}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Response
                  </label>
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] resize-none"
                    placeholder="Write your response..."
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setSelectedReview(null);
                  setResponse('');
                  setIsEditing(false);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResponseSubmit}
                disabled={!response.trim()}
                className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-[#FF0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEditing ? 'Save Changes' : 'Submit Response'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}