import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Simple in-memory cache with TTL
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const getCacheKey = (url, params) => {
  return `${url}?${JSON.stringify(params || {})}`;
};

const getFromCache = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  cache.delete(key);
  return null;
};

const setCache = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
};

// Clear cache periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp >= CACHE_TTL) {
      cache.delete(key);
    }
  }
}, CACHE_TTL);

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for caching
api.interceptors.request.use((config) => {
  // Add request timestamp for debugging
  config.metadata = { startTime: new Date() };
  return config;
});

// Response interceptor for caching and performance tracking
api.interceptors.response.use(
  (response) => {
    const endTime = new Date();
    const duration = endTime - response.config.metadata.startTime;
    
    // Log slow requests
    if (duration > 2000) {
      console.warn(`Slow API call: ${response.config.url} took ${duration}ms`);
    }

    // Cache GET requests
    if (response.config.method === 'get') {
      const cacheKey = getCacheKey(response.config.url, response.config.params);
      setCache(cacheKey, response.data);
    }

    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Enhanced API functions with caching
export const getDocuments = async (params) => {
  const cacheKey = getCacheKey('/documents', params);
  const cached = getFromCache(cacheKey);
  
  if (cached) {
    return { data: cached };
  }

  try {
    const response = await api.get('/documents', { params });
    return response;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const getDocument = async (id, language) => {
  const params = language ? { language } : {};
  const cacheKey = getCacheKey(`/documents/${id}`, params);
  const cached = getFromCache(cacheKey);
  
  if (cached) {
    return { data: cached };
  }

  try {
    const response = await api.get(`/documents/${id}`, { params });
    return response;
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
};

export const getCategories = async (params) => {
  const cacheKey = getCacheKey('/documents/categories', params);
  const cached = getFromCache(cacheKey);
  
  if (cached) {
    return { data: cached };
  }

  try {
    const response = await api.get('/documents/categories', { params });
    return response;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getStats = async (params) => {
  const cacheKey = getCacheKey('/documents/stats', params);
  const cached = getFromCache(cacheKey);
  
  if (cached) {
    return { data: cached };
  }

  try {
    const response = await api.get('/documents/stats', { params });
    return response;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

export const getTree = async (params) => {
  const cacheKey = getCacheKey('/documents/tree', params);
  const cached = getFromCache(cacheKey);
  
  if (cached) {
    return { data: cached };
  }

  try {
    const response = await api.get('/documents/tree', { params });
    return response;
  } catch (error) {
    console.error('Error fetching tree:', error);
    throw error;
  }
};

export const getLanguages = async () => {
  const cacheKey = getCacheKey('/documents/languages');
  const cached = getFromCache(cacheKey);
  
  if (cached) {
    return { data: cached };
  }

  try {
    const response = await api.get('/documents/languages');
    return response;
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
};

export const runPythonCode = async (code, stdin = '') => {
  try {
    const response = await api.post('/documents/run-python', { code, stdin });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Utility function to clear cache
export const clearCache = () => {
  cache.clear();
};

// Utility function to get cache size
export const getCacheSize = () => {
  return cache.size;
};

export default api;
