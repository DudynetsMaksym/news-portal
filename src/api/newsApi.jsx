import React, { useState, useEffect } from 'react';
import { Search, Globe, Clock, User, ArrowRight, RefreshCw } from 'lucide-react';

// API_KEY: 'a9f115d23331438cbf60784a11245f82' 
// API Service
const newsApi = {
  API_KEY: 'a9f115d23331438cbf60784a11245f82',
  BASE_URL: 'https://newsapi.org/v2',

  async getTopHeadlines(country = '', category = '') {
    try {
      let url = `${this.BASE_URL}/top-headlines?apiKey=${this.API_KEY}`;
      if (country) url += `&country=${country}`;
      if (category) url += `&category=${category}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== 'ok') {
        console.warn('NewsAPI error:', data);
        return [];
      }

      return data.articles || [];
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  },

  async searchNews(query) {
    try {
      const url = `${this.BASE_URL}/everything?q=${encodeURIComponent(query)}&apiKey=${this.API_KEY}&sortBy=publishedAt`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== 'ok') {
        console.warn('NewsAPI error:', data);
        return [];
      }

      return data.articles || [];
    } catch (error) {
      console.error('Error searching news:', error);
      return [];
    }
  }
};

export default newsApi;