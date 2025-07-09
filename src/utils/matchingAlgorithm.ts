import { User, Neighborhood, UserPreferences } from '../types';

export class NeighborhoodMatchingAlgorithm {
  private static calculateAffordabilityScore(
    neighborhood: Neighborhood,
    budgetRange: [number, number]
  ): number {
    const [minBudget, maxBudget] = budgetRange;
    const rent = neighborhood.stats.medianRent;
    
    if (rent <= maxBudget && rent >= minBudget) {
      return 100;
    } else if (rent < minBudget) {
      return Math.max(0, 100 - (minBudget - rent) / minBudget * 100);
    } else {
      return Math.max(0, 100 - (rent - maxBudget) / maxBudget * 100);
    }
  }

  private static calculatePreferenceScore(
    neighborhood: Neighborhood,
    preferences: UserPreferences
  ): number {
    const weights = preferences.priorityFactors;
    const scores = neighborhood.scores;
    
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    
    const weightedScore = 
      (scores.safety * weights.safety +
       scores.affordability * weights.affordability +
       scores.walkability * weights.walkability +
       scores.transit * weights.transit +
       scores.nightlife * weights.nightlife +
       scores.schools * weights.schools +
       scores.amenities * weights.amenities) / totalWeight;
    
    return weightedScore;
  }

  private static calculateLifestyleMatch(
    neighborhood: Neighborhood,
    lifestyle: string
  ): number {
    const scores = neighborhood.scores;
    
    switch (lifestyle) {
      case 'urban':
        return (scores.walkability + scores.transit + scores.nightlife) / 3;
      case 'suburban':
        return (scores.schools + scores.safety + (100 - scores.nightlife)) / 3;
      case 'mixed':
        return (scores.walkability + scores.safety + scores.amenities) / 3;
      default:
        return 70;
    }
  }

  private static calculateCommuteScore(
    neighborhood: Neighborhood,
    commute: UserPreferences['commute']
  ): number {
    switch (commute.method) {
      case 'transit':
        return neighborhood.scores.transit;
      case 'walk':
        return neighborhood.scores.walkability;
      case 'bike':
        return (neighborhood.scores.walkability + neighborhood.scores.transit) / 2;
      case 'car':
        return 85; // Assume most neighborhoods are car-accessible
      default:
        return 70;
    }
  }

  public static calculateMatchScore(
    user: User,
    neighborhood: Neighborhood
  ): number {
    const preferences = user.preferences;
    
    // Calculate individual scores
    const affordabilityScore = this.calculateAffordabilityScore(
      neighborhood,
      preferences.budgetRange
    );
    
    const preferenceScore = this.calculatePreferenceScore(
      neighborhood,
      preferences
    );
    
    const lifestyleScore = this.calculateLifestyleMatch(
      neighborhood,
      preferences.lifestyle
    );
    
    const commuteScore = this.calculateCommuteScore(
      neighborhood,
      preferences.commute
    );
    
    // Weighted final score
    const finalScore = 
      preferenceScore * 0.4 +
      affordabilityScore * 0.3 +
      lifestyleScore * 0.2 +
      commuteScore * 0.1;
    
    return Math.round(finalScore);
  }

  public static getMatchedNeighborhoods(
    user: User,
    neighborhoods: Neighborhood[]
  ): Neighborhood[] {
    return neighborhoods
      .map(neighborhood => ({
        ...neighborhood,
        matchScore: this.calculateMatchScore(user, neighborhood)
      }))
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  }
}