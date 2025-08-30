// client/app/(main)/home/bridal/BridalPageClient.tsx


'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../lib/redux/store';
import { setProductsForPage, applyPriceRangeForPage } from '../../lib/redux/sidebar/sidebarSlice';
import { ShopifyProduct } from '../../../../../lib/shopify/products/types';

type Props = {
  products: ShopifyProduct[];
};

export default function BridalPageClient({ products }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const pageKey = 'bridal';

  // Read any existing page data from Redux (if previously seeded)
  const pageData = useSelector((state: RootState) => state.sidebar.pages[pageKey]);
  const hasProducts = (pageData?.products?.length ?? 0) > 0;

  // Build the bridal products list (memoized)
  const bridalProducts = useMemo(() => {
    return products.filter((product) => {
      const productType = product.productType?.toLowerCase() ?? '';
      const tags = product.tags?.map((t) => t.toLowerCase()) ?? [];
      return productType.includes('bridal') || tags.includes('bridal');
    });
  }, [products]);

  useEffect(() => {
    // If we don't already have products for this page, set them (once) and apply range
    if (!hasProducts) {
      dispatch(setProductsForPage({ page: pageKey, products: bridalProducts }));
      dispatch(applyPriceRangeForPage({ page: pageKey }));
      return;
    }

    // If page already seeded, re-apply price range to keep UI consistent (no-op if unchanged)
    dispatch(applyPriceRangeForPage({ page: pageKey }));
  }, [dispatch, bridalProducts, hasProducts]);

  // Do NOT render the product grid here. Layout reads Redux (state.sidebar.pages[pageKey].filteredProducts)
  return null;
}
