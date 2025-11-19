import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadProductDetail, clearDetail } from "./productsSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorBanner from "../../components/ErrorBanner";
import { addToCart } from "../cart/cartSlice";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { detail, loading, error } = useAppSelector(s => s.products);

  useEffect(() => {
    if (id) dispatch(loadProductDetail(Number(id)));
    return () => { dispatch(clearDetail()); };
  }, [id, dispatch]);

  if (loading || !detail) return <LoadingSpinner />;
  if (error) return <ErrorBanner message={error} />;

  return (
    <div className="py-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 text-sm font-medium transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="flex items-center justify-center bg-white dark:bg-slate-900 rounded-xl border border-neutral-200 dark:border-slate-800 p-8 md:p-12 h-96 md:h-auto">
          <img
            src={detail.image || "/placeholder.svg"}
            alt={detail.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full mb-3">
                {detail.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              {detail.title}
            </h1>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-500">
                ${detail.price.toFixed(2)}
              </span>
            </div>

            <div className="prose dark:prose-invert max-w-none mb-8">
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {detail.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-neutral-200 dark:border-slate-800">
            <button
              onClick={() => {
                dispatch(addToCart({ product: detail, quantity: 1 }));
              }}
              className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add to Cart
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full px-6 py-3 border-2 border-neutral-300 dark:border-slate-700 text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-slate-900 font-semibold rounded-lg transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
