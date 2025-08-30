//client/app/(main)/home/women/WomenPageClient.tsx

'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../lib/redux/store';
import { setProductsForPage, applyPriceRangeForPage } from '../../lib/redux/sidebar/sidebarSlice';
import { ShopifyProduct } from '../../../../../lib/shopify/products/types';

type Props = { products: ShopifyProduct[] };

export default function WomenPageClient({ products }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const pageKey = 'women';

  // Existing page data (if any)
  const pageData = useSelector((state: RootState) => state.sidebar.pages[pageKey]);

  // Build women products (memoized) — tag or productType includes "women"
  const womenProducts = useMemo(
    () =>
      products.filter((product) => {
        const productType = product.productType?.toLowerCase() ?? '';
        const tags = product.tags?.map((t) => t.toLowerCase()) ?? [];
        return productType.includes('women') || tags.includes('women');
      }),
    [products]
  );

  const hasProducts = (pageData?.products?.length ?? 0) > 0;

  useEffect(() => {
    if (!hasProducts) {
      // First time: set products and apply price range
      dispatch(setProductsForPage({ page: pageKey, products: womenProducts }));
      dispatch(applyPriceRangeForPage({ page: pageKey }));
      return;
    }
    // Keep filteredProducts in sync with current price range
    dispatch(applyPriceRangeForPage({ page: pageKey }));
  }, [dispatch, womenProducts, hasProducts]);

  // Do not render the grid here — the layout renders from Redux (pages[pageKey].filteredProducts)
  return null;
}
