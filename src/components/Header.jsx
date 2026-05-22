import React, { useState, useEffect } from 'react';
import { Search, Globe, Clock, User, ArrowRight, RefreshCw } from 'lucide-react';

const Header = ({ onSearch, onCategoryChange, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [
    { value: '', label: 'Всі новини' },
    { value: 'business', label: 'Бізнес' },
    { value: 'entertainment', label: 'Розваги' },
    { value: 'general', label: 'Загальні' },
    { value: 'health', label: 'Здоров\'я' },
    { value: 'science', label: 'Наука' },
    { value: 'sports', label: 'Спорт' },
    { value: 'technology', label: 'Технології' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <div className="header-logo">
            <Globe className="header-logo-icon" />
            <h1 className="header-title">NewsPortal</h1>
          </div>
          
          <div className="header-actions">
            <button
              onClick={onRefresh}
              className="refresh-button"
              title="Оновити новини"
            >
              <RefreshCw className="refresh-icon" />
            </button>
          </div>
        </div>
        
        <div className="header-controls">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Пошук новин..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
              className="search-input"
            />
          </div>
          
          <select
            onChange={(e) => onCategoryChange(e.target.value)}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
