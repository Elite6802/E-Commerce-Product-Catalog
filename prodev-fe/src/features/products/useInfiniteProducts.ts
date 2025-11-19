import { useEffect, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"; // add hooks file below
import { loadAllProducts, loadNextPage, loadCategories } from "./productsSlice";

export const useInfiniteProducts = () => {
  const dispatch = useAppDispatch();
  const { visibleItems, allItems, hasMore, loading } = useAppSelector(s => s.products);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // fetch data + categories if not already loaded
    if (allItems.length === 0) {
      dispatch(loadAllProducts());
      dispatch(loadCategories());
    } else if (visibleItems.length === 0) {
      // ensure first page visible after initial load or filter change
      dispatch(loadNextPage());
    }
  }, [dispatch, allItems.length, visibleItems.length]);

  const observe = useCallback((node: Element | null) => {
    if (loading) return;
    if (!node) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      const first = entries[0];
      if (first.isIntersecting && hasMore && !loading) {
        dispatch(loadNextPage());
      }
    }, { rootMargin: "200px" });
    observer.current.observe(node);
  }, [dispatch, hasMore, loading]);

  return { observe, visibleItems, hasMore, loading };
};
