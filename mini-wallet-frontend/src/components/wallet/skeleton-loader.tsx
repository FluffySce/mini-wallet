"use client";

export function SkeletonLoader() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Balance Card Skeleton */}
      <div className="h-32 sm:h-40 bg-linear-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-lg animate-pulse" />

      {/* Forms Skeleton */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        <div className="h-40 sm:h-48 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
        <div className="h-40 sm:h-48 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
      </div>

      {/* Table Skeleton */}
      <div className="space-y-2">
        <div className="h-9 sm:h-10 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
        <div className="h-10 sm:h-12 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
        <div className="h-10 sm:h-12 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
        <div className="h-10 sm:h-12 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}
