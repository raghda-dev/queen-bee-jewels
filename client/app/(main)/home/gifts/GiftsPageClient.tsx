// client/app/(main)/home/gifts/GiftsPageClient.tsx

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

export default function GiftsPageClient({ products }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const pageKey = 'gifts';

  // page data (if already seeded)
  const pageData = useSelector((state: RootState) => state.sidebar.pages[pageKey]);
  const hasProducts = (pageData?.products?.length ?? 0) > 0;

  // Build gift products list (memoized)
  const giftProducts = useMemo(() => {
    return products.filter((product) => {
      const tags = product.tags?.map((t) => t.toLowerCase()) ?? [];
      // original logic filtered by 'gifts' OR 'silver'
      return tags.some((tag) => tag.includes('gifts') || tag.includes('silver'));
    });
  }, [products]);

  useEffect(() => {
    // seed once if not present, and apply price filter
    if (!hasProducts) {
      dispatch(setProductsForPage({ page: pageKey, products: giftProducts }));
      dispatch(applyPriceRangeForPage({ page: pageKey }));
      return;
    }

    // if page already exists, re-apply current price range to keep UI consistent
    dispatch(applyPriceRangeForPage({ page: pageKey }));
  }, [dispatch, giftProducts, hasProducts]);

  // do not render ProductsList here (layout reads from Redux and renders)
  return null;
}
