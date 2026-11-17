import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  createApiApp,
  fetchFromConfidentialSource,
  fetchEditorialBlogs,
} from './server/createApiApp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = createApiApp();
  const PORT = Number(process.env.DEFAULT_APP_PORT) || Number(process.env.PORT) || 3000;

  // Full-Stack: Vite middleware in dev, static build in production
  if (process.env.NODE_ENV === 'production') {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server ready on http://0.0.0.0:${PORT}`);
    fetchFromConfidentialSource()
      .then((listings) => {
        console.log(`Listings pre-cached: ${listings.length} projects loaded from database`);
      })
      .catch((err) => {
        console.warn('Initial cache fetch deferred:', err);
      });
    fetchEditorialBlogs(true)
      .then(({ blogs }) => {
        console.log(`Articles pre-cached: ${blogs.length} published articles loaded`);
      })
      .catch((err) => {
        console.warn('Initial articles cache fetch deferred:', err);
      });
  });
}

startServer();
