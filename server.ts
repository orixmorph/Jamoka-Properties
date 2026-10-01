import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Obfuscated credential resolver for confidential upstream integration
function resolveCipher(b64: string, key = 0x5a): string {
  try {
    const buf = Buffer.from(b64, 'base64');
    for (let i = 0; i < buf.length; i++) {
      buf[i] ^= key;
    }
    return buf.toString('utf8');
  } catch {
    return '';
  }
}

// Confidential credentials - prioritize environment variables if injected, else decode cipher
const SECURE_HOST = process.env.CONFIDENTIAL_DB_HOST || process.env.UPSTREAM_HOST || resolveCipher('Mi4uKilgdXU7KjN0ODspPyg1LXQzNQ==');
const SECURE_TABLE = process.env.CONFIDENTIAL_DB_TABLE || process.env.UPSTREAM_TABLE || resolveCipher('a2hoaGJpYg==');
const SECURE_KEY = process.env.CONFIDENTIAL_DB_KEY || process.env.UPSTREAM_KEY || resolveCipher('DxkuEjkxYm81DS4QFzMcMy87CgAZExU9Iyo5AD8/Mh0=');

// Secure media registry: maps internal IDs to upstream asset targets to conceal origin
const mediaRegistry = new Map<string, string>();

function registerMedia(originalUrl: string): string {
  if (!originalUrl || !originalUrl.startsWith('http')) return originalUrl;
  const hash = 'img_' + crypto.createHash('md5').update(originalUrl).digest('hex').slice(0, 12);
  mediaRegistry.set(hash, originalUrl);
  return `/api/media?id=${hash}`;
}

function extractFileUrl(fieldVal: unknown): string | null {
  if (!fieldVal) return null;
  if (Array.isArray(fieldVal) && fieldVal.length > 0) {
    const first = fieldVal[0];
    if (first && typeof first === 'object' && 'url' in first) {
      return String((first as { url: string }).url);
    }
  }
  if (typeof fieldVal === 'string' && fieldVal.trim().startsWith('http')) {
    return fieldVal.trim();
  }
  return null;
}

function parsePriceNumber(raw: unknown): number {
  if (typeof raw === 'number' && raw > 0) return raw;
  if (typeof raw !== 'string') return 2000000;
  const s = raw.trim().toUpperCase();
  if (s.endsWith('M')) {
    const num = parseFloat(s.slice(0, -1).trim());
    if (!isNaN(num) && num > 0) return Math.round(num * 1000000);
  }
  if (s.endsWith('K')) {
    const num = parseFloat(s.slice(0, -1).trim());
    if (!isNaN(num) && num > 0) return Math.round(num * 1000);
  }
  const clean = Number(s.replace(/[^0-9.]/g, ''));
  return !isNaN(clean) && clean > 0 ? clean : 2000000;
}

const FALLBACK_CURATED_PHOTOS: Record<string, { cover: string; hero: string }> = {
  '995': {
    cover: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
  },
  'alva': {
    cover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
  },
  'valia': {
    cover: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop',
  },
  'violet': {
    cover: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop',
  },
  'chelsea': {
    cover: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600&auto=format&fit=crop',
  },
  'sanctuary': {
    cover: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1600&auto=format&fit=crop',
  },
  'central': {
    cover: 'https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1600&auto=format&fit=crop',
  },
  'mercedes': {
    cover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
  },
  'starfall': {
    cover: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=1600&auto=format&fit=crop',
  },
  'bay estate': {
    cover: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop',
  },
  'florence': {
    cover: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
  },
};

function getCuratedFallbacks(name: string): { cover: string; hero: string } {
  const lower = name.toLowerCase();
  for (const k of Object.keys(FALLBACK_CURATED_PHOTOS)) {
    if (lower.includes(k)) return FALLBACK_CURATED_PHOTOS[k];
  }
  return {
    cover: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=1600&auto=format&fit=crop',
  };
}

interface NormalizedListing {
  id: string;
  name: string;
  developer: string;
  enclave: string;
  priceAED: number;
  priceUSD: number;
  paymentPlan: string;
  handover: string;
  bedrooms: string;
  type: string;
  badge: string;
  image: string;
  coverImage: string;
  heroImage: string;
  area: string;
  tagline: string;
  description: string;
  features: string[];
  milestones: { phase: string; percentage: number; description: string }[];
}

let cachedListings: NormalizedListing[] = [];
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60s cache

async function fetchFromConfidentialSource(): Promise<NormalizedListing[]> {
  const now = Date.now();
  if (cachedListings.length > 0 && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedListings;
  }

  const endpoint = `${SECURE_HOST}/api/database/rows/table/${SECURE_TABLE}/?user_field_names=true&size=100`;

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Token ${SECURE_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.warn(`Upstream responded with HTTP ${res.status}`);
      return cachedListings;
    }

    const data = (await res.json()) as { results?: Record<string, unknown>[] };
    const rows = Array.isArray(data.results) ? data.results : [];

    const activeRows = rows.filter((r) => {
      if (r.Active === false) return false;
      const n = String(r['Project Name'] || r.Name || '').trim();
      return n.length > 0;
    });

    if (activeRows.length === 0) return cachedListings;

    const mapped: NormalizedListing[] = activeRows.map((r, i) => {
      const getField = (...keys: string[]): unknown => {
        for (const k of keys) {
          if (r[k] !== undefined && r[k] !== null && r[k] !== '') return r[k];
          const lower = k.toLowerCase().replace(/[\s_-]+/g, '');
          for (const rk of Object.keys(r)) {
            if (rk.toLowerCase().replace(/[\s_-]+/g, '') === lower) {
              if (r[rk] !== undefined && r[rk] !== null && r[rk] !== '') return r[rk];
            }
          }
        }
        return undefined;
      };

      const name = String(getField('Project Name', 'Name', 'Project') || `Prime Project ${i + 1}`).trim();
      const developer = String(getField('Developers', 'Developer') || 'Master Developer').trim();
      const enclave = String(getField('Location', 'Enclave', 'Area') || 'Dubai, UAE').trim();
      const priceAED = parsePriceNumber(getField('Price', 'PriceAED'));
      const priceUSD = Math.round(priceAED / 3.6725);

      let paymentPlan = String(getField('Payment Plan', 'Payment') || '60 / 40 Handover').trim();
      if (paymentPlan.includes('/') && !paymentPlan.includes(' / ')) {
        paymentPlan = paymentPlan.replace('/', ' / ');
      }
      if (!paymentPlan.toLowerCase().includes('plan') && !paymentPlan.toLowerCase().includes('handover')) {
        paymentPlan = `${paymentPlan} Plan`;
      }

      let handover = String(getField('Handover', 'Handover Date') || '2028').trim();
      if (!handover.startsWith('Q') && handover.length === 4) {
        handover = `Q4 ${handover}`;
      }

      const bedrooms = String(getField('Size', 'Bedrooms', 'Beds') || '1 - 4 Beds').trim();
      const rawTag = String(getField('Tag', 'Tagline', 'Subtitle') || `${developer} Living`).trim();
      const tagline = rawTag || `${developer} Living`;
      const type = rawTag || 'Luxury Residence';
      const rawOffer = String(getField('Offer', 'offer') || '').trim();
      const badge = rawOffer
        ? rawOffer.toUpperCase()
        : String(getField('Badge', 'Status') || (developer.includes('Emaar') ? 'EMAAR EXCLUSIVE' : 'OFF-PLAN ALLOCATION')).toUpperCase();

      const rawCover = extractFileUrl(getField('Cover', 'CoverPhoto', 'CoverImage', 'Thumbnail'));
      const rawHero = extractFileUrl(getField('Header', 'HeroImage', 'HeroPhoto', 'HeaderImage'));

      const fallbacks = getCuratedFallbacks(name);
      const coverUrl = rawCover ? registerMedia(rawCover) : fallbacks.cover;
      const heroUrl = rawHero ? registerMedia(rawHero) : rawCover ? registerMedia(rawCover) : fallbacks.hero;

      const rawDesc = getField('Notes', 'Description', 'Overview', 'About', 'Details');
      const description =
        rawDesc && String(rawDesc).trim() !== ''
          ? String(rawDesc).trim()
          : `${name} by ${developer} located in ${enclave}. Featuring premium architecture, investor-preferred payment plans (${paymentPlan}), and scheduled handover in ${handover}.`;

      return {
        id: `project-${r.id || i + 1}`,
        name,
        developer,
        enclave,
        priceAED,
        priceUSD,
        paymentPlan,
        handover,
        bedrooms,
        type,
        badge,
        image: coverUrl,
        coverImage: coverUrl,
        heroImage: heroUrl,
        area: String(getField('Area') || (bedrooms.toLowerCase().includes('studio') ? '450 – 580 sq.ft' : '850 – 2,400 sq.ft')),
        tagline,
        description,
        features: [
          rawTag || 'Premium Finishes',
          'DLD Escrow Protected',
          'Swimming Pool & Gym',
          'Dedicated Parking',
          'Private Balcony',
        ],
        milestones: [
          { phase: 'Booking Deposit', percentage: 10, description: 'Upon reservation signing' },
          { phase: 'Construction Tranches', percentage: 50, description: 'Linked to certified RERA construction milestones' },
          { phase: 'Handover Balance', percentage: 40, description: `Key handover on completion (${handover})` },
        ],
      };
    });

    cachedListings = mapped;
    lastFetchTime = now;
    return cachedListings;
  } catch (err) {
    console.error('Confidential fetch failed:', err);
    return cachedListings;
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Clean public API endpoint returning source listings data only
  app.get('/api/listings', async (req: Request, res: Response) => {
    try {
      const force = req.query.fresh === '1';
      if (force) lastFetchTime = 0;
      const projects = await fetchFromConfidentialSource();
      res.setHeader('Cache-Control', 'public, max-age=30');
      res.json({
        success: true,
        count: projects.length,
        projects,
      });
    } catch {
      res.status(500).json({ success: false, error: 'Unable to retrieve listings data' });
    }
  });

  // Secure media streaming proxy that conceals upstream origin
  app.get('/api/media', async (req: Request, res: Response) => {
    const id = String(req.query.id || '');
    const targetUrl = mediaRegistry.get(id);

    if (!targetUrl) {
      res.status(404).send('Asset not found');
      return;
    }

    try {
      const upstreamRes = await fetch(targetUrl);
      if (!upstreamRes.ok) {
        res.status(upstreamRes.status).send('Media unavailable');
        return;
      }

      const contentType = upstreamRes.headers.get('content-type') || 'image/jpeg';
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400, immutable');

      const arrayBuffer = await upstreamRes.arrayBuffer();
      res.send(Buffer.from(arrayBuffer));
    } catch {
      res.status(502).send('Error streaming media');
    }
  });

  // Full-Stack: Vite middleware in dev, static build in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server ready on http://0.0.0.0:${PORT}`);
  });
}

startServer();
