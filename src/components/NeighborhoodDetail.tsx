import React, { useState } from 'react';
import { ArrowLeft, MapPin, Heart, Star, DollarSign, Shield, Navigation, Users, TrendingUp, MessageCircle } from 'lucide-react';
import { Neighborhood, Review } from '../types';

interface NeighborhoodDetailProps {
  neighborhood: Neighborhood;
  onBack: () => void;
  onSaveNeighborhood: (neighborhoodId: string) => void;
  savedNeighborhoods: string[];
  reviews: Review[];
}

const NeighborhoodDetail: React.FC<NeighborhoodDetailProps> = ({
  neighborhood,
  onBack,
  onSaveNeighborhood,
  savedNeighborhoods,
  reviews
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, title: '', content: '' });

  const handleSubmitReview = () => {
    // In a real app, this would submit to the backend
    console.log('Submitting review:', newReview);
    setShowReviewForm(false);
    setNewReview({ rating: 5, title: '', content: '' });
  };

  const ScoreBar = ({ label, score, color }: { label: string; score: number; color: string }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-900">{score}/100</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color} transition-all duration-300`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );

  const neighborhoodReviews = reviews.filter(r => r.neighborhoodId === neighborhood.id);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Results
          </button>
          
          {/* Hero Image */}
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
            <img
              src={neighborhood.image}
              alt={`${neighborhood.name}, ${neighborhood.city}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Overlay Content */}
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{neighborhood.name}</h1>
              <p className="text-xl opacity-90 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {neighborhood.city}, {neighborhood.state}
              </p>
            </div>
            
            {/* Action Buttons Overlay */}
            <div className="absolute top-6 right-6 flex items-center space-x-4">
              {neighborhood.matchScore && (
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-lg font-medium backdrop-blur-sm">
                  {neighborhood.matchScore}% Match
                </div>
              )}
              <button
                onClick={() => onSaveNeighborhood(neighborhood.id)}
                className={`flex items-center px-4 py-2 rounded-lg backdrop-blur-sm transition-colors ${
                  savedNeighborhoods.includes(neighborhood.id)
                    ? 'bg-red-500/80 text-white'
                    : 'bg-white/80 text-gray-700 hover:bg-white'
                }`}
              >
                <Heart className={`h-4 w-4 mr-2 ${savedNeighborhoods.includes(neighborhood.id) ? 'fill-current' : ''}`} />
                {savedNeighborhoods.includes(neighborhood.id) ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
          
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">₹{neighborhood.stats.medianRent.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Median Rent</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{neighborhood.stats.crimeRate}</div>
                  <div className="text-sm text-gray-600">Crime Rate</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Navigation className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{neighborhood.scores.walkability}</div>
                  <div className="text-sm text-gray-600">Walk Score</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Users className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{neighborhood.stats.population.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Population</div>
                </div>
              </div>
            </div>

            {/* Scores */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Neighborhood Scores</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <ScoreBar label="Safety" score={neighborhood.scores.safety} color="bg-green-500" />
                  <ScoreBar label="Affordability" score={neighborhood.scores.affordability} color="bg-blue-500" />
                  <ScoreBar label="Walkability" score={neighborhood.scores.walkability} color="bg-purple-500" />
                </div>
                <div>
                  <ScoreBar label="Transit" score={neighborhood.scores.transit} color="bg-yellow-500" />
                  <ScoreBar label="Nightlife" score={neighborhood.scores.nightlife} color="bg-pink-500" />
                  <ScoreBar label="Schools" score={neighborhood.scores.schools} color="bg-indigo-500" />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities & Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {neighborhood.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Community Reviews</h2>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Write Review
                </button>
              </div>

              {showReviewForm && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                          className={`text-2xl ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={newReview.title}
                      onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Give your review a title..."
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                    <textarea
                      value={newReview.content}
                      onChange={(e) => setNewReview(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                      placeholder="Share your experience living in this neighborhood..."
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSubmitReview}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Submit Review
                    </button>
                    <button
                      onClick={() => setShowReviewForm(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {neighborhoodReviews.length > 0 ? (
                  neighborhoodReviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.title}</h4>
                          <p className="text-sm text-gray-600">by {review.userName}</p>
                        </div>
                        <div className="flex items-center">
                          <div className="flex text-yellow-400 mr-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.createdAt}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.content}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        {review.helpful} people found this helpful
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                    <p className="text-gray-600">Be the first to share your experience!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Map & Quick Facts */}
          <div className="space-y-6">
            {/* Map Placeholder */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive Map</p>
                  <p className="text-sm text-gray-500">
                    Lat: {neighborhood.coordinates[0]}, Lng: {neighborhood.coordinates[1]}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Median Home Price:</span>
                  <span className="font-medium">₹{neighborhood.stats.medianHome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Age:</span>
                  <span className="font-medium">{neighborhood.stats.avgAge} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transit Score:</span>
                  <span className="font-medium">{neighborhood.scores.transit}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Overall Score:</span>
                  <span className="font-medium">{neighborhood.scores.overall}/100</span>
                </div>
              </div>
            </div>

            {/* Trending Badge */}
            {neighborhood.trending && (
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-2">Trending Neighborhood</h3>
                <p className="text-sm opacity-90">
                  This neighborhood is gaining popularity among young professionals
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeighborhoodDetail;