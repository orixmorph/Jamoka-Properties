import { OffPlanProject, OFF_PLAN_PROJECTS } from '../data/realEstateData';
import { withBasePath } from '../utils/basePath';

export interface ListingsResult {
  projects: OffPlanProject[];
  count: number;
  source: 'live' | 'fallback';
  error?: string;
}

async function fetchListingsJson(url: string) {
  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  const contentType = response.headers.get('content-type') || '';
  if (!response.ok || !contentType.includes('application/json')) {
    return null;
  }
  return response.json();
}

/**
 * Fetches the project catalog from the server endpoint, with static snapshot
 * and bundled catalog fallbacks for static-only hosting (e.g. GitHub Pages).
 */
export async function fetchListings(forceFresh = false): Promise<ListingsResult> {
  try {
    const url = withBasePath(forceFresh ? '/api/listings?fresh=1' : '/api/listings');
    const data = await fetchListingsJson(url).catch(() => null);

    if (data && Array.isArray(data.projects) && data.projects.length > 0) {
      return {
        projects: data.projects,
        count: data.projects.length,
        source: 'live',
      };
    }

    const staticData = await fetchListingsJson(withBasePath('/static-data/listings.json')).catch(
      () => null
    );
    if (staticData && Array.isArray(staticData.projects) && staticData.projects.length > 0) {
      return {
        projects: staticData.projects,
        count: staticData.projects.length,
        source: 'live',
      };
    }

    return {
      projects: OFF_PLAN_PROJECTS,
      count: OFF_PLAN_PROJECTS.length,
      source: 'fallback',
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch live listings';
    console.warn('Using curated listings catalog:', message);
    return {
      projects: OFF_PLAN_PROJECTS,
      count: OFF_PLAN_PROJECTS.length,
      source: 'fallback',
      error: message,
    };
  }
}
