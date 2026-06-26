import React, { useState, useEffect } from 'react';
import { Sun, Moon, Database, Award, RefreshCw } from 'lucide-react';
import StatsGrid from './components/StatsGrid';
import MemberForm from './components/MemberForm';
import MemberList from './components/MemberList';
import ConfirmModal from './components/ConfirmModal';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function App() {
  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState({ activeMembers: 1243, revenue: 18700, signupsToday: 23 });
  
  // Custom Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Loading States
  const [loadingList, setLoadingList] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  
  // Theme State
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    // Default to dark mode for premium look
    return 'dark';
  });

  // Apply Theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fetch Dashboard Stats
  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  // Fetch Members List
  const fetchMembers = async () => {
    setLoadingList(true);
    try {
      // Map sortBy string to api query params
      let sortByField = 'createdAt';
      let sortOrderField = 'desc';

      if (sortBy === 'oldest') {
        sortOrderField = 'asc';
      } else if (sortBy === 'name-asc') {
        sortByField = 'name';
        sortOrderField = 'asc';
      } else if (sortBy === 'name-desc') {
        sortByField = 'name';
        sortOrderField = 'desc';
      }

      const params = new URLSearchParams({
        search: searchQuery,
        type: typeFilter,
        status: statusFilter,
        sortBy: sortByField,
        sortOrder: sortOrderField
      });

      const response = await fetch(`${BACKEND_URL}/api/members?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoadingList(false);
    }
  };

  // Load Initial Data
  useEffect(() => {
    fetchStats();
  }, []);

  // Fetch members when search, filter, or sorting changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchMembers();
    }, 200); // Small debounce to avoid hammering API on rapid keystrokes

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, typeFilter, statusFilter, sortBy]);

  // Handlers
  const handleMemberAdded = (newMember) => {
    // Re-fetch everything to ensure synced state and correct dynamic stats
    fetchMembers();
    fetchStats();
  };

  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!memberToDelete) return;
    const id = memberToDelete._id;
    setDeleteModalOpen(false);
    setDeletingId(id);
    try {
      const response = await fetch(`${BACKEND_URL}/api/members/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        // Update local list state instantly
        setMembers(prev => prev.filter(m => m._id !== id));
        // Re-fetch stats to reflect decrement
        fetchStats();
      } else {
        const errData = await response.json();
        alert(errData.message || 'Failed to delete member.');
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Network error. Failed to delete member.');
    } finally {
      setDeletingId(null);
      setMemberToDelete(null);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 transition-colors duration-300 relative selection:bg-brand-500/20">
      
      {/* Decorative Background Accents */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-brand-500/5 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-violet-500/5 blur-3xl pointer-events-none -z-10" />

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 w-full glass border-b border-zinc-200 dark:border-zinc-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/30">
              <Award className="w-5.5 h-5.5" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white leading-tight">
                Membership
              </h1>
              <p className="text-[10px] text-zinc-400 font-semibold tracking-wider uppercase">
                Take-Home Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Sync Status Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Database className="w-3.5 h-3.5" />
              <span>MongoDB Atlas Connected</span>
            </div>

            {/* Manual Refresh Button */}
            <button
              onClick={() => { fetchMembers(); fetchStats(); }}
              className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400"
              title="Refresh Dashboard"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Theme Toggle Button */}
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Banner Headers */}
        <div className="mb-8 animate-slide-up">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            Real-time analytics and user registry for your organization's membership programs.
          </p>
        </div>

        {/* Dynamic Metrics Section */}
        <div className="animate-slide-up [animation-delay:100ms]">
          <StatsGrid stats={stats} loading={loadingStats} />
        </div>

        {/* Dashboard Split Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-slide-up [animation-delay:200ms]">
          {/* Main List Column */}
          <div className="lg:col-span-2 h-[680px]">
            <MemberList
              members={members}
              loading={loadingList}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onDeleteMember={handleDeleteClick}
              deletingId={deletingId}
            />
          </div>

          {/* Side Form Column */}
          <div>
            <MemberForm 
              onMemberAdded={handleMemberAdded} 
              backendUrl={BACKEND_URL} 
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-900 bg-white/40 dark:bg-zinc-950/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <p>© 2026 Membership Dashboard. Built with Vite, React, Express, MongoDB Atlas, and Tailwind CSS.</p>
          <div className="flex gap-4">
            <span className="font-semibold text-brand-600 dark:text-brand-400 hover:underline cursor-default">
              Take-Home Challenge
            </span>
          </div>
        </div>
      </footer>
      {/* Custom Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setMemberToDelete(null); }}
        onConfirm={handleConfirmDelete}
        memberName={memberToDelete ? memberToDelete.name : ''}
      />
    </div>
  );
}
