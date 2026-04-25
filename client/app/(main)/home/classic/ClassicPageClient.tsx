// client/app/(main)/home/classic/ClassicPageClient.tsx

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

export default function ClassicPageClient({ products }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const pageKey = 'classic';

  // page data (if already seeded)
  const pageData = useSelector((state: RootState) => state.sidebar.pages[pageKey]);
  const hasProducts = (pageData?.products?.length ?? 0) > 0;

  // Build classic products list (memoized)
  const classicProducts = useMemo(() => {
    return products.filter((product) => {
      const productType = product.productType?.toLowerCase() ?? '';
      const tags = product.tags?.map((t) => t.toLowerCase()) ?? [];
      return productType.includes('classic') || tags.includes('classic');
    });
  }, [products]);

  useEffect(() => {
    // If page not seeded yet, seed it once then apply price filtering.
    if (!hasProducts) {
      dispatch(setProductsForPage({ page: pageKey, products: classicProducts }));
      dispatch(applyPriceRangeForPage({ page: pageKey }));
      return;
    }

    // If already seeded, re-apply price range to keep UI consistent (no-op if unchanged)
    dispatch(applyPriceRangeForPage({ page: pageKey }));
  }, [dispatch, classicProducts, hasProducts]);

  // IMPORTANT: do not render ProductsList here. Your layout reads from Redux:
  // state.sidebar.pages[pageKey].filteredProducts and renders the grid.
  return null;
}
