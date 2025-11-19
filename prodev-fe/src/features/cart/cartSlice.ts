import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../products/productsTypes";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const loadFromStorage = (): CartItem[] => {
  try {
    const raw = localStorage.getItem("cart_v1");
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const initialState: CartState = { items: loadFromStorage() };

const save = (state: CartState) => {
  try { localStorage.setItem("cart_v1", JSON.stringify(state.items)); } catch {
    // ignore write errors
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product; quantity: number }>) {
      const found = state.items.find(i => i.product.id === action.payload.product.id);
      if (found) found.quantity += action.payload.quantity;
      else state.items.push({ product: action.payload.product, quantity: action.payload.quantity });
      save(state);
    },
    setQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const it = state.items.find(i => i.product.id === action.payload.id);
      if (it) it.quantity = Math.max(1, action.payload.quantity);
      save(state);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.product.id !== action.payload);
      save(state);
    },
    clearCart(state) {
      state.items = [];
      save(state);
    }
  }
});

export const { addToCart, setQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
