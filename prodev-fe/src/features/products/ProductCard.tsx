import React from "react";
import type { Product } from "./productsTypes";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { addToCart } from "../cart/cartSlice";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  return (
    <div className="group flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl border border-neutral-200 dark:border-slate-800 overflow-hidden hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-lg dark:hover:shadow-emerald-500/10 transition-all duration-300">
      <Link to={`/product/${product.id}`} className="relative flex-1 overflow-hidden bg-neutral-50 dark:bg-slate-800">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-56 object-contain p-4 group-hover:scale-110 transition-transform duration-300"
        />
      </Link>

      <div className="flex flex-col flex-grow p-4 border-t border-neutral-100 dark:border-slate-800">
        <Link to={`/product/${product.id}`} className="flex-1 mb-3">
          <h3 className="font-medium text-sm text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-snug hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-emerald-600 dark:text-emerald-500">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {product.category}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => dispatch(addToCart({ product, quantity: 1 }))}
              className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
            <Link
              to={`/product/${product.id}`}
              className="flex-1 px-3 py-2 border border-neutral-300 dark:border-slate-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-slate-800 text-sm font-medium rounded-lg transition-colors duration-200"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
