//client/app/(main)/home/watches/WatchesPageClient.tsx

'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../lib/redux/store';
import { setProductsForPage, applyPriceRangeForPage } from '../../lib/redux/sidebar/sidebarSlice';
import { ShopifyProduct } from '../../../../../lib/shopify/products/types';

type Props = { products: ShopifyProduct[] };

export default function WatchesPageClient({ products }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const pageKey = 'watches';

  // Grab page data (if any already exists)
  const pageData = useSelector((state: RootState) => state.sidebar.pages[pageKey]);

  // Build watch products (memoized)
  const watchProducts = useMemo(
    () =>
      products.filter((product) => {
        const productType = product.productType?.toLowerCase() ?? '';
        const tags = product.tags?.map((t) => t.toLowerCase()) ?? [];
        return productType.includes('watch') || tags.includes('watch');
      }),
    [products]
  );

  const hasProducts = (pageData?.products?.length ?? 0) > 0;

  useEffect(() => {
    if (!hasProducts) {
      // First time: set products and apply price range
      dispatch(setProductsForPage({ page: pageKey, products: watchProducts }));
      dispatch(applyPriceRangeForPage({ page: pageKey }));
      return;
    }

    // Re-apply price range to keep filteredProducts in sync
    dispatch(applyPriceRangeForPage({ page: pageKey }));
  }, [dispatch, watchProducts, hasProducts]);

  // Do not render grid here — layout handles that from Redux state
  return null;
}
