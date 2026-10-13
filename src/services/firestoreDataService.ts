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

const BLOGS_COLLECTION = 'blogs';
const PROJECTS_COLLECTION = 'projects';
const PLANNING_COLLECTION = 'planning';

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
