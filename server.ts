import express from 'express';
import type { Request, Response } from 'express';
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

// Baserow Blogs configuration (env vars override defaults)
const BLOG_BASEROW_HOST = process.env.BASEROW_BLOG_HOST || SECURE_HOST;
const BLOG_BASEROW_TABLE = process.env.BASEROW_BLOG_TABLE_ID || '317550';
const BLOG_BASEROW_TOKEN = process.env.BASEROW_BLOG_TOKEN || resolveCipher('FRZtPx8PIjE/OAkfai4gFm0pMxQMKSAXaQIwCQo8F2o=');

// Secure media registry: maps internal IDs to upstream asset targets to conceal origin
const mediaRegistry = new Map<string, string>();
const MEDIA_XOR_KEY = 0x4b;

function registerMedia(originalUrl: string): string {
  if (!originalUrl || !originalUrl.startsWith('http')) return originalUrl;
  const hash = 'img_' + crypto.createHash('md5').update(originalUrl).digest('hex').slice(0, 12);
  mediaRegistry.set(hash, originalUrl);

  try {
    const buf = Buffer.from(originalUrl, 'utf8');
    for (let i = 0; i < buf.length; i++) {
      buf[i] ^= MEDIA_XOR_KEY;
    }
    const token = buf.toString('base64url');
    return `/api/media?id=${hash}&t=${token}`;
  } catch {
    return `/api/media?id=${hash}`;
  }
}

function resolveMediaUrl(id: string, token?: string): string | null {
  if (id && mediaRegistry.has(id)) {
    return mediaRegistry.get(id)!;
  }
  if (token) {
    try {
      const buf = Buffer.from(token, 'base64url');
      for (let i = 0; i < buf.length; i++) {
        buf[i] ^= MEDIA_XOR_KEY;
      }
      const decoded = buf.toString('utf8');
      if (decoded.startsWith('http')) {
        if (id) mediaRegistry.set(id, decoded);
        return decoded;
      }
    } catch {
      // Fall through to null
    }
  }
  return null;
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
      const coverUrl = rawCover || fallbacks.cover;
      const heroUrl = rawHero || rawCover || fallbacks.hero;

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
  const PORT = Number(process.env.DEFAULT_APP_PORT) || 3000;

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
    const token = typeof req.query.t === 'string' ? req.query.t : undefined;
    const targetUrl = resolveMediaUrl(id, token);

    if (!targetUrl) {
      res.status(404).send('Asset not found');
      return;
    }

    res.redirect(302, targetUrl);
  });

  // -------------------------------------------------------------
  // BASEROW STRUCTURED BLOG ENGINE
  // -------------------------------------------------------------
  type BlogBlockNode =
    | { type: 'heading'; text: string; subheading?: string }
    | { type: 'image'; url: string; alt?: string }
    | { type: 'body'; text: string }
    | { type: 'cta'; text: string; url: string };

  interface NormalizedBaserowBlog {
    id: string;
    baserowId: number;
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    date: string;
    readTime: string;
    excerpt: string;
    image: string;
    imageAlt: string;
    content: string;
    blocks: BlogBlockNode[];
    author: string;
    tags: string[];
    seoTitle?: string;
    metaDescription?: string;
  }

  interface BaserowFieldMeta {
    id: number;
    name: string;
    type: string;
    order: number;
    primary?: boolean;
    link_row_table_id?: number;
  }

  let cachedBlogs: NormalizedBaserowBlog[] = [];
  let lastBlogsFetchTime = 0;
  let lastBlogsError: { message: string; code?: string } | null = null;
  const BLOGS_CACHE_TTL_MS = 30 * 1000;

  const DEFAULT_BLOG_COVER =
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop';

  function extractImageUrlsFromCell(val: unknown): string[] {
    if (!val) return [];
    const urls: string[] = [];
    if (Array.isArray(val)) {
      for (const item of val) {
        if (item && typeof item === 'object' && 'url' in item) {
          const u = String((item as { url: unknown }).url || '').trim();
          if (u.startsWith('http')) urls.push(u);
        } else if (typeof item === 'string' && item.trim().startsWith('http')) {
          urls.push(item.trim());
        }
      }
      return urls;
    }
    if (typeof val === 'string') {
      const parts = val
        .split(/[\n,]+/)
        .map((s) => s.trim())
        .filter((s) => s.startsWith('http'));
      return parts;
    }
    return urls;
  }

  function extractStringValue(val: unknown): string {
    if (val === null || val === undefined) return '';
    if (typeof val === 'string') return val.trim();
    if (typeof val === 'number' || typeof val === 'boolean') return String(val);
    if (Array.isArray(val)) {
      return val
        .map((item) => {
          if (item && typeof item === 'object' && 'value' in item) {
            return String((item as { value: unknown }).value || '');
          }
          return typeof item === 'string' ? item : '';
        })
        .filter(Boolean)
        .join(', ')
        .trim();
    }
    if (typeof val === 'object' && 'value' in (val as Record<string, unknown>)) {
      return String((val as { value: unknown }).value || '').trim();
    }
    return '';
  }

  function htmlToCleanText(raw: string): string {
    if (!raw) return '';
    let text = raw
      .replace(/\r\n/g, '\n')
      .replace(/<\s*br\s*\/?>/gi, '\n')
      .replace(/<\/\s*(p|div|h1|h2|h3|h4|h5|h6|blockquote)\s*>/gi, '\n\n')
      .replace(/<\s*(p|div|h1|h2|h3|h4|h5|h6|blockquote)[^>]*>/gi, '')
      .replace(/<\s*li[^>]*>/gi, '\n- ')
      .replace(/<\/\s*li\s*>/gi, '')
      .replace(/<\/?\s*(ul|ol)[^>]*>/gi, '\n')
      .replace(/<\s*(strong|b)[^>]*>(.*?)<\/\s*(strong|b)\s*>/gis, '**$2**')
      .replace(/<[^>]+>/g, '');

    text = text
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;|&apos;|&rsquo;|&lsquo;/gi, "'")
      .replace(/&rdquo;|&ldquo;/gi, '"')
      .replace(/&mdash;/gi, '—')
      .replace(/&ndash;/gi, '–')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return text;
  }

  function slugifyTitle(title: string, id: number): string {
    const clean = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return clean ? `${clean}-${id}` : `article-${id}`;
  }

  function isLikelyImageUrl(str: string): boolean {
    if (!str.startsWith('http')) return false;
    return /\.(jpg|jpeg|png|webp|gif|avif|svg)(\?.*)?$/i.test(str) ||
      str.includes('baserow') ||
      str.includes('cloudinary') ||
      str.includes('imagekit') ||
      str.includes('unsplash');
  }

  async function fetchAllBaserowRows(
    tableId: string | number,
    headers: Record<string, string>
  ): Promise<{ ok: boolean; status: number; errBody: string; rows: Record<string, unknown>[] }> {
    const allRows: Record<string, unknown>[] = [];
    let nextUrl: string | null = `${BLOG_BASEROW_HOST}/api/database/rows/table/${tableId}/?user_field_names=true&size=200`;
    let pageCount = 0;

    while (nextUrl && pageCount < 20) {
      pageCount++;
      const res = await fetch(nextUrl, { method: 'GET', headers });
      if (!res.ok) {
        const errBody = await res.text();
        return { ok: false, status: res.status, errBody, rows: allRows };
      }
      const json = (await res.json()) as {
        next?: string | null;
        results?: Record<string, unknown>[];
      };
      if (Array.isArray(json.results)) {
        allRows.push(...json.results);
      }
      nextUrl = json.next || null;
    }

    return { ok: true, status: 200, errBody: '', rows: allRows };
  }

  async function fetchBaserowBlogs(forceFresh = false): Promise<{
    blogs: NormalizedBaserowBlog[];
    error: { message: string; code?: string } | null;
  }> {
    const now = Date.now();
    if (!forceFresh && cachedBlogs.length > 0 && now - lastBlogsFetchTime < BLOGS_CACHE_TTL_MS) {
      return { blogs: cachedBlogs, error: lastBlogsError };
    }

    const headers = {
      Authorization: `Token ${BLOG_BASEROW_TOKEN}`,
      'Content-Type': 'application/json',
    };

    try {
      // Fetch ordered field metadata and ALL paginated rows from the main table
      const [fieldsRes, rowsOutcome] = await Promise.all([
        fetch(`${BLOG_BASEROW_HOST}/api/database/fields/table/${BLOG_BASEROW_TABLE}/`, {
          method: 'GET',
          headers,
        }),
        fetchAllBaserowRows(BLOG_BASEROW_TABLE, headers),
      ]);

      if (!rowsOutcome.ok) {
        let parsedErr: { error?: string; detail?: string } = {};
        try {
          parsedErr = JSON.parse(rowsOutcome.errBody);
        } catch {
          // ignore
        }
        const errCode = parsedErr.error || `HTTP_${rowsOutcome.status}`;
        let humanMessage = `Baserow returned status ${rowsOutcome.status} (${errCode}).`;
        if (errCode === 'ERROR_USER_NOT_IN_GROUP') {
          humanMessage = `Baserow could not access table "${BLOG_BASEROW_TABLE}" (ERROR_USER_NOT_IN_GROUP). Please check that "${BLOG_BASEROW_TABLE}" is the Table ID (not the Database ID) and that your token belongs to that workspace.`;
        } else if (errCode === 'ERROR_NO_PERMISSION_TO_TABLE') {
          humanMessage = `Your Baserow token does not have read permission for table "${BLOG_BASEROW_TABLE}".`;
        }
        console.warn('Baserow blogs fetch error:', errCode, rowsOutcome.errBody);
        lastBlogsError = { message: humanMessage, code: errCode };
        return { blogs: [], error: lastBlogsError };
      }

      const rows = rowsOutcome.rows;

      let orderedFields: BaserowFieldMeta[] = [];
      if (fieldsRes.ok) {
        const fieldsJson = (await fieldsRes.json()) as BaserowFieldMeta[];
        if (Array.isArray(fieldsJson)) {
          orderedFields = [...fieldsJson].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        }
      }

      // Discover and fetch linked section table(s) if a link_row column like "Sections" exists
      const sectionRowsById = new Map<number, Record<string, unknown>>();
      const sectionRowsByParentBlogId = new Map<number, Record<string, unknown>[]>();
      const linkFields = orderedFields.filter(
        (f) => f.type === 'link_row' && typeof f.link_row_table_id === 'number'
      );

      if (linkFields.length > 0) {
        const linkedResults = await Promise.all(
          linkFields.map((lf) => fetchAllBaserowRows(lf.link_row_table_id!, headers))
        );
        for (const lr of linkedResults) {
          if (!lr.ok) continue;
          for (const sRow of lr.rows) {
            const sId = Number(sRow.id);
            if (!isNaN(sId)) {
              sectionRowsById.set(sId, sRow);
            }
            const parentLinks = sRow['Parent Blog'];
            if (Array.isArray(parentLinks)) {
              for (const pl of parentLinks) {
                if (pl && typeof pl === 'object' && 'id' in pl) {
                  const pId = Number((pl as { id: unknown }).id);
                  if (!isNaN(pId)) {
                    const existing = sectionRowsByParentBlogId.get(pId) || [];
                    existing.push(sRow);
                    sectionRowsByParentBlogId.set(pId, existing);
                  }
                }
              }
            }
          }
        }
      }

      const posts: NormalizedBaserowBlog[] = [];

      const META_FIELD_PATTERNS = [
        /^id$/i,
        /^order$/i,
        /^blog[\s_-]*id$/i,
        /^section[\s_-]*id$/i,
        /^active$/i,
        /^published$/i,
        /^is[\s_-]*published$/i,
        /^featured([\s_-]*blog)?$/i,
        /^status$/i,
        /^(blog[\s_-]*)?category$/i,
        /^(publication[\s_-]*|publish[\s_-]*|created[\s_-]*|last[\s_-]*updated[\s_-]*)?date$/i,
        /^created[\s_-]*on$/i,
        /^last[\s_-]*updated$/i,
        /^author([\s_-]*name)?$/i,
        /^(url[\s_-]*)?slug$/i,
        /^meta[\s_-]*(title|description|keywords)$/i,
        /^(featured[\s_-]*)?image[\s_-]*alt([\s_-]*text)?$/i,
        /^tags?$/i,
        /^keywords?$/i,
        /^sections?$/i,
      ];

      const hasStatusColumn = orderedFields.some((f) => f.name.toLowerCase().trim() === 'status');

      for (const row of rows) {
        const rowId = Number(row.id) || posts.length + 1;

        if (row.Active === false || row.active === false || row.Published === false || row.published === false) {
          continue;
        }
        const statusVal = extractStringValue(row.Status ?? row.status).toLowerCase().trim();
        if (hasStatusColumn || 'Status' in row || 'status' in row) {
          if (statusVal !== 'published') {
            continue;
          }
        }

        // Determine column list in Baserow order, grouping numbered repeating blocks
        // (e.g. Blog Subtitle 2 / Cover Image 2 / Introduction 2) so newly inserted
        // columns in Baserow Grid View align cleanly with their matching section.
        const rawColumns: { name: string; type: string; value: unknown; order: number }[] =
          orderedFields.length > 0
            ? orderedFields.map((f, idx) => ({
                name: f.name,
                type: f.type,
                value: row[f.name],
                order: typeof f.order === 'number' ? f.order : idx,
              }))
            : Object.keys(row)
                .filter((k) => k !== 'id' && k !== 'order')
                .map((k, idx) => ({
                  name: k,
                  type: 'text',
                  value: row[k],
                  order: idx,
                }));

        const contentColumns = rawColumns.filter((col) => {
          const nameLower = col.name.toLowerCase().trim();
          return (
            col.type !== 'link_row' &&
            col.type !== 'formula' &&
            !META_FIELD_PATTERNS.some((rx) => rx.test(nameLower))
          );
        });

        const getColumnSortTuple = (col: { name: string; type: string; value: unknown; order: number }) => {
          const lower = col.name.toLowerCase().trim();
          const isMainTitleCol = /^(block[\s_-]*title|blog[\s_-]*title|article[\s_-]*title|title|name|headline)$/i.test(
            lower
          );
          const isHeroImageCol = /^(hero[\s_-]*image|hero|banner[\s_-]*image)$/i.test(lower);
          const isOverviewCol = /^(blog[\s_-]*overview|overview)$/i.test(lower);
          const isDescriptionCol = /^(description|blog[\s_-]*description|summary|lead)$/i.test(lower);

          const numMatch = lower.match(/(?:^|[\s_-])(\d+)$/);
          const isBaseBlockCol =
            /^(blog[\s_-]*subtitle|sub[\s_-]*title|subtitle|cover[\s_-]*image|image|introduction|intro|body|content)(?:[\s_-]*\d+)?$/i.test(
              lower
            );

          const groupNum = isMainTitleCol
            ? -1
            : isHeroImageCol || isOverviewCol || isDescriptionCol
              ? 0
              : numMatch
                ? Number(numMatch[1])
                : isBaseBlockCol
                  ? 1
                  : 100000 + col.order;

          // Group 0 (top): Hero Image (0) -> Blog Overview (1) -> Description (2)
          // Groups 1..N (sections): Cover Image (0) -> Blog Subtitle (1) -> Introduction (2)
          let roleRank = 2;
          if (isMainTitleCol) {
            roleRank = 0;
          } else if (
            isHeroImageCol ||
            col.type === 'file' ||
            /cover|image|photo|img|picture|banner|thumbnail|media/i.test(lower)
          ) {
            roleRank = 0;
          } else if (
            isOverviewCol ||
            /subtitle|sub[\s_-]*title|overview|heading|sub[\s_-]*heading|topic/i.test(lower)
          ) {
            roleRank = 1;
          } else if (isDescriptionCol) {
            roleRank = 2;
          }

          return { groupNum, roleRank, order: col.order };
        };

        const columns = [...contentColumns].sort((a, b) => {
          const sa = getColumnSortTuple(a);
          const sb = getColumnSortTuple(b);
          if (sa.groupNum !== sb.groupNum) return sa.groupNum - sb.groupNum;
          if (sa.roleRank !== sb.roleRank) return sa.roleRank - sb.roleRank;
          return sa.order - sb.order;
        });

        let mainTitle = '';
        let firstSubtitle = '';
        let firstCoverImage = '';
        let firstIntro = '';
        const blocks: BlogBlockNode[] = [];
        let lastHeading = '';

        // Extract rich metadata fields accurately without leaking them into article body blocks
        const categoryVal =
          extractStringValue(row['Blog Category'] ?? row.Category ?? row.category) || 'Market Intelligence';
        const authorVal =
          extractStringValue(row['Author Name'] ?? row.Author ?? row.author) || 'Jamoka Advisory Desk';
        const rawDate = extractStringValue(
          row['Publication Date'] ??
            row.Date ??
            row.date ??
            row['Publish Date'] ??
            row['Created Date'] ??
            row['Created on']
        );
        const formattedDate = rawDate
          ? (() => {
              const d = new Date(rawDate);
              return isNaN(d.getTime())
                ? rawDate
                : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            })()
          : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const customSlug = extractStringValue(row['URL Slug'] ?? row.Slug ?? row.slug);
        const featuredAltText = extractStringValue(
          row['Featured Image Alt Text'] ?? row['Image Alt Text']
        );
        const seoTitle = extractStringValue(row['Meta Title']);
        const metaDescription = extractStringValue(row['Meta Description']);
        const tagsRaw = extractStringValue(row.Tags ?? row.tags ?? row.Keywords ?? row.keywords);
        const tags = tagsRaw
          ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean)
          : [];

        for (const col of columns) {
          const nameLower = col.name.toLowerCase().trim();
          if (col.type === 'link_row' || col.type === 'formula' || META_FIELD_PATTERNS.some((rx) => rx.test(nameLower))) {
            continue;
          }

          if (col.value === null || col.value === undefined || col.value === '') {
            continue;
          }
          if (Array.isArray(col.value) && col.value.length === 0) {
            continue;
          }

          // 1. Check if this column is an IMAGE (file field, image URL field, or array of file objects)
          const isFileOrImageField =
            col.type === 'file' ||
            /cover|image|photo|img|picture|banner|thumbnail|media/i.test(nameLower) ||
            (Array.isArray(col.value) && col.value.some((x) => x && typeof x === 'object' && 'url' in x));

          if (isFileOrImageField) {
            const urls = extractImageUrlsFromCell(col.value);
            if (urls.length > 0) {
              for (const u of urls) {
                if (!firstCoverImage) firstCoverImage = u;
                blocks.push({
                  type: 'image',
                  url: u,
                  alt: featuredAltText || lastHeading || mainTitle || 'Jamoka Properties Insight',
                });
              }
              continue;
            }
          }

          const rawStr = extractStringValue(col.value);
          if (!rawStr) continue;

          // If a generic URL field contains an image link, treat as image
          if (isLikelyImageUrl(rawStr)) {
            if (!firstCoverImage) firstCoverImage = rawStr;
            blocks.push({
              type: 'image',
              url: rawStr,
              alt: featuredAltText || lastHeading || mainTitle || 'Jamoka Properties Insight',
            });
            continue;
          }

          // 2. Check if this is the MAIN BLOCK TITLE (first title column encountered)
          const isTitleColumn = /^(block[\s_-]*title|blog[\s_-]*title|article[\s_-]*title|title|name|headline)$/i.test(
            nameLower
          );

          if (
            !mainTitle &&
            (isTitleColumn ||
              (blocks.length === 0 && !/subtitle|overview|description|intro|content|body/i.test(nameLower)))
          ) {
            mainTitle = htmlToCleanText(rawStr);
            continue;
          }

          // 3. Check if this is a SUBTITLE / OVERVIEW / LITTLE HEADING
          const isHeadingColumn =
            /subtitle|sub[\s_-]*title|overview|heading|sub[\s_-]*heading|topic|section|block[\s_-]*title|title/i.test(
              nameLower
            );

          if (isHeadingColumn) {
            const cleanHeading = htmlToCleanText(rawStr);
            if (!firstSubtitle) firstSubtitle = cleanHeading;
            lastHeading = cleanHeading;
            blocks.push({ type: 'heading', text: cleanHeading });
            continue;
          }

          // 4. Otherwise it's DESCRIPTION / INTRODUCTION / BODY DATA
          const cleanBody = htmlToCleanText(rawStr);
          if (cleanBody) {
            if (!firstIntro) firstIntro = cleanBody;
            blocks.push({ type: 'body', text: cleanBody });
          }
        }

        // Enrich image alt attributes using the heading immediately following each image (except hero alt)
        for (let i = 0; i < blocks.length - 1; i++) {
          const cur = blocks[i];
          const nxt = blocks[i + 1];
          if (cur.type === 'image' && nxt.type === 'heading' && !(i === 0 && featuredAltText)) {
            cur.alt = nxt.text;
          }
        }

        // Expand linked Sections rows (if present on this row or referencing this row)
        const linkedSectionRefs = Array.isArray(row.Sections) ? row.Sections : [];
        const resolvedSectionsMap = new Map<number, Record<string, unknown>>();
        for (const ref of linkedSectionRefs) {
          if (ref && typeof ref === 'object' && 'id' in ref) {
            const sId = Number((ref as { id: unknown }).id);
            const fullSection = sectionRowsById.get(sId);
            if (fullSection) {
              resolvedSectionsMap.set(sId, fullSection);
            } else if ('value' in ref && String((ref as { value: unknown }).value || '').trim()) {
              resolvedSectionsMap.set(sId, {
                id: sId,
                'Section Heading': String((ref as { value: unknown }).value),
              });
            }
          }
        }
        const reverseLinked = sectionRowsByParentBlogId.get(rowId) || [];
        for (const sRow of reverseLinked) {
          const sId = Number(sRow.id);
          if (!isNaN(sId) && !resolvedSectionsMap.has(sId)) {
            resolvedSectionsMap.set(sId, sRow);
          }
        }

        const sortedSections = Array.from(resolvedSectionsMap.values()).sort((a, b) => {
          const ao = Number(a['Section Order'] ?? a.order ?? a.id ?? 0);
          const bo = Number(b['Section Order'] ?? b.order ?? b.id ?? 0);
          return ao - bo;
        });

        for (const sec of sortedSections) {
          const secHeading = htmlToCleanText(extractStringValue(sec['Section Heading'] ?? sec.Heading));
          const secSubheading = htmlToCleanText(extractStringValue(sec['Section Subheading'] ?? sec.Subheading));
          const secAlt = extractStringValue(sec['Image Alt Text']) || secHeading || mainTitle || 'Section Illustration';
          const secImages = extractImageUrlsFromCell(sec['Section Image'] ?? sec.Image);
          const secDesc = htmlToCleanText(extractStringValue(sec['Section Description'] ?? sec.Description));
          const addImages = extractImageUrlsFromCell(sec['Optional Additional Image']);
          const addDesc = htmlToCleanText(extractStringValue(sec['Optional Additional Description']));
          const ctaUrl = extractStringValue(sec['Optional External Link']);
          const ctaText = extractStringValue(sec['Optional Call-to-Action Text']);

          if (secHeading) {
            blocks.push({
              type: 'heading',
              text: secHeading,
              ...(secSubheading ? { subheading: secSubheading } : {}),
            });
          } else if (secSubheading) {
            blocks.push({ type: 'heading', text: secSubheading });
          }

          for (const imgUrl of secImages) {
            if (!firstCoverImage) firstCoverImage = imgUrl;
            blocks.push({ type: 'image', url: imgUrl, alt: secAlt });
          }

          if (secDesc) {
            if (!firstIntro) firstIntro = secDesc;
            blocks.push({ type: 'body', text: secDesc });
          }

          for (const addImgUrl of addImages) {
            if (!firstCoverImage) firstCoverImage = addImgUrl;
            blocks.push({ type: 'image', url: addImgUrl, alt: secAlt });
          }

          if (addDesc) {
            blocks.push({ type: 'body', text: addDesc });
          }

          const isExamplePlaceholderUrl = /^https?:\/\/(www\.)?example\.com(\/|$)/i.test(ctaUrl);
          if (ctaUrl && ctaUrl.startsWith('http') && !isExamplePlaceholderUrl && ctaText) {
            blocks.push({ type: 'cta', text: ctaText, url: ctaUrl });
          }
        }

        // If row has NO mainTitle, check if it's a continuation row for the previous blog post
        if (!mainTitle && blocks.length > 0 && posts.length > 0) {
          const prev = posts[posts.length - 1];
          prev.blocks.push(...blocks);
          if (!prev.image || prev.image === DEFAULT_BLOG_COVER) {
            const firstImg = prev.blocks.find((b) => b.type === 'image');
            if (firstImg && firstImg.type === 'image') prev.image = firstImg.url;
          }
          continue;
        }

        if (!mainTitle && blocks.length === 0) {
          continue;
        }

        const resolvedTitle = mainTitle || firstSubtitle || `Market Insight #${rowId}`;

        // Build clean excerpt from first introduction (or meta description / subtitle)
        const rawExcerptSource = firstIntro || metaDescription || firstSubtitle || resolvedTitle;
        const cleanExcerptText = rawExcerptSource.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\s+/g, ' ').trim();
        const excerpt =
          cleanExcerptText.length > 180
            ? cleanExcerptText.slice(0, 177).trimEnd() + '...'
            : cleanExcerptText;

        const markdownContent = blocks
          .map((b) => {
            if (b.type === 'heading') return b.subheading ? `## ${b.text}\n${b.subheading}` : `## ${b.text}`;
            if (b.type === 'image') return `![${b.alt || resolvedTitle}](${b.url})`;
            if (b.type === 'cta') return `[${b.text}](${b.url})`;
            return b.text;
          })
          .join('\n\n');

        const wordCount = blocks
          .filter((b): b is Extract<BlogBlockNode, { type: 'heading' | 'body' }> => b.type === 'heading' || b.type === 'body')
          .map((b) => `${b.text} ${b.type === 'heading' && b.subheading ? b.subheading : ''}`)
          .join(' ')
          .split(/\s+/)
          .filter(Boolean).length;
        const readMinutes = Math.max(1, Math.ceil(wordCount / 180));

        posts.push({
          id: `baserow-${rowId}`,
          baserowId: rowId,
          slug: customSlug || slugifyTitle(resolvedTitle, rowId),
          title: resolvedTitle,
          subtitle: firstSubtitle,
          category: categoryVal,
          date: formattedDate,
          readTime: `${readMinutes} min read`,
          excerpt,
          image: firstCoverImage || DEFAULT_BLOG_COVER,
          imageAlt: featuredAltText || resolvedTitle,
          content: markdownContent,
          blocks,
          author: authorVal,
          tags,
          ...(seoTitle ? { seoTitle } : {}),
          ...(metaDescription ? { metaDescription } : {}),
        });
      }

      cachedBlogs = posts;
      lastBlogsFetchTime = now;
      lastBlogsError = null;
      return { blogs: cachedBlogs, error: null };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to reach Baserow blog repository';
      console.error('Baserow blog fetch failed:', err);
      lastBlogsError = { message: msg };
      return { blogs: cachedBlogs, error: lastBlogsError };
    }
  }

  // Public Baserow Blogs API
  app.get('/api/blogs', async (req: Request, res: Response) => {
    const force = req.query.fresh === '1';
    const { blogs, error } = await fetchBaserowBlogs(force);
    res.setHeader('Cache-Control', 'public, max-age=15');
    res.json({
      success: !error,
      count: blogs.length,
      blogs,
      error: error?.message || null,
      errorCode: error?.code || null,
    });
  });

  app.get('/api/blogs/:slug', async (req: Request, res: Response) => {
    const { blogs, error } = await fetchBaserowBlogs(false);
    const slug = String(req.params.slug || '').toLowerCase();
    const match = blogs.find(
      (b) => b.slug.toLowerCase() === slug || b.id.toLowerCase() === slug
    );
    if (!match) {
      res.status(404).json({
        success: false,
        error: error?.message || 'Blog article not found',
      });
      return;
    }
    res.json({ success: true, blog: match });
  });


  // Full-Stack: Vite middleware in dev, static build in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
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
    fetchFromConfidentialSource().then((listings) => {
      console.log(`Listings pre-cached: ${listings.length} projects loaded from database`);
    }).catch((err) => {
      console.warn('Initial cache fetch deferred:', err);
    });
  });
}

startServer();
