import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BlogPost } from '../data/realEstateData';
import { withBasePath } from '../utils/basePath';

interface BlogsContextType {
  blogs: BlogPost[];
  isLoading: boolean;
  error: string | null;
  refreshBlogs: (forceFresh?: boolean) => Promise<BlogPost[]>;
}

const BlogsContext = createContext<BlogsContextType | undefined>(undefined);

function normalizeBlogAssets(posts: BlogPost[]): BlogPost[] {
  return posts.map((post) => ({
    ...post,
    image: withBasePath(post.image),
    blocks: Array.isArray(post.blocks)
      ? post.blocks.map((blk) =>
          blk.type === 'image' ? { ...blk, url: withBasePath(blk.url) } : blk
        )
      : post.blocks,
  }));
}

async function fetchJsonSafely(url: string) {
  const res = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  const contentType = res.headers.get('content-type') || '';
  if (!res.ok || !contentType.includes('application/json')) {
    return null;
  }
  return res.json();
}

export const BlogsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadBlogs = useCallback(async (forceFresh = false): Promise<BlogPost[]> => {
    try {
      setError(null);
      const liveUrl = withBasePath(forceFresh ? '/api/blogs?fresh=1' : '/api/blogs');
      let data = await fetchJsonSafely(liveUrl).catch(() => null);

      if (!data || !Array.isArray(data.blogs)) {
        data = await fetchJsonSafely(withBasePath('/static-data/blogs.json')).catch(() => null);
      }

      if (data && Array.isArray(data.blogs)) {
        const normalized = normalizeBlogAssets(data.blogs);
        setBlogs(normalized);
        if (data.error && normalized.length === 0) {
          setError(data.error);
        }
        return normalized;
      }

      throw new Error('Unable to load articles right now.');
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
