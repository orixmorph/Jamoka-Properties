import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BlogPost } from '../data/realEstateData';

interface BlogsContextType {
  blogs: BlogPost[];
  isLoading: boolean;
  error: string | null;
  refreshBlogs: (forceFresh?: boolean) => Promise<BlogPost[]>;
}

const BlogsContext = createContext<BlogsContextType | undefined>(undefined);

export const BlogsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadBlogs = useCallback(async (forceFresh = false): Promise<BlogPost[]> => {
    try {
      setError(null);
      const res = await fetch(forceFresh ? '/api/blogs?fresh=1' : '/api/blogs');
      if (!res.ok) {
        throw new Error('Unable to load articles right now.');
      }
      const data = await res.json();
      if (data && Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
        if (data.error && data.blogs.length === 0) {
          setError(data.error);
        }
        return data.blogs;
      }
      return [];
    } catch {
      setError('Unable to load articles right now. Please try again shortly.');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs(false);
  }, [loadBlogs]);

  return (
    <BlogsContext.Provider
      value={{
        blogs,
        isLoading,
        error,
        refreshBlogs: loadBlogs,
      }}
    >
      {children}
    </BlogsContext.Provider>
  );
};

export const useBlogs = (): BlogsContextType => {
  const context = useContext(BlogsContext);
  if (!context) {
    throw new Error('useBlogs must be used within a BlogsProvider');
  }
  return context;
};
