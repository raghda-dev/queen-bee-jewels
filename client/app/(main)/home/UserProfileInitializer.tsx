// client/app/(main)/home/UserProfileInitializer.tsx

'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '../lib/redux/hooks';
import { getUserProfile } from '../lib/redux/user/userActions';

export default function UserProfileInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return null;
}
