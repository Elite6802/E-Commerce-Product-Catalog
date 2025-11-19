import { useRef, useEffect } from "react";
import ProductCard from "./ProductCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorBanner from "../../components/ErrorBanner";
import { useInfiniteProducts } from "./useInfiniteProducts";
import { useAppSelector } from "../../app/hooks";

export default function ProductsList() {
  const { observe, visibleItems, hasMore, loading } = useInfiniteProducts();
  const { error } = useAppSelector((state) => state.products);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (endRef.current) observe(endRef.current);
  }, [endRef.current, observe, visibleItems.length]);

  if (error) return <ErrorBanner message={error} />;
  if (loading && visibleItems.length === 0) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
          Our Collection
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Discover {visibleItems.length}+ premium products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {visibleItems.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {loading && visibleItems.length > 0 && (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      )}

      <div ref={endRef} className="h-1" />

      {!hasMore && visibleItems.length > 0 && (
        <div className="text-center py-12">
          <svg className="w-12 h-12 text-neutral-300 dark:text-slate-700 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-neutral-600 dark:text-neutral-400">
            You've explored all {visibleItems.length} products
          </p>
        </div>
      )}
    </div>
  );
}
