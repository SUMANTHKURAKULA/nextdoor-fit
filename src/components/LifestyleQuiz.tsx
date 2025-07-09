import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, MapPin, Home, Car, Users, Heart, DollarSign, Shield } from 'lucide-react';
import { UserPreferences } from '../types';

interface LifestyleQuizProps {
  onComplete: (preferences: UserPreferences) => void;
  onBack: () => void;
}

const LifestyleQuiz: React.FC<LifestyleQuizProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({
    budgetRange: [2000, 4000],
    budgetRange: [20000, 40000],
    priorityFactors: {
      safety: 5,
      affordability: 5,
      walkability: 5,
      transit: 5,
      nightlife: 5,
      schools: 5,
      amenities: 5
    },
    lifestyle: 'urban',
    commute: {
      method: 'transit',
      maxTime: 30
    },
    housing: 'rent',
    familySize: 1,
    petFriendly: false
  });

  const steps = [
    {
      title: 'Budget & Housing',
      description: 'Tell us about your housing preferences and budget',
      icon: DollarSign
    },
    {
      title: 'Lifestyle & Priorities',
      description: 'What matters most to you in a neighborhood?',
      icon: Heart
    },
    {
      title: 'Commute & Transportation',
      description: 'How do you prefer to get around?',
      icon: Car
    },
    {
      title: 'Personal Details',
      description: 'A few more details to perfect your matches',
      icon: Users
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(preferences as UserPreferences);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Monthly Budget Range
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Minimum</label>
                  <input
                    type="number"
                    value={preferences.budgetRange?.[0] || 20000}
                    onChange={(e) => updatePreferences({
                      budgetRange: [parseInt(e.target.value), preferences.budgetRange?.[1] || 40000]
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="20000"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Maximum</label>
                  <input
                    type="number"
                    value={preferences.budgetRange?.[1] || 40000}
                    onChange={(e) => updatePreferences({
                      budgetRange: [preferences.budgetRange?.[0] || 20000, parseInt(e.target.value)]
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="40000"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Housing Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'rent', label: 'Rent' },
                  { value: 'buy', label: 'Buy' },
                  { value: 'both', label: 'Both' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => updatePreferences({ housing: option.value as any })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      preferences.housing === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Rate the importance of these factors (1-10)
              </label>
              <div className="space-y-4">
                {[
                  { key: 'safety', label: 'Safety & Security', icon: Shield },
                  { key: 'affordability', label: 'Affordability', icon: DollarSign },
                  { key: 'walkability', label: 'Walkability', icon: MapPin },
                  { key: 'transit', label: 'Public Transit', icon: Car },
                  { key: 'nightlife', label: 'Nightlife & Entertainment', icon: Heart },
                  { key: 'schools', label: 'Schools & Education', icon: Users },
                  { key: 'amenities', label: 'Amenities & Services', icon: Home }
                ].map(factor => (
                  <div key={factor.key} className="flex items-center space-x-4">
                    <factor.icon className="h-5 w-5 text-gray-600" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        {factor.label}
                      </label>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={preferences.priorityFactors?.[factor.key as keyof typeof preferences.priorityFactors] || 5}
                      onChange={(e) => updatePreferences({
                        priorityFactors: {
                          ...preferences.priorityFactors!,
                          [factor.key]: parseInt(e.target.value)
                        }
                      })}
                      className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="w-8 text-center text-sm font-medium text-gray-700">
                      {preferences.priorityFactors?.[factor.key as keyof typeof preferences.priorityFactors] || 5}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preferred Lifestyle
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'urban', label: 'Urban', desc: 'City center, high density' },
                  { value: 'suburban', label: 'Suburban', desc: 'Quiet, family-friendly' },
                  { value: 'mixed', label: 'Mixed', desc: 'Best of both worlds' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => updatePreferences({ lifestyle: option.value as any })}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      preferences.lifestyle === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Primary Transportation Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'transit', label: 'Public Transit', icon: Car },
                  { value: 'car', label: 'Car', icon: Car },
                  { value: 'bike', label: 'Bike', icon: MapPin },
                  { value: 'walk', label: 'Walking', icon: MapPin }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => updatePreferences({
                      commute: { ...preferences.commute!, method: option.value as any }
                    })}
                    className={`p-4 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                      preferences.commute?.method === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <option.icon className="h-5 w-5" />
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Maximum Commute Time (minutes)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  value={preferences.commute?.maxTime || 30}
                  onChange={(e) => updatePreferences({
                    commute: { ...preferences.commute!, maxTime: parseInt(e.target.value) }
                  })}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="w-16 text-center text-sm font-medium text-gray-700">
                  {preferences.commute?.maxTime || 30} min
                </span>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Family Size
              </label>
              <select
                value={preferences.familySize || 1}
                onChange={(e) => updatePreferences({ familySize: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>Just me</option>
                <option value={2}>Couple</option>
                <option value={3}>Small family (3)</option>
                <option value={4}>Medium family (4)</option>
                <option value={5}>Large family (5+)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Pet-Friendly Neighborhoods
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: true, label: 'Yes, I have pets' },
                  { value: false, label: 'No pets' }
                ].map(option => (
                  <button
                    key={option.value.toString()}
                    onClick={() => updatePreferences({ petFriendly: option.value })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      preferences.petFriendly === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Lifestyle Quiz</h1>
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  {(() => {
                    const Icon = steps[currentStep].icon;
                    return <Icon className="h-6 w-6 text-white" />;
                  })()}
                </div>
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {steps[currentStep].title}
                </h2>
                <p className="text-gray-600">{steps[currentStep].description}</p>
              </div>
            </div>
          </div>

          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
          >
            {currentStep === steps.length - 1 ? 'Get My Matches' : 'Next'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LifestyleQuiz;