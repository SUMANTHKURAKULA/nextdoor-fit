import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import LifestyleQuiz from './components/LifestyleQuiz';
import Dashboard from './components/Dashboard';
import NeighborhoodDetail from './components/NeighborhoodDetail';
import AdminPanel from './components/AdminPanel';
import { mockNeighborhoods, mockUser, mockReviews } from './data/mockData';
import { UserPreferences, Neighborhood, User, Review } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>(mockNeighborhoods);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleStartQuiz = () => {
    if (user) {
      setCurrentPage('quiz');
    } else {
      setCurrentPage('auth');
    }
  };

  const handleQuizComplete = (preferences: UserPreferences) => {
    if (user) {
      setUser(prev => prev ? { ...prev, preferences } : null);
    }
    setCurrentPage('dashboard');
  };

  const handleNeighborhoodClick = (neighborhood: Neighborhood) => {
    setSelectedNeighborhood(neighborhood);
    setCurrentPage('neighborhood-detail');
  };

  const handleSaveNeighborhood = (neighborhoodId: string) => {
    if (user) {
      setUser(prev => prev ? ({
        ...prev,
        savedNeighborhoods: prev.savedNeighborhoods.includes(neighborhoodId)
          ? prev.savedNeighborhoods.filter(id => id !== neighborhoodId)
          : [...prev.savedNeighborhoods, neighborhoodId]
      }) : null);
    }
  };

  const handleUpdateNeighborhood = (updatedNeighborhood: Neighborhood) => {
    setNeighborhoods(prev => prev.map(n => 
      n.id === updatedNeighborhood.id ? updatedNeighborhood : n
    ));
  };

  const handleDeleteNeighborhood = (id: string) => {
    setNeighborhoods(prev => prev.filter(n => n.id !== id));
  };

  const handleDeleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onStartQuiz={handleStartQuiz}
            onViewDashboard={() => user ? setCurrentPage('dashboard') : setCurrentPage('auth')}
            onLogin={() => setCurrentPage('auth')}
          />
        );
      case 'auth':
        return (
          <AuthPage
            onLogin={handleLogin}
            onBack={() => setCurrentPage('home')}
          />
        );
      case 'quiz':
        return user ? (
          <LifestyleQuiz
            onComplete={handleQuizComplete}
            onBack={() => setCurrentPage('home')}
          />
        ) : null;
      case 'dashboard':
        return user ? (
          <Dashboard
            neighborhoods={neighborhoods}
            user={user}
            onNeighborhoodClick={handleNeighborhoodClick}
            onSaveNeighborhood={handleSaveNeighborhood}
            savedNeighborhoods={user.savedNeighborhoods}
          />
        ) : null;
      case 'neighborhood-detail':
        return selectedNeighborhood && user ? (
          <NeighborhoodDetail
            neighborhood={selectedNeighborhood}
            onBack={() => setCurrentPage('dashboard')}
            onSaveNeighborhood={handleSaveNeighborhood}
            savedNeighborhoods={user.savedNeighborhoods}
            reviews={reviews}
          />
        ) : null;
      case 'saved':
        if (!user) return null;
        const savedNeighborhoods = neighborhoods.filter(n => 
          user.savedNeighborhoods.includes(n.id)
        );
        return (
          <Dashboard
            neighborhoods={savedNeighborhoods}
            user={user}
            onNeighborhoodClick={handleNeighborhoodClick}
            onSaveNeighborhood={handleSaveNeighborhood}
            savedNeighborhoods={user.savedNeighborhoods}
          />
        );
      case 'admin':
        return user?.isAdmin ? (
          <AdminPanel
            neighborhoods={neighborhoods}
            users={[user]}
            reviews={reviews}
            onUpdateNeighborhood={handleUpdateNeighborhood}
            onDeleteNeighborhood={handleDeleteNeighborhood}
            onDeleteReview={handleDeleteReview}
          />
        ) : null;
      default:
        return (
          <HomePage
            onStartQuiz={handleStartQuiz}
            onViewDashboard={() => user ? setCurrentPage('dashboard') : setCurrentPage('auth')}
            onLogin={() => setCurrentPage('auth')}
          />
        );
    }
  };

  const showHeader = currentPage !== 'home' && currentPage !== 'quiz' && currentPage !== 'auth';

  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && user && (
        <Header
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          user={user}
          onLogout={handleLogout}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
      )}
      {renderCurrentPage()}
    </div>
  );
}

export default App;