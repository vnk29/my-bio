import { useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

const generateSessionId = () => {
  if (typeof window === 'undefined') return 'ssr';
  const stored = sessionStorage.getItem('portfolio_session_id');
  if (stored) return stored;
  const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  sessionStorage.setItem('portfolio_session_id', id);
  return id;
};

export const useAnalytics = () => {
  const sessionId = useRef(generateSessionId());
  const trackedPages = useRef(new Set<string>());

  const trackEvent = async (eventType: string, page: string, projectId?: string, metadata?: Json) => {
    try {
      await supabase.from('analytics').insert([{
        event_type: eventType,
        page,
        project_id: projectId || null,
        session_id: sessionId.current,
        metadata: metadata || {},
      }]);
    } catch {
      // Silently fail - analytics shouldn't break the app
    }
  };

  const trackPageView = (page: string) => {
    // Only track each page once per session
    if (trackedPages.current.has(page)) return;
    trackedPages.current.add(page);
    trackEvent('page_view', page);
  };

  const trackProjectView = (projectId: string) => {
    trackEvent('project_view', 'projects', projectId);
  };

  const trackProjectClick = (projectId: string) => {
    trackEvent('project_click', 'projects', projectId);
  };

  const trackSectionView = (section: string) => {
    trackEvent('section_view', section);
  };

  const trackContactSubmit = () => {
    trackEvent('contact_submit', 'contact');
  };

  return {
    trackPageView,
    trackProjectView,
    trackProjectClick,
    trackSectionView,
    trackContactSubmit,
  };
};
