import NewsCard from './NewsCard.jsx';
import { Search, Globe, Clock, User, ArrowRight, RefreshCw } from 'lucide-react';
import Pagination from '../components/Pagination.jsx';

const NewsList = ({ articles, loading, currentPage, totalPages, onPageChange }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <RefreshCw className="loading-icon" />
        <span className="loading-text">Завантаження новин...</span>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="empty-state">
        <Globe className="empty-state-icon" />
        <p className="empty-state-text">Новини не знайдено</p>
      </div>
    );
  }

  return (
    <div>
      <div className="news-grid">
        {articles.map((article, index) => (
          <NewsCard key={`${article.url}-${index}`} article={article} />
        ))}
      </div>
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default NewsList;

