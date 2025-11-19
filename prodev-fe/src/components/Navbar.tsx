import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import DarkToggle from "./ui/DarkToggle";

export default function Navbar() {
  const count = useAppSelector(s => s.cart.items.reduce((a,b) => a + b.quantity, 0));
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-neutral-200 dark:border-slate-800 backdrop-blur-sm bg-white/80 dark:bg-slate-950/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 dark:bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">PD</span>
          </div>
          <span className="font-bold text-lg text-neutral-900 dark:text-white hidden sm:inline">ProDev Store</span>
        </Link>

        <nav className="flex items-center gap-6 md:gap-8">
          <Link to="/" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">
            Products
          </Link>
          <Link to="/cart" className="relative p-2 hover:bg-neutral-100 dark:hover:bg-slate-900 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-neutral-900 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 dark:bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </Link>
          <DarkToggle />
        </nav>
      </div>
    </header>
  );
}
