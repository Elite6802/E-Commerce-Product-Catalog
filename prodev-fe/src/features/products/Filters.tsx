import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { applyFilters, resetVisible } from "./productsSlice";
import SortDropdown from "../../components/SortDropdown";

export default function Filters() {
  const dispatch = useAppDispatch();
  const { categories, category } = useAppSelector(s => s.products);
  const [q, setQ] = useState("");

  const handleReset = () => {
    setQ("");
    dispatch(applyFilters({ category: "", sort: "", search: "" }));
    dispatch(resetVisible());
  };

  const handleCategoryChange = (value: string) => {
    dispatch(applyFilters({ category: value }));
    dispatch(resetVisible());
  };

  const handleSearch = () => {
    dispatch(applyFilters({ search: q }));
    dispatch(resetVisible());
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-neutral-200 dark:border-slate-800 shadow-sm p-6 space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">Search</h3>
        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-neutral-900 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-colors"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Go
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">Category</h3>
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 rounded-lg text-neutral-900 dark:text-white text-sm hover:border-emerald-500 dark:hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-colors appearance-none cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">Sort</h3>
        <SortDropdown />
      </div>

      <button
        onClick={handleReset}
        className="w-full px-4 py-2 border border-neutral-300 dark:border-slate-700 text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
}
