import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { OffPlanProject, OFF_PLAN_PROJECTS } from '../data/realEstateData';
import {
  fetchBaserowProjects,
  getBaserowConfig,
  saveBaserowConfig,
  clearBaserowConfig,
  testBaserowConnection,
  BaserowConfig,
} from '../services/baserow';

interface ProjectsContextType {
  projects: OffPlanProject[];
  isLoading: boolean;
  isBaserowConnected: boolean;
  baserowConfig: BaserowConfig;
  error: string | null;
  refreshProjects: () => Promise<void>;
  saveAndConnectBaserow: (config: BaserowConfig) => Promise<{ success: boolean; message?: string }>;
  disconnectBaserow: () => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<OffPlanProject[]>(OFF_PLAN_PROJECTS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [baserowConfig, setBaserowConfig] = useState<BaserowConfig>(getBaserowConfig());
  const [isBaserowConnected, setIsBaserowConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchBaserowProjects();
      setProjects(result.projects);
      setIsBaserowConnected(result.source === 'baserow');
      if (result.error) {
        setError(result.error);
      }
    } catch (err: unknown) {
      console.error('Error loading projects:', err);
      setProjects(OFF_PLAN_PROJECTS);
      setIsBaserowConnected(false);
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const saveAndConnectBaserow = async (
    config: BaserowConfig
  ): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    const testResult = await testBaserowConnection(config);
    if (!testResult.success) {
      setIsLoading(false);
      return { success: false, message: testResult.message || 'Connection test failed.' };
    }

    saveBaserowConfig(config);
    setBaserowConfig(config);
    await loadProjects();
    return { success: true, message: testResult.message || 'Connected successfully!' };
  };

  const disconnectBaserow = () => {
    clearBaserowConfig();
    setBaserowConfig(getBaserowConfig());
    setIsBaserowConnected(false);
    setProjects(OFF_PLAN_PROJECTS);
    setError(null);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        isLoading,
        isBaserowConnected,
        baserowConfig,
        error,
        refreshProjects: loadProjects,
        saveAndConnectBaserow,
        disconnectBaserow,
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
