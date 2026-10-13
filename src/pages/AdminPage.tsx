import React, { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import {
  FirestoreBlogPost,
  FirestoreProject,
  PlanningItem,
  LandingPageItem,
  LandingLead,
  getAllAdminBlogs,
  saveBlogPost,
  deleteBlogPost,
  seedInitialBlogs,
  getAllAdminProjects,
  saveProject,
  deleteProject,
  seedInitialProjects,
  getAllPlanningPages,
  savePlanningPage,
  deletePlanningPage,
  getAllLandingPages,
  saveLandingPage,
  deleteLandingPage,
  seedInitialLandingPages,
  getAllLandingLeads,
  deleteLandingLead,
} from '../services/firestoreDataService';
import { useProjects } from '../context/ProjectsContext';
import {
  BookOpen,
  Building2,
  Lock,
  Plus,
  Trash2,
  Check,
  X,
  RefreshCw,
  LogOut,
  User as UserIcon,
  ShieldCheck,
  FileText,
  Sparkles,
  ExternalLink,
  Database,
  Search,
  ArrowLeft,
  Calendar,
  DollarSign,
  AlertCircle,
  Clock,
  Layers,
  ChevronRight,
  Globe,
  Copy,
  CheckCheck,
  MessageSquare,
  Users,
  Eye,
  MapPin,
  Tag,
} from 'lucide-react';
import { JamokaLogo } from '../components/Logos';

interface AdminPageProps {
  onExit: () => void;
}

type AdminTab = 'blogs' | 'projects' | 'landing' | 'planning' | 'system';

const DUBAI_IMAGE_PRESETS = [
  {
    name: 'Downtown Skyline',
    url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop',
  },
  {
    name: 'Palm Jumeirah Villa',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
  },
  {
    name: 'Ultra-Luxury Highrise',
    url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1600&auto=format&fit=crop',
  },
  {
    name: 'Waterfront Penthouse',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop',
  },
  {
    name: 'Architectural Masterpiece',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
  },
];

export const AdminPage: React.FC<AdminPageProps> = ({ onExit }) => {
  const { refreshProjects } = useProjects();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('blogs');

  // Blogs State
  const [blogs, setBlogs] = useState<FirestoreBlogPost[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [blogSearch, setBlogSearch] = useState('');
  const [editingBlog, setEditingBlog] = useState<FirestoreBlogPost | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [blogFeedback, setBlogFeedback] = useState<string | null>(null);

  // Projects State
  const [projects, setProjects] = useState<FirestoreProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [projectSearch, setProjectSearch] = useState('');
  const [editingProject, setEditingProject] = useState<FirestoreProject | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectFeedback, setProjectFeedback] = useState<string | null>(null);

  // Planning State
  const [planningItems, setPlanningItems] = useState<PlanningItem[]>([]);
  const [loadingPlanning, setLoadingPlanning] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PlanningItem | null>(null);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [planFeedback, setPlanFeedback] = useState<string | null>(null);

  // Hidden Landing Pages State
  const [landingPages, setLandingPages] = useState<LandingPageItem[]>([]);
  const [loadingLanding, setLoadingLanding] = useState(false);
  const [landingSearch, setLandingSearch] = useState('');
  const [editingLanding, setEditingLanding] = useState<LandingPageItem | null>(null);
  const [isLandingModalOpen, setIsLandingModalOpen] = useState(false);
  const [landingFeedback, setLandingFeedback] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Landing Leads State
  const [landingLeads, setLandingLeads] = useState<LandingLead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [isLeadsModalOpen, setIsLeadsModalOpen] = useState(false);

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      if (user) {
        loadAllData();
      }
    });

    return () => unsubscribe();
  }, []);

  const loadAllData = () => {
    fetchBlogs();
    fetchProjects();
    fetchPlanning();
    fetchLandingPages();
    fetchLandingLeads();
  };

  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const data = await getAllAdminBlogs();
      setBlogs(data);
    } catch (err) {
      console.error('Error fetching admin blogs:', err);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const data = await getAllAdminProjects();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching admin projects:', err);
    } finally {
      setLoadingProjects(false);
    }
  };

  const fetchPlanning = async () => {
    setLoadingPlanning(true);
    try {
      const data = await getAllPlanningPages();
      setPlanningItems(data);
    } catch (err) {
      console.error('Error fetching planning items:', err);
    } finally {
      setLoadingPlanning(false);
    }
  };

  const fetchLandingPages = async () => {
    setLoadingLanding(true);
    try {
      const data = await getAllLandingPages();
      setLandingPages(data);
    } catch (err) {
      console.error('Error fetching landing pages:', err);
    } finally {
      setLoadingLanding(false);
    }
  };

  const fetchLandingLeads = async () => {
    setLoadingLeads(true);
    try {
      const data = await getAllLandingLeads();
      setLandingLeads(data);
    } catch (err) {
      console.error('Error fetching landing leads:', err);
    } finally {
      setLoadingLeads(false);
    }
  };

  // Auth Handlers
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccessMsg(null);

    if (!email.trim() || !password.trim()) {
      setAuthError('Please enter both email and password.');
      return;
    }

    try {
      if (authMode === 'signin') {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
        setAuthSuccessMsg('Admin account created successfully.');
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      let msg = err.message || 'Authentication failed. Please verify credentials.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        msg = 'Invalid email or password. If you are registering a new admin account, switch to "Create Account".';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'This email is already registered. Please sign in instead.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      }
      setAuthError(msg);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('Google sign in error:', err);
      setAuthError(err.message || 'Google Sign-In failed.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setBlogs([]);
      setProjects([]);
      setPlanningItems([]);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  // Blog CMS Operations
  const handleOpenNewBlog = () => {
    setEditingBlog({
      title: '',
      category: 'Market Trends',
      status: 'published',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '5 min read',
      excerpt: '',
      content: '',
      image: DUBAI_IMAGE_PRESETS[0].url,
      author: 'Jamoka Editorial',
    });
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog || !editingBlog.title.trim()) return;

    try {
      setBlogFeedback('Saving article to Firestore...');
      await saveBlogPost(editingBlog);
      await fetchBlogs();
      setIsBlogModalOpen(false);
      setEditingBlog(null);
      setBlogFeedback('Article saved successfully.');
      setTimeout(() => setBlogFeedback(null), 3000);
    } catch (err: any) {
      console.error('Save blog error:', err);
      setBlogFeedback(`Failed to save: ${err.message || 'Error'}`);
    }
  };

  const handleDeleteBlog = async (id?: string) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to permanently delete this blog post?')) return;
    try {
      setBlogFeedback('Deleting blog post...');
      await deleteBlogPost(id);
      await fetchBlogs();
      setBlogFeedback('Article deleted.');
      setTimeout(() => setBlogFeedback(null), 3000);
    } catch (err: any) {
      console.error('Delete blog error:', err);
      setBlogFeedback(`Failed to delete: ${err.message}`);
    }
  };

  const handleToggleBlogStatus = async (blog: FirestoreBlogPost) => {
    const updatedStatus = blog.status === 'published' ? 'draft' : 'published';
    try {
      await saveBlogPost({ ...blog, status: updatedStatus });
      await fetchBlogs();
      setBlogFeedback(`Status updated to ${updatedStatus}.`);
      setTimeout(() => setBlogFeedback(null), 2500);
    } catch (err: any) {
      console.error('Status toggle error:', err);
    }
  };

  const handleSeedBlogs = async () => {
    if (!window.confirm('Import the 5 curated Dubai Market Intelligence articles into Firestore?')) return;
    try {
      setBlogFeedback('Seeding sample blogs to Firestore...');
      const count = await seedInitialBlogs();
      await fetchBlogs();
      setBlogFeedback(`Successfully imported ${count} articles to Firestore.`);
      setTimeout(() => setBlogFeedback(null), 3500);
    } catch (err: any) {
      console.error('Seed blogs error:', err);
      setBlogFeedback(`Seed failed: ${err.message}`);
    }
  };

  // Projects CMS Operations
  const handleOpenNewProject = () => {
    setEditingProject({
      name: '',
      developer: 'Emaar Properties',
      enclave: 'Downtown Dubai',
      priceAED: 3500000,
      priceUSD: 953000,
      paymentPlan: '80/20 Payment Framework',
      handover: 'Q4 2027',
      bedrooms: '1, 2 & 3 BR Residences',
      type: 'Ultra-Luxury Residences',
      badge: 'Private Allocation',
      image: DUBAI_IMAGE_PRESETS[0].url,
      description: 'Exclusive off-plan residential development in prime Dubai enclave.',
      status: 'published',
      roi: '9.2% Projected Net Yield',
    });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.name.trim()) return;

    try {
      setProjectFeedback('Saving project to Firestore...');
      await saveProject(editingProject);
      await fetchProjects();
      await refreshProjects();
      setIsProjectModalOpen(false);
      setEditingProject(null);
      setProjectFeedback('Project saved & published to website.');
      setTimeout(() => setProjectFeedback(null), 3000);
    } catch (err: any) {
      console.error('Save project error:', err);
      setProjectFeedback(`Failed to save: ${err.message || 'Error'}`);
    }
  };

  const handleDeleteProject = async (id?: string) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this project listing from the website?')) return;
    try {
      setProjectFeedback('Deleting project...');
      await deleteProject(id);
      await fetchProjects();
      await refreshProjects();
      setProjectFeedback('Project listing removed.');
      setTimeout(() => setProjectFeedback(null), 3000);
    } catch (err: any) {
      console.error('Delete project error:', err);
      setProjectFeedback(`Failed to delete: ${err.message}`);
    }
  };

  const handleToggleProjectStatus = async (proj: FirestoreProject) => {
    const updatedStatus = proj.status === 'published' ? 'draft' : 'published';
    try {
      await saveProject({ ...proj, status: updatedStatus });
      await fetchProjects();
      await refreshProjects();
      setProjectFeedback(`Project status updated to ${updatedStatus}.`);
      setTimeout(() => setProjectFeedback(null), 2500);
    } catch (err: any) {
      console.error('Status toggle error:', err);
    }
  };

  const handleSeedProjects = async () => {
    if (!window.confirm('Import all curated Off-Plan projects into Firestore?')) return;
    try {
      setProjectFeedback('Seeding projects to Firestore...');
      const count = await seedInitialProjects();
      await fetchProjects();
      await refreshProjects();
      setProjectFeedback(`Successfully imported ${count} projects to Firestore.`);
      setTimeout(() => setProjectFeedback(null), 3500);
    } catch (err: any) {
      console.error('Seed projects error:', err);
      setProjectFeedback(`Seed failed: ${err.message}`);
    }
  };

  // Planning Page Operations
  const handleOpenNewPlan = () => {
    setEditingPlan({
      title: '',
      category: 'Developer Strategy',
      status: 'planning',
      priority: 'High',
      targetDate: new Date().toISOString().split('T')[0],
      content: '',
    });
    setIsPlanModalOpen(true);
  };

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan || !editingPlan.title.trim()) return;

    try {
      setPlanFeedback('Saving planning page...');
      await savePlanningPage(editingPlan);
      await fetchPlanning();
      setIsPlanModalOpen(false);
      setEditingPlan(null);
      setPlanFeedback('Planning page saved.');
      setTimeout(() => setPlanFeedback(null), 3000);
    } catch (err: any) {
      console.error('Save plan error:', err);
      setPlanFeedback(`Failed to save: ${err.message}`);
    }
  };

  const handleDeletePlan = async (id?: string) => {
    if (!id) return;
    if (!window.confirm('Delete this confidential planning item?')) return;
    try {
      setPlanFeedback('Deleting plan item...');
      await deletePlanningPage(id);
      await fetchPlanning();
      setPlanFeedback('Planning item deleted.');
      setTimeout(() => setPlanFeedback(null), 3000);
    } catch (err: any) {
      console.error('Delete plan error:', err);
      setPlanFeedback(`Failed: ${err.message}`);
    }
  };

  // ==========================================
  // HIDDEN LANDING PAGES OPERATIONS
  // ==========================================
  const handleOpenNewLanding = () => {
    const timestamp = Date.now().toString().slice(-4);
    setEditingLanding({
      slug: `exclusive-launch-${timestamp}`,
      title: 'Private Investor Allocation: Dubai Waterfront Residences',
      badge: 'Private VIP Allocation',
      tagline: 'Exclusive Off-Market Residences with Guaranteed Capital Appreciation',
      heroHeadline: 'Direct Waterfront Residences in Prime Dubai Enclave',
      heroSubheadline: 'Ultra-prime freehold residences starting from AED 8,500,000 ($2.31M). Bespoke 70/30 investor payment terms with 10-Year UAE Golden Visa Included.',
      heroImage: DUBAI_IMAGE_PRESETS[1].url,
      developer: 'Emaar Properties & Select Group',
      location: 'Dubai Marina & Palm Gateway',
      priceAED: 8500000,
      priceUSD: 2315000,
      paymentPlan: '70/30 (2 Years Post-Handover)',
      handover: 'Q4 2027',
      roiEstimate: '9.8% Projected Net Yield',
      status: 'published',
      highlights: [
        'Private beach & private yacht mooring access',
        '100% foreign freehold ownership & 0% tax framework',
        'Complimentary 10-Year UAE Golden Visa investor advisory',
        'Direct infinity pool and state-of-the-art wellness facility'
      ],
      description: 'An exceptional limited allocation of off-market residences situated in one of Dubai’s most desirable waterfront enclaves. Offered on a confidential basis to registered high-net-worth investors and family offices.',
      ctaButtonText: 'Request VIP Allocation Dossier',
      whatsAppNumber: '+971 4 000 0000',
    });
    setIsLandingModalOpen(true);
  };

  const handleSaveLanding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLanding || !editingLanding.title.trim() || !editingLanding.slug.trim()) return;

    try {
      setLandingFeedback('Saving landing page to Firestore...');
      await saveLandingPage(editingLanding);
      await fetchLandingPages();
      setIsLandingModalOpen(false);
      setEditingLanding(null);
      setLandingFeedback('Landing page saved successfully.');
      setTimeout(() => setLandingFeedback(null), 3000);
    } catch (err: any) {
      console.error('Save landing page error:', err);
      setLandingFeedback(`Failed to save: ${err.message || 'Error'}`);
    }
  };

  const handleDeleteLanding = async (id?: string) => {
    if (!id) return;
    if (!window.confirm('Delete this hidden landing page? Existing campaign links will stop working.')) return;
    try {
      setLandingFeedback('Deleting landing page...');
      await deleteLandingPage(id);
      await fetchLandingPages();
      setLandingFeedback('Landing page removed.');
      setTimeout(() => setLandingFeedback(null), 3000);
    } catch (err: any) {
      console.error('Delete landing page error:', err);
      setLandingFeedback(`Failed to delete: ${err.message}`);
    }
  };

  const handleToggleLandingStatus = async (page: LandingPageItem) => {
    const updatedStatus = page.status === 'published' ? 'draft' : 'published';
    try {
      await saveLandingPage({ ...page, status: updatedStatus });
      await fetchLandingPages();
      setLandingFeedback(`Landing page status switched to ${updatedStatus}.`);
      setTimeout(() => setLandingFeedback(null), 2500);
    } catch (err: any) {
      console.error('Status toggle error:', err);
    }
  };

  const handleSeedLandingPages = async () => {
    if (!window.confirm('Seed curated Dubai campaign landing page templates to Firestore?')) return;
    try {
      setLandingFeedback('Seeding landing pages...');
      const count = await seedInitialLandingPages();
      await fetchLandingPages();
      setLandingFeedback(`Successfully seeded ${count} landing pages to Firestore.`);
      setTimeout(() => setLandingFeedback(null), 3500);
    } catch (err: any) {
      console.error('Seed landing pages error:', err);
      setLandingFeedback(`Seed failed: ${err.message}`);
    }
  };

  const handleCopySecretLink = (slug: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const fullUrl = `${origin}/landing/${slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopiedSlug(slug);
      setLandingFeedback(`Secret link copied to clipboard: ${fullUrl}`);
      setTimeout(() => {
        setCopiedSlug(null);
        setLandingFeedback(null);
      }, 3500);
    }
  };

  const handleDeleteLead = async (leadId?: string) => {
    if (!leadId) return;
    if (!window.confirm('Delete this investor inquiry lead?')) return;
    try {
      await deleteLandingLead(leadId);
      await fetchLandingLeads();
      setLandingFeedback('Lead inquiry removed.');
      setTimeout(() => setLandingFeedback(null), 2500);
    } catch (err: any) {
      console.error('Delete lead error:', err);
    }
  };

  // 1. Loading Authentication State
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#07090E] flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-[#CFA55A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#CFA55A]">Verifying Admin Credentials...</p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated State (Restricted Login Page)
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#07090E] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-jakarta selection:bg-[#CFA55A]/30 selection:text-white">
        {/* Top Header */}
        <div className="flex items-center justify-between max-w-6xl mx-auto w-full pt-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#CFA55A]/10 border border-[#CFA55A]/30 flex items-center justify-center">
              <JamokaLogo className="w-6 h-6 text-[#CFA55A]" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-white block">
                JAMOKA PROPERTIES
              </span>
              <span className="text-[10px] tracking-wider text-[#CFA55A]">
                ADMIN MANAGEMENT PORTAL
              </span>
            </div>
          </div>

          <button
            onClick={onExit}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Site</span>
          </button>
        </div>

        {/* Center Login Box */}
        <div className="w-full max-w-md mx-auto my-12 bg-[#0C101A] border border-[#CFA55A]/20 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#CFA55A]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-8 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#CFA55A]/10 border border-[#CFA55A]/30 flex items-center justify-center mx-auto mb-3 text-[#CFA55A]">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold font-caughe tracking-wide text-white">
              Executive Admin Access
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Sign in to manage blogs, off-plan projects, and confidential planning pages.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex rounded-lg bg-black/40 p-1 mb-4 border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setAuthError(null);
              }}
              className={`flex-1 py-1.5 rounded-md font-medium transition-all ${
                authMode === 'signin'
                  ? 'bg-[#CFA55A] text-black font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setAuthError(null);
              }}
              className={`flex-1 py-1.5 rounded-md font-medium transition-all ${
                authMode === 'signup'
                  ? 'bg-[#CFA55A] text-black font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account (Set Password)
            </button>
          </div>

          <div className="mb-5 p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 text-[#CFA55A] font-semibold uppercase tracking-wider text-[10px]">
              <Sparkles className="w-3 h-3" />
              <span>Admin Credentials Notice</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              There is no default or hardcoded password. If this is your first time:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-0.5 pl-0.5">
              <li>Click <strong className="text-white">Create Account</strong> above, enter your email and set your own secure password.</li>
              <li>Or click <strong className="text-white">Sign in with Google</strong> below for 1-click access.</li>
            </ul>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{authError}</span>
            </div>
          )}

          {authSuccessMsg && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{authSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 tracking-wider uppercase">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="imr.desk@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-sm outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 tracking-wider uppercase">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-sm outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#CFA55A] via-[#dfb86e] to-[#CFA55A] hover:opacity-95 text-black font-bold text-xs tracking-widest uppercase transition-all shadow-lg shadow-[#CFA55A]/20 cursor-pointer"
            >
              {authMode === 'signin' ? 'Unlock Admin Portal' : 'Register Admin Account'}
            </button>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <span className="relative bg-[#0C101A] px-3 text-[10px] uppercase tracking-widest text-slate-500">
                Or Continue With
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#CFA55A]" />
            <span>Connected to Firebase: neon-quartet-h8f9p</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[11px] text-slate-600 pb-2">
          Jamoka Properties LLC • Confidential Internal Management System
        </div>
      </div>
    );
  }

  // Filtered views
  const filteredBlogs = blogs.filter((b) =>
    blogSearch ? b.title.toLowerCase().includes(blogSearch.toLowerCase()) || b.category.toLowerCase().includes(blogSearch.toLowerCase()) : true
  );

  const filteredProjects = projects.filter((p) =>
    projectSearch
      ? p.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.developer.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.enclave.toLowerCase().includes(projectSearch.toLowerCase())
      : true
  );

  const filteredLanding = landingPages.filter((p) =>
    landingSearch
      ? p.title.toLowerCase().includes(landingSearch.toLowerCase()) ||
        p.slug.toLowerCase().includes(landingSearch.toLowerCase()) ||
        p.developer.toLowerCase().includes(landingSearch.toLowerCase()) ||
        p.badge.toLowerCase().includes(landingSearch.toLowerCase())
      : true
  );

  // 3. Authenticated State: Full Luxury Admin Management Console
  return (
    <div className="min-h-screen bg-[#07090E] text-white flex flex-col font-jakarta selection:bg-[#CFA55A]/30 selection:text-white">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0D15]/95 backdrop-blur-md border-b border-[#CFA55A]/20 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#CFA55A]/20 to-black border border-[#CFA55A]/40 flex items-center justify-center text-[#CFA55A]">
              <JamokaLogo className="w-5 h-5 text-[#CFA55A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-wider uppercase text-white font-caughe">
                  Jamoka Admin Suite
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold tracking-wider uppercase">
                  Connected
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Firestore DB: <code className="text-[#CFA55A] font-mono text-[10px]">ai-studio-jpnewsite-...</code>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
              <UserIcon className="w-3.5 h-3.5 text-[#CFA55A]" />
              <span className="font-mono text-[11px]">{currentUser.email || 'Admin User'}</span>
            </div>

            <button
              onClick={onExit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </button>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-semibold text-rose-300 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto flex items-center gap-2 mt-4 pt-2 border-t border-white/5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
              activeTab === 'blogs'
                ? 'bg-[#CFA55A] text-black shadow-lg shadow-[#CFA55A]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Blogs CMS ({blogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-[#CFA55A] text-black shadow-lg shadow-[#CFA55A]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Projects & Listings ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('landing')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
              activeTab === 'landing'
                ? 'bg-[#CFA55A] text-black shadow-lg shadow-[#CFA55A]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Hidden Landing Pages ({landingPages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('planning')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
              activeTab === 'planning'
                ? 'bg-[#CFA55A] text-black shadow-lg shadow-[#CFA55A]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Confidential Planning ({planningItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
              activeTab === 'system'
                ? 'bg-[#CFA55A] text-black shadow-lg shadow-[#CFA55A]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Database Status</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        {/* ========================================================
            TAB 1: BLOGS CMS
        ======================================================== */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0D111C] border border-white/5 p-5 rounded-2xl">
              <div>
                <h2 className="text-xl font-bold font-caughe text-white flex items-center gap-2">
                  <span>Market Intelligence & Articles</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#CFA55A]/10 text-[#CFA55A] border border-[#CFA55A]/30">
                    Live Sync with /blogs
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Published articles appear instantly on the public website. Drafts stay strictly hidden.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleSeedBlogs}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Import the 5 curated sample blogs into Firestore"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#CFA55A]" />
                  <span>Seed Initial Sample Blogs</span>
                </button>

                <button
                  onClick={handleOpenNewBlog}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#CFA55A] to-[#dfb86e] text-black text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg shadow-[#CFA55A]/20 hover:opacity-95 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Article</span>
                </button>
              </div>
            </div>

            {blogFeedback && (
              <div className="p-3 rounded-xl bg-[#CFA55A]/10 border border-[#CFA55A]/30 text-[#CFA55A] text-xs flex items-center gap-2 animate-fadeIn">
                <Sparkles className="w-4 h-4" />
                <span>{blogFeedback}</span>
              </div>
            )}

            {/* Filter & Search Bar */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles by title or category..."
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0D111C] border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                />
              </div>
              <button
                onClick={fetchBlogs}
                className="px-3 py-2 rounded-xl bg-[#0D111C] border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Refresh list"
              >
                <RefreshCw className={`w-4 h-4 ${loadingBlogs ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Articles Table / Cards */}
            {loadingBlogs ? (
              <div className="text-center py-16 text-slate-400 text-xs">
                <div className="w-8 h-8 border-2 border-[#CFA55A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                Loading blogs from Firestore...
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-16 bg-[#0D111C] border border-white/5 rounded-2xl">
                <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-300 font-semibold">No articles found</p>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Click "New Article" to write your first post or "Seed Initial Sample Blogs" to import the 5 curated Dubai articles.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-[#0D111C] border border-white/10 hover:border-[#CFA55A]/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative h-44 w-full overflow-hidden bg-black/50">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                              blog.status === 'published'
                                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                                : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                            }`}
                          >
                            {blog.status}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-slate-300">
                            {blog.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#CFA55A]" />
                            {blog.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#CFA55A]" />
                            {blog.readTime}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white line-clamp-2 leading-snug">
                          {blog.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {blog.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="p-4 pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleBlogStatus(blog)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition-colors cursor-pointer ${
                          blog.status === 'published'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                        }`}
                        title="Toggle status"
                      >
                        {blog.status === 'published' ? 'Switch to Draft' : 'Publish to Live'}
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingBlog(blog);
                            setIsBlogModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit article"
                        >
                          <FileText className="w-4 h-4 text-[#CFA55A]" />
                        </button>

                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition-colors cursor-pointer"
                          title="Delete article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 2: PROJECTS & LISTINGS CMS
        ======================================================== */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0D111C] border border-white/5 p-5 rounded-2xl">
              <div>
                <h2 className="text-xl font-bold font-caughe text-white flex items-center gap-2">
                  <span>Off-Plan Projects Catalog</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#CFA55A]/10 text-[#CFA55A] border border-[#CFA55A]/30">
                    Live Sync across Site
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage ultra-luxury project allocations, prices, payment plans, and handover schedules.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleSeedProjects}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Import default curated projects into Firestore"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#CFA55A]" />
                  <span>Seed Initial Projects</span>
                </button>

                <button
                  onClick={handleOpenNewProject}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#CFA55A] to-[#dfb86e] text-black text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg shadow-[#CFA55A]/20 hover:opacity-95 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>
            </div>

            {projectFeedback && (
              <div className="p-3 rounded-xl bg-[#CFA55A]/10 border border-[#CFA55A]/30 text-[#CFA55A] text-xs flex items-center gap-2 animate-fadeIn">
                <Sparkles className="w-4 h-4" />
                <span>{projectFeedback}</span>
              </div>
            )}

            {/* Filter & Search Bar */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by project name, developer, or enclave..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0D111C] border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                />
              </div>
              <button
                onClick={fetchProjects}
                className="px-3 py-2 rounded-xl bg-[#0D111C] border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Refresh projects"
              >
                <RefreshCw className={`w-4 h-4 ${loadingProjects ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Projects Grid */}
            {loadingProjects ? (
              <div className="text-center py-16 text-slate-400 text-xs">
                <div className="w-8 h-8 border-2 border-[#CFA55A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                Loading projects from Firestore...
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-16 bg-[#0D111C] border border-white/5 rounded-2xl">
                <Building2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-300 font-semibold">No project listings found</p>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Click "Add Project" to create a new development or "Seed Initial Projects" to load the curated database.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-[#0D111C] border border-white/10 hover:border-[#CFA55A]/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative h-44 w-full overflow-hidden bg-black/50">
                        <img
                          src={proj.image || proj.coverImage}
                          alt={proj.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                              proj.status === 'published'
                                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                                : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                            }`}
                          >
                            {proj.status}
                          </span>
                          {proj.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-[#CFA55A]/20 border border-[#CFA55A]/40 text-[#CFA55A] text-[10px] font-bold">
                              {proj.badge}
                            </span>
                          )}
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs bg-black/70 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
                          <span className="text-[#CFA55A] font-bold">
                            AED {(proj.priceAED || 0).toLocaleString()}
                          </span>
                          <span className="text-slate-300 text-[11px]">${(proj.priceUSD || 0).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-semibold text-white">{proj.developer}</span>
                          <span>{proj.enclave}</span>
                        </div>
                        <h3 className="text-base font-bold text-white line-clamp-1">{proj.name}</h3>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {proj.description || proj.tagline}
                        </p>
                        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/5">
                          <span>Plan: {proj.paymentPlan}</span>
                          <span>Handover: {proj.handover}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="p-4 pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleProjectStatus(proj)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition-colors cursor-pointer ${
                          proj.status === 'published'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                        }`}
                        title="Toggle status"
                      >
                        {proj.status === 'published' ? 'Switch to Draft' : 'Publish Live'}
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingProject(proj);
                            setIsProjectModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit project"
                        >
                          <FileText className="w-4 h-4 text-[#CFA55A]" />
                        </button>

                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition-colors cursor-pointer"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB: HIDDEN CAMPAIGN LANDING PAGES
        ======================================================== */}
        {activeTab === 'landing' && (
          <div className="space-y-6">
            {/* Top Overview Banner */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0D111C] border border-white/5 p-5 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#CFA55A]/5 rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold font-caughe text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#CFA55A]" />
                    <span>Hidden Campaign Landing Pages</span>
                  </h2>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Strictly Hidden from Public Menus
                  </span>
                </div>
                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                  Dedicated high-converting investor landing pages kept completely hidden from main website navigation and sitemaps. Create unlimited landing pages for private family offices, VIP allocations, or ad campaigns.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap relative z-10">
                <button
                  onClick={() => setIsLeadsModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5 text-[#CFA55A]" />
                  <span>View Leads ({landingLeads.length})</span>
                </button>

                <button
                  onClick={handleSeedLandingPages}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Import default curated templates into Firestore"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#CFA55A]" />
                  <span>Seed Dubai Templates</span>
                </button>

                <button
                  onClick={handleOpenNewLanding}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#CFA55A] to-[#dfb86e] text-black text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg shadow-[#CFA55A]/20 hover:opacity-95 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Landing Page</span>
                </button>
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-[#0D111C] border border-white/5">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold mb-1">
                  Total Landers
                </span>
                <span className="text-xl font-bold text-white font-mono">{landingPages.length}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Campaigns</span>
              </div>

              <div className="p-4 rounded-xl bg-[#0D111C] border border-white/5">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold mb-1">
                  Published & Active
                </span>
                <span className="text-xl font-bold text-emerald-400 font-mono">
                  {landingPages.filter((p) => p.status === 'published').length}
                </span>
                <span className="text-[10px] text-emerald-500/80 block mt-0.5">Accessible via Link</span>
              </div>

              <div className="p-4 rounded-xl bg-[#0D111C] border border-white/5">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold mb-1">
                  Draft / Private
                </span>
                <span className="text-xl font-bold text-amber-400 font-mono">
                  {landingPages.filter((p) => p.status === 'draft').length}
                </span>
                <span className="text-[10px] text-amber-500/80 block mt-0.5">Admin Preview Only</span>
              </div>

              <div
                onClick={() => setIsLeadsModalOpen(true)}
                className="p-4 rounded-xl bg-[#0D111C] border border-white/5 hover:border-[#CFA55A]/30 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-[#CFA55A] block font-semibold mb-1">
                    Leads Captured
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#CFA55A]" />
                </div>
                <span className="text-xl font-bold text-[#CFA55A] font-mono">{landingLeads.length}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Click to view inquiries</span>
              </div>
            </div>

            {landingFeedback && (
              <div className="p-3 rounded-xl bg-[#CFA55A]/10 border border-[#CFA55A]/30 text-[#CFA55A] text-xs flex items-center gap-2 animate-fadeIn">
                <Sparkles className="w-4 h-4" />
                <span>{landingFeedback}</span>
              </div>
            )}

            {/* Search & Refresh Bar */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search landing pages by title, slug, developer, or badge..."
                  value={landingSearch}
                  onChange={(e) => setLandingSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0D111C] border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                />
              </div>
              <button
                onClick={fetchLandingPages}
                className="px-3 py-2 rounded-xl bg-[#0D111C] border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Refresh landing pages"
              >
                <RefreshCw className={`w-4 h-4 ${loadingLanding ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Landing Pages List */}
            {loadingLanding ? (
              <div className="text-center py-16 text-slate-400 text-xs">
                <div className="w-8 h-8 border-2 border-[#CFA55A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                Loading landing pages from Firestore...
              </div>
            ) : filteredLanding.length === 0 ? (
              <div className="text-center py-16 bg-[#0D111C] border border-white/5 rounded-2xl space-y-3">
                <Globe className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-sm text-slate-300 font-semibold">No landing pages found</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Create a new hidden landing page for ad campaigns, or click below to seed curated templates.
                </p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={handleSeedLandingPages}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300"
                  >
                    Seed Templates
                  </button>
                  <button
                    onClick={handleOpenNewLanding}
                    className="px-4 py-2 rounded-xl bg-[#CFA55A] text-black text-xs font-bold"
                  >
                    + Create First Landing Page
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredLanding.map((page) => (
                  <div
                    key={page.id || page.slug}
                    className="bg-[#0D111C] border border-white/5 hover:border-[#CFA55A]/30 rounded-2xl overflow-hidden transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview & Header */}
                      <div className="relative h-44 w-full overflow-hidden bg-black/40">
                        <img
                          src={page.heroImage}
                          alt={page.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D111C] via-black/40 to-transparent" />

                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-wider uppercase text-[#CFA55A]">
                            {page.badge || 'Private Allocation'}
                          </span>

                          <button
                            onClick={() => handleToggleLandingStatus(page)}
                            className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider border cursor-pointer transition-colors ${
                              page.status === 'published'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30'
                            }`}
                            title="Click to toggle status"
                          >
                            {page.status === 'published' ? '● Published' : '○ Draft'}
                          </button>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-300 flex items-center justify-between">
                          <span className="flex items-center gap-1 text-[11px] text-slate-300">
                            <MapPin className="w-3 h-3 text-[#CFA55A]" />
                            {page.location}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {page.developer}
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-5 space-y-3">
                        <h3 className="text-base font-bold font-caughe text-white line-clamp-1">
                          {page.title}
                        </h3>

                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {page.heroSubheadline || page.description}
                        </p>

                        {/* Secret Link Bar with 1-Click Copy */}
                        <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 overflow-hidden text-xs">
                            <Lock className="w-3.5 h-3.5 text-[#CFA55A] shrink-0" />
                            <span className="font-mono text-[11px] text-slate-300 truncate">
                              /landing/{page.slug}
                            </span>
                          </div>

                          <button
                            onClick={() => handleCopySecretLink(page.slug)}
                            className="px-2.5 py-1 rounded-md bg-[#CFA55A]/10 hover:bg-[#CFA55A]/20 border border-[#CFA55A]/30 text-[10px] font-bold text-[#CFA55A] flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                            title="Copy secret link for ads & private clients"
                          >
                            {copiedSlug === page.slug ? (
                              <>
                                <CheckCheck className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Link</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Key Indicators */}
                        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                          <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                            <span className="text-[9px] uppercase tracking-wider text-slate-500 block">
                              From
                            </span>
                            <span className="text-xs font-bold text-white font-mono">
                              AED {(page.priceAED / 1000000).toFixed(1)}M
                            </span>
                          </div>

                          <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                            <span className="text-[9px] uppercase tracking-wider text-slate-500 block">
                              Handover
                            </span>
                            <span className="text-xs font-bold text-slate-200">
                              {page.handover || '2027'}
                            </span>
                          </div>

                          <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                            <span className="text-[9px] uppercase tracking-wider text-slate-500 block">
                              Target ROI
                            </span>
                            <span className="text-xs font-bold text-[#CFA55A]">
                              {page.roiEstimate || '9.5%'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="p-4 border-t border-white/5 flex items-center justify-between gap-2">
                      <a
                        href={`/landing/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#CFA55A]" />
                        <span>Preview Page</span>
                      </a>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingLanding(page);
                            setIsLandingModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#CFA55A]/20 border border-white/10 hover:border-[#CFA55A]/40 text-xs font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteLanding(page.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition-colors cursor-pointer"
                          title="Delete landing page"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 4: CONFIDENTIAL PLANNING PAGES
        ======================================================== */}
        {activeTab === 'planning' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0D111C] border border-white/5 p-5 rounded-2xl">
              <div>
                <h2 className="text-xl font-bold font-caughe text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#CFA55A]" />
                  <span>Confidential Planning & Internal Roadmap</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Private allocation memos, family office strategies, and launch roadmaps stored in encrypted Firestore collections (strictly admin-only).
                </p>
              </div>

              <button
                onClick={handleOpenNewPlan}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#CFA55A] to-[#dfb86e] text-black text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg shadow-[#CFA55A]/20 hover:opacity-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>New Strategy Note</span>
              </button>
            </div>

            {planFeedback && (
              <div className="p-3 rounded-xl bg-[#CFA55A]/10 border border-[#CFA55A]/30 text-[#CFA55A] text-xs flex items-center gap-2 animate-fadeIn">
                <Sparkles className="w-4 h-4" />
                <span>{planFeedback}</span>
              </div>
            )}

            {/* Planning Items Grid */}
            {loadingPlanning ? (
              <div className="text-center py-16 text-slate-400 text-xs">
                <div className="w-8 h-8 border-2 border-[#CFA55A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                Loading planning items...
              </div>
            ) : planningItems.length === 0 ? (
              <div className="text-center py-16 bg-[#0D111C] border border-white/5 rounded-2xl">
                <Layers className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-300 font-semibold">No confidential planning items</p>
                <p className="text-xs text-slate-500 mt-1">Click "New Strategy Note" to add internal roadmaps.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {planningItems.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-[#0D111C] border border-white/10 hover:border-[#CFA55A]/40 rounded-2xl p-5 flex flex-col justify-between transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#CFA55A]/10 border border-[#CFA55A]/30 text-[#CFA55A] text-[10px] font-bold uppercase tracking-wider">
                          {plan.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              plan.priority === 'High'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            }`}
                          >
                            {plan.priority || 'Medium'} Priority
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] uppercase">
                            {plan.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-white">{plan.title}</h3>
                      <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5 font-mono text-[11px]">
                        {plan.content}
                      </p>

                      {plan.targetDate && (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-[#CFA55A]" />
                          <span>Target Milestone: {plan.targetDate}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingPlan(plan);
                          setIsPlanModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePlan(plan.id)}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-xs text-rose-300 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 4: SYSTEM & FIREBASE STATUS
        ======================================================== */}
        {activeTab === 'system' && (
          <div className="space-y-6 max-w-4xl">
            <div className="bg-[#0D111C] border border-white/10 rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold font-caughe text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#CFA55A]" />
                  <span>Firebase Backend Infrastructure</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Active cloud parameters, Firestore database details, and authentication scope.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                    Firebase Project ID
                  </span>
                  <span className="text-sm font-mono text-emerald-400 font-bold">neon-quartet-h8f9p</span>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                    Firestore Database ID
                  </span>
                  <span className="text-sm font-mono text-[#CFA55A] font-bold">
                    ai-studio-jpnewsite-6b3b0414-0301-4332-b32c-9dc9a75543b9
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                    App Client ID
                  </span>
                  <span className="text-xs font-mono text-slate-300">
                    1:778860187860:web:cae45efa4a4c5dea8b2b41
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                    Active Admin Session
                  </span>
                  <span className="text-xs font-mono text-white font-medium">
                    {currentUser?.email || 'Authenticated'}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
                <div className="flex items-center gap-2 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Firestore Rules Status: Active & Deployed</span>
                </div>
                <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                  Rules enforce public read on published blogs & projects, while write/delete permissions and confidential planning pages are strictly guarded by Firebase Authentication.
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleSeedBlogs}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#CFA55A]" />
                  <span>Sync / Re-seed Blogs</span>
                </button>

                <button
                  onClick={handleSeedProjects}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#CFA55A]" />
                  <span>Sync / Re-seed Projects</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================
          MODAL: EDIT BLOG POST
      ======================================================== */}
      {isBlogModalOpen && editingBlog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0C101A] border border-[#CFA55A]/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold font-caughe text-white">
                  {editingBlog.id ? 'Edit Article' : 'Write New Article'}
                </h3>
                <span className="text-xs text-slate-400">
                  Manage content and live publication status
                </span>
              </div>
              <button
                onClick={() => setIsBlogModalOpen(false)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingBlog.title}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  placeholder="e.g. Dubai Waterfront Property Boom: 2026 Yield Analysis"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={editingBlog.category}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  >
                    <option value="Market Trends">Market Trends</option>
                    <option value="Investment Analysis">Investment Analysis</option>
                    <option value="Lifestyle & Living">Lifestyle & Living</option>
                    <option value="Regulatory & Visas">Regulatory & Visas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Publication Status
                  </label>
                  <select
                    value={editingBlog.status}
                    onChange={(e) =>
                      setEditingBlog({ ...editingBlog, status: e.target.value as 'published' | 'draft' })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  >
                    <option value="published">Published (Visible on site)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={editingBlog.readTime}
                    onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Author / Byline
                  </label>
                  <input
                    type="text"
                    value={editingBlog.author || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                    placeholder="e.g. Jamoka Editorial Advisory"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={editingBlog.image}
                  onChange={(e) => setEditingBlog({ ...editingBlog, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none font-mono"
                />

                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-400">Quick Presets:</span>
                  {DUBAI_IMAGE_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setEditingBlog({ ...editingBlog, image: preset.url })}
                      className="px-2 py-0.5 rounded bg-white/5 hover:bg-[#CFA55A]/20 border border-white/10 hover:border-[#CFA55A]/40 text-[10px] text-slate-300 transition-colors"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                  Summary Excerpt *
                </label>
                <textarea
                  required
                  rows={2}
                  value={editingBlog.excerpt}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  placeholder="Brief 1-2 sentence teaser shown on blog cards..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                  Full Article Body (Markdown or Text) *
                </label>
                <textarea
                  required
                  rows={8}
                  value={editingBlog.content}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  placeholder="Write the full in-depth market intelligence article here..."
                  className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none leading-relaxed font-mono"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#CFA55A] to-[#dfb86e] text-black font-bold tracking-wider uppercase shadow-lg shadow-[#CFA55A]/20 hover:opacity-95 transition-all cursor-pointer"
                >
                  Save & Sync to Firestore
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: EDIT PROJECT LISTING
      ======================================================== */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0C101A] border border-[#CFA55A]/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold font-caughe text-white">
                  {editingProject.id ? 'Edit Off-Plan Project' : 'Add New Off-Plan Project'}
                </h3>
                <span className="text-xs text-slate-400">
                  Update pricing, payment framework, and visual renders
                </span>
              </div>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.name}
                    onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                    placeholder="e.g. Palm Flower by Foster+Partners"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Developer *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.developer}
                    onChange={(e) => setEditingProject({ ...editingProject, developer: e.target.value })}
                    placeholder="e.g. Omniyat / Emaar / Meraas"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Enclave / Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.enclave}
                    onChange={(e) => setEditingProject({ ...editingProject, enclave: e.target.value })}
                    placeholder="e.g. Palm Jumeirah, Downtown, DIFC"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    value={editingProject.status}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, status: e.target.value as 'published' | 'draft' })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  >
                    <option value="published">Published (Live on site)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Price in AED *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProject.priceAED}
                    onChange={(e) => {
                      const aed = Number(e.target.value);
                      setEditingProject({
                        ...editingProject,
                        priceAED: aed,
                        priceUSD: Math.round(aed / 3.6725),
                      });
                    }}
                    placeholder="3500000"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Price in USD (auto-computed)
                  </label>
                  <input
                    type="number"
                    value={editingProject.priceUSD}
                    onChange={(e) => setEditingProject({ ...editingProject, priceUSD: Number(e.target.value) })}
                    placeholder="953000"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Payment Plan
                  </label>
                  <input
                    type="text"
                    value={editingProject.paymentPlan}
                    onChange={(e) => setEditingProject({ ...editingProject, paymentPlan: e.target.value })}
                    placeholder="80/20 Payment Framework"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Handover Horizon
                  </label>
                  <input
                    type="text"
                    value={editingProject.handover}
                    onChange={(e) => setEditingProject({ ...editingProject, handover: e.target.value })}
                    placeholder="Q4 2027"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Bedrooms / Layouts
                  </label>
                  <input
                    type="text"
                    value={editingProject.bedrooms}
                    onChange={(e) => setEditingProject({ ...editingProject, bedrooms: e.target.value })}
                    placeholder="1, 2, 3 & 4 BR"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                  Render / Hero Image URL
                </label>
                <input
                  type="url"
                  value={editingProject.image || ''}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      image: e.target.value,
                      coverImage: e.target.value,
                    })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none font-mono"
                />

                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-400">Presets:</span>
                  {DUBAI_IMAGE_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() =>
                        setEditingProject({
                          ...editingProject,
                          image: preset.url,
                          coverImage: preset.url,
                        })
                      }
                      className="px-2 py-0.5 rounded bg-white/5 hover:bg-[#CFA55A]/20 border border-white/10 hover:border-[#CFA55A]/40 text-[10px] text-slate-300 transition-colors"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                  Project Description & Highlights
                </label>
                <textarea
                  rows={3}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Bespoke architectural details, private elevators, concierge and investment ROI profile..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#CFA55A] to-[#dfb86e] text-black font-bold tracking-wider uppercase shadow-lg shadow-[#CFA55A]/20 hover:opacity-95 transition-all cursor-pointer"
                >
                  Save & Publish to Site
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: EDIT PLANNING ITEM
      ======================================================== */}
      {isPlanModalOpen && editingPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0C101A] border border-[#CFA55A]/30 rounded-2xl w-full max-w-xl p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold font-caughe text-white">
                  {editingPlan.id ? 'Edit Confidential Strategy' : 'New Confidential Strategy Note'}
                </h3>
                <span className="text-xs text-slate-400">
                  Strictly encrypted in Firebase — never rendered publicly
                </span>
              </div>
              <button
                onClick={() => setIsPlanModalOpen(false)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePlan} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingPlan.title}
                  onChange={(e) => setEditingPlan({ ...editingPlan, title: e.target.value })}
                  placeholder="e.g. Q4 Family Office Dubai Roadshow Strategy"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={editingPlan.category}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, category: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  >
                    <option value="Developer Strategy">Developer Strategy</option>
                    <option value="Private Allocation">Private Allocation</option>
                    <option value="Roadmap">Roadmap</option>
                    <option value="Campaign">Campaign</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Priority
                  </label>
                  <select
                    value={editingPlan.priority}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, priority: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    value={editingPlan.status}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, status: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  >
                    <option value="planning">Planning</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="on_hold">On Hold</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={editingPlan.targetDate || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, targetDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                  Confidential Notes & Action Items *
                </label>
                <textarea
                  required
                  rows={5}
                  value={editingPlan.content}
                  onChange={(e) => setEditingPlan({ ...editingPlan, content: e.target.value })}
                  placeholder="Outline internal goals, key investor profiles, terms, and timelines..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none font-mono leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlanModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#CFA55A] to-[#dfb86e] text-black font-bold tracking-wider uppercase shadow-lg shadow-[#CFA55A]/20 hover:opacity-95 transition-all cursor-pointer"
                >
                  Save to Secure Firestore
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: EDIT / CREATE LANDING PAGE
      ======================================================== */}
      {isLandingModalOpen && editingLanding && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0C101A] border border-[#CFA55A]/30 rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold font-caughe text-white">
                    {editingLanding.id ? 'Edit Landing Page' : 'Create New Hidden Landing Page'}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-[#CFA55A]/20 text-[#CFA55A] border border-[#CFA55A]/30">
                    Hidden Campaign
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  Custom conversion-optimized lander for private client allocation or targeted ads
                </span>
              </div>
              <button
                onClick={() => setIsLandingModalOpen(false)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLanding} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Internal Campaign Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingLanding.title}
                    onChange={(e) => setEditingLanding({ ...editingLanding, title: e.target.value })}
                    placeholder="e.g. Palm Jumeirah Ultra-Luxury Waterfront Mansions"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Secret URL Slug * (e.g. /landing/palm-vip)
                  </label>
                  <div className="flex items-center">
                    <span className="px-2.5 py-2.5 rounded-l-xl bg-black/80 border border-r-0 border-white/10 text-slate-500 font-mono text-[11px]">
                      /landing/
                    </span>
                    <input
                      type="text"
                      required
                      value={editingLanding.slug}
                      onChange={(e) =>
                        setEditingLanding({
                          ...editingLanding,
                          slug: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
                        })
                      }
                      placeholder="palm-residences-vip"
                      className="w-full px-3 py-2.5 rounded-r-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs font-mono outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Publication Status
                  </label>
                  <select
                    value={editingLanding.status}
                    onChange={(e) =>
                      setEditingLanding({
                        ...editingLanding,
                        status: e.target.value as 'published' | 'draft',
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  >
                    <option value="published">Published (Live via Secret Link)</option>
                    <option value="draft">Draft (Restricted to Admin Preview)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Badge Callout
                  </label>
                  <input
                    type="text"
                    value={editingLanding.badge}
                    onChange={(e) => setEditingLanding({ ...editingLanding, badge: e.target.value })}
                    placeholder="e.g. Private VIP Allocation"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Target Audience / Campaign
                  </label>
                  <input
                    type="text"
                    value={editingLanding.targetAudience || ''}
                    onChange={(e) =>
                      setEditingLanding({ ...editingLanding, targetAudience: e.target.value })
                    }
                    placeholder="e.g. UK Family Offices & Meta Ads"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                  Hero Headline *
                </label>
                <input
                  type="text"
                  required
                  value={editingLanding.heroHeadline}
                  onChange={(e) =>
                    setEditingLanding({ ...editingLanding, heroHeadline: e.target.value })
                  }
                  placeholder="e.g. Direct Waterfront Mansions on Palm Jumeirah"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs font-semibold outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                  Hero Subheadline
                </label>
                <textarea
                  rows={2}
                  value={editingLanding.heroSubheadline}
                  onChange={(e) =>
                    setEditingLanding({ ...editingLanding, heroSubheadline: e.target.value })
                  }
                  placeholder="e.g. Ultra-prime residences starting from AED 18.5M ($5.03M). 60/40 Post-Handover Investor Framework with 10-Year UAE Golden Visa Included."
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none resize-none"
                />
              </div>

              {/* Developer & Financials */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Developer *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingLanding.developer}
                    onChange={(e) =>
                      setEditingLanding({ ...editingLanding, developer: e.target.value })
                    }
                    placeholder="e.g. Nakheel / Emaar"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Location Enclave *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingLanding.location}
                    onChange={(e) =>
                      setEditingLanding({ ...editingLanding, location: e.target.value })
                    }
                    placeholder="e.g. Palm Jumeirah, Dubai"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Starting AED *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingLanding.priceAED}
                    onChange={(e) => {
                      const aed = Number(e.target.value);
                      setEditingLanding({
                        ...editingLanding,
                        priceAED: aed,
                        priceUSD: Math.round(aed / 3.6725),
                      });
                    }}
                    placeholder="18500000"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Starting USD
                  </label>
                  <input
                    type="number"
                    value={editingLanding.priceUSD}
                    onChange={(e) =>
                      setEditingLanding({ ...editingLanding, priceUSD: Number(e.target.value) })
                    }
                    placeholder="5035000"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Payment Plan
                  </label>
                  <input
                    type="text"
                    value={editingLanding.paymentPlan}
                    onChange={(e) =>
                      setEditingLanding({ ...editingLanding, paymentPlan: e.target.value })
                    }
                    placeholder="e.g. 60/40 Post-Handover (3 Yrs)"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Handover Schedule
                  </label>
                  <input
                    type="text"
                    value={editingLanding.handover}
                    onChange={(e) =>
                      setEditingLanding({ ...editingLanding, handover: e.target.value })
                    }
                    placeholder="e.g. Q4 2027"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Projected Net ROI
                  </label>
                  <input
                    type="text"
                    value={editingLanding.roiEstimate}
                    onChange={(e) =>
                      setEditingLanding({ ...editingLanding, roiEstimate: e.target.value })
                    }
                    placeholder="e.g. 10.4% Net Annual Yield"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                  Hero Image URL
                </label>
                <input
                  type="url"
                  value={editingLanding.heroImage}
                  onChange={(e) =>
                    setEditingLanding({ ...editingLanding, heroImage: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none font-mono"
                />

                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-400">Quick Presets:</span>
                  {DUBAI_IMAGE_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() =>
                        setEditingLanding({ ...editingLanding, heroImage: preset.url })
                      }
                      className="px-2 py-0.5 rounded bg-white/5 hover:bg-[#CFA55A]/20 border border-white/10 hover:border-[#CFA55A]/40 text-[10px] text-slate-300 transition-colors"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Highlights List */}
              <div>
                <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                  Key Investment Highlights (One per line)
                </label>
                <textarea
                  rows={3}
                  value={editingLanding.highlights.join('\n')}
                  onChange={(e) =>
                    setEditingLanding({
                      ...editingLanding,
                      highlights: e.target.value.split('\n').filter((h) => h.trim().length > 0),
                    })
                  }
                  placeholder="Private 40-meter beachfront access&#10;10-Year UAE Golden Visa Included&#10;0% Tax Haven Ownership"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                  Detailed Property Narrative & Investor Overview
                </label>
                <textarea
                  rows={4}
                  value={editingLanding.description}
                  onChange={(e) =>
                    setEditingLanding({ ...editingLanding, description: e.target.value })
                  }
                  placeholder="In-depth narrative describing the architecture, private amenities, and lifestyle privileges..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none leading-relaxed"
                />
              </div>

              {/* CTA & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    Primary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={editingLanding.ctaButtonText}
                    onChange={(e) =>
                      setEditingLanding({ ...editingLanding, ctaButtonText: e.target.value })
                    }
                    placeholder="e.g. Request VIP Allocation Dossier"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                    WhatsApp Desk Number
                  </label>
                  <input
                    type="text"
                    value={editingLanding.whatsAppNumber || ''}
                    onChange={(e) =>
                      setEditingLanding({ ...editingLanding, whatsAppNumber: e.target.value })
                    }
                    placeholder="+971 4 000 0000"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsLandingModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#CFA55A] to-[#dfb86e] text-black font-bold tracking-wider uppercase shadow-lg shadow-[#CFA55A]/20 hover:opacity-95 transition-all cursor-pointer"
                >
                  Save to Live Firestore
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: VIEW LANDING PAGE INQUIRIES & LEADS
      ======================================================== */}
      {isLeadsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0C101A] border border-[#CFA55A]/30 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold font-caughe text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#CFA55A]" />
                    <span>Landing Page Investor Leads</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                    {landingLeads.length} Captured Inquiries
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  Investor contacts submitted through your hidden campaign landing pages
                </span>
              </div>
              <button
                onClick={() => setIsLeadsModalOpen(false)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {loadingLeads ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                <div className="w-8 h-8 border-2 border-[#CFA55A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                Loading inquiries from Firestore...
              </div>
            ) : landingLeads.length === 0 ? (
              <div className="text-center py-12 bg-black/40 border border-white/5 rounded-xl space-y-2">
                <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold text-slate-300">No leads captured yet</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  When visitors submit the VIP allocation form on your hidden landing pages, their contact records will populate here in real-time.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {landingLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-[#CFA55A]/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{lead.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#CFA55A]/10 text-[#CFA55A] border border-[#CFA55A]/20">
                          {lead.budget || 'High Net Worth'}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-mono">
                          {lead.preferredLanguage}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                        <span className="font-mono text-emerald-400 font-semibold">{lead.phone}</span>
                        {lead.email && <span className="text-slate-400">{lead.email}</span>}
                        <span className="text-slate-400">
                          Source:{' '}
                          <code className="text-[#CFA55A] font-mono text-[11px]">
                            /landing/{lead.landingPageSlug}
                          </code>
                        </span>
                      </div>

                      {lead.notes && (
                        <p className="text-[11px] text-slate-400 bg-white/[0.02] p-2 rounded-lg mt-1 italic">
                          "{lead.notes}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat WhatsApp</span>
                      </a>

                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition-colors cursor-pointer"
                        title="Delete lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setIsLeadsModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
