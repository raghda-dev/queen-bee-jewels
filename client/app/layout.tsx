// client/app/layout.tsx

import './styles/global.scss';
import './styles/tailwind.css';
import Providers from './providers';
import { Toaster } from 'sonner';
import { RouteTracker } from './(main)/utils/RouteTracker';
import UserProfileInitializer from './(main)/home/UserProfileInitializer';
// import ClientHydrator from './(main)/components/ClientHydrator';

export default function RootLayout({
  children,
  collections,
}: {
  children: React.ReactNode;
  collections: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen min-w-fit flex-col">
        <Providers>
         {/* <ClientHydrator /> */}
          <UserProfileInitializer />
          <RouteTracker />
          <Toaster
            toastOptions={{
              className: 'toast',
            }}
          />
          {collections}
          {children}
        </Providers>
      </body>
    </html>
  );
}


