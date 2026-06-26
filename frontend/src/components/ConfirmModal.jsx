import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, memberName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-2xl p-6 shadow-2xl animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-250 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex gap-4">
          {/* Warning Icon Container */}
          <div className="p-3 rounded-full bg-red-100 dark:bg-red-950/30 text-red-650 dark:text-red-400 self-start shrink-0">
            <AlertTriangle className="w-6 h-6 animate-pulse-subtle" />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Remove Member?
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
              Are you sure you want to remove <span className="font-semibold text-zinc-800 dark:text-zinc-200">"{memberName}"</span> from the database? This action is permanent and cannot be undone.
            </p>

            <div className="flex gap-3 justify-end text-sm">
              <button
                id="btn-cancel-delete"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 font-medium active:scale-95 transition-all"
              >
                Cancel
              </button>
              <button
                id="btn-confirm-delete"
                onClick={onConfirm}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg shadow-red-600/15 active:scale-95 transition-all"
              >
                Delete Member
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
