// client/app/(main)/home/UserProfileInitializer.tsx

'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/redux/hooks';
import { getUserProfile } from '../lib/redux/user/userActions';
import { selectUser, selectUserLoading } from '../lib/redux/user/userSlice';

/**
 * Client initializer that only triggers when no user is present.
 * If the server preloaded the user into the store, this will be a no-op.
 */
export default function UserProfileInitializer(): null {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectUserLoading);

  useEffect(() => {
    if (!user && !loading) {
      // Only fetch profile if user is not already present
      dispatch(getUserProfile());
    }
  }, [user, loading, dispatch]);

  return null;
}
