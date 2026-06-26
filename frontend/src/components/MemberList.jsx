import React from 'react';
import { Search, Trash2, SlidersHorizontal, ArrowUpDown, Calendar, Mail, ShieldAlert } from 'lucide-react';

export default function MemberList({
  members,
  loading,
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  onDeleteMember,
  deletingId
}) {
  
  // Helpers
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-300',
      'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300',
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300',
      'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300',
      'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300',
      'bg-violet-100 text-violet-700 dark:bg-violet-950/30 dark:text-violet-300',
      'bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-300',
    ];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getMembershipBadge = (type) => {
    switch (type) {
      case 'VIP':
        return 'bg-violet-100 text-violet-800 dark:bg-violet-950/30 dark:text-violet-300 border-violet-200/50 dark:border-violet-800/30';
      case 'Premium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300 border-blue-200/50 dark:border-blue-800/30';
      default:
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/30';
      case 'Pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/30';
      default:
        return 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300 border-red-200/50 dark:border-red-800/30';
    }
  };

  return (
    <div className="rounded-2xl glass-card border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col h-full">
      {/* Table Filters Header */}
      <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white self-start sm:self-center">
            Registered Members
          </h2>
          
          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
            <input
              id="search-input"
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
            />
          </div>
        </div>

        {/* Filters and Sorting control panel */}
        <div className="flex flex-wrap gap-3 items-center justify-between pt-1 text-xs">
          <div className="flex flex-wrap gap-2.5 items-center">
            {/* Membership Filter */}
            <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Type:</span>
              <select
                id="filter-type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="py-1 px-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-brand-500"
              >
                <option value="All">All Types</option>
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
              <span>Status:</span>
              <select
                id="filter-status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="py-1 px-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-brand-500"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Sort By Filter */}
          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort:</span>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-1 px-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-brand-500"
            >
              <option value="newest">Newest Signups</option>
              <option value="oldest">Oldest Signups</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 text-zinc-500 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider">
              <th className="px-6 py-4">Member Info</th>
              <th className="px-6 py-4">Membership</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
            {loading ? (
              // Skeletal Loader (5 rows)
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="px-6 py-4.5 flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-28"></div>
                      <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-40"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4.5">
                    <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-16"></div>
                  </td>
                  <td className="px-6 py-4.5">
                    <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-16"></div>
                  </td>
                  <td className="px-6 py-4.5">
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-20"></div>
                  </td>
                  <td className="px-6 py-4.5 text-right">
                    <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-8 ml-auto"></div>
                  </td>
                </tr>
              ))
            ) : members.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan="5" className="px-6 py-16 text-center animate-fade-in">
                  <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                    <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-900/40 text-zinc-400 dark:text-zinc-500 mb-4">
                      <ShieldAlert className="w-10 h-10" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
                      No members found
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-6">
                      We couldn't find any member matching your search query or filters. Try adjusting your settings.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              // Table Rows
              members.map((member) => (
                <tr 
                  key={member._id} 
                  className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-all duration-200 animate-fade-in group/row"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border border-black/5 dark:border-white/5 shadow-sm ${getAvatarColor(member.name)}`}>
                        {getInitials(member.name)}
                      </div>
                      
                      {/* Details */}
                      <div className="min-w-0">
                        <h4 className="font-semibold text-zinc-900 dark:text-white truncate">
                          {member.name}
                        </h4>
                        <p className="text-zinc-400 dark:text-zinc-500 text-xs flex items-center gap-1.5 mt-0.5 truncate">
                          <Mail className="w-3.5 h-3.5 shrink-0" />
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  
                  {/* Membership Type Badge */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getMembershipBadge(member.membershipType)}`}>
                      {member.membershipType}
                    </span>
                  </td>
                  
                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(member.status)}`}>
                      {member.status}
                    </span>
                  </td>

                  {/* Joined Date */}
                  <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1.5 text-xs">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      {formatDate(member.createdAt)}
                    </span>
                  </td>

                  {/* Actions (Delete button) */}
                  <td className="px-6 py-4 text-right">
                    <button
                      id={`btn-delete-${member._id}`}
                      onClick={() => onDeleteMember(member)}
                      disabled={deletingId === member._id}
                      className="p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 active:scale-95 disabled:opacity-50 transition-all"
                      title="Delete Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer statistics counter */}
      <div className="p-4 bg-zinc-50/50 dark:bg-zinc-900/10 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 flex justify-between items-center">
        <span>
          Showing {members.length} member{members.length !== 1 ? 's' : ''}
        </span>
        <span className="font-medium text-brand-600 dark:text-brand-400">
          Sync active with database
        </span>
      </div>
    </div>
  );
}
