// client/app/(main)/home/HomePageClient.tsx

'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../lib/redux/store';
import { getCartAsync } from '../lib/redux/cart/cartActions';
import { getWishlistAsync } from '../lib/redux/wishlist/wishlistActions';
// import { getUserProfile } from '../lib/redux/user/userActions';

type Props = {
  children: React.ReactNode;
};

export default function HomePageClient({ children }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCartAsync());
    dispatch(getWishlistAsync());
    // dispatch(getUserProfile());
  }, [dispatch]);

  return <>{children}</>;
}

