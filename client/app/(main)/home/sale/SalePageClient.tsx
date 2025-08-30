// client/app/(main)/home/sale/SalePageClient.tsx


'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../lib/redux/store';
import {
  setProductsForPage,
  applyPriceRangeForPage,
} from '../../lib/redux/sidebar/sidebarSlice';
import { ShopifyProduct } from '../../../../../lib/shopify/products/types';

type Props = {
  products: ShopifyProduct[];
};

export default function SalePageClient({ products }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const pageKey = 'sale';

  // read existing page data (if seeded)
  const pageData = useSelector((state: RootState) => state.sidebar.pages[pageKey]);
  const hasProducts = (pageData?.products?.length ?? 0) > 0;

  // build the sale-products list (memoized)
  const saleProducts = useMemo(() => {
    return products.filter((product) => {
      const tags = product.tags?.map((t) => t.toLowerCase()) ?? [];
      // original logic included "women" too; keep same behavior as initial file:
      return tags.some((tag) => tag.includes('sale') || tag.includes('women'));
    });
  }, [products]);

  useEffect(() => {
    // seed this page's products only once to avoid duplicates
    if (!hasProducts) {
      dispatch(setProductsForPage({ page: pageKey, products: saleProducts }));
      // apply price filter (setProductsForPage computes page priceRange)
      dispatch(applyPriceRangeForPage({ page: pageKey }));
      return;
    }

    // if page already present, re-apply current page priceRange (keeps UI consistent)
    dispatch(applyPriceRangeForPage({ page: pageKey }));
  }, [dispatch, saleProducts, hasProducts]);

  // seeder doesn't render the grid — layout reads from state.sidebar.pages[pageKey].filteredProducts
  return null;
}
