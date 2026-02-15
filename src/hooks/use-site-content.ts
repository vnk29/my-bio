import { useQuery } from '@tanstack/react-query';

const API = '/api';

export interface SiteContent {
  hero?: {
    greeting?: string;
    name?: string;
    title?: string;
    bio?: string;
    profilePhoto?: string; // URL to profile photo
    stats?: Array<{ value: number; label: string; suffix?: string }>;
    ctaPrimary?: string;
    ctaSecondary?: string;
  };
  journey?: {
    sectionTitle?: string;
    sectionDesc?: string;
    items?: Array<{ year: string; title: string; description: string; icon: string }>;
  };
  technicalSkills?: {
    sectionTitle?: string;
    sectionDesc?: string;
    skills?: Record<string, string[]>;
  };
  contact?: {
    email?: string;
    location?: string;
    availability?: string;
  };
  footer?: {
    siteName?: string;
    copyrightBy?: string;
    socialLinks?: Array<{ platform: string; href: string; icon: string }>;
  };
  projects?: {
    sectionTitle?: string;
    sectionDesc?: string;
  };
}

export const useSiteContent = () => {
  const { data, isLoading, refetch } = useQuery<SiteContent>({
    queryKey: ['site-content'],
    queryFn: async () => {
      const res = await fetch(`${API}/api/site-content`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    staleTime: 60000,
  });
  const raw = data || {};
  const content: SiteContent = {
    ...raw,
    journey: raw.journey || (raw.about?.timeline ? { sectionTitle: raw.about.sectionTitle, sectionDesc: raw.about.sectionDesc, items: raw.about.timeline } : { items: [] }),
    technicalSkills: raw.technicalSkills || (raw.about?.skills ? { sectionTitle: "Technical Skills", sectionDesc: "", skills: raw.about.skills } : { skills: {} }),
  };
  return { content, isLoading, refetch };
};
