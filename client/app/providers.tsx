// client/app/providers.tsx

'use client';

import React, { useMemo } from 'react';
import { Provider } from 'react-redux';
import { createAppStore, RootState } from './(main)/lib/redux/store';

type Props = {
  children: React.ReactNode;
  initialUser?: RootState['user']['user'] | null;
};

export default function Providers({ children, initialUser }: Props) {
  const preloadedState: Partial<RootState> = useMemo(() => {
    if (!initialUser) return {};
    return {
      user: {
        user: initialUser,
        token: null,
        isLoggedIn: true,
        loading: false,
        error: null,
      },
    };
  }, [initialUser]);

  const store = useMemo(() => createAppStore(preloadedState), [preloadedState]);

  return <Provider store={store}>{children}</Provider>;
}
