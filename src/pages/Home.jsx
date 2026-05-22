import React, { useState, useEffect } from 'react';
import { Search, Globe, Clock, User, ArrowRight, RefreshCw } from 'lucide-react';
import Header from '../components/Header.jsx';
import NewsList from '../components/NewsList.jsx';
import newsApi from '../api/newsApi.jsx';

const Home = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [displayArticles, setDisplayArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const totalPages = Math.ceil(displayArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = displayArticles.slice(startIndex, startIndex + articlesPerPage);

  const fetchNews = async (category = '', search = '') => {
    setLoading(true);
    try {
      let newArticles;
      if (search) {
        newArticles = await newsApi.searchNews(search);
      } else {
        newArticles = await newsApi.getTopHeadlines('us', category);
      }
      setAllArticles(newArticles);
      setDisplayArticles(newArticles);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching news:', error);
      setAllArticles([]);
      setDisplayArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentCategory('');
    fetchNews('', query);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setSearchQuery('');
    fetchNews(category, '');
  };

  const handleRefresh = () => {
    fetchNews(currentCategory, searchQuery);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetchNews();
    
    const interval = setInterval(() => {
      fetchNews(currentCategory, searchQuery);
    }, 1500000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <Header 
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onRefresh={handleRefresh}
      />
      
      <main className="main-content">
        <div className="main-header">
          <h2 className="main-title">
            {searchQuery ? `Результати пошуку: "${searchQuery}"` : 
             currentCategory ? `Категорія: ${currentCategory}` : 
             'Останні новини'}
          </h2>
          <p className="main-subtitle">
            Новини оновлюються автоматично кожні 25 хвилин
            {displayArticles.length > 0 && (
              <span>
                Знайдено {displayArticles.length} новин
              </span>
            )}
          </p>
        </div>
        
        <NewsList 
          articles={currentArticles} 
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
      
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <p>&copy; 2025 NewsPortal</p>
            <p>Powered by NewsAPI.org</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
