import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Heart, Star, DollarSign, Shield, Navigation, TrendingUp, X } from 'lucide-react';
import { Neighborhood, FilterState, User } from '../types';
import { NeighborhoodMatchingAlgorithm } from '../utils/matchingAlgorithm';

interface DashboardProps {
  neighborhoods: Neighborhood[];
  user: User;
  onNeighborhoodClick: (neighborhood: Neighborhood) => void;
  onSaveNeighborhood: (neighborhoodId: string) => void;
  savedNeighborhoods: string[];
}

const Dashboard: React.FC<DashboardProps> = ({
  neighborhoods,
  user,
  onNeighborhoodClick,
  onSaveNeighborhood,
  savedNeighborhoods
}) => {
  const [filters, setFilters] = useState<FilterState>({
    budgetRange: [10000, 80000],
    safetyMin: 0,
    walkabilityMin: 0,
    transitMin: 0,
    searchQuery: '',
    sortBy: 'match'
  });

  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const matchedNeighborhoods = useMemo(() => {
    return NeighborhoodMatchingAlgorithm.getMatchedNeighborhoods(user, neighborhoods);
  }, [neighborhoods, user]);

  const filteredNeighborhoods = useMemo(() => {
    return matchedNeighborhoods.filter(neighborhood => {
      const matchesSearch = neighborhood.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                          neighborhood.city.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const matchesBudget = neighborhood.stats.medianRent >= filters.budgetRange[0] && 
                          neighborhood.stats.medianRent <= filters.budgetRange[1];
      const matchesSafety = neighborhood.scores.safety >= filters.safetyMin;
      const matchesWalkability = neighborhood.scores.walkability >= filters.walkabilityMin;
      const matchesTransit = neighborhood.scores.transit >= filters.transitMin;

      return matchesSearch && matchesBudget && matchesSafety && matchesWalkability && matchesTransit;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price':
          return a.stats.medianRent - b.stats.medianRent;
        case 'safety':
          return b.scores.safety - a.scores.safety;
        case 'walkability':
          return b.scores.walkability - a.scores.walkability;
        case 'match':
        default:
          return (b.matchScore || 0) - (a.matchScore || 0);
      }
    });
  }, [matchedNeighborhoods, filters]);

  const NeighborhoodCard: React.FC<{ neighborhood: Neighborhood; isCompact?: boolean }> = ({ neighborhood, isCompact }) => (
    <div 
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden ${isCompact ? 'p-0' : 'p-0'}`}
      onClick={() => onNeighborhoodClick(neighborhood)}
    >
      {/* Neighborhood Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={neighborhood.image}
          alt={`${neighborhood.name}, ${neighborhood.city}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Save Button and Match Score Overlay */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSaveNeighborhood(neighborhood.id);
            }}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              savedNeighborhoods.includes(neighborhood.id)
                ? 'bg-red-500/80 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            <Heart className={`h-4 w-4 ${savedNeighborhoods.includes(neighborhood.id) ? 'fill-current' : ''}`} />
          </button>
          {neighborhood.matchScore && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              {neighborhood.matchScore}% Match
            </div>
          )}
        </div>

        {/* Neighborhood Name Overlay */}
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold mb-1">{neighborhood.name}</h3>
          <p className="text-sm opacity-90 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {neighborhood.city}, {neighborhood.state}
          </p>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">₹{neighborhood.stats.medianRent.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Median Rent</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{neighborhood.scores.safety}</div>
          <div className="text-sm text-gray-600">Safety Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{neighborhood.scores.walkability}</div>
          <div className="text-sm text-gray-600">Walk Score</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: 'Safety', value: neighborhood.scores.safety, color: 'bg-green-500' },
          { label: 'Transit', value: neighborhood.scores.transit, color: 'bg-blue-500' },
          { label: 'Nightlife', value: neighborhood.scores.nightlife, color: 'bg-purple-500' },
          { label: 'Amenities', value: neighborhood.scores.amenities, color: 'bg-yellow-500' }
        ].map((score, index) => (
          <div key={index} className="text-center">
            <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden`}>
              <div
                className={`h-full ${score.color} transition-all duration-300`}
                style={{ width: `${score.value}%` }}
              />
            </div>
            <div className="text-xs text-gray-600 mt-1">{score.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {neighborhood.amenities.slice(0, 3).map((amenity, index) => (
          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
            {amenity}
          </span>
        ))}
        {neighborhood.amenities.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
            +{neighborhood.amenities.length - 3} more
          </span>
        )}
      </div>

      <button
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
      >
        View Details
      </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Neighborhood Matches</h1>
          <p className="text-gray-600">
            Based on your preferences, we found {filteredNeighborhoods.length} neighborhoods that match your lifestyle.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search neighborhoods or cities..."
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="match">Best Match</option>
                <option value="price">Price</option>
                <option value="safety">Safety</option>
                <option value="walkability">Walkability</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="10000"
                      max="80000"
                      step="1000"
                      value={filters.budgetRange[0]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        budgetRange: [parseInt(e.target.value), prev.budgetRange[1]]
                      }))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹{filters.budgetRange[0].toLocaleString()}</span>
                      <span>₹{filters.budgetRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Safety Score: {filters.safetyMin}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.safetyMin}
                    onChange={(e) => setFilters(prev => ({ ...prev, safetyMin: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Walkability: {filters.walkabilityMin}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.walkabilityMin}
                    onChange={(e) => setFilters(prev => ({ ...prev, walkabilityMin: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Transit Score: {filters.transitMin}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.transitMin}
                    onChange={(e) => setFilters(prev => ({ ...prev, transitMin: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNeighborhoods.map((neighborhood) => (
            <NeighborhoodCard key={neighborhood.id} neighborhood={neighborhood} />
          ))}
        </div>

        {filteredNeighborhoods.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-600">Try adjusting your filters or search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;