import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BlogPost, BLOGS_DATA, OffPlanProject, OFF_PLAN_PROJECTS } from '../data/realEstateData';

export interface FirestoreBlogPost extends Omit<BlogPost, 'id'> {
  id?: string;
  status: 'published' | 'draft';
  author?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface FirestoreProject extends Omit<OffPlanProject, 'id'> {
  id?: string;
  status: 'published' | 'draft' | 'archived';
  createdAt?: any;
  updatedAt?: any;
}

export interface PlanningItem {
  id?: string;
  title: string;
  category: 'Roadmap' | 'Campaign' | 'Developer Strategy' | 'Private Allocation' | 'Operations';
  content: string;
  targetDate?: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  priority?: 'High' | 'Medium' | 'Low';
  createdAt?: any;
  updatedAt?: any;
}

export interface LandingPageItem {
  id?: string;
  slug: string;
  title: string;
  badge: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  developer: string;
  location: string;
  priceAED: number;
  priceUSD: number;
  paymentPlan: string;
  handover: string;
  roiEstimate: string;
  status: 'published' | 'draft';
  highlights: string[];
  description: string;
  ctaButtonText: string;
  galleryImages?: string[];
  targetAudience?: string;
  whatsAppNumber?: string;
  brochureUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  viewsCount?: number;
  leadsCount?: number;
  createdAt?: any;
  updatedAt?: any;
}

export interface LandingLead {
  id?: string;
  landingPageSlug: string;
  landingPageTitle: string;
  name: string;
  email: string;
  phone: string;
  budget?: string;
  preferredLanguage?: string;
  timeframe?: string;
  notes?: string;
  createdAt?: any;
}

const BLOGS_COLLECTION = 'blogs';
const PROJECTS_COLLECTION = 'projects';
const PLANNING_COLLECTION = 'planning';
const LANDING_PAGES_COLLECTION = 'landing_pages';
const LANDING_LEADS_COLLECTION = 'landing_leads';

export const DEFAULT_LANDING_PAGES: LandingPageItem[] = [
  {
    id: 'lp-palm-vip',
    slug: 'palm-residences-vip',
    title: 'Palm Jumeirah Ultra-Luxury Waterfront Mansions',
    badge: 'Private VIP Allocation',
    tagline: 'Exclusive Off-Market Residences with Secluded Beach Access',
    heroHeadline: 'Direct Waterfront Mansions on Palm Jumeirah',
    heroSubheadline: 'Secluded waterfront estates starting from AED 18,500,000 ($5.03M). 60/40 Post-Handover Investor Framework with 10-Year UAE Golden Visa Included.',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
    developer: 'Nakheel & Kerzner International',
    location: 'Palm Jumeirah, Dubai',
    priceAED: 18500000,
    priceUSD: 5035000,
    paymentPlan: '60/40 Post-Handover (3 Years)',
    handover: 'Q4 2027',
    roiEstimate: '10.4% Projected Net Annual Yield',
    status: 'published',
    highlights: [
      'Private 40-meter secluded beachfront access with private jetty',
      'Private yacht mooring berth & deep-water dock',
      'Complimentary 10-Year UAE Golden Visa processing for entire family',
      '100% foreign freehold ownership with 0% personal & capital gains taxes',
      'Flexible payment schedule: 20% down, 40% during construction, 40% post-handover'
    ],
    description: 'An unprecedented collection of private waterfront estates situated on the prime fronds of Palm Jumeirah. Designed by world-renowned architects, each villa offers triple-height glass facades, seamless indoor-outdoor living, state-of-the-art wellness sanctuaries, and private infinity pools cascading directly into the Arabian Gulf.',
    ctaButtonText: 'Request VIP Allocation Dossier',
    galleryImages: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1600&auto=format&fit=crop'
    ],
    targetAudience: 'International HNWI & Family Offices'
  },
  {
    id: 'lp-downtown-sky',
    slug: 'downtown-sky-penthouses',
    title: 'Downtown Dubai Sky Penthouses Overlooking Burj Khalifa',
    badge: 'Collector Edition',
    tagline: 'Limited Duplex Penthouses with 360° Unobstructed Skyline Vistas',
    heroHeadline: 'The Pinnacle of Skyline Living: Downtown Penthouses',
    heroSubheadline: 'Ultra-luxury duplex residences starting from AED 14,200,000 ($3.86M). Direct private elevator access, bespoke Italian finishes, and infinity sky pools.',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop',
    developer: 'Emaar Properties',
    location: 'Downtown Dubai',
    priceAED: 14200000,
    priceUSD: 3865000,
    paymentPlan: '80/20 Investor Construction Framework',
    handover: 'Q2 2027',
    roiEstimate: '9.2% Projected Net Rental Yield',
    status: 'published',
    highlights: [
      'Direct, panoramic views of Burj Khalifa and the Dubai Fountain',
      'Private sky infinity pool and 180 sqm entertaining terrace',
      'Dedicated 24/7 white-glove concierge and valet service',
      'Direct private access to Dubai Mall luxury fashion avenue',
      'Instant eligibility for 10-Year UAE Golden Visa'
    ],
    description: 'Perched high above Downtown Dubai, these rare sky penthouses redefine architectural prestige. Featuring double-height ceilings, Italian marble flooring, and private thermal spas, each home provides an unrivaled sanctuary in the epicenter of Dubai.',
    ctaButtonText: 'Book Private Viewing Presentation',
    galleryImages: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop'
    ],
    targetAudience: 'Global Investors & Real Estate Collectors'
  }
];

// ==========================================
// BLOG POSTS
// ==========================================

// Fetch all published blogs for public view
export async function getPublishedBlogs(): Promise<BlogPost[]> {
  try {
    const blogsRef = collection(db, BLOGS_COLLECTION);
    const q = query(blogsRef, where('status', '==', 'published'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Fallback to initial sample blogs
      return BLOGS_DATA;
    }

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title || '',
        category: data.category || 'Market Intelligence',
        date: data.date || 'Recent',
        readTime: data.readTime || '5 min read',
        excerpt: data.excerpt || '',
        image:
          data.image ||
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
        content: data.content || '',
      };
    });
  } catch (error) {
    console.warn('Error fetching blogs from Firestore, falling back to static data:', error);
    return BLOGS_DATA;
  }
}

// Fetch all blogs (both drafts & published) for Admin
export async function getAllAdminBlogs(): Promise<FirestoreBlogPost[]> {
  try {
    const blogsRef = collection(db, BLOGS_COLLECTION);
    const snapshot = await getDocs(blogsRef);

    if (snapshot.empty) {
      return BLOGS_DATA.map((b) => ({ ...b, status: 'published' as const }));
    }

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title || '',
        category: data.category || 'Market Intelligence',
        date: data.date || '',
        readTime: data.readTime || '5 min read',
        excerpt: data.excerpt || '',
        image: data.image || '',
        content: data.content || '',
        status: (data.status as 'published' | 'draft') || 'published',
        author: data.author || 'Jamoka Editorial',
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    });
  } catch (error) {
    console.error('Error fetching admin blogs:', error);
    return BLOGS_DATA.map((b) => ({ ...b, status: 'published' as const }));
  }
}

// Save or update blog post
export async function saveBlogPost(post: FirestoreBlogPost): Promise<string> {
  const blogId = post.id || `blog-${Date.now()}`;
  const docRef = doc(db, BLOGS_COLLECTION, blogId);

  await setDoc(
    docRef,
    {
      ...post,
      id: blogId,
      updatedAt: serverTimestamp(),
      createdAt: post.createdAt || serverTimestamp(),
    },
    { merge: true }
  );

  return blogId;
}

// Delete blog post
export async function deleteBlogPost(id: string): Promise<void> {
  const docRef = doc(db, BLOGS_COLLECTION, id);
  await deleteDoc(docRef);
}

// Seed initial blogs into Firestore
export async function seedInitialBlogs(): Promise<number> {
  let count = 0;
  for (const blog of BLOGS_DATA) {
    const docRef = doc(db, BLOGS_COLLECTION, blog.id);
    await setDoc(
      docRef,
      {
        ...blog,
        status: 'published',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    count++;
  }
  return count;
}

// ==========================================
// OFF-PLAN PROJECTS
// ==========================================

// Fetch published projects for public display
export async function getPublishedProjects(): Promise<OffPlanProject[]> {
  try {
    const projectsRef = collection(db, PROJECTS_COLLECTION);
    const q = query(projectsRef, where('status', '==', 'published'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return OFF_PLAN_PROJECTS;
    }

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || '',
        developer: data.developer || '',
        enclave: data.enclave || '',
        priceAED: Number(data.priceAED) || 0,
        priceUSD: Number(data.priceUSD) || 0,
        paymentPlan: data.paymentPlan || '',
        handover: data.handover || '',
        bedrooms: data.bedrooms || '',
        type: data.type || '',
        badge: data.badge || '',
        image: data.image || data.coverImage || '',
        coverImage: data.coverImage || data.image || '',
        heroImage: data.heroImage || data.image || '',
        area: data.area || '',
        tagline: data.tagline || '',
        description: data.description || '',
        roi: data.roi || '',
        features:
          Array.isArray(data.features) && data.features.length > 0
            ? data.features
            : ['Ultra-Luxury Finishes', 'Private Concierge', 'Prime Location', 'Panoramic Skyline Views'],
        milestones:
          Array.isArray(data.milestones) && data.milestones.length > 0
            ? data.milestones
            : [
                { phase: 'Reservation', percentage: 20, description: 'Initial booking deposit' },
                { phase: 'During Construction', percentage: 60, description: 'Linked to construction progress' },
                { phase: 'Upon Handover', percentage: 20, description: 'Final key handover balance' },
              ],
      };
    });
  } catch (error) {
    console.warn('Error fetching projects from Firestore, falling back to static data:', error);
    return OFF_PLAN_PROJECTS;
  }
}

// Fetch all projects (drafts + published) for Admin
export async function getAllAdminProjects(): Promise<FirestoreProject[]> {
  try {
    const projectsRef = collection(db, PROJECTS_COLLECTION);
    const snapshot = await getDocs(projectsRef);

    if (snapshot.empty) {
      return OFF_PLAN_PROJECTS.map((p) => ({ ...p, status: 'published' as const }));
    }

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || '',
        developer: data.developer || '',
        enclave: data.enclave || '',
        priceAED: Number(data.priceAED) || 0,
        priceUSD: Number(data.priceUSD) || 0,
        paymentPlan: data.paymentPlan || '',
        handover: data.handover || '',
        bedrooms: data.bedrooms || '',
        type: data.type || '',
        badge: data.badge || '',
        image: data.image || '',
        coverImage: data.coverImage || data.image || '',
        heroImage: data.heroImage || data.image || '',
        area: data.area || '',
        tagline: data.tagline || '',
        description: data.description || '',
        roi: data.roi || '',
        features:
          Array.isArray(data.features) && data.features.length > 0
            ? data.features
            : ['Ultra-Luxury Finishes', 'Private Concierge', 'Prime Location', 'Panoramic Skyline Views'],
        milestones:
          Array.isArray(data.milestones) && data.milestones.length > 0
            ? data.milestones
            : [
                { phase: 'Reservation', percentage: 20, description: 'Initial booking deposit' },
                { phase: 'During Construction', percentage: 60, description: 'Linked to construction progress' },
                { phase: 'Upon Handover', percentage: 20, description: 'Final key handover balance' },
              ],
        status: (data.status as 'published' | 'draft' | 'archived') || 'published',
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    });
  } catch (error) {
    console.error('Error fetching admin projects:', error);
    return OFF_PLAN_PROJECTS.map((p) => ({ ...p, status: 'published' as const }));
  }
}

// Save or update project
export async function saveProject(project: FirestoreProject): Promise<string> {
  const projId = project.id || `proj-${Date.now()}`;
  const docRef = doc(db, PROJECTS_COLLECTION, projId);

  await setDoc(
    docRef,
    {
      ...project,
      id: projId,
      updatedAt: serverTimestamp(),
      createdAt: project.createdAt || serverTimestamp(),
    },
    { merge: true }
  );

  return projId;
}

// Delete project
export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await deleteDoc(docRef);
}

// Seed initial projects into Firestore
export async function seedInitialProjects(): Promise<number> {
  let count = 0;
  for (const proj of OFF_PLAN_PROJECTS) {
    const docRef = doc(db, PROJECTS_COLLECTION, proj.id);
    await setDoc(
      docRef,
      {
        ...proj,
        status: 'published',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    count++;
  }
  return count;
}

// ==========================================
// CONFIDENTIAL PLANNING PAGES
// ==========================================

// Fetch all planning pages (strictly authenticated admin only)
export async function getAllPlanningPages(): Promise<PlanningItem[]> {
  try {
    const planRef = collection(db, PLANNING_COLLECTION);
    const snapshot = await getDocs(planRef);

    if (snapshot.empty) {
      return [
        {
          id: 'plan-q3-vip-launch',
          title: 'Q3 Ultra-HNW Private Allocation Strategy',
          category: 'Developer Strategy',
          status: 'in_progress',
          priority: 'High',
          targetDate: '2026-09-15',
          content: 'Confidential structuring with Emaar & Meraas for beachfront mansions. Private briefing documents for Zurich & London family offices.',
        },
        {
          id: 'plan-crypto-golden-visa',
          title: 'Institutional Crypto & Golden Visa Escrow Protocol',
          category: 'Operations',
          status: 'planning',
          priority: 'Medium',
          targetDate: '2026-10-01',
          content: 'VASP-compliant token settlement channels for off-plan downpayments, paired with VIP DIFC Golden Visa processing.',
        },
      ];
    }

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title || '',
        category: data.category || 'Roadmap',
        content: data.content || '',
        targetDate: data.targetDate || '',
        status: data.status || 'planning',
        priority: data.priority || 'Medium',
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    });
  } catch (error) {
    console.warn('Error fetching planning pages:', error);
    return [];
  }
}

// Save or update planning page
export async function savePlanningPage(plan: PlanningItem): Promise<string> {
  const planId = plan.id || `plan-${Date.now()}`;
  const docRef = doc(db, PLANNING_COLLECTION, planId);

  await setDoc(
    docRef,
    {
      ...plan,
      id: planId,
      updatedAt: serverTimestamp(),
      createdAt: plan.createdAt || serverTimestamp(),
    },
    { merge: true }
  );

  return planId;
}

// Delete planning page
export async function deletePlanningPage(id: string): Promise<void> {
  const docRef = doc(db, PLANNING_COLLECTION, id);
  await deleteDoc(docRef);
}

// ==========================================
// HIDDEN LANDING PAGES CMS
// ==========================================

// Fetch all landing pages (authenticated admin)
export async function getAllLandingPages(): Promise<LandingPageItem[]> {
  try {
    const landingRef = collection(db, LANDING_PAGES_COLLECTION);
    const snapshot = await getDocs(landingRef);

    if (snapshot.empty) {
      return DEFAULT_LANDING_PAGES;
    }

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        slug: data.slug || docSnap.id,
        title: data.title || '',
        badge: data.badge || 'Private Allocation',
        tagline: data.tagline || '',
        heroHeadline: data.heroHeadline || '',
        heroSubheadline: data.heroSubheadline || '',
        heroImage: data.heroImage || DEFAULT_LANDING_PAGES[0].heroImage,
        developer: data.developer || '',
        location: data.location || '',
        priceAED: Number(data.priceAED) || 0,
        priceUSD: Number(data.priceUSD) || 0,
        paymentPlan: data.paymentPlan || '',
        handover: data.handover || '',
        roiEstimate: data.roiEstimate || '',
        status: (data.status as 'published' | 'draft') || 'draft',
        highlights: Array.isArray(data.highlights) && data.highlights.length > 0
          ? data.highlights
          : ['Prime Dubai Location', 'High Capital Appreciation', '10-Year UAE Golden Visa Eligible'],
        description: data.description || '',
        ctaButtonText: data.ctaButtonText || 'Request VIP Allocation Dossier',
        galleryImages: Array.isArray(data.galleryImages) ? data.galleryImages : [],
        targetAudience: data.targetAudience || '',
        whatsAppNumber: data.whatsAppNumber || '+971 4 000 0000',
        brochureUrl: data.brochureUrl || '',
        metaTitle: data.metaTitle || '',
        metaDescription: data.metaDescription || '',
        viewsCount: data.viewsCount || 0,
        leadsCount: data.leadsCount || 0,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    });
  } catch (error) {
    console.warn('Error fetching landing pages from Firestore, using defaults:', error);
    return DEFAULT_LANDING_PAGES;
  }
}

// Fetch single landing page by slug (public view or admin preview)
export async function getLandingPageBySlug(slug: string): Promise<LandingPageItem | null> {
  const cleanSlug = slug.trim().toLowerCase();
  try {
    const landingRef = collection(db, LANDING_PAGES_COLLECTION);
    const q = query(landingRef, where('slug', '==', cleanSlug));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      const data = docSnap.data();
      return {
        id: docSnap.id,
        slug: data.slug || cleanSlug,
        title: data.title || '',
        badge: data.badge || 'Private Allocation',
        tagline: data.tagline || '',
        heroHeadline: data.heroHeadline || '',
        heroSubheadline: data.heroSubheadline || '',
        heroImage: data.heroImage || DEFAULT_LANDING_PAGES[0].heroImage,
        developer: data.developer || '',
        location: data.location || '',
        priceAED: Number(data.priceAED) || 0,
        priceUSD: Number(data.priceUSD) || 0,
        paymentPlan: data.paymentPlan || '',
        handover: data.handover || '',
        roiEstimate: data.roiEstimate || '',
        status: (data.status as 'published' | 'draft') || 'published',
        highlights: Array.isArray(data.highlights) && data.highlights.length > 0
          ? data.highlights
          : ['Prime Dubai Location', 'High Capital Appreciation', '10-Year UAE Golden Visa Eligible'],
        description: data.description || '',
        ctaButtonText: data.ctaButtonText || 'Request VIP Allocation Dossier',
        galleryImages: Array.isArray(data.galleryImages) ? data.galleryImages : [],
        targetAudience: data.targetAudience || '',
        whatsAppNumber: data.whatsAppNumber || '+971 4 000 0000',
        brochureUrl: data.brochureUrl || '',
        metaTitle: data.metaTitle || '',
        metaDescription: data.metaDescription || '',
        viewsCount: data.viewsCount || 0,
        leadsCount: data.leadsCount || 0,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    }
  } catch (error) {
    console.warn(`Error querying landing page slug "${cleanSlug}":`, error);
  }

  // Fallback to default presets if slug matches
  const preset = DEFAULT_LANDING_PAGES.find(
    (p) => p.slug.toLowerCase() === cleanSlug || p.id === cleanSlug
  );
  return preset || null;
}

// Save or update landing page (admin only)
export async function saveLandingPage(page: LandingPageItem): Promise<string> {
  const pageId = page.id || `lp-${page.slug || Date.now()}`;
  const docRef = doc(db, LANDING_PAGES_COLLECTION, pageId);

  await setDoc(
    docRef,
    {
      ...page,
      id: pageId,
      slug: (page.slug || `lp-${Date.now()}`).toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
      updatedAt: serverTimestamp(),
      createdAt: page.createdAt || serverTimestamp(),
    },
    { merge: true }
  );

  return pageId;
}

// Delete landing page (admin only)
export async function deleteLandingPage(id: string): Promise<void> {
  const docRef = doc(db, LANDING_PAGES_COLLECTION, id);
  await deleteDoc(docRef);
}

// Seed default landing pages into Firestore
export async function seedInitialLandingPages(): Promise<number> {
  let count = 0;
  for (const page of DEFAULT_LANDING_PAGES) {
    const pageId = page.id || `lp-${page.slug}`;
    const docRef = doc(db, LANDING_PAGES_COLLECTION, pageId);
    await setDoc(
      docRef,
      {
        ...page,
        id: pageId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    count++;
  }
  return count;
}

// ==========================================
// LANDING PAGE LEADS
// ==========================================

// Submit a lead from a hidden landing page (public permission)
export async function submitLandingLead(lead: Omit<LandingLead, 'id' | 'createdAt'>): Promise<string> {
  const leadId = `lead-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  const docRef = doc(db, LANDING_LEADS_COLLECTION, leadId);

  await setDoc(docRef, {
    ...lead,
    id: leadId,
    createdAt: serverTimestamp(),
  });

  return leadId;
}

// Fetch all landing leads (admin only)
export async function getAllLandingLeads(): Promise<LandingLead[]> {
  try {
    const leadsRef = collection(db, LANDING_LEADS_COLLECTION);
    const snapshot = await getDocs(leadsRef);

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        landingPageSlug: data.landingPageSlug || '',
        landingPageTitle: data.landingPageTitle || 'Landing Page',
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        budget: data.budget || '',
        preferredLanguage: data.preferredLanguage || 'English',
        timeframe: data.timeframe || '',
        notes: data.notes || '',
        createdAt: data.createdAt,
      };
    });
  } catch (error) {
    console.warn('Error fetching landing leads:', error);
    return [];
  }
}

// Delete a lead (admin only)
export async function deleteLandingLead(id: string): Promise<void> {
  const docRef = doc(db, LANDING_LEADS_COLLECTION, id);
  await deleteDoc(docRef);
}

