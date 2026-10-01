import { OffPlanProject, OFF_PLAN_PROJECTS } from '../data/realEstateData';

export interface ListingsResult {
  projects: OffPlanProject[];
  count: number;
  source: 'live' | 'fallback';
  error?: string;
}

/**
 * Fetches the project catalog from the secure server endpoint.
 * Contains zero public database configuration, tokens, or table IDs.
 */
export async function fetchListings(forceFresh = false): Promise<ListingsResult> {
  try {
    const url = forceFresh ? '/api/listings?fresh=1' : '/api/listings';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data && Array.isArray(data.projects) && data.projects.length > 0) {
      return {
        projects: data.projects,
        count: data.projects.length,
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
