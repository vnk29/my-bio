// Use relative path for Vercel deployment, fallback to env var or localhost
export const API_BASE = 
  typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? '/api'
    : (import.meta.env.VITE_API_URL || 'http://localhost:4000');
