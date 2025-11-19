import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setQuantity, removeFromCart, clearCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(s => s.cart.items);

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (items.length === 0) return (
    <div className="py-16 text-center">
      <svg className="w-16 h-16 text-neutral-300 dark:text-slate-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Your cart is empty</h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">Start shopping to add items to your cart</p>
      <Link to="/" className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors">
        Continue Shopping
      </Link>
    </div>
  );

  return (
    <div className="py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(it => (
            <div key={it.product.id} className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-slate-900 p-4 rounded-lg border border-neutral-200 dark:border-slate-800">
              <div className="flex-shrink-0 w-full sm:w-24 h-24 bg-neutral-100 dark:bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
                <img src={it.product.image || "/placeholder.svg"} alt={it.product.title} className="w-full h-full object-contain p-2" />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link to={`/product/${it.product.id}`} className="font-semibold text-neutral-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">
                    {it.product.title}
                  </Link>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{it.product.category}</p>
                </div>

                <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-500">
                  ${(it.product.price * it.quantity).toFixed(2)}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:flex-col">
                <div className="flex items-center border border-neutral-300 dark:border-slate-700 rounded-lg">
                  <button
                    onClick={() => dispatch(setQuantity({ id: it.product.id, quantity: it.quantity - 1 }))}
                    className="px-2 py-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 text-neutral-900 dark:text-white font-medium">{it.quantity}</span>
                  <button
                    onClick={() => dispatch(setQuantity({ id: it.product.id, quantity: it.quantity + 1 }))}
                    className="px-2 py-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(it.product.id))}
                  className="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 text-sm font-medium transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 h-fit">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-neutral-200 dark:border-slate-800 p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">Order Summary</h3>

            <div className="space-y-3 pb-6 border-b border-neutral-200 dark:border-slate-800">
              <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                <span>Subtotal ({items.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                <span>Shipping</span>
                <span className="text-emerald-600 dark:text-emerald-500">FREE</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-neutral-900 dark:text-white text-lg py-6 mb-6 border-b border-neutral-200 dark:border-slate-800">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors mb-3">
              Proceed to Checkout
            </button>

            <button
              onClick={() => dispatch(clearCart())}
              className="w-full px-6 py-3 border border-neutral-300 dark:border-slate-700 text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-slate-800 font-semibold rounded-lg transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
