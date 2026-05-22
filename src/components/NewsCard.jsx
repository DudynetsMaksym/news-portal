import React, { useState, useEffect } from 'react';
import { Search, Globe, Clock, User, ArrowRight, RefreshCw } from 'lucide-react';

const NewsCard = ({ article }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <article className="news-card">
      {article.urlToImage && (
        <div className="news-card-image">
          <img 
            src={article.urlToImage} 
            alt={article.title}
            loading="lazy"
          />
        </div>
      )}
      <div className="news-card-content">
        <div className="news-card-meta">
          <span className="news-card-source">
            {article.source.name}
          </span>
          <div className="news-card-time">
            <Clock className="news-card-time-icon" />
            {formatDate(article.publishedAt)}
          </div>
        </div>
        <h3 className="news-card-title">
          {article.title}
        </h3>
        <p className="news-card-description">
          {article.description}
        </p>
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="news-card-link"
        >
          Читати далі <ArrowRight className="news-card-link-icon" />
        </a>
      </div>
    </article>
  );
};

export default NewsCard;

