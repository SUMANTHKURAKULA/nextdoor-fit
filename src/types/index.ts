export interface User {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
  savedNeighborhoods: string[];
  isAdmin?: boolean;
}

export interface UserPreferences {
  budgetRange: [number, number];
  priorityFactors: {
    safety: number;
    affordability: number;
    walkability: number;
    transit: number;
    nightlife: number;
    schools: number;
    amenities: number;
  };
  lifestyle: 'urban' | 'suburban' | 'mixed';
  commute: {
    method: 'car' | 'transit' | 'bike' | 'walk';
    maxTime: number;
  };
  housing: 'rent' | 'buy' | 'both';
  familySize: number;
  petFriendly: boolean;
}

export interface Neighborhood {
  id: string;
  name: string;
  city: string;
  state: string;
  image: string;
  coordinates: [number, number];
  scores: {
    safety: number;
    affordability: number;
    walkability: number;
    transit: number;
    nightlife: number;
    schools: number;
    amenities: number;
    overall: number;
  };
  stats: {
    medianRent: number;
    medianHome: number;
    crimeRate: number;
    walkScore: number;
    transitScore: number;
    population: number;
    avgAge: number;
  };
  amenities: string[];
  reviews: Review[];
  trending: boolean;
  matchScore?: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  neighborhoodId: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  helpful: number;
}

export interface FilterState {
  budgetRange: [number, number];
  safetyMin: number;
  walkabilityMin: number;
  transitMin: number;
  searchQuery: string;
  sortBy: 'match' | 'price' | 'safety' | 'walkability';
}