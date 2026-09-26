import { OffPlanProject } from '../data/realEstateData';

export interface BaserowConfig {
  apiUrl: string;
  tableId: string;
  token: string;
}

const STORAGE_KEY = 'jamoka_baserow_config';

/**
 * Normalizes any incoming Baserow API URL into a clean, working endpoint.
 * Handles formats like 'baserow.io/api', 'https://baserow.io', or 'https://api.baserow.io'.
 */
export function normalizeBaserowApiUrl(rawUrl?: string): string {
  if (!rawUrl || !rawUrl.trim()) return 'https://api.baserow.io';
  let cleaned = rawUrl.trim();
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    cleaned = `https://${cleaned}`;
  }
  // Baserow SaaS API is hosted at api.baserow.io
  cleaned = cleaned.replace(/^https?:\/\/baserow\.io(\/api)?\/?$/i, 'https://api.baserow.io');
  // Strip trailing /api or trailing slashes
  cleaned = cleaned.replace(/\/api\/?$/i, '').replace(/\/+$/, '');
  return cleaned || 'https://api.baserow.io';
}

/**
 * Retrieves the current Baserow configuration.
 * Automatically resolves the live project table and Database API Token.
 */
export function getBaserowConfig(): BaserowConfig {
  // Fallback to Vite environment variables
  const rawTableId = (import.meta.env.VITE_BASEROW_TABLE_ID || '').trim();
  const rawToken = (import.meta.env.VITE_BASEROW_TOKEN || '').trim();
  const rawApiUrl = (import.meta.env.VITE_BASEROW_API_URL || '').trim();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.tableId) {
        return {
          apiUrl: normalizeBaserowApiUrl(parsed.apiUrl || rawApiUrl),
          tableId: parsed.tableId === '1222837' ? '1222838' : String(parsed.tableId).trim(),
          token: String(parsed.token || rawToken || 'UCtHck85oWtJMiFiuaPZCIOgypcZeehG').trim(),
        };
      }
    }
  } catch (err) {
    console.warn('Failed to parse stored Baserow config:', err);
  }

  // If table ID is 1222837 (empty template table), automatically use 1222838 where the active projects live
  const resolvedTableId = rawTableId === '1222837' || !rawTableId ? '1222838' : rawTableId;
  const resolvedToken = rawToken || 'UCtHck85oWtJMiFiuaPZCIOgypcZeehG';

  return {
    apiUrl: normalizeBaserowApiUrl(rawApiUrl),
    tableId: resolvedTableId,
    token: resolvedToken,
  };
}

/**
 * Saves Baserow configuration into localStorage for immediate live access.
 */
export function saveBaserowConfig(config: BaserowConfig): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        apiUrl: normalizeBaserowApiUrl(config.apiUrl),
        tableId: config.tableId.trim(),
        token: config.token.trim(),
      })
    );
  } catch (err) {
    console.error('Failed to save Baserow config to localStorage:', err);
  }
}

/**
 * Clears stored Baserow config to return to default configuration.
 */
export function clearBaserowConfig(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear Baserow config:', err);
  }
}

/**
 * Helper to extract an image URL from either a Baserow File Attachment array
 * [{ url: "https://...", thumbnails: { card_cover: { url: "..." } } }] or a direct string URL.
 */
function extractImageUrl(fieldValue: unknown): string | null {
  if (!fieldValue) return null;

  // If Baserow file attachment column (array of file objects)
  if (Array.isArray(fieldValue) && fieldValue.length > 0) {
    const first = fieldValue[0];
    if (first && typeof first === 'object' && 'url' in first) {
      return String(first.url);
    }
  }

  // If plain URL string
  if (typeof fieldValue === 'string' && fieldValue.trim().startsWith('http')) {
    return fieldValue.trim();
  }

  return null;
}

/**
 * Parses diverse price formats: e.g. "696K", "4.3M", "2.06M", "2,850,000", 2850000 into numerical AED.
 */
function parsePriceAED(raw: unknown): number {
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

/**
 * Project-specific architectural visual fallbacks when not uploaded to Baserow.
 */
const PROJECT_FALLBACK_IMAGES: Record<string, { cover: string; hero: string }> = {
  '995': {
    cover: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/yKxYK1IuUBOeUVgvGhglnRqSdkQsfyol_37c91f52d80bfad6d2471768af744d31cd81696a9cf627d77011e280d6f99ebe.png',
    hero: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/I05nxiSKNVkoQ1ey2jsaHfXZwxlbT7Ia_b2e93ef95e2759f9c096bd129b2301e51d72602fd278dfc38818c8728d93c450.png',
  },
  'alva': {
    cover: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/lS8EWUeHK5OYqExR1QddxoDxhKb369kP_2223012f6b9db4560bbfa819c725e8c9efa52e25d8fb8d0d65ef7f7384c67803.jpg',
    hero: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/lS8EWUeHK5OYqExR1QddxoDxhKb369kP_2223012f6b9db4560bbfa819c725e8c9efa52e25d8fb8d0d65ef7f7384c67803.jpg',
  },
  'valia': {
    cover: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/XAHnpnIJHhORGzrieIk7UjjkBaTyvjZP_f5e21302ee2740de02a60774770697c9998ae062f6d42885f6dc438512fd2db7.jpeg',
    hero: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/XAHnpnIJHhORGzrieIk7UjjkBaTyvjZP_f5e21302ee2740de02a60774770697c9998ae062f6d42885f6dc438512fd2db7.jpeg',
  },
  'violet': {
    cover: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop',
  },
  'chealsea': {
    cover: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600&auto=format&fit=crop',
  },
  'chelsea': {
    cover: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600&auto=format&fit=crop',
  },
  'santury': {
    cover: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1600&auto=format&fit=crop',
  },
  'sanctuary': {
    cover: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1600&auto=format&fit=crop',
  },
  'central': {
    cover: 'https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1600&auto=format&fit=crop',
  },
  'mercedese': {
    cover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
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

const DEVELOPER_FALLBACK_IMAGES: Record<string, { cover: string; hero: string }> = {
  damac: {
    cover: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop',
  },
  sobah: {
    cover: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1600&auto=format&fit=crop',
  },
  binghatti: {
    cover: 'https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1600&auto=format&fit=crop',
  },
  nakheel: {
    cover: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop',
  },
  azizi: {
    cover: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
  },
  default: {
    cover: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1200&auto=format&fit=crop',
    hero: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=1600&auto=format&fit=crop',
  },
};

function getFallbackForProject(projectName: string, devName: string): { cover: string; hero: string } {
  const pName = projectName.toLowerCase();
  for (const key of Object.keys(PROJECT_FALLBACK_IMAGES)) {
    if (pName.includes(key)) {
      return PROJECT_FALLBACK_IMAGES[key];
    }
  }

  const dName = devName.toLowerCase();
  for (const key of Object.keys(DEVELOPER_FALLBACK_IMAGES)) {
    if (key !== 'default' && dName.includes(key)) {
      return DEVELOPER_FALLBACK_IMAGES[key];
    }
  }
  return DEVELOPER_FALLBACK_IMAGES.default;
}

/**
 * Normalizes a single Baserow row record into Jamoka's OffPlanProject structure.
 * Respects coverImage vs heroImage, area, tagline, payment plan, etc.
 * Yield is deliberately omitted.
 */
export function mapBaserowRowToProject(row: Record<string, unknown>, index: number): OffPlanProject {
  const getField = (...keys: string[]): unknown => {
    for (const k of keys) {
      if (row[k] !== undefined && row[k] !== null && row[k] !== '') {
        return row[k];
      }
      // Also test case-insensitive and whitespace-stripped match
      const lowerKey = k.toLowerCase().replace(/[\s_-]+/g, '');
      for (const rowKey of Object.keys(row)) {
        if (rowKey.toLowerCase().replace(/[\s_-]+/g, '') === lowerKey) {
          if (row[rowKey] !== undefined && row[rowKey] !== null && row[rowKey] !== '') {
            return row[rowKey];
          }
        }
      }
    }
    return undefined;
  };

  const id = String(row.id || row.ID || `baserow-${index + 1}`);
  const name = String(getField('Project Name', 'ProjectName', 'Name', 'Project', 'Title') || `Prime Project ${index + 1}`).trim();
  const developer = String(getField('Developers', 'Developer', 'Developer Name', 'developer') || 'Tier-1 Master Developer').trim();
  const enclave = String(getField('Location', 'Enclave', 'Community', 'Area Location', 'City') || 'Dubai, UAE').trim();

  // Numerical price or parsed string (e.g. 696K -> 696000, 4.3M -> 4300000)
  const priceAED = parsePriceAED(getField('Price', 'PriceAED', 'Price (AED)', 'Starting Price', 'price'));
  const priceUSD = Math.round(priceAED / 3.6725);

  // Payment plan formatting (e.g. "60/40" -> "60 / 40 Handover")
  let paymentPlan = String(getField('Payment Plan', 'PaymentPlan', 'Payment', 'plan') || '60 / 40 Handover').trim();
  if (paymentPlan.includes('/') && !paymentPlan.includes(' / ')) {
    paymentPlan = paymentPlan.replace('/', ' / ');
  }
  if (!paymentPlan.toLowerCase().includes('plan') && !paymentPlan.toLowerCase().includes('handover')) {
    paymentPlan = `${paymentPlan} Plan`;
  }

  // Handover date
  let handover = String(getField('Handover', 'Handover Date', 'Completion', 'Completion Date') || '2028').trim();
  if (!handover.startsWith('Q') && handover.length === 4) {
    handover = `Q4 ${handover}`;
  }

  // Unit configuration & Area
  const bedrooms = String(getField('Size', 'Bedrooms', 'Beds', 'Unit Types') || '1 - 4 Bed Residences').trim();
  const rawTag = String(getField('Tag', 'Tagline', 'Tag line', 'Subtitle', 'Highlight') || `${developer} Living`).trim();
  const area = String(getField('Area', 'Built-Up Area', 'Sqft') || '').trim();
  const tagline = rawTag || `${developer} Living`;
  const type = rawTag || 'Luxury Residence';
  const rawOffer = String(getField('Offer', 'offer', 'Special Offer') || '').trim();
  const badge = rawOffer
    ? rawOffer.toUpperCase()
    : String(getField('Badge', 'Status') || (developer.includes('Emaar') ? 'EMAAR EXCLUSIVE' : 'OFF-PLAN ALLOCATION')).toUpperCase();

  // Extract separate Cover Image (Card) and Hero Image (Modal Window)
  const coverImageVal = extractImageUrl(getField('Cover', 'CoverPhoto', 'Cover Photo', 'CoverImage', 'Thumbnail', 'image'));
  const heroImageVal = extractImageUrl(getField('Header', 'HeroImage', 'Hero Image', 'HeroPhoto', 'Hero Photo', 'HeaderImage', 'BannerImage'));

  // Get curated architectural fallbacks if no image uploaded in Baserow
  const fallbacks = getFallbackForProject(name, developer);
  const coverImage = coverImageVal || fallbacks.cover;
  const heroImage = heroImageVal || coverImageVal || fallbacks.hero;

  const rawDesc = getField('Notes', 'Description', 'Overview', 'About', 'Details', 'Project Description');
  const description =
    rawDesc && String(rawDesc).trim() !== ''
      ? String(rawDesc).trim()
      : `${name} by ${developer} located in ${enclave}. Featuring premium architecture, investor-preferred payment plans (${paymentPlan}), and scheduled handover in ${handover}.`;

  const features: string[] = [
    rawTag || 'Premium Finishes',
    'DLD Escrow Protected',
    'Swimming Pool & Gym',
    'Dedicated Parking',
    'Private Balcony',
  ];

  return {
    id,
    name,
    developer,
    enclave,
    priceAED,
    priceUSD,
    paymentPlan,
    handover,
    bedrooms,
    area: area || (bedrooms.toLowerCase().includes('studio') ? '450 – 580 sq.ft' : '850 – 2,400 sq.ft'),
    tagline,
    type,
    badge,
    image: coverImage,
    coverImage,
    heroImage,
    description,
    features,
    milestones: [
      { phase: 'Booking Deposit', percentage: 10, description: 'Upon reservation signing' },
      { phase: 'Construction Tranches', percentage: 50, description: 'Linked to certified RERA construction milestones' },
      { phase: 'Handover Balance', percentage: 40, description: `Key handover on completion (${handover})` },
    ],
  };
}

/**
 * Tests connection to a Baserow table and returns status + row count.
 */
export async function testBaserowConnection(
  config: BaserowConfig
): Promise<{ success: boolean; count?: number; message?: string }> {
  const apiUrl = normalizeBaserowApiUrl(config.apiUrl);
  const { tableId, token } = config;

  if (!tableId) {
    return { success: false, message: 'Table ID is required.' };
  }

  const endpoint = `${apiUrl}/api/database/rows/table/${tableId}/?size=10&user_field_names=true`;

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMsg = `Server returned HTTP ${response.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.error) errorMsg = errorJson.error;
        if (errorJson.detail) errorMsg = errorJson.detail;
      } catch {
        // use default errorMsg
      }
      return { success: false, message: errorMsg };
    }

    const data = await response.json();
    const rows = Array.isArray(data.results) ? data.results : [];
    const validCount = rows.filter((r: Record<string, unknown>) => r.Active !== false && (r['Project Name'] || r['Name'])).length;

    return {
      success: true,
      count: validCount || data.count || rows.length,
      message: `Successfully connected to Table #${tableId}! Found ${validCount || rows.length} project listings.`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error or CORS issue reaching Baserow API.';
    return { success: false, message };
  }
}

/**
 * Fetches all active project rows from the configured Baserow table.
 * Strictly returns only the projects that exist in the database.
 */
export async function fetchBaserowProjects(): Promise<{
  projects: OffPlanProject[];
  source: 'baserow' | 'default';
  count: number;
  error?: string;
}> {
  const config = getBaserowConfig();
  const apiUrl = normalizeBaserowApiUrl(config.apiUrl);

  // Candidate tables to check: user's configured table, plus 1222838
  const tableCandidates: string[] = [];
  if (config.tableId && config.tableId !== '1222837') {
    tableCandidates.push(config.tableId);
  }
  if (!tableCandidates.includes('1222838')) {
    tableCandidates.push('1222838');
  }
  if (!tableCandidates.includes('1222837')) {
    tableCandidates.push('1222837');
  }

  for (const tableId of tableCandidates) {
    const endpoint = `${apiUrl}/api/database/rows/table/${tableId}/?user_field_names=true&size=100`;

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (config.token) {
        headers['Authorization'] = `Token ${config.token}`;
      }

      const response = await fetch(endpoint, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      const rows: Record<string, unknown>[] = Array.isArray(data.results) ? data.results : [];

      // Filter only active, populated projects from the database
      const activeRows = rows.filter((r) => {
        if (r.Active === false) return false;
        const name = String(r['Project Name'] || r.Name || '').trim();
        return name.length > 0;
      });

      if (activeRows.length > 0) {
        const mapped = activeRows.map((row, idx) => mapBaserowRowToProject(row, idx));
        return {
          projects: mapped,
          source: 'baserow',
          count: mapped.length,
        };
      }
    } catch (err) {
      console.warn(`Error querying Baserow table ${tableId}:`, err);
    }
  }

  return {
    projects: [],
    source: 'baserow',
    count: 0,
    error: 'No active projects found in Baserow database.',
  };
}
