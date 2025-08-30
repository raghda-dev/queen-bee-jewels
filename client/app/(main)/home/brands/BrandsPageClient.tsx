// client/app/(main)/home/brands/BrandsPageClient.tsx

'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../lib/redux/store';
import { setProductsForPage, applyPriceRangeForPage } from '../../lib/redux/sidebar/sidebarSlice';
import { ShopifyProduct } from '../../../../../lib/shopify';

type Props = { products: ShopifyProduct[] };

export default function BrandsPageClient({ products }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const pageKey = 'brands';

  const pageData = useSelector((state: RootState) => state.sidebar.pages[pageKey]);
  const hasProducts = (pageData?.products?.length ?? 0) > 0;

  const brandProducts = useMemo(
    () =>
      products.filter((product) => {
        const productType = (product.productType ?? '').toLowerCase();
        const tags = (product.tags ?? []).map((t) => t.toLowerCase());
        // original behaviour: tags including 'brand' OR 'women'
        return productType.includes('brand') || tags.some((tag) => tag.includes('brand') || tag.includes('women'));
      }),
    [products]
  );

  useEffect(() => {
    if (!hasProducts) {
      dispatch(setProductsForPage({ page: pageKey, products: brandProducts }));
      dispatch(applyPriceRangeForPage({ page: pageKey }));
      return;
    }

    // If page already exists, re-apply to ensure UI consistency
    dispatch(applyPriceRangeForPage({ page: pageKey }));
  }, [dispatch, brandProducts, hasProducts]);

  // Do not render the product grid here — layout reads redux and renders it
  return null;
}
