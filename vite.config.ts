import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

function normalizeBasePath(raw?: string): string {
  if (!raw || raw.trim() === '' || raw.trim() === '/') return '/';
  const trimmed = raw.trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

const DEFAULT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop';

function githubPagesAndStaticFallbackPlugin(): Plugin {
  let outDir = path.resolve(__dirname, 'dist');

  return {
    name: 'github-pages-and-static-fallback',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const indexFile = path.join(outDir, 'index.html');
      const fallback404 = path.join(outDir, '404.html');
      const nojekyllFile = path.join(outDir, '.nojekyll');

      if (fs.existsSync(indexFile)) {
        fs.copyFileSync(indexFile, fallback404);
      }
      fs.writeFileSync(nojekyllFile, '');

      // Generate static JSON snapshots for static hosts (such as GitHub Pages)
      // where Express /api/* routes are unavailable.
      try {
        const staticDataDir = path.join(outDir, 'static-data');
        const staticMediaDir = path.join(staticDataDir, 'media');
        fs.mkdirSync(staticMediaDir, { recursive: true });

        const {
          fetchFromConfidentialSource,
          fetchEditorialBlogs,
          resolveMediaUrl,
        } = await import('./server/createApiApp');

        const cacheStaticMedia = async (url: string): Promise<string> => {
          if (!url || !url.startsWith('/api/media')) return url;
          try {
            const parsed = new URL(url, 'http://localhost');
            const id = parsed.searchParams.get('id') || `asset_${Date.now()}`;
            const token = parsed.searchParams.get('t') || undefined;
            const resolved = resolveMediaUrl(id, token);
            if (!resolved) return DEFAULT_FALLBACK_IMAGE;

            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), 8000);
            const imgRes = await fetch(resolved, { signal: controller.signal });
            clearTimeout(timer);

            if (!imgRes.ok) return DEFAULT_FALLBACK_IMAGE;
            const contentType = imgRes.headers.get('content-type') || '';
            let ext = 'jpg';
            if (contentType.includes('png')) ext = 'png';
            else if (contentType.includes('webp')) ext = 'webp';
            else if (contentType.includes('gif')) ext = 'gif';
            else if (contentType.includes('avif')) ext = 'avif';

            const fileName = `${id}.${ext}`;
            const buf = Buffer.from(await imgRes.arrayBuffer());
            fs.writeFileSync(path.join(staticMediaDir, fileName), buf);
            return `static-data/media/${fileName}`;
          } catch {
            return DEFAULT_FALLBACK_IMAGE;
          }
        };

        const [listings, blogsOutcome] = await Promise.all([
          fetchFromConfidentialSource(true).catch(() => []),
          fetchEditorialBlogs(true).catch(() => ({ blogs: [], error: null })),
        ]);

        const staticBlogs = await Promise.all(
          blogsOutcome.blogs.map(async (blog) => {
            const urlMap = new Map<string, string>();
            const mapMedia = async (origUrl: string) => {
              if (!origUrl) return origUrl;
              const cached = urlMap.get(origUrl);
              if (cached) return cached;
              const resolved = await cacheStaticMedia(origUrl);
              urlMap.set(origUrl, resolved);
              return resolved;
            };

            const staticImage = await mapMedia(blog.image);
            const staticBlocks = await Promise.all(
              blog.blocks.map(async (blk) => {
                if (blk.type === 'image') {
                  return {
                    ...blk,
                    url: await mapMedia(blk.url),
                  };
                }
                return blk;
              })
            );

            let staticContent = blog.content;
            for (const [origUrl, mappedUrl] of urlMap.entries()) {
              if (origUrl !== mappedUrl) {
                staticContent = staticContent.split(origUrl).join(mappedUrl);
              }
            }

            return {
              ...blog,
              image: staticImage,
              content: staticContent,
              blocks: staticBlocks,
            };
          })
        );

        fs.writeFileSync(
          path.join(staticDataDir, 'listings.json'),
          JSON.stringify({ success: true, count: listings.length, projects: listings })
        );
        fs.writeFileSync(
          path.join(staticDataDir, 'blogs.json'),
          JSON.stringify({ success: true, count: staticBlogs.length, blogs: staticBlogs, error: null })
        );
      } catch (err) {
        console.warn('Static fallback snapshot skipped:', err instanceof Error ? err.message : err);
      }
    },
  };
}

export default defineConfig(() => {
  const base = normalizeBasePath(process.env.VITE_BASE_PATH);

  return {
    base,
    plugins: [react(), tailwindcss(), githubPagesAndStaticFallbackPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
