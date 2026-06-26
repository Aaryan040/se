import React, { useState } from 'react';
import { UserPlus, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function MemberForm({ onMemberAdded, backendUrl }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [membershipType, setMembershipType] = useState('Free');
  const [status, setStatus] = useState('Active');
  
  // Validation States
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) {
      tempErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      tempErrors.name = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())) {
      tempErrors.email = 'Email is invalid';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const response = await fetch(`${backendUrl}/api/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          membershipType,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Success
      setSubmitSuccess(true);
      setName('');
      setEmail('');
      setMembershipType('Free');
      setStatus('Active');
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);

      // Trigger callback to update list and stats
      if (onMemberAdded) {
        onMemberAdded(data);
      }
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl glass-card p-6 border-zinc-200 dark:border-zinc-800 transition-all duration-300">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-brand-100 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
          <UserPlus className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          Add New Member
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="form-name" className="block text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
            Display Name
          </label>
          <input
            id="form-name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all ${
              errors.name 
                ? 'border-red-500/70 focus:border-red-500' 
                : 'border-zinc-200 dark:border-zinc-800'
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 animate-fade-in">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="form-email" className="block text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
            Email Address
          </label>
          <input
            id="form-email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all ${
              errors.email 
                ? 'border-red-500/70 focus:border-red-500' 
                : 'border-zinc-200 dark:border-zinc-800'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 animate-fade-in">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Membership Type Select */}
        <div>
          <label htmlFor="form-membership" className="block text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
            Membership Type
          </label>
          <select
            id="form-membership"
            value={membershipType}
            onChange={(e) => setMembershipType(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          >
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
            <option value="VIP">VIP</option>
          </select>
        </div>

        {/* Status Select */}
        <div>
          <label htmlFor="form-status" className="block text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
            Initial Status
          </label>
          <select
            id="form-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          >
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Form Messages */}
        {submitError && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400 text-sm flex items-start gap-2 animate-fade-in">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </div>
        )}

        {submitSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm flex items-start gap-2 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <span>Member registered successfully!</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          id="btn-add-member"
          type="submit"
          disabled={submitting}
          className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-semibold shadow-md shadow-brand-500/20 hover:brightness-105 active:scale-[0.98] disabled:opacity-75 disabled:pointer-events-none transition-all"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Saving Member...</span>
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              <span>Register Member</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
