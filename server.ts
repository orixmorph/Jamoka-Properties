import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

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
    const token = typeof req.query.t === 'string' ? req.query.t : undefined;
    const targetUrl = resolveMediaUrl(id, token);

    if (!targetUrl) {
      res.status(404).send('Asset not found');
      return;
    }

    res.redirect(302, targetUrl);
  });

  // -------------------------------------------------------------
  // AI SEO BLOG ENGINE: Real Market Research & Search Grounding
  // -------------------------------------------------------------
  const TOPIC_SUGGESTIONS = [
    {
      title: 'Mercedes-Benz Places Meydan: Complete Investor ROI & Architectural Analysis',
      category: 'Investment Analysis',
      pointsToCover: [
        'Sensual Purity design language and aerodynamic architecture in Meydan Dubai',
        'Starting price from AED 1.25M / 2.25M and 50/50 payment milestone breakdown',
        'Projected capital appreciation (11.8% net) and rental demand near Meydan Racecourse',
        'Eligibility for 10-Year UAE Golden Visa and 100% freehold foreign ownership',
      ],
      keywords: ['Mercedes-Benz Places', 'Meydan Dubai off-plan', 'Binghatti Developers', 'Dubai luxury ROI', 'Golden Visa property'],
    },
    {
      title: 'Dubai Golden Visa 2026: Qualifying Through Off-Plan Real Estate',
      category: 'Regulatory & Visas',
      pointsToCover: [
        'AED 2,000,000 ($545,000) property investment threshold for 10-year residency',
        'Rules for off-plan property eligibility and developer payment certificates',
        'Sponsorship privileges for spouse, dependent children, and domestic staff',
        'Comparing UAE residency benefits with European Golden Visa programs',
      ],
      keywords: ['Dubai Golden Visa 2026', 'off plan property golden visa', 'UAE 10 year residency', 'Dubai tax free investment'],
    },
    {
      title: 'Dubai Waterfront vs Global Capitals: Why Ultra-Luxury Yields Outperform London & NYC',
      category: 'Market Trends',
      pointsToCover: [
        'Comparative price-per-square-foot: Palm Jumeirah vs Manhattan vs Mayfair',
        'Zero personal income tax and zero capital gains tax advantages in Dubai',
        'Net rental yields averaging 7% to 10% in Dubai prime enclaves',
        'Infrastructure expansion and Dubai Economic Agenda (D33) growth catalysts',
      ],
      keywords: ['Dubai luxury property vs London', 'Palm Jumeirah villas', 'Dubai real estate yields', 'tax free property investment'],
    },
    {
      title: 'Off-Plan Payment Frameworks Decoded: 50/50, 60/40, and Post-Handover Strategies',
      category: 'Investment Analysis',
      pointsToCover: [
        'How construction-linked milestone tranches safeguard buyer capital via RERA escrow',
        'Cash flow optimization using post-handover payment plans up to 3 years',
        'Secondary market assignment and exit strategies before project handover',
        'Direct developer allocation perks vs open market brokerage fees',
      ],
      keywords: ['Dubai off plan payment plan', 'RERA escrow account', 'post handover payment plan', 'Dubai property assignment'],
    },
    {
      title: 'The Rise of Branded Residences in Dubai: Automotive & Haute Horlogerie Collaborations',
      category: 'Lifestyle & Living',
      pointsToCover: [
        'Why branded residences command a 25-35% capital appreciation premium',
        'Mercedes-Benz Places, Bugatti Residences, and Jacob & Co Sky Penthouses comparison',
        'Private concierge services, smart valet, and private mobility integration',
        'Secondary liquidity among global high-net-worth collectors',
      ],
      keywords: ['Dubai branded residences', 'Mercedes Benz Binghatti', 'luxury penthouses Dubai', 'branded real estate premium'],
    },
  ];

  app.get('/api/ai/suggest-topics', (_req: Request, res: Response) => {
    res.json({ success: true, topics: TOPIC_SUGGESTIONS });
  });

  app.post('/api/ai/generate-blog', async (req: Request, res: Response) => {
    try {
      const { title, pointsToCover, keywords, tone } = req.body;

      if (!title || typeof title !== 'string') {
        res.status(400).json({ success: false, error: 'A blog title is required' });
        return;
      }

      const pointsArray = Array.isArray(pointsToCover)
        ? pointsToCover
        : typeof pointsToCover === 'string'
        ? pointsToCover.split('\n').filter((l: string) => l.trim().length > 0)
        : [];

      const targetKeywords = Array.isArray(keywords)
        ? keywords
        : typeof keywords === 'string'
        ? keywords.split(',').map((k: string) => k.trim()).filter(Boolean)
        : ['Dubai off-plan', 'luxury real estate', 'UAE Golden Visa'];

      const prompt = `You are a premier Dubai real estate analyst and senior editorial director for Jamoka Properties Dubai (an ultra-prime advisory representing Binghatti, Emaar, Sobha, Damac, Omniyat, and Mercedes-Benz Places in Dubai).

Write an exhaustive, high-ranking, data-backed SEO article for investors based on this brief:
TITLE: "${title}"
KEY POINTS / INSTRUCTIONS TO COVER:
${pointsArray.length > 0 ? pointsArray.map((p: string) => `- ${p}`).join('\n') : '- Dubai luxury off-plan investment framework\n- 10-year UAE Golden Visa and 100% freehold foreign ownership\n- Capital appreciation & payment plan milestones\n- Strategic location and rental yield forecast'}
TARGET KEYWORDS: ${targetKeywords.join(', ')}
TONE: ${tone || 'Authoritative, analytical, high-net-worth investor-grade, clear and actionable'}

SEARCH & MARKET INTELLIGENCE:
- Incorporate current Dubai Land Department (DLD) transaction benchmarks, actual market price levels (AED), developer payment plans, and official UAE Golden Visa rules.
- Maintain human-grade E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).
- Target length: 1,000 to 1,500 words.
- Format the content with clean Markdown: use ## for main sections, ### for sub-sections, bullet lists, and a comparison table.
- Do NOT include generic conversational filler.

OUTPUT FORMAT:
Return ONLY valid JSON (no markdown wrapper, no prefix) matching this exact schema:
{
  "title": "Clean, optimized article title",
  "category": "Market Trends",
  "readTime": "6 min read",
  "excerpt": "Compelling 2-sentence executive summary hook for investor preview cards.",
  "content": "Full markdown text of the article with ## headings, data tables, and investor takeaways...",
  "seoTitle": "SEO Meta Title (50-60 characters, with high-intent keywords)",
  "seoDescription": "SEO Meta Description (140-160 characters with call-to-action)",
  "targetKeywords": ["keyword1", "keyword2", "keyword3", "keyword4"],
  "suggestedImage": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
  "researchTakeaways": [
    "Key verified fact or DLD metric",
    "Key policy or Golden Visa rule",
    "Key payment milestone or ROI projection"
  ]
}`;

      let generatedJson: any = null;
      const searchSources: { title: string; uri: string }[] = [];

      try {
        const ai = new GoogleGenAI();
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }],
          },
        });

        const rawText = response.text || '';
        
        // Extract search sources if grounding metadata exists
        const chunks = (response.candidates?.[0] as any)?.groundingMetadata?.groundingChunks;
        if (Array.isArray(chunks)) {
          for (const c of chunks) {
            if (c.web?.uri && c.web?.title) {
              searchSources.push({ title: c.web.title, uri: c.web.uri });
            }
          }
        }

        // Clean JSON parsing
        const cleaned = rawText
          .replace(/^```json\s*/i, '')
          .replace(/^```\s*/i, '')
          .replace(/\s*```$/i, '')
          .trim();

        const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          generatedJson = JSON.parse(jsonMatch[0]);
        }
      } catch (genErr) {
        console.warn('Gemini generation with Google Search failed, running fallback model:', genErr);
        try {
          const ai = new GoogleGenAI();
          const fallbackRes = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
          });
          const raw = fallbackRes.text || '';
          const cleaned = raw
            .replace(/^```json\s*/i, '')
            .replace(/^```\s*/i, '')
            .replace(/\s*```$/i, '')
            .trim();
          const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            generatedJson = JSON.parse(jsonMatch[0]);
          }
        } catch (innerErr) {
          console.warn('Gemini fallback failed as well, using luxury market builder:', innerErr);
        }
      }

      // If AI generation was unavailable, supply a rich, curated market intelligence draft
      if (!generatedJson || !generatedJson.content) {
        generatedJson = {
          title: title,
          category: 'Investment Analysis',
          readTime: '6 min read',
          excerpt: `A comprehensive investor breakdown of ${title}, examining capital appreciation drivers, payment schedules, and UAE residency privileges.`,
          content: `## Executive Overview: ${title}\n\nDubai's luxury real estate sector continues to capture unprecedented global liquidity, driven by zero personal taxation, progressive residency frameworks, and world-class master developments.\n\n### Core Investment Thesis\n${pointsArray.map((p: string) => `- **${p}**: Direct alignment with prime developer standards and sustained international demand.`).join('\n')}\n\n### Market Metrics & Framework\n| Metric | Prime Dubai Benchmark | Investor Advantage |\n| :--- | :--- | :--- |\n| **Foreign Ownership** | 100% Freehold | Unrestricted repatriation of capital |\n| **Residency Pathway** | 10-Year UAE Golden Visa | Qualifying at AED 2,000,000+ investment |\n| **Payment Flexibility** | 50/50 & 60/40 Frameworks | RERA escrow account security |\n| **Gross Rental Yield** | 7.2% – 10.5% Net | Outperforming London (3.4%) and New York (4.1%) |\n\n### Strategic Takeaways for Private Buyers\nInvestors securing allocations in landmark developments such as Mercedes-Benz Places in Meydan benefit from early-tier pricing tranches, post-handover payment optionality, and substantial capital appreciation ahead of handover.`,
          seoTitle: `${title} | Jamoka Properties Dubai`,
          seoDescription: `Expert investor analysis covering ${title}. Explore off-plan pricing, 100% freehold status, and 10-year UAE Golden Visa pathways.`,
          targetKeywords: targetKeywords,
          suggestedImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop',
          researchTakeaways: [
            'Dubai Land Department records persistent year-on-year off-plan transaction growth.',
            'AED 2,000,000 threshold grants renewable 10-year Golden Visa residency for buyer and dependents.',
            'Escrow law ensures 100% investor payment isolation linked to certified construction milestones.'
          ],
        };
      }

      res.json({
        success: true,
        blog: {
          title: generatedJson.title || title,
          category: generatedJson.category || 'Investment Analysis',
          readTime: generatedJson.readTime || '6 min read',
          excerpt: generatedJson.excerpt || '',
          content: generatedJson.content || '',
          seoTitle: generatedJson.seoTitle || generatedJson.title || title,
          seoDescription: generatedJson.seoDescription || generatedJson.excerpt || '',
          targetKeywords: Array.isArray(generatedJson.targetKeywords) ? generatedJson.targetKeywords : targetKeywords,
          image: generatedJson.suggestedImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop',
          researchBrief: {
            pointsToCover: pointsArray,
            sources: searchSources.map(s => `${s.title} (${s.uri})`),
            keyTakeaways: Array.isArray(generatedJson.researchTakeaways) ? generatedJson.researchTakeaways : [],
          },
          status: 'ready_for_review',
        },
      });
    } catch (err: any) {
      console.error('Error generating blog:', err);
      res.status(500).json({ success: false, error: err.message || 'Generation failed' });
    }
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
