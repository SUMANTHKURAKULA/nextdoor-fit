import { Neighborhood, User, Review } from '../types';

export const mockNeighborhoods: Neighborhood[] = [
  {
    id: '1',
    name: 'Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    coordinates: [19.0596, 72.8295],
    scores: {
      safety: 85,
      affordability: 30,
      walkability: 88,
      transit: 92,
      nightlife: 95,
      schools: 88,
      amenities: 95,
      overall: 82
    },
    stats: {
      medianRent: 45000,
      medianHome: 25000000,
      crimeRate: 2.1,
      walkScore: 88,
      transitScore: 92,
      population: 180000,
      avgAge: 32
    },
    amenities: ['Restaurants', 'Shopping Malls', 'Cafes', 'Nightlife', 'Beach Access', 'Metro Station'],
    reviews: [],
    trending: true
  },
  {
    id: '2',
    name: 'Koramangala',
    city: 'Bangalore',
    state: 'Karnataka',
    image: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    coordinates: [12.9352, 77.6245],
    scores: {
      safety: 82,
      affordability: 45,
      walkability: 75,
      transit: 70,
      nightlife: 90,
      schools: 85,
      amenities: 88,
      overall: 76
    },
    stats: {
      medianRent: 25000,
      medianHome: 12000000,
      crimeRate: 2.8,
      walkScore: 75,
      transitScore: 70,
      population: 120000,
      avgAge: 28
    },
    amenities: ['Tech Hub', 'Pubs & Restaurants', 'Startups', 'Parks', 'Shopping', 'Co-working Spaces'],
    reviews: [],
    trending: true
  },
  {
    id: '3',
    name: 'Connaught Place',
    city: 'New Delhi',
    state: 'Delhi',
    image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    coordinates: [28.6315, 77.2167],
    scores: {
      safety: 75,
      affordability: 25,
      walkability: 85,
      transit: 95,
      nightlife: 85,
      schools: 80,
      amenities: 98,
      overall: 78
    },
    stats: {
      medianRent: 40000,
      medianHome: 20000000,
      crimeRate: 3.2,
      walkScore: 85,
      transitScore: 95,
      population: 50000,
      avgAge: 35
    },
    amenities: ['Metro Hub', 'Shopping', 'Restaurants', 'Business District', 'Heritage', 'Government Offices'],
    reviews: [],
    trending: false
  },
  {
    id: '4',
    name: 'Anna Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    image: 'https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    coordinates: [13.0843, 80.2095],
    scores: {
      safety: 88,
      affordability: 55,
      walkability: 70,
      transit: 75,
      nightlife: 65,
      schools: 92,
      amenities: 85,
      overall: 76
    },
    stats: {
      medianRent: 20000,
      medianHome: 8500000,
      crimeRate: 2.0,
      walkScore: 70,
      transitScore: 75,
      population: 200000,
      avgAge: 34
    },
    amenities: ['Family-Friendly', 'Schools', 'Parks', 'Temples', 'Shopping Centers', 'Hospitals'],
    reviews: [],
    trending: false
  },
  {
    id: '5',
    name: 'Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    image: 'https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    coordinates: [17.4326, 78.4071],
    scores: {
      safety: 90,
      affordability: 35,
      walkability: 65,
      transit: 60,
      nightlife: 80,
      schools: 90,
      amenities: 88,
      overall: 73
    },
    stats: {
      medianRent: 30000,
      medianHome: 15000000,
      crimeRate: 1.8,
      walkScore: 65,
      transitScore: 60,
      population: 80000,
      avgAge: 36
    },
    amenities: ['Upscale Living', 'Film Industry', 'Fine Dining', 'Golf Clubs', 'International Schools', 'Luxury Shopping'],
    reviews: [],
    trending: true
  },
  {
    id: '6',
    name: 'Viman Nagar',
    city: 'Pune',
    state: 'Maharashtra',
    image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    coordinates: [18.5679, 73.9143],
    scores: {
      safety: 85,
      affordability: 60,
      walkability: 72,
      transit: 65,
      nightlife: 75,
      schools: 85,
      amenities: 80,
      overall: 74
    },
    stats: {
      medianRent: 18000,
      medianHome: 7500000,
      crimeRate: 2.2,
      walkScore: 72,
      transitScore: 65,
      population: 150000,
      avgAge: 29
    },
    amenities: ['IT Hub', 'Airport Proximity', 'Malls', 'Restaurants', 'Educational Institutes', 'Parks'],
    reviews: [],
    trending: true
  },
  {
    id: '7',
    name: 'Powai',
    city: 'Mumbai',
    state: 'Maharashtra',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    coordinates: [19.1176, 72.9060],
    scores: {
      safety: 88,
      affordability: 40,
      walkability: 75,
      transit: 70,
      nightlife: 80,
      schools: 90,
      amenities: 85,
      overall: 75
    },
    stats: {
      medianRent: 35000,
      medianHome: 18000000,
      crimeRate: 1.9,
      walkScore: 75,
      transitScore: 70,
      population: 300000,
      avgAge: 31
    },
    amenities: ['Lake View', 'IT Companies', 'IIT Bombay', 'Shopping Malls', 'Restaurants', 'Corporate Offices'],
    reviews: [],
    trending: false
  },
  {
    id: '8',
    name: 'Indiranagar',
    city: 'Bangalore',
    state: 'Karnataka',
    image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    coordinates: [12.9719, 77.6412],
    scores: {
      safety: 80,
      affordability: 50,
      walkability: 82,
      transit: 75,
      nightlife: 92,
      schools: 82,
      amenities: 90,
      overall: 79
    },
    stats: {
      medianRent: 28000,
      medianHome: 14000000,
      crimeRate: 2.5,
      walkScore: 82,
      transitScore: 75,
      population: 100000,
      avgAge: 30
    },
    amenities: ['Pub Culture', 'Restaurants', 'Shopping', 'Metro Access', 'Parks', 'Cultural Events'],
    reviews: [],
    trending: true
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Priya Sharma',
    neighborhoodId: '1',
    rating: 5,
    title: 'Love living in Bandra West!',
    content: 'Amazing connectivity and vibrant nightlife. The sea link makes commuting to South Mumbai very convenient. Great restaurants and cafes everywhere.',
    createdAt: '2024-01-15',
    helpful: 18
  },
  {
    id: '2',
    userId: '2',
    userName: 'Rahul Gupta',
    neighborhoodId: '2',
    rating: 4,
    title: 'Perfect for techies',
    content: 'Koramangala is the heart of Bangalore\'s startup ecosystem. Great food scene and plenty of co-working spaces. Traffic can be a bit much during peak hours.',
    createdAt: '2024-01-10',
    helpful: 12
  },
  {
    id: '3',
    userId: '3',
    userName: 'Sneha Reddy',
    neighborhoodId: '4',
    rating: 5,
    title: 'Best for families',
    content: 'Anna Nagar is perfect for families with children. Excellent schools, safe environment, and good connectivity. The parks are well-maintained.',
    createdAt: '2024-01-20',
    helpful: 22
  },
  {
    id: '4',
    userId: '4',
    userName: 'Arjun Patel',
    neighborhoodId: '5',
    rating: 4,
    title: 'Upscale living experience',
    content: 'Jubilee Hills offers a premium lifestyle with great amenities. Close to HITEC City for work. The area is very safe and well-planned.',
    createdAt: '2024-01-18',
    helpful: 15
  },
  {
    id: '5',
    userId: '5',
    userName: 'Kavya Nair',
    neighborhoodId: '8',
    rating: 5,
    title: 'Vibrant and happening',
    content: 'Indiranagar has the best pub scene in Bangalore. Great for young professionals. The 100 Feet Road is lined with amazing restaurants and shops.',
    createdAt: '2024-01-12',
    helpful: 20
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Aarav Singh',
  email: 'aarav@example.com',
  preferences: {
    budgetRange: [20000, 40000],
    priorityFactors: {
      safety: 8,
      affordability: 7,
      walkability: 8,
      transit: 9,
      nightlife: 6,
      schools: 7,
      amenities: 8
    },
    lifestyle: 'urban',
    commute: {
      method: 'transit',
      maxTime: 45
    },
    housing: 'rent',
    familySize: 1,
    petFriendly: false
  },
  savedNeighborhoods: ['1', '2', '8'],
  isAdmin: true
};