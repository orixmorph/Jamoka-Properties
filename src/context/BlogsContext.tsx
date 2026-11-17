import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
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
  const blogsRef = useRef<BlogPost[]>([]);

  const loadBlogs = useCallback(async (forceFresh = false): Promise<BlogPost[]> => {
    try {
      setError(null);
      const liveUrl = withBasePath(forceFresh ? '/api/blogs?fresh=1' : '/api/blogs');
      const liveData = await fetchJsonSafely(liveUrl).catch(() => null);

      // Use live endpoint when it responded cleanly and succeeded
      if (liveData && liveData.success === true && Array.isArray(liveData.blogs)) {
        const normalized = normalizeBlogAssets(liveData.blogs);
        blogsRef.current = normalized;
        setBlogs(normalized);
        return normalized;
      }

      // Fall back to static build snapshot if live API is unavailable, errored, or returned non-JSON
      const staticData = await fetchJsonSafely(withBasePath('/static-data/blogs.json')).catch(
        () => null
      );
      if (staticData && Array.isArray(staticData.blogs) && staticData.blogs.length > 0) {
        const normalized = normalizeBlogAssets(staticData.blogs);
        blogsRef.current = normalized;
        setBlogs(normalized);
        return normalized;
      }

      // Preserve any previously loaded articles if background sync fails
      if (blogsRef.current.length > 0) {
        return blogsRef.current;
      }

      if (liveData && Array.isArray(liveData.blogs)) {
        const normalized = normalizeBlogAssets(liveData.blogs);
        if (liveData.error && normalized.length === 0) {
          setError(liveData.error);
        }
        return normalized;
      }

      throw new Error('Unable to load articles right now.');
    } catch {
      if (blogsRef.current.length === 0) {
        setError('Unable to load articles right now. Please try again shortly.');
      }
      return blogsRef.current;
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
