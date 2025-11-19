import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { applyFilters, resetVisible } from "../features/products/productsSlice";

export default function SortDropdown() {
  const dispatch = useAppDispatch();
  const { sort } = useAppSelector(s => s.products);

  const handleSort = (value: string) => {
    dispatch(applyFilters({ sort: (value || "") as any }));
    dispatch(resetVisible());
  };

  return (
    <div className="relative inline-block w-full">
      <select
        value={sort || ""}
        onChange={(e) => handleSort(e.target.value)}
        className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-700 rounded-lg text-neutral-900 dark:text-white text-sm font-medium hover:border-emerald-500 dark:hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-colors appearance-none cursor-pointer"
      >
        <option value="">Sort by</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 dark:text-neutral-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  );
}
