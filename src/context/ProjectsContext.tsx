import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { OffPlanProject, OFF_PLAN_PROJECTS } from '../data/realEstateData';
import { getPublishedProjects } from '../services/firestoreDataService';
import { fetchListings } from '../services/listingsApi';

interface ProjectsContextType {
  projects: OffPlanProject[];
  isLoading: boolean;
  error: string | null;
  refreshProjects: () => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<OffPlanProject[]>(OFF_PLAN_PROJECTS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // First try Firestore dynamic published listings
      const firestoreProjects = await getPublishedProjects();
      if (firestoreProjects && firestoreProjects.length > 0) {
        setProjects(firestoreProjects);
        return;
      }

      // Fallback to listings API or static catalog
      const result = await fetchListings();
      setProjects(result.projects);
      if (result.error) {
        setError(result.error);
      }
    } catch (err: unknown) {
      console.warn('Projects fallback to default catalog:', err);
      setProjects(OFF_PLAN_PROJECTS);
      setError(err instanceof Error ? err.message : 'Error loading project listings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        isLoading,
        error,
        refreshProjects: loadProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = (): ProjectsContextType => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};
