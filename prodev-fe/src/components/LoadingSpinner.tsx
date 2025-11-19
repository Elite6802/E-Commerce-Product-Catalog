export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-neutral-200 dark:border-slate-700 border-t-emerald-600 dark:border-t-emerald-500 animate-spin"></div>
      </div>
    </div>
  );
}
