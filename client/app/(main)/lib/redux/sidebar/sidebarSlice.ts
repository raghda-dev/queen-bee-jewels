// client/app/(main)/lib/redux/sidebar/sidebarSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShopifyProduct } from "../../../../../../lib/shopify/products/types";

interface PageProducts {
  products: ShopifyProduct[];
  filteredProducts: ShopifyProduct[];
  priceRange: [number, number];
  defaultPriceRange: [number, number];
  searchQuery?: string; // <-- new optional field
}

interface SidebarState {
  pages: Record<string, PageProducts>;
}

const initialState: SidebarState = {
  pages: {},
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setProductsForPage: (
      state,
      action: PayloadAction<{ page: string; products: ShopifyProduct[] }>
    ) => {
      const { page, products } = action.payload;

      // Remove duplicates by id
      const uniqueMap: Record<string, ShopifyProduct> = {};
      products.forEach((p) => (uniqueMap[p.id] = p));
      const uniqueProducts = Object.values(uniqueMap);

      // compute dynamic min/max from products
      let minPrice = 0;
      let maxPrice = 1000;
      if (uniqueProducts.length > 0) {
        const prices = uniqueProducts.map((p) =>
          Number(p.priceRange.minVariantPrice.amount)
        );
        minPrice = Math.min(...prices);
        maxPrice = Math.max(...prices);
      }

      state.pages[page] = {
        products: uniqueProducts,
        filteredProducts: uniqueProducts,
        priceRange: [minPrice, maxPrice],
        defaultPriceRange: [minPrice, maxPrice],
        searchQuery: "",
      };
    },

    setPriceRangeForPage: (
      state,
      action: PayloadAction<{ page: string; range: [number, number] }>
    ) => {
      const { page, range } = action.payload;
      if (!state.pages[page]) return;
      state.pages[page].priceRange = range;
    },

    applyPriceRangeForPage: (
      state,
      action: PayloadAction<{ page: string; range?: [number, number] }>
    ) => {
      const { page, range } = action.payload;
      const pageData = state.pages[page];
      if (!pageData) return;

      const [min, max] = range ?? pageData.priceRange;
      const query = pageData.searchQuery?.toLowerCase() ?? "";

      pageData.filteredProducts = pageData.products.filter((p) => {
        const price = Number(p.priceRange.minVariantPrice.amount);
        const matchesPrice = price >= min && price <= max;
        const matchesSearch = !query || p.title.toLowerCase().includes(query);
        return matchesPrice && matchesSearch;
      });
    },

    resetFiltersForPage: (state, action: PayloadAction<{ page: string }>) => {
      const { page } = action.payload;
      const pageData = state.pages[page];
      if (!pageData) return;
      pageData.filteredProducts = pageData.products;
      pageData.priceRange = pageData.defaultPriceRange;
      pageData.searchQuery = "";
    },

    // 🔍 NEW search reducer
    setSearchQueryForPage: (
      state,
      action: PayloadAction<{ page: string; query: string }>
    ) => {
      const { page, query } = action.payload;
      const pageData = state.pages[page];
      if (!pageData) return;

      pageData.searchQuery = query;
      const [min, max] = pageData.priceRange;

      pageData.filteredProducts = pageData.products.filter((p) => {
        const price = Number(p.priceRange.minVariantPrice.amount);
        const matchesPrice = price >= min && price <= max;
        const matchesSearch = !query || p.title.toLowerCase().includes(query.toLowerCase());
        return matchesPrice && matchesSearch;
      });
    },
  },
});

export const {
  setProductsForPage,
  setPriceRangeForPage,
  applyPriceRangeForPage,
  resetFiltersForPage,
  setSearchQueryForPage, // 👈 export new one
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
