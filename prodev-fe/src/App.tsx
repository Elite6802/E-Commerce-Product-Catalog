import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./features/products/ProductDetail";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-neutral-900 dark:text-neutral-100">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 md:px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-neutral-200 dark:border-slate-800 bg-neutral-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-emerald-600 dark:bg-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">PD</span>
                  </div>
                  <span className="font-bold text-neutral-900 dark:text-white">Kelvin's ProDev Store Frontend</span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Quality products for modern living</p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Shop</h4>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li><a href="/" className="hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">All Products</a></li>
                  <li><a href="/" className="hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">Categories</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Support</h4>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Legal</h4>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">Terms & Conditions</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-neutral-200 dark:border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">© 2025 ProDev Store. All rights reserved.</p>
              <div className="flex gap-4 mt-4 sm:mt-0">
                <a href="https://ehub.alxafrica.com/profile/3b4885f6-a228-47e9-8602-380fd60ede94" target="_blank" className="text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">ALX</a>
                <a href="https://www.linkedin.com/in/kelvin-muthama-263126229/" target="_blank" className="text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">LinkedIn</a>
                <a href="https://github.com/Elite6802" target="_blank" className="text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">GitHub</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
