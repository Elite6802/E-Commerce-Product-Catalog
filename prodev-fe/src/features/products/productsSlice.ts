import{ createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  // fetchProductsByCategory,
  fetchProductDetails,
  fetchCategories,
} from "../../api/products";
import type { Product } from "../../types/types";

interface ProductsState {
  allItems: Product[];        // full dataset from API
  visibleItems: Product[];    // items currently shown (pagination/infinite)
  loading: boolean;
  error: string | null;
  category: string;
  sort: "" | "asc" | "desc";
  search: string;
  page: number;               // client-side page index (1-based)
  perPage: number;
  hasMore: boolean;
  categories: string[];
  detail?: Product | null;
}

const initialState: ProductsState = {
  allItems: [],
  visibleItems: [],
  loading: false,
  error: null,
  category: "",
  sort: "",
  search: "",
  page: 1,
  perPage: 12,
  hasMore: true,
  categories: [],
  detail: null,
};

export const loadAllProducts = createAsyncThunk("products/loadAll", async () => {
  return await fetchAllProducts();
});

export const loadCategories = createAsyncThunk("products/loadCategories", async () => {
  return await fetchCategories();
});

export const loadProductDetail = createAsyncThunk("products/loadDetail", async (id: number) => {
  return await fetchProductDetails(id);
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetVisible(state) {
      state.visibleItems = [];
      state.page = 1;
      state.hasMore = true;
    },
    applyFilters(state, action: PayloadAction<{ category?: string; sort?: ProductsState["sort"]; search?: string }>) {
      if (action.payload.category !== undefined) state.category = action.payload.category;
      if (action.payload.sort !== undefined) state.sort = action.payload.sort ?? "";
      if (action.payload.search !== undefined) state.search = action.payload.search ?? "";
      // After changing filters/search, reset view
      state.visibleItems = [];
      state.page = 1;
      state.hasMore = true;
      // recompute visibleItems below in extraReducers or via thunk caller
    },
    loadNextPage(state) {
      const start = (state.page - 1) * state.perPage;
      const source = state.allItems.slice();

      // Apply category filter:
      let filtered = source;
      if (state.category) filtered = filtered.filter((p) => p.category === state.category);

      // Apply search:
      if (state.search?.trim()) {
        const q = state.search.trim().toLowerCase();
        filtered = filtered.filter((p) => (p.title + p.description).toLowerCase().includes(q));
      }

      // Apply sort:
      if (state.sort === "asc") filtered.sort((a, b) => a.price - b.price);
      if (state.sort === "desc") filtered.sort((a, b) => b.price - a.price);

      const next = filtered.slice(start, start + state.perPage);
      state.visibleItems.push(...next);
      state.page += 1;
      state.hasMore = start + state.perPage < filtered.length;
    },
    clearDetail(state) {
      state.detail = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllProducts.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loadAllProducts.fulfilled, (s, action) => {
        s.loading = false;
        s.allItems = action.payload;
        // initialize visibleItems (first page)
        s.visibleItems = [];
        s.page = 1;
        s.hasMore = true;
      })
      .addCase(loadAllProducts.rejected, (s) => { s.loading = false; s.error = "Failed to load products"; })

      .addCase(loadCategories.fulfilled, (s, action) => {
        s.categories = action.payload;
      })

      .addCase(loadProductDetail.pending, (s) => { s.loading = true; s.detail = null; })
      .addCase(loadProductDetail.fulfilled, (s, action) => { s.loading = false; s.detail = action.payload; })
      .addCase(loadProductDetail.rejected, (s) => { s.loading = false; s.error = "Failed to load detail"; });
  }
});

export const { resetVisible, applyFilters, loadNextPage, clearDetail } = productsSlice.actions;
export default productsSlice.reducer;
