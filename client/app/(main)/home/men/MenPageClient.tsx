// client/app/(main)/home/men/MenPageClient.tsx
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

export default function MenPageClient({ products }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const pageKey = 'men';

  // read page data if it already exists
  const pageData = useSelector((state: RootState) => state.sidebar.pages[pageKey]);
  const hasProducts = (pageData?.products?.length ?? 0) > 0;

  // build men products list (memoized)
  const menProducts = useMemo(() => {
    return products.filter((product) => {
      const tags = product.tags?.map((t) => t.toLowerCase()) ?? [];
      // original logic: tag includes 'men'
      return tags.some((tag) => tag.includes('men'));
    });
  }, [products]);

  useEffect(() => {
    // seed page products only once to avoid duplicates/overwrites
    if (!hasProducts) {
      dispatch(setProductsForPage({ page: pageKey, products: menProducts }));
      // when seeding, apply the page priceRange that setProductsForPage configured
      dispatch(applyPriceRangeForPage({ page: pageKey }));
      return;
    }

    // if page already present, re-apply price range to keep UI consistent
    dispatch(applyPriceRangeForPage({ page: pageKey }));
  }, [dispatch, menProducts, hasProducts]);

  // do not render product grid here — layout renders from Redux state
  return null;
}
