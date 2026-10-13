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
} from 'lucide-react';
import { JamokaLogo } from '../components/Logos';

interface AdminPageProps {
  onExit: () => void;
}

type AdminTab = 'blogs' | 'projects' | 'planning' | 'system';

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
          <div className="flex rounded-lg bg-black/40 p-1 mb-6 border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setAuthError(null);
              }}
              className={`flex-1 py-1.5 rounded-md font-medium transition-all ${
                authMode === 'signin'
                  ? 'bg-[#CFA55A] text-black font-semibold'
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
                  ? 'bg-[#CFA55A] text-black font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
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
            TAB 3: CONFIDENTIAL PLANNING PAGES
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
    </div>
  );
};
