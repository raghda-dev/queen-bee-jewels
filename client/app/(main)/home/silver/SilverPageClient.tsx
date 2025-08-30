//client/app/(main)/home/silver/SilverPageClient.tsx

'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../lib/redux/store';
import { setProductsForPage, applyPriceRangeForPage } from '../../lib/redux/sidebar/sidebarSlice';
import { ShopifyProduct } from '../../../../../lib/shopify/products/types';

type Props = { products: ShopifyProduct[] };

export default function SilverPageClient({ products }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const pageKey = 'silver';

  // Grab page data (if any)
  const pageData = useSelector((state: RootState) => state.sidebar.pages[pageKey]);

  // Build silver products (memoized)
  const silverProducts = useMemo(
    () =>
      products.filter((product) => {
        const productType = product.productType?.toLowerCase() ?? '';
        const tags = product.tags?.map((t) => t.toLowerCase()) ?? [];
        return productType.includes('silver') || tags.includes('silver');
      }),
    [products]
  );

  const hasProducts = (pageData?.products?.length ?? 0) > 0;

  useEffect(() => {
    // If we don't already have products for this page, set them once.
    if (!hasProducts) {
      dispatch(setProductsForPage({ page: pageKey, products: silverProducts }));
      // apply the current priceRange (the reducer setProductsForPage sets page priceRange)
      dispatch(applyPriceRangeForPage({ page: pageKey }));
      return;
    }

    // If page already exists, re-apply current price range (keeps UI consistent)
    dispatch(applyPriceRangeForPage({ page: pageKey }));

  }, [dispatch, silverProducts, hasProducts]);

  // DO NOT render ProductsList here — layout renders the grid from redux.pages[pageKey].filteredProducts
  return null;
}
