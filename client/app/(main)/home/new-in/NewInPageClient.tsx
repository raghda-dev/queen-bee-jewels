// client/app/(main)/home/new-in/NewInPageClient.tsx


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

export default function NewInPageClient({ products }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const pageKey = 'new-in';

  // Read existing page data (if already seeded)
  const pageData = useSelector((state: RootState) => state.sidebar.pages[pageKey]);
  const hasProducts = (pageData?.products?.length ?? 0) > 0;

  // Build the "new-in" list (including silver, per original logic)
  const newInProducts = useMemo(() => {
    return products.filter((product) => {
      const tags = product.tags?.map((t) => t.toLowerCase()) ?? [];
      // match tags containing 'new-in' OR 'silver' (keeps original behavior)
      return tags.some((tag) => tag.includes('new-in') || tag.includes('silver'));
    });
  }, [products]);

  useEffect(() => {
    // Seed page products only once to avoid duplicates/overwrites
    if (!hasProducts) {
      dispatch(setProductsForPage({ page: pageKey, products: newInProducts }));
      // apply the page priceRange that was created by setProductsForPage
      dispatch(applyPriceRangeForPage({ page: pageKey }));
      return;
    }

    // If the page is already present (user navigated back), re-apply the page price range
    dispatch(applyPriceRangeForPage({ page: pageKey }));
  }, [dispatch, newInProducts, hasProducts]);

  // Seeder doesn't render the grid — layout reads from Redux page state.
  return null;
}
