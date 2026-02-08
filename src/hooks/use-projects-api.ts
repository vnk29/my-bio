import { useQuery } from '@tanstack/react-query';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export interface ApiProject {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: string;
  image: string;
  githubUrl?: string;
  demoUrl?: string;
}

export const useProjectsApi = () => {
  const { data: projects = [], isLoading, refetch } = useQuery<ApiProject[]>({
    queryKey: ['projects-api'],
    queryFn: async () => {
      const res = await fetch(`${API}/api/projects`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    staleTime: 30000,
  });
  return { projects, isLoading, refetch };
};
