//client/app/(main)/home/HomePageClient.tsx

'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../lib/redux/store';
import { getCartAsync, migrateGuestCartToServer } from '../lib/redux/cart/cartActions';
import { getWishlistAsync, migrateGuestWishlistToServer } from '../lib/redux/wishlist/wishlistActions';
import { getUserProfile } from '../lib/redux/user/userActions';
import { setProductsForPage } from '../lib/redux/sidebar/sidebarSlice';
import { ShopifyProduct } from '../../../../lib/shopify/products/types';

type Props = {
  products: ShopifyProduct[];
};

export default function HomePageClient({ products }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const hasProducts = useSelector((state: RootState) => (state.sidebar.pages?.home?.products?.length ?? 0) > 0);

  useEffect(() => {
    dispatch(getCartAsync());
    dispatch(getWishlistAsync());
    dispatch(getUserProfile());
    dispatch(migrateGuestCartToServer());
    dispatch(migrateGuestWishlistToServer());

    if (!hasProducts) {
      dispatch(setProductsForPage({ page: 'home', products }));
    }
  }, [dispatch, products, hasProducts]);

  return null;
}
