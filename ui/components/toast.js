import React from 'react';
import { useToast } from '../contexts/toast-context';

export function Toast() {
  const { toast, clearToast } = useToast();

  if (!toast) return null;

  return (
    <div className="animate-in slide-in-from-right fixed right-4 top-4 z-50 duration-300">
      <div
        className={`max-w-sm rounded-lg p-4 shadow-lg ${
          toast.type === 'error'
            ? 'border border-red-200 bg-red-50'
            : 'border border-green-200 bg-green-50'
        }`}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {toast.type === 'error' ? (
              <svg
                className="h-5 w-5 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
          <div className="ml-3">
            <p
              className={`text-sm font-medium ${
                toast.type === 'error' ? 'text-red-800' : 'text-green-800'
              }`}
            >
              {toast.message}
            </p>
          </div>
          <div className="ml-auto pl-3">
            <button
              onClick={() => clearToast(null)}
              className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                toast.type === 'error'
                  ? 'text-red-500 hover:bg-red-100 focus:ring-red-600'
                  : 'text-green-500 hover:bg-green-100 focus:ring-green-600'
              }`}
              aria-label="Close"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
